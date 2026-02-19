<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class ProjectDeadlineReminder extends Notification
{
    use Queueable;

    protected $project;
    protected $days;

    public function __construct(Project $project, $days)
    {
        $this->project = $project;
        $this->days = $days;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $dueDate = $this->project->end_date 
            ? Carbon::parse($this->project->end_date)->format('F j, Y') 
            : 'Unknown';
        
        $startDate = $this->project->start_date 
            ? Carbon::parse($this->project->start_date)->format('F j, Y') 
            : 'Unknown';
        
        $daysLeft = $this->days === 'today' ? 0 : ($this->days === 'overdue' ? -1 : (int)$this->days);
        
        // Determine the type and message based on days left
        if ($this->days === 'overdue' || $daysLeft < 0) {
            // OVERDUE - Due date has passed
            $type = 'overdue';
            $message = "🔴 CRITICAL: Your project \"{$this->project->name}\" is OVERDUE!\nIt was due on {$dueDate}. Please take immediate action.";
            
        } elseif ($this->days === 'today' || $daysLeft === 0) {
            // DUE TODAY - Red alert
            $type = 'overdue';
            $message = "⚠️ URGENT: Your project \"{$this->project->name}\" is due TODAY!\nStarted: {$startDate} | Due: {$dueDate}\nPlease submit it before the deadline.";
            
        } elseif ($daysLeft === 1) {
            // 1 DAY LEFT - Orange alert
            $type = 'upcoming_deadline';
            $message = "⏰ URGENT: Your project \"{$this->project->name}\" is due TOMORROW!\nStarted: {$startDate} | Due: {$dueDate}\nYou have 1 day left to complete it.";
            
        } elseif ($daysLeft === 2) {
            // 2 DAYS LEFT - Orange alert
            $type = 'upcoming_deadline';
            $message = "⏰ REMINDER: Your project \"{$this->project->name}\" is due in 2 days.\nStarted: {$startDate} | Due: {$dueDate}\nPlease make sure to complete it on time.";
            
        } elseif ($daysLeft === 3) {
            // 3 DAYS LEFT - Yellow alert
            $type = 'upcoming_deadline';
            $message = "🔔 REMINDER: Your project \"{$this->project->name}\" is due in 3 days.\nStarted: {$startDate} | Due: {$dueDate}\nPlease make sure to complete it on time.";
            
        } else {
            // General reminder
            $type = 'upcoming_deadline';
            $message = "📅 Your project \"{$this->project->name}\" is due in {$daysLeft} days.\nStarted: {$startDate} | Due: {$dueDate}";
        }

        return [
            'type' => $type,
            'message' => $message,
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'project_description' => $this->project->description,
            'start_date' => $startDate,
            'due_date' => $dueDate,
            'days_left' => $daysLeft,
            'status' => $this->project->status,
            'is_overdue' => $daysLeft < 0,
        ];
    }
}