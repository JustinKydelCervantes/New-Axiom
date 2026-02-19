<?php

namespace App\Events;

use App\Models\TaskComment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentAdded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public TaskComment $comment)
    {
        $this->comment->load('user');
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('project.' . $this->comment->task->project_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'comment.added';
    }

    public function broadcastWith(): array
    {
        return [
            'comment' => [
                'id'         => $this->comment->id,
                'task_id'    => $this->comment->task_id,
                'body'       => $this->comment->body,
                'user'       => $this->comment->user->only('id', 'name'),
                'created_at' => $this->comment->created_at->diffForHumans(),
            ],
        ];
    }
}
