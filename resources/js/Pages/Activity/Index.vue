<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    logs: Object,
});

const actionLabel = (action) => ({
    created: '✅ Created',
    updated: '✏️ Updated',
    deleted: '🗑️ Deleted',
    status_changed: '🔄 Status Changed',
    time_logged: '⏱️ Time Logged',
}[action] || action);

const subjectLabel = (type) => type?.split('\\').pop() || 'Unknown';
</script>

<template>
    <Head title="Activity Log" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Activity Log</h2>
        </template>

        <div class="py-12">
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden">
                    <div v-if="logs.data.length === 0" class="p-6 text-center text-gray-500">
                        No activity recorded yet.
                    </div>
                    <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                        <div v-for="log in logs.data" :key="log.id" class="p-4 flex items-start gap-4">
                            <div class="flex-shrink-0 text-lg">{{ actionLabel(log.action).split(' ')[0] }}</div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-900 dark:text-gray-100">
                                    <span class="font-medium">{{ log.user?.name || 'System' }}</span>
                                    {{ actionLabel(log.action).split(' ').slice(1).join(' ') }}
                                    <span class="text-indigo-600">{{ subjectLabel(log.subject_type) }}</span>
                                    <span v-if="log.changes?.name"> "{{ log.changes.name }}"</span>
                                </p>
                                <p class="text-xs text-gray-500 mt-1">{{ log.created_at }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-4 flex justify-center gap-1" v-if="logs.last_page > 1">
                    <a v-for="link in logs.links" :key="link.label"
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
