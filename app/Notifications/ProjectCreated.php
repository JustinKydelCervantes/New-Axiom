<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class ProjectCreated extends Notification
{
    use Queueable;

    protected $project;

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        // Format dates safely
        $startDate = $this->project->start_date ? Carbon::parse($this->project->start_date)->format('M d, Y') : null;
        $endDate = $this->project->end_date ? Carbon::parse($this->project->end_date)->format('M d, Y') : null;

        return [
            'type' => 'project_created',
            'message' => "📋 New project '{$this->project->name}' has been created",
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'project_description' => $this->project->description,
            'status' => $this->project->status,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'created_by' => auth()->user()?->name ?? 'System',
            'created_by_id' => auth()->id(),
        ];
    }
}