<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Public channel for project updates (all authenticated users can listen)
Broadcast::channel('project.{projectId}', function ($user, $projectId) {
    return \App\Models\ProjectMember::where('project_id', $projectId)
        ->where('user_id', $user->id)
        ->exists()
        || \App\Models\Project::where('id', $projectId)
            ->where('owner_id', $user->id)
            ->exists();
});
