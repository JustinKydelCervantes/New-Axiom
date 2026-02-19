<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    workload: Array,
});
</script>

<template>
    <Head title="Workload Report" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Team Workload</h2>
        </template>

        <div class="py-12">
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Employee</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total Tasks</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">In Progress</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Overdue</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Load</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr v-for="user in workload" :key="user.id">
                                <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</td>
                                <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ user.total_tasks }}</td>
                                <td class="px-6 py-4 text-yellow-600">{{ user.in_progress_tasks }}</td>
                                <td class="px-6 py-4 text-red-600">{{ user.overdue_tasks }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <div class="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                                            <div class="bg-indigo-500 h-2 rounded-full"
                                                :style="{ width: Math.min((user.total_tasks / 10) * 100, 100) + '%' }">
                                            </div>
                                        </div>
                                        <span class="text-xs" :class="user.total_tasks > 8 ? 'text-red-600 font-bold' : 'text-gray-500'">
                                            {{ user.total_tasks > 8 ? 'Overloaded' : user.total_tasks > 5 ? 'Busy' : 'OK' }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
