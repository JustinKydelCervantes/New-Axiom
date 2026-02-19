<?php

namespace Tests\Feature;

use App\Models\Column;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WipEnforcementTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $project;
    protected $column1;
    protected $column2;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->project = Project::create([
            'name' => 'WIP Test Project',
            'owner_id' => $this->user->id,
            'status' => 'active'
        ]);

        $this->column1 = Column::create([
            'project_id' => $this->project->id,
            'name' => 'To Do',
            'slug' => 'not_started',
            'order' => 0,
            'wip_limit' => 2
        ]);

        $this->column2 = Column::create([
            'project_id' => $this->project->id,
            'name' => 'In Progress',
            'slug' => 'in_progress',
            'order' => 1,
            'wip_limit' => 1
        ]);
    }

    public function test_can_move_task_to_column_under_wip_limit()
    {
        $task = Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 1',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->patchJson(route('tasks.update-status', $task->id), [
                'column_id' => $this->column2->id
            ]);

        $response->assertStatus(200);
        $this->assertEquals($this->column2->id, $task->fresh()->column_id);
    }

    public function test_cannot_move_task_to_column_at_wip_limit()
    {
        // Fill up column 2
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Existing Task',
            'status' => 'in_progress',
            'column_id' => $this->column2->id,
            'priority' => 'medium'
        ]);

        // Try to move another task to column 2
        $task2 = Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 2',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->patchJson(route('tasks.update-status', $task2->id), [
                'column_id' => $this->column2->id
            ]);

        $response->assertStatus(422);
        $response->assertJsonFragment(['error' => "This column has reached its Work In Progress (WIP) limit. Move or complete a task before adding another."]);
        $this->assertEquals($this->column1->id, $task2->fresh()->column_id);
    }

    public function test_cannot_update_task_to_column_at_wip_limit_via_general_update()
    {
        // Fill up column 2
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Existing Task',
            'status' => 'in_progress',
            'column_id' => $this->column2->id,
            'priority' => 'medium'
        ]);

        $task2 = Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 2',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('tasks.update', $task2->id), [
                'title' => 'Updated Task 2',
                'status' => 'in_progress', // This should map to column 2
                'priority' => 'high'
            ]);

        $response->assertSessionHasErrors(['status' => "This column has reached its Work In Progress (WIP) limit. Move or complete a task before adding another."]);
        $this->assertEquals($this->column1->id, $task2->fresh()->column_id);
    }

    public function test_cannot_create_task_in_column_at_wip_limit()
    {
        // Fill up column 2
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Existing Task',
            'status' => 'in_progress',
            'column_id' => $this->column2->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('tasks.store'), [
                'project_id' => $this->project->id,
                'title' => 'New Task',
                'status' => 'in_progress', // Maps to column 2
                'priority' => 'medium'
            ]);

        $response->assertSessionHasErrors(['status' => "Cannot create task. The '{$this->column2->name}' column has reached its Work In Progress (WIP) limit."]);
        $this->assertEquals(1, Task::where('column_id', $this->column2->id)->count());
    }

    public function test_unlimited_wip_allows_any_number_of_tasks()
    {
        $column3 = Column::create([
            'project_id' => $this->project->id,
            'name' => 'Done',
            'slug' => 'completed',
            'order' => 2,
            'wip_limit' => null // Unlimited
        ]);

        // Create many tasks in column 3
        for ($i = 0; $i < 5; $i++) {
            Task::create([
                'project_id' => $this->project->id,
                'title' => "Task $i",
                'status' => 'completed',
                'column_id' => $column3->id,
                'priority' => 'medium'
            ]);
        }

        $task = Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task to Move',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->patchJson(route('tasks.update-status', $task->id), [
                'column_id' => $column3->id
            ]);

        $response->assertStatus(200);
        $this->assertEquals($column3->id, $task->fresh()->column_id);
    }

    public function test_wip_limit_ignored_for_done_column()
    {
        $columnDone = Column::create([
            'project_id' => $this->project->id,
            'name' => 'Done',
            'slug' => 'completed',
            'order' => 2,
            'wip_limit' => 1 // Should be ignored
        ]);

        // Fill up column Done
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Existing Task',
            'status' => 'completed',
            'column_id' => $columnDone->id,
            'priority' => 'medium'
        ]);

        // Try to move another task to column Done
        $task2 = Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 2',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($this->user)
            ->patchJson(route('tasks.update-status', $task2->id), [
                'column_id' => $columnDone->id
            ]);

        $response->assertStatus(200);
        $this->assertEquals($columnDone->id, $task2->fresh()->column_id);
    }

    public function test_wip_limit_ignored_for_blocked_column()
    {
        $columnBlocked = Column::create([
            'project_id' => $this->project->id,
            'name' => 'Blocked',
            'slug' => 'blocked',
            'order' => 3,
            'wip_limit' => 1 // Should be ignored
        ]);

        // Fill up column Blocked
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Existing Task',
            'status' => 'blocked',
            'column_id' => $columnBlocked->id,
            'priority' => 'medium'
        ]);

        // Try to create task in column Blocked
        $response = $this->actingAs($this->user)
            ->post(route('tasks.store'), [
                'project_id' => $this->project->id,
                'title' => 'New Task',
                'status' => 'blocked',
                'priority' => 'medium'
            ]);

        $response->assertSessionHasNoErrors();
        $this->assertEquals(2, Task::where('column_id', $columnBlocked->id)->count());
    }

    public function test_cannot_set_wip_limit_below_current_task_count()
    {
        // Fill up column 1 (currently has wip_limit 2, but we'll add 3 tasks)
        // Actually setUp creates column1 with wip_limit 2.
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 1',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 2',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);
        Task::create([
            'project_id' => $this->project->id,
            'title' => 'Task 3',
            'status' => 'not_started',
            'column_id' => $this->column1->id,
            'priority' => 'medium'
        ]);

        $taskCount = $this->column1->tasks()->count();
        $this->assertEquals(3, $taskCount);

        // Try to set WIP limit to 2
        $response = $this->actingAs($this->user)
            ->patchJson(route('columns.update-wip-limit', $this->column1->id), [
                'wip_limit' => 2
            ]);

        $response->assertStatus(422);
        $response->assertJsonFragment(['message' => "Cannot set WIP limit below current task count (3)."]);
        
        $this->assertEquals(2, $this->column1->fresh()->wip_limit);
    }
}
