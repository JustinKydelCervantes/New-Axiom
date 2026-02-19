<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TaskDeadlineReminder extends Notification
{
    use Queueable;

    public function __construct(
        public Task $task,
        public int $daysRemaining
    ) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        $dueDate = \Carbon\Carbon::parse($this->task->due_date)->format('F j, Y');
        $startDate = \Carbon\Carbon::parse($this->task->start_date)->format('F j, Y');
        
        if ($this->daysRemaining < 0) {
            // Overdue
            $message = "🔴 CRITICAL: Your task \"{$this->task->title}\" is OVERDUE! It was due on {$dueDate}. Please complete it immediately.";
            $type = 'overdue';
            $timeRemaining = 'Overdue';
        } elseif ($this->daysRemaining === 0) {
            // Due today
            $message = "⚠️ Alert: Your task \"{$this->task->title}\" is due today! Please submit it before the deadline.";
            $type = 'due_today';
            $timeRemaining = 'Due today';
        } else {
            // Upcoming (3 days)
            $message = "⏰ Reminder: Your task \"{$this->task->title}\" is due on {$dueDate}. You have {$this->daysRemaining} days left. Please make sure to complete it on time.";
            $type = 'upcoming_deadline';
            $timeRemaining = $this->daysRemaining . ' days left';
        }

        return [
            'type' => $type,
            'message' => $message,
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'task_description' => $this->task->description,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project?->name,
            'start_date' => $this->task->start_date,
            'start_date_formatted' => $startDate,
            'due_date' => $this->task->due_date,
            'due_date_formatted' => $dueDate,
            'days_remaining' => $this->daysRemaining,
            'time_remaining' => $timeRemaining,
            'priority' => $this->task->priority,
            'status' => $this->task->status,
        ];
    }
}
