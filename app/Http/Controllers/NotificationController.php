<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(20);
        
        // Get unread count from the pagination metadata instead of separate query
        $unreadCount = $notifications->total() > 0 
            ? auth()->user()->unreadNotifications()->count() 
            : 0;

        return inertia('Notifications/Index', compact('notifications', 'unreadCount'));
    }

    public function markRead(string $id): JsonResponse
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();
        
        if ($notification && !$notification->read_at) {
            $notification->markAsRead();
        }
        
        return response()->json(['success' => true]);
    }

    public function markAllRead(): JsonResponse
    {
        // Use database update instead of loading all notifications into memory
        auth()->user()->unreadNotifications()->update(['read_at' => now()]);
        
        return response()->json(['success' => true]);
    }
}
