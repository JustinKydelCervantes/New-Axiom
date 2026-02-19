<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDueSoon extends Notification
{
    use Queueable;

    public function __construct(public Task $task) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        return [
            'task_id'    => $this->task->id,
            'task_title' => $this->task->title,
            'project'    => $this->task->project->name,
            'due_date'   => $this->task->due_date,
            'type'       => 'due_soon',
            'message'    => "Task \"{$this->task->title}\" is due soon ({$this->task->due_date}).",
        ];
    }
}
