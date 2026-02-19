<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DailyTaskDigest extends Command
{
    protected $signature = 'tasks:daily-digest';
    protected $description = 'Send daily digest of upcoming tasks';

    public function handle()
    {
        $this->info('Sending daily task digest...');

        $users = User::whereHas('tasks', function ($query) {
            $query->whereBetween('due_date', [
                Carbon::today(),
                Carbon::today()->addDays(2)
            ])->whereNotIn('status', ['completed', 'done']);
        })->get();

        foreach ($users as $user) {
            $upcomingTasks = Task::where('assigned_to', $user->id)
                ->whereBetween('due_date', [
                    Carbon::today(),
                    Carbon::today()->addDays(2)
                ])
                ->whereNotIn('status', ['completed', 'done'])
                ->with('project')
                ->get();

            if ($upcomingTasks->count() > 0) {
                $user->notifications()->create([
                    'id' => \Illuminate\Support\Str::uuid(),
                    'type' => 'App\\Notifications\\TaskDigest',
                    'data' => json_encode([
                        'type' => 'daily_digest',
                        'message' => "You have {$upcomingTasks->count()} tasks due in the next 2 days",
                        'tasks' => $upcomingTasks->map(fn($task) => [
                            'title' => $task->title,
                            'due_date' => $task->due_date->format('M d, Y'),
                            'project' => $task->project?->name
                        ])
                    ]),
                ]);
                
                $this->info("  - Sent digest to: {$user->email}");
            }
        }

        $this->info('Daily digest completed!');
        return Command::SUCCESS;
    }
}