<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Column;
use App\Models\Task;

class InitializeProjectColumnsSeeder extends Seeder
{
    public function run()
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            $columnMapping = [
                'not_started' => 'To Do',
                'in_progress' => 'In Progress',
                'completed'   => 'Done',
                'blocked'     => 'Blocked',
            ];

            $order = 0;
            $createdColumns = [];

            foreach ($columnMapping as $status => $name) {
                $column = Column::updateOrCreate(
                    ['project_id' => $project->id, 'slug' => $status],
                    ['name' => $name, 'order' => $order++]
                );
                $createdColumns[$status] = $column->id;
            }

            // Migrate existing tasks for this project
            Task::where('project_id', $project->id)
                ->whereNull('column_id')
                ->each(function ($task) use ($createdColumns) {
                    if (isset($createdColumns[$task->status])) {
                        $task->update(['column_id' => $createdColumns[$task->status]]);
                    } else {
                        // Fallback to 'not_started' column if status is unknown
                        $task->update(['column_id' => $createdColumns['not_started']]);
                    }
                });
        }
    }
}
