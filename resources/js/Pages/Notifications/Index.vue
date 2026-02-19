<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const props = defineProps({
    notifications: Object,
    unreadCount: Number,
});

const localUnreadCount = ref(props.unreadCount);
const processing = ref(false);

// Filter notifications by type
const overdueNotifications = computed(() => {
    return props.notifications.data.filter(n => n.data.type === 'overdue');
});

const upcomingDeadlineNotifications = computed(() => {
    return props.notifications.data.filter(n => n.data.type === 'upcoming_deadline');
});

const generalNotifications = computed(() => {
    return props.notifications.data.filter(n => n.data.type !== 'overdue' && n.data.type !== 'upcoming_deadline');
});

// Mark single notification as read using Inertia visit (AJAX-like)
const markAsRead = (notificationId) => {
    processing.value = true;
    
    Inertia.post(route('notifications.read', notificationId), {}, {
        preserveState: true,
        replace: true,
        onSuccess: () => {
            localUnreadCount.value = Math.max(0, localUnreadCount.value - 1);
            const notification = props.notifications.data.find(n => n.id === notificationId);
            if (notification && !notification.read_at) {
                notification.read_at = new Date().toISOString();
            }
            processing.value = false;
        },
        onError: () => {
            processing.value = false;
        }
    });
};

// Mark all notifications as read using Inertia visit (AJAX-like)
const markAll = () => {
    if (localUnreadCount.value === 0) return;
    
    processing.value = true;
    
    Inertia.post(route('notifications.read-all'), {}, {
        preserveState: true,
        replace: true,
        onSuccess: () => {
            localUnreadCount.value = 0;
            props.notifications.data.forEach(n => {
                if (!n.read_at) {
                    n.read_at = new Date().toISOString();
                }
            });
            processing.value = false;
        },
        onError: () => {
            processing.value = false;
        }
    });
};

// Format relative time
const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

// Get notification icon based on type
const getNotificationIcon = (type) => {
    switch (type) {
        case 'overdue':
            return '⚠️';
        case 'upcoming_deadline':
            return '⏰';
        default:
            return '🔔';
    }
};
</script>

<template>
    <Head title="Notifications" />
    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Notifications</h2>
                <button 
                    v-if="localUnreadCount > 0" 
                    @click="markAll" 
                    :disabled="processing"
                    class="text-sm text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ processing ? 'Marking...' : 'Mark all as read' }}
                </button>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <!-- Overdue Tasks Alert Section -->
                <div v-if="overdueNotifications.length > 0" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden">
                    <div class="bg-red-100 dark:bg-red-900/40 px-4 py-3 flex items-center gap-2">
                        <span class="text-red-600 dark:text-red-400 text-lg">⚠️</span>
                        <h3 class="font-semibold text-red-800 dark:text-red-200">Overdue Tasks - Action Required</h3>
                        <span class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {{ overdueNotifications.length }} overdue
                        </span>
                    </div>
                    <div class="divide-y divide-red-200 dark:divide-red-800">
                        <div v-for="n in overdueNotifications" :key="n.id"
                            class="p-4 flex items-start gap-3"
                            :class="n.read_at ? 'opacity-60' : ''"
                        >
                            <div class="flex-shrink-0 mt-1 text-red-500 text-xl">
                                {{ getNotificationIcon(n.data.type) }}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ n.data.message }}</p>
                                <p class="text-xs text-red-600 dark:text-red-400 mt-1">
                                    Due: {{ n.data.due_date || 'Not specified' }}
                                </p>
                                <p class="text-xs text-red-500 mt-1">{{ formatRelativeTime(n.created_at) }}</p>
                            </div>
                            <button 
                                v-if="!n.read_at" 
                                @click="markAsRead(n.id)"
                                :disabled="processing"
                                class="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {{ processing ? '...' : 'Mark done' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Deadlines Section -->
                <div v-if="upcomingDeadlineNotifications.length > 0" class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg overflow-hidden">
                    <div class="bg-orange-100 dark:bg-orange-900/40 px-4 py-3 flex items-center gap-2">
                        <span class="text-orange-600 dark:text-orange-400 text-lg">⏰</span>
                        <h3 class="font-semibold text-orange-800 dark:text-orange-200">Upcoming Deadlines</h3>
                        <span class="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            {{ upcomingDeadlineNotifications.length }} upcoming
                        </span>
                    </div>
                    <div class="divide-y divide-orange-200 dark:divide-orange-800">
                        <div v-for="n in upcomingDeadlineNotifications" :key="n.id"
                            class="p-4 flex items-start gap-3"
                            :class="n.read_at ? 'opacity-60' : ''"
                        >
                            <div class="flex-shrink-0 mt-1 text-orange-500 text-xl">
                                {{ getNotificationIcon(n.data.type) }}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ n.data.message }}</p>
                                <p class="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                    Due: {{ n.data.due_date || 'Not specified' }}
                                </p>
                                <p class="text-xs text-orange-500 mt-1">{{ formatRelativeTime(n.created_at) }}</p>
                            </div>
                            <button 
                                v-if="!n.read_at" 
                                @click="markAsRead(n.id)"
                                :disabled="processing"
                                class="text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {{ processing ? '...' : 'Acknowledge' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- General Notifications -->
                <div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex items-center gap-2">
                        <span class="text-gray-600 dark:text-gray-400 text-lg">📋</span>
                        <h3 class="font-semibold text-gray-800 dark:text-gray-200">All Notifications</h3>
                    </div>
                    
                    <div v-if="generalNotifications.length === 0 && overdueNotifications.length === 0 && upcomingDeadlineNotifications.length === 0" class="p-6 text-gray-500 text-center">
                        No notifications yet.
                    </div>
                    
                    <div v-for="n in generalNotifications" :key="n.id"
                        class="p-4 flex items-start gap-3"
                        :class="n.read_at ? '' : 'bg-indigo-50 dark:bg-indigo-900/20'"
                    >
                        <div class="flex-shrink-0 mt-1">
                            <span class="text-xl">{{ getNotificationIcon(n.data.type) }}</span>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-900 dark:text-gray-100">{{ n.data.message }}</p>
                            <p class="text-xs text-gray-500 mt-1">{{ formatRelativeTime(n.created_at) }}</p>
                        </div>
                        <button 
                            v-if="!n.read_at" 
                            @click="markAsRead(n.id)"
                            :disabled="processing"
                            class="text-xs text-indigo-600 hover:underline flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ processing ? '...' : 'Mark read' }}
                        </button>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-4 flex justify-center gap-2" v-if="notifications.last_page > 1">
                    <Link v-for="link in notifications.links" :key="link.label"
                        :href="link.url || '#'"
                        class="px-3 py-1 text-sm rounded border"
                        :class="link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
                        v-html="link.label"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
