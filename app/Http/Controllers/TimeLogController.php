<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Task;
use App\Models\TimeLog;
use Illuminate\Http\Request;

class TimeLogController extends Controller
{
    public function store(Request $request, Task $task)
    {
        $validated = $request->validate([
            'hours'       => 'required|numeric|min:0.1|max:24',
            'description' => 'nullable|string|max:500',
            'logged_at'   => 'required|date',
        ]);

        $log = $task->timeLogs()->create([
            'user_id'     => auth()->id(),
            'hours'       => $validated['hours'],
            'description' => $validated['description'] ?? null,
            'logged_at'   => $validated['logged_at'],
        ]);

        ActivityLog::record('time_logged', $task, ['hours' => $validated['hours']]);

        return back();
    }

    public function destroy(TimeLog $timeLog)
    {
        $timeLog->delete();
        return back();
    }
}
