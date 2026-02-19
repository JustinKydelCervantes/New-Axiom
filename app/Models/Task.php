<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'assigned_to',
        'title',
        'description',
        'status',
        'priority',
        'progress_percent',
        'start_date',
        'due_date',
        'completed_at',
        'column_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function column()
    {
        return $this->belongsTo(Column::class);
    }

    public function dependencies()
    {
        return $this->belongsToMany(Task::class, 'task_dependencies', 'task_id', 'depends_on_task_id');
    }

    public function dependents()
    {
        return $this->belongsToMany(Task::class, 'task_dependencies', 'depends_on_task_id', 'task_id');
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class)->with('user')->latest();
    }

    public function timeLogs()
    {
        return $this->hasMany(TimeLog::class)->with('user')->latest();
    }
}
