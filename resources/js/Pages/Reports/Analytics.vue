<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, Link } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

const props = defineProps({
    totalTasks: Number,
    completedTasks: Number,
    overdueTasks: Number,
    byStatus: Object,
    byPriority: Object,
    completionRate: Number,
    recentActivity: Object,
    workload: Object,
    search: String,
    taskSearch: String,
});

const searchTerm = ref(props.search || '');
const taskSearchTerm = ref(props.taskSearch || '');

// Custom debounce implementation
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const performSearch = debounce((value) => {
    router.get(route('reports.analytics'), { 
        search: value,
        task_search: taskSearchTerm.value 
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['workload', 'search']
    });
}, 150);

const performTaskSearch = debounce((value) => {
    router.get(route('reports.analytics'), { 
        search: searchTerm.value,
        task_search: value 
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['recentActivity', 'taskSearch']
    });
}, 150);

watch(searchTerm, (value) => {
    performSearch(value);
});

watch(taskSearchTerm, (value) => {
    performTaskSearch(value);
});
</script>

<template>
    <Head title="Analytics" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Analytics & Reports</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{{ totalTasks }}</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                        <p class="text-3xl font-bold text-green-600 mt-1">{{ completedTasks }}</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
                        <p class="text-3xl font-bold text-red-600 mt-1">{{ overdueTasks }}</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
                        <p class="text-3xl font-bold text-indigo-600 mt-1">{{ completionRate }}%</p>
                        <div class="mt-2 bg-gray-200 rounded-full h-2">
                            <div class="bg-indigo-500 h-2 rounded-full" :style="{ width: completionRate + '%' }"></div>
                        </div>
                    </div>
                </div>

                <!-- By Status & Priority -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tasks by Status</h3>
                        <div class="space-y-3">
                            <div v-for="(count, status) in byStatus" :key="status" class="flex items-center gap-3">
                                <span class="text-sm text-gray-600 dark:text-gray-400 w-28 capitalize">{{ status.replace('_', ' ') }}</span>
                                <div class="flex-1 bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full"
                                        :class="{
                                            'bg-gray-400': status === 'not_started',
                                            'bg-yellow-400': status === 'in_progress',
                                            'bg-green-500': status === 'completed',
                                            'bg-red-400': status === 'blocked',
                                        }"
                                        :style="{ width: totalTasks > 0 ? (count / totalTasks * 100) + '%' : '0%' }">
                                    </div>
                                </div>
                                <span class="text-sm font-medium w-8 text-right">{{ count }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tasks by Priority</h3>
                        <div class="space-y-3">
                            <div v-for="(count, priority) in byPriority" :key="priority" class="flex items-center gap-3">
                                <span class="text-sm text-gray-600 dark:text-gray-400 w-16 capitalize">{{ priority }}</span>
                                <div class="flex-1 bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full"
                                        :class="{
                                            'bg-gray-400': priority === 'low',
                                            'bg-blue-400': priority === 'medium',
                                            'bg-orange-400': priority === 'high',
                                            'bg-red-500': priority === 'urgent',
                                        }"
                                        :style="{ width: totalTasks > 0 ? (count / totalTasks * 100) + '%' : '0%' }">
                                    </div>
                                </div>
                                <span class="text-sm font-medium w-8 text-right">{{ count }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 class="font-semibold text-gray-900 dark:text-gray-100">Recently Updated Tasks (Last 7 Days)</h3>
                        
                        <!-- Search Tasks -->
                        <div class="relative w-full md:w-64">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                v-model="taskSearchTerm"
                                type="text" 
                                placeholder="Search task..." 
                                class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                        <div v-if="recentActivity.data.length === 0" class="py-4 text-gray-500 text-sm">No recent activity matching your search.</div>
                        <div v-for="task in recentActivity.data" :key="task.id" class="py-3 flex justify-between items-center">
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ task.title }}</p>
                                <p class="text-xs text-gray-500">{{ task.project?.name }} · {{ task.assignee?.name || 'Unassigned' }}</p>
                            </div>
                            <span class="text-xs px-2 py-1 rounded-full"
                                :class="{
                                    'bg-gray-100 text-gray-700': task.status === 'not_started',
                                    'bg-yellow-100 text-yellow-700': task.status === 'in_progress',
                                    'bg-green-100 text-green-700': task.status === 'completed',
                                    'bg-red-100 text-red-700': task.status === 'blocked',
                                }">
                                {{ task.status.replace('_', ' ') }}
                            </span>
                        </div>
                    </div>

                    <!-- Task Pagination -->
                    <div v-if="recentActivity.links.length > 3" class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <Link 
                                v-if="recentActivity.prev_page_url" 
                                :href="recentActivity.prev_page_url" 
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Previous
                            </Link>
                            <Link 
                                v-if="recentActivity.next_page_url" 
                                :href="recentActivity.next_page_url" 
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Next
                            </Link>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span class="font-medium">{{ recentActivity.from }}</span> to <span class="font-medium">{{ recentActivity.to }}</span> of <span class="font-medium">{{ recentActivity.total }}</span> results
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <template v-for="(link, key) in recentActivity.links" :key="key">
                                        <div v-if="link.url === null" 
                                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md"
                                            :class="{'rounded-l-md': key === 0, 'rounded-r-md': key === recentActivity.links.length - 1}"
                                            v-html="link.label"
                                        />
                                        <Link v-else
                                            :href="link.url"
                                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors"
                                            :class="[
                                                link.active ? 'z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                                                key === 0 ? 'rounded-l-md' : '',
                                                key === recentActivity.links.length - 1 ? 'rounded-r-md' : ''
                                            ]"
                                            v-html="link.label"
                                        />
                                    </template>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Workload Management -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 class="font-semibold text-gray-900 dark:text-gray-100">Workload Management</h3>
                        
                        <!-- Search Employee -->
                        <div class="relative w-full md:w-64">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                v-model="searchTerm"
                                type="text" 
                                placeholder="Search employee..." 
                                class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Employee</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center">Total</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center">In Progress</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center">Overdue</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Load Status</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-if="workload.data.length === 0">
                                    <td colspan="5" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400">No employees found matching your search.</td>
                                </tr>
                                <tr v-for="user in workload.data" :key="user.id">
                                    <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{{ user.name }}</td>
                                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">{{ user.total_tasks }}</td>
                                    <td class="px-6 py-4 text-yellow-600 text-center font-semibold">{{ user.in_progress_tasks }}</td>
                                    <td class="px-6 py-4 text-red-600 text-center font-semibold">{{ user.overdue_tasks }}</td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[100px]">
                                                <div class="h-2 rounded-full"
                                                    :class="{
                                                        'bg-green-500': user.total_tasks <= 5,
                                                        'bg-yellow-500': user.total_tasks > 5 && user.total_tasks <= 8,
                                                        'bg-red-500': user.total_tasks > 8
                                                    }"
                                                    :style="{ width: Math.min((user.total_tasks / 10) * 100, 100) + '%' }">
                                                </div>
                                            </div>
                                            <span class="text-xs font-medium whitespace-nowrap" 
                                                :class="{
                                                    'text-red-600': user.total_tasks > 8,
                                                    'text-yellow-600': user.total_tasks > 5 && user.total_tasks <= 8,
                                                    'text-green-600': user.total_tasks <= 5
                                                }">
                                                {{ user.total_tasks > 8 ? 'Overloaded' : user.total_tasks > 5 ? 'High Load' : 'Balanced' }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="workload.links.length > 3" class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <Link 
                                v-if="workload.prev_page_url" 
                                :href="workload.prev_page_url" 
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Previous
                            </Link>
                            <Link 
                                v-if="workload.next_page_url" 
                                :href="workload.next_page_url" 
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Next
                            </Link>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span class="font-medium">{{ workload.from }}</span> to <span class="font-medium">{{ workload.to }}</span> of <span class="font-medium">{{ workload.total }}</span> results
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <template v-for="(link, key) in workload.links" :key="key">
                                        <div v-if="link.url === null" 
                                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md"
                                            :class="{'rounded-l-md': key === 0, 'rounded-r-md': key === workload.links.length - 1}"
                                            v-html="link.label"
                                        />
                                        <Link v-else
                                            :href="link.url"
                                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors"
                                            :class="[
                                                link.active ? 'z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                                                key === 0 ? 'rounded-l-md' : '',
                                                key === workload.links.length - 1 ? 'rounded-r-md' : ''
                                            ]"
                                            v-html="link.label"
                                        />
                                    </template>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>
