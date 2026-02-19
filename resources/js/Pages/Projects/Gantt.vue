<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    project: Object,
});

// Build a simple Gantt timeline
const tasks = computed(() => props.project.tasks);

const minDate = computed(() => {
    const dates = tasks.value
        .filter(t => t.start_date)
        .map(t => new Date(t.start_date));
    return dates.length ? new Date(Math.min(...dates)) : new Date();
});

const maxDate = computed(() => {
    const dates = tasks.value
        .filter(t => t.due_date)
        .map(t => new Date(t.due_date));
    return dates.length ? new Date(Math.max(...dates)) : new Date();
});

const totalDays = computed(() => {
    const diff = maxDate.value - minDate.value;
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1);
});

const getLeft = (task) => {
    if (!task.start_date) return 0;
    const diff = new Date(task.start_date) - minDate.value;
    return Math.max((diff / (1000 * 60 * 60 * 24)) / totalDays.value * 100, 0);
};

const getWidth = (task) => {
    if (!task.start_date || !task.due_date) return 5;
    const diff = new Date(task.due_date) - new Date(task.start_date);
    return Math.max((diff / (1000 * 60 * 60 * 24)) / totalDays.value * 100, 2);
};

const statusColor = (status) => ({
    'not_started': 'bg-gray-400',
    'in_progress': 'bg-blue-500',
    'completed': 'bg-green-500',
    'blocked': 'bg-red-500',
}[status] || 'bg-gray-400');
</script>

<template>
    <Head :title="'Gantt: ' + project.name" />
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-4">
                <Link :href="route('projects.show', project.id)" class="text-indigo-600 hover:underline text-sm">← Back</Link>
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Gantt: {{ project.name }}
                </h2>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">

                    <div v-if="tasks.length === 0" class="text-gray-500 text-center py-8">
                        No tasks with dates to display. Add start/due dates to tasks to see the Gantt chart.
                    </div>

                    <div v-else>
                        <!-- Legend -->
                        <div class="flex gap-4 mb-6 text-xs">
                            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-gray-400 inline-block"></span> Not Started</span>
                            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-blue-500 inline-block"></span> In Progress</span>
                            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-green-500 inline-block"></span> Completed</span>
                            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-red-500 inline-block"></span> Blocked</span>
                        </div>

                        <!-- Date range header -->
                        <div class="flex justify-between text-xs text-gray-500 mb-2 ml-48">
                            <span>{{ minDate.toLocaleDateString() }}</span>
                            <span>{{ maxDate.toLocaleDateString() }}</span>
                        </div>

                        <!-- Task rows -->
                        <div class="space-y-2">
                            <div v-for="task in tasks" :key="task.id" class="flex items-center gap-2">
                                <!-- Task name -->
                                <div class="w-48 flex-shrink-0 text-sm text-gray-700 dark:text-gray-300 truncate" :title="task.title">
                                    {{ task.title }}
                                </div>
                                <!-- Bar area -->
                                <div class="flex-1 relative h-7 bg-gray-100 dark:bg-gray-700 rounded">
                                    <div
                                        v-if="task.start_date || task.due_date"
                                        class="absolute top-1 h-5 rounded text-white text-xs flex items-center px-2 truncate cursor-default"
                                        :class="statusColor(task.status)"
                                        :style="{
                                            left: getLeft(task) + '%',
                                            width: getWidth(task) + '%',
                                            minWidth: '2%',
                                        }"
                                        :title="task.title + ' (' + (task.start_date || '?') + ' → ' + (task.due_date || '?') + ')'"
                                    >
                                        {{ task.assignee?.name || '' }}
                                    </div>
                                    <div v-else class="absolute inset-0 flex items-center px-2 text-xs text-gray-400">
                                        No dates set
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
