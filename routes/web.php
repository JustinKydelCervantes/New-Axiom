<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
    'tasks' => \App\Models\Task::where('assigned_to', auth()->id())
    ->whereIn('status', ['not_started', 'in_progress', 'blocked', 'overdue'])
    ->with('project')
    ->orderByRaw("CASE WHEN status = 'overdue' THEN 0 ELSE 1 END")
    ->orderBy('due_date')
    ->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');

    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::get('/projects/{project}/kanban', [\App\Http\Controllers\ProjectController::class , 'kanban'])->name('projects.kanban');
    Route::resource('project-members', \App\Http\Controllers\ProjectMemberController::class)->only(['store', 'destroy']);
    Route::resource('tasks', \App\Http\Controllers\TaskController::class);
    Route::patch('/tasks/{task}/status', [\App\Http\Controllers\TaskController::class , 'updateStatus'])->name('tasks.update-status');

    // Task Comments
    Route::post('/tasks/{task}/comments', [\App\Http\Controllers\TaskCommentController::class , 'store'])->name('task-comments.store');
    Route::delete('/comments/{comment}', [\App\Http\Controllers\TaskCommentController::class , 'destroy'])->name('task-comments.destroy');

    // Notifications
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class , 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class , 'markRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class , 'markAllRead'])->name('notifications.read-all');

    // Time Logs
    Route::post('/tasks/{task}/time-logs', [\App\Http\Controllers\TimeLogController::class , 'store'])->name('time-logs.store');
    Route::delete('/time-logs/{timeLog}', [\App\Http\Controllers\TimeLogController::class , 'destroy'])->name('time-logs.destroy');

    // Reports
    Route::get('/reports/workload', [\App\Http\Controllers\ReportController::class , 'workload'])->name('reports.workload');
    Route::get('/reports/analytics', [\App\Http\Controllers\ReportController::class , 'analytics'])->name('reports.analytics');

    // Gantt
    Route::get('/projects/{project}/gantt', [\App\Http\Controllers\ProjectController::class , 'gantt'])->name('projects.gantt');

    // Activity Logs
    Route::get('/activity', [\App\Http\Controllers\ActivityLogController::class , 'index'])->name('activity.index');
    // Column WIP Limits
    Route::patch('/columns/{column}/wip-limit', [\App\Http\Controllers\ColumnController::class , 'updateWipLimit'])->name('columns.update-wip-limit');
});

require __DIR__ . '/auth.php';
