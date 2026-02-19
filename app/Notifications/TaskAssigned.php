<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TaskAssigned extends Notification
{
    use Queueable;

    public function __construct(public Task $task, public ?string $assignedBy = null) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        $message = $this->assignedBy 
            ? "{$this->assignedBy} assigned you a new task: \"{$this->task->title}\""
            : "New task assigned: \"{$this->task->title}\"";

        return [
            'task_id'      => $this->task->id,
            'task_title'   => $this->task->title,
            'project'      => $this->task->project->name,
            'project_id'   => $this->task->project_id,
            'description'  => $this->task->description,
            'due_date'     => $this->task->due_date,
            'priority'     => $this->task->priority,
            'type'         => 'task_assigned',
            'message'      => $message,
        ];
    }
}
