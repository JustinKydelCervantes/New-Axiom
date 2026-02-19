<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Column;
use App\Exceptions\WipLimitReachedException;
use App\Events\TaskUpdated;
use App\Events\TaskMoved;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Tasks are viewed via Projects
        return redirect()->route('projects.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(\Illuminate\Http\Request $request)
    {
        $project_id = $request->input('project_id');
        $project = \App\Models\Project::with('members.user')->findOrFail($project_id);
        
        return inertia('Tasks/Create', [
            'project' => $project,
            'members' => $project->members->map(fn($m) => $m->user),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,completed,blocked',
            'priority' => 'required|in:low,medium,high,urgent',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $column = Column::where('project_id', $validated['project_id'])
            ->where('slug', $validated['status'])
            ->first();

        if ($column && $column->wip_limit !== null && in_array($column->slug, ['not_started', 'in_progress'])) {
            $count = $column->tasks()->count();
            if ($count >= $column->wip_limit) {
                return back()->withErrors(['status' => "Cannot create task. The '{$column->name}' column has reached its Work In Progress (WIP) limit."]);
            }
        }

        $taskData = $validated;
        if ($column) {
            $taskData['column_id'] = $column->id;
        }

        \App\Models\Task::create($taskData);

        return redirect()->route('projects.show', $validated['project_id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(\App\Models\Task $task)
    {
        return inertia('Tasks/Show', ['task' => $task->load('project', 'assignee')]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(\App\Models\Task $task)
    {
        $project = $task->project->load('members.user');
        
        $availableTasks = \App\Models\Task::where('project_id', $task->project_id)
            ->where('id', '!=', $task->id)
            ->get();

        return inertia('Tasks/Edit', [
            'task'           => $task->load('dependencies', 'comments'),
            'project'        => $project,
            'members'        => $project->members->map(fn($m) => $m->user),
            'availableTasks' => $availableTasks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\Illuminate\Http\Request $request, \App\Models\Task $task)
    {
        $validated = $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,completed,blocked',
            'priority' => 'required|in:low,medium,high,urgent',
            'progress_percent' => 'integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:start_date',
            'dependencies' => 'nullable|array',
            'dependencies.*' => 'exists:tasks,id',
        ]);

        // Find the corresponding column
        $column = Column::where('project_id', $task->project_id)
            ->where('slug', $validated['status'])
            ->first();

        // WIP Limit Enforcement if status (and thus column) changes
        if ($column && $task->column_id !== $column->id && $column->wip_limit !== null && in_array($column->slug, ['not_started', 'in_progress'])) {
            $count = $column->tasks()->count();
            if ($count >= $column->wip_limit) {
                return back()->withErrors(['status' => "This column has reached its Work In Progress (WIP) limit. Move or complete a task before adding another."]);
            }
        }

        // Validation: Block start if dependencies not complete
        if (in_array($validated['status'], ['in_progress', 'completed']) && $task->status === 'not_started') {
            $incompleteDependencies = $task->dependencies()->where('status', '!=', 'completed')->exists();
            if ($incompleteDependencies) {
                return back()->withErrors(['status' => 'Cannot start task until all dependencies are completed.']);
            }
        }

        if ($validated['status'] === 'completed' && $task->status !== 'completed') {
            $validated['completed_at'] = now();
            $validated['progress_percent'] = 100;
        }

        $taskData = \Illuminate\Support\Arr::except($validated, ['dependencies']);
        if ($column) {
            $taskData['column_id'] = $column->id;
        }

        $task->update($taskData);

        if (isset($validated['dependencies'])) {
            $task->dependencies()->sync($validated['dependencies']);
        }

        broadcast(new TaskUpdated($task))->toOthers();

        return redirect()->route('projects.show', $task->project_id);
    }

    public function updateStatus(\Illuminate\Http\Request $request, \App\Models\Task $task)
    {
        $validated = $request->validate([
            'column_id' => 'required|exists:columns,id',
        ]);

        $column = Column::findOrFail($validated['column_id']);

        // WIP Limit Enforcement
        if ($column->wip_limit !== null && in_array($column->slug, ['not_started', 'in_progress'])) {
            // If the task is already in this column, we don't need to check WIP
            if ($task->column_id !== $column->id) {
                DB::transaction(function () use ($column) {
                    // PostgreSQL-safe locking: lock the column row itself to serialize WIP checks
                    $lockedColumn = Column::where('id', $column->id)->lockForUpdate()->first();
                    
                    $currentCount = $lockedColumn->tasks()->count();
                    if ($currentCount >= $lockedColumn->wip_limit) {
                        throw new WipLimitReachedException("This column has reached its Work In Progress (WIP) limit. Move or complete a task before adding another.");
                    }
                });
            }
        }

        $oldStatus = $task->status;
        $oldColumnId = $task->column_id;
        $task->column_id = $column->id;
        $task->status = $column->slug;

        if ($task->status === 'completed' && $oldStatus !== 'completed') {
            $task->completed_at = now();
            $task->progress_percent = 100;
        }

        $task->save();

        broadcast(new TaskMoved($task, $oldStatus, $task->status, $oldColumnId, $task->column_id))->toOthers();

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\App\Models\Task $task)
    {
        $projectId = $task->project_id;
        $task->delete();
        return redirect()->route('projects.show', $projectId);
    }
}
