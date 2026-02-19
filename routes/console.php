<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use Illuminate\Support\Facades\Schedule;

Schedule::command('tasks:monitor')
    ->everyFifteenMinutes()
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/task-monitor.log'));

Schedule::command('projects:check-deadlines')
    ->dailyAt('08:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/project-deadlines.log'));

Schedule::command('notifications:cleanup --days=30')
    ->daily()
    ->appendOutputTo(storage_path('logs/notification-cleanup.log'));

Schedule::command('tasks:daily-digest')
    ->dailyAt('09:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/daily-digest.log'));
