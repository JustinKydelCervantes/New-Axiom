<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Project;
use App\Models\User;
use App\Notifications\ProjectCreated;
use App\Notifications\ProjectDeadlineReminder; // Add this
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Carbon\Carbon; // Add this

class ProjectController extends Controller
{
    public function index()
    {
        $projects = \App\Models\Project::with('owner')->latest()->get();
        return inertia('Projects/Index', ['projects' => $projects]);
    }

    public function create()
    {
        return inertia('Projects/Create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:active,on_hold,completed',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $project = $request->user()->projects()->create($validated);
        
        // Record activity log
        ActivityLog::record('created', $project);
        
        // Send notification about the new project
        $this->sendProjectCreatedNotification($project);
        
        // Check if project has a due date and send immediate deadline reminder if needed
        $this->checkImmediateDeadline($project);

        // Initialize default columns for the new project
        $columns = [
            ['name' => 'To Do', 'slug' => 'not_started', 'order' => 0],
            ['name' => 'In Progress', 'slug' => 'in_progress', 'order' => 1],
            ['name' => 'Done', 'slug' => 'completed', 'order' => 2],
            ['name' => 'Blocked', 'slug' => 'blocked', 'order' => 3],
        ];

        foreach ($columns as $columnData) {
            $project->columns()->create($columnData);
        }

        return redirect()->route('projects.index');
    }

    /**
     * Send notification when a new project is created
     */
    private function sendProjectCreatedNotification(Project $project)
    {
        $users = collect();
        
        // Notify the project creator
        $users->push(auth()->user());
        
        // Notify all admins (except the creator)
        $admins = User::where('role', 'admin')
            ->where('id', '!=', auth()->id())
            ->get();
        $users = $users->merge($admins)->unique('id');
        
        // Notify project members if any are already assigned
        if ($project->members && $project->members->count() > 0) {
            foreach ($project->members as $member) {
                if ($member->user && $member->user->id !== auth()->id()) {
                    $users->push($member->user);
                }
            }
        }
        
        // Send the notification
        Notification::send($users, new ProjectCreated($project));
    }
    
    /**
     * Check if project has an immediate deadline (≤ 3 days) and send reminder
     */
    private function checkImmediateDeadline(Project $project)
    {
        if (!$project->end_date) {
            return; // No deadline set
        }
        
        $today = Carbon::today();
        $dueDate = Carbon::parse($project->end_date);
        
        // Calculate days until deadline
        $daysUntilDeadline = $today->diffInDays($dueDate, false); // false = absolute difference
        
        // Get users to notify
        $users = collect();
        
        if ($project->owner_id) {
            $owner = User::find($project->owner_id);
            if ($owner) $users->push($owner);
        }
        
        if ($project->members && $project->members->count() > 0) {
            foreach ($project->members as $member) {
                if ($member->user && !$users->contains('id', $member->user->id)) {
                    $users->push($member->user);
                }
            }
        }
        
        if ($users->isEmpty()) {
            $users->push(auth()->user()); // At least notify the creator
        }
        
        // Check different scenarios
        if ($dueDate->lt($today)) {
            // Overdue - due date is in the past
            Notification::send($users, new ProjectDeadlineReminder($project, 'overdue'));
            
        } elseif ($daysUntilDeadline === 0) {
            // Due today
            Notification::send($users, new ProjectDeadlineReminder($project, 'today'));
            
        } elseif ($daysUntilDeadline === 1) {
            // Due tomorrow
            Notification::send($users, new ProjectDeadlineReminder($project, 1));
            
        } elseif ($daysUntilDeadline <= 3) {
            // Due within 3 days
            Notification::send($users, new ProjectDeadlineReminder($project, $daysUntilDeadline));
        }
    }

    public function show(\App\Models\Project $project)
    {
        return inertia('Projects/Show', [
            'project' => $project->load(['owner', 'members.user', 'tasks.assignee']),
            'users'   => \App\Models\User::all(),
        ]);
    }

    public function kanban(\App\Models\Project $project)
    {
        return inertia('Projects/Kanban', [
            'project' => $project->load(['members.user', 'tasks.assignee', 'columns']),
        ]);
    }

    public function gantt(\App\Models\Project $project)
    {
        return inertia('Projects/Gantt', [
            'project' => $project->load(['tasks.assignee', 'tasks.dependencies']),
        ]);
    }

    public function edit(\App\Models\Project $project)
    {
        return inertia('Projects/Edit', ['project' => $project]);
    }

    public function update(\Illuminate\Http\Request $request, \App\Models\Project $project)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:active,on_hold,completed',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $old = $project->only(array_keys($validated));
        $project->update($validated);
        ActivityLog::record('updated', $project, ['old' => $old, 'new' => $validated]);
        
        // Check if end_date was updated and send immediate reminder if needed
        if (isset($validated['end_date']) && $validated['end_date'] !== $old['end_date']) {
            $this->checkImmediateDeadline($project);
        }

        return redirect()->route('projects.index');
    }

    public function destroy(\App\Models\Project $project)
    {
        ActivityLog::record('deleted', $project, ['name' => $project->name]);
        $project->delete();
        return redirect()->route('projects.index');
    }
}