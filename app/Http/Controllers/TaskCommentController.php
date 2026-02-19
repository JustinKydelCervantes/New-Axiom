<?php

namespace App\Http\Controllers;

use App\Events\CommentAdded;
use App\Models\Task;
use App\Models\TaskComment;
use Illuminate\Http\Request;

class TaskCommentController extends Controller
{
    public function store(Request $request, Task $task)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        $comment = $task->comments()->create([
            'user_id' => auth()->id(),
            'body'    => $validated['body'],
        ]);

        broadcast(new CommentAdded($comment))->toOthers();

        return back();
    }

    public function destroy(TaskComment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return back();
    }
}
