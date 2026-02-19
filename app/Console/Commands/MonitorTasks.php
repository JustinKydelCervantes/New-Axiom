<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Models\User;
use App\Notifications\TaskReminderNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MonitorTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:monitor';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Monitor tasks for upcoming and overdue deadlines';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting task monitoring...');

        // Check for OVERDUE tasks
        $overdueTasks = Task::where('due_date', '<', Carbon::now())
            ->whereNotIn('status', ['completed', 'done', 'cancelled'])
            ->with(['assignedUser', 'project'])
            ->get();

        $this->info("Found {$overdueTasks->count()} overdue tasks");

        foreach ($overdueTasks as $task) {
            if ($task->assignedUser) {
                // Send notification logic here
                $this->info("  - Task #{$task->id}: {$task->title} is overdue");
            }
        }

        // Check for UPCOMING tasks (due in next 24 hours)
        $upcomingTasks = Task::whereBetween('due_date', [
                Carbon::now(),
                Carbon::now()->addHours(24)
            ])
            ->whereNotIn('status', ['completed', 'done', 'cancelled'])
            ->with(['assignedUser', 'project'])
            ->get();

        $this->info("Found {$upcomingTasks->count()} upcoming tasks");

        foreach ($upcomingTasks as $task) {
            if ($task->assignedUser) {
                // Send notification logic here
                $this->info("  - Task #{$task->id}: {$task->title} is due soon");
            }
        }

        $this->info('Task monitoring completed!');
        return Command::SUCCESS;
    }
}