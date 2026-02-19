<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import KanbanBoard from '@/Components/KanbanBoard.vue';
import { ref } from 'vue';

defineProps({
    tasks: Array,
});

const viewMode = ref('list'); // 'list' or 'kanban'
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
            >
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                >
                    <div class="p-6 text-gray-900 dark:text-gray-100">

                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-lg font-medium">My Tasks</h3>
                            <div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex">
                                <button 
                                    @click="viewMode = 'list'"
                                    class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                    :class="viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'"
                                >
                                    List
                                </button>
                                <button 
                                    @click="viewMode = 'kanban'"
                                    class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                    :class="viewMode === 'kanban' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'"
                                >
                                    Kanban
                                </button>
                            </div>
                        </div>
                        
                        <div v-if="tasks.length === 0" class="text-gray-500">
                            You have no pending tasks. <Link :href="route('projects.index')" class="text-indigo-600 hover:underline">View Projects</Link>
                        </div>

                        <div v-else-if="viewMode === 'list'" class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="task in tasks" :key="task.id">
                                        <td class="px-6 py-4 whitespace-nowrap">{{ task.title }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ task.project?.name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                :class="{
                                                    'bg-gray-100 text-gray-800': task.status === 'not_started',
                                                    'bg-yellow-100 text-yellow-800': task.status === 'in_progress',
                                                    'bg-red-100 text-red-800': task.status === 'blocked',
                                                }">
                                                {{ task.status.replace('_', ' ') }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {{ task.due_date || '-' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link :href="route('tasks.edit', task.id)" class="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-else-if="viewMode === 'kanban'">
                            <KanbanBoard :tasks="tasks" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
