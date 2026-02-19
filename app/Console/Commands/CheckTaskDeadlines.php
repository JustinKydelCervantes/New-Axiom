<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Notifications\TaskDeadlineReminder;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckTaskDeadlines extends Command
{
    protected $signature = 'tasks:check-deadlines';
    protected $description = 'Check for approaching task deadlines and send reminders';

    public function handle()
    {
        $this->info('Checking task deadlines...');

        $today = Carbon::today();

        // Check for overdue tasks (past due date)
        $overdueTasks = Task::whereDate('due_date', '<', $today)
            ->whereNotNull('due_date')
            ->where('status', '!=', 'completed')
            ->get();

        $this->processTasks($overdueTasks, -1);

        // Check for tasks due today
        $dueTodayTasks = Task::whereDate('due_date', $today)
            ->whereNotNull('due_date')
            ->where('status', '!=', 'completed')
            ->get();

        $this->processTasks($dueTodayTasks, 0);

        // Check for tasks due in 3 days
        $upcomingTasks = Task::whereDate('due_date', $today->copy()->addDays(3))
            ->whereNotNull('due_date')
            ->where('status', '!=', 'completed')
            ->get();

        $this->processTasks($upcomingTasks, 3);

        $this->info('Task deadline check completed!');
        return Command::SUCCESS;
    }

    protected function processTasks($tasks, $daysRemaining)
    {
        foreach ($tasks as $task) {
            // Mark overdue tasks
            if ($daysRemaining < 0 && $task->status !== 'overdue') {
                $task->update(['status' => 'overdue']);
                $this->info("  - Marked task as overdue: {$task->title}");
            }

            // Notify the assignee
            if ($task->assigned_to) {
                $this->sendNotification($task->assigned_to, $task, $daysRemaining);
            }

            // Also notify the project owner
            if ($task->project && $task->project->owner_id) {
                $this->sendNotification($task->project->owner_id, $task, $daysRemaining);
            }
        }
    }

    protected function sendNotification($userId, $task, $daysRemaining)
    {
        $user = \App\Models\User::find($userId);
        if (!$user)
            return;

        // Check if already notified today for this specific reminder type
        $existing = $user->unreadNotifications()
            ->whereDate('created_at', Carbon::today())
            ->get()
            ->filter(function ($n) use ($task, $daysRemaining) {
            return isset($n->data['task_id']) &&
            $n->data['task_id'] == $task->id &&
            isset($n->data['days_remaining']) &&
            $n->data['days_remaining'] == $daysRemaining;
        })
            ->first();

        if (!$existing) {
            $user->notify(new TaskDeadlineReminder($task, $daysRemaining));

            $statusText = $daysRemaining < 0 ? 'OVERDUE' : ($daysRemaining === 0 ? 'DUE TODAY' : 'DUE IN 3 DAYS');
            $this->line("    - Sent {$statusText} reminder to: {$user->email} for task: {$task->title}");
        }
    }
}
