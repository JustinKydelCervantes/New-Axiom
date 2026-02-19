<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskMoved implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Task $task,
        public string $oldStatus,
        public string $newStatus,
        public ?int $oldColumnId = null,
        public ?int $newColumnId = null
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('project.' . $this->task->project_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'task.moved';
    }

    public function broadcastWith(): array
    {
        return [
            'task_id'       => $this->task->id,
            'old_status'    => $this->oldStatus,
            'new_status'    => $this->newStatus,
            'old_column_id' => $this->oldColumnId,
            'new_column_id' => $this->newColumnId,
        ];
    }
}
