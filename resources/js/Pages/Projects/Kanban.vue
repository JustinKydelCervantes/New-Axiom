<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import KanbanBoard from '@/Components/KanbanBoard.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    project: Object,
});
</script>

<template>
    <Head :title="project.name + ' - Kanban'" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {{ project.name }} - Kanban Board
                </h2>
                <div class="space-x-2">
                    <Link :href="route('projects.show', project.id)" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm">
                        List View
                    </Link>
                    <Link :href="route('tasks.create', { project_id: project.id })" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm">
                        Create Task
                    </Link>
                </div>
            </div>
        </template>

        <div class="py-12 h-screen">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
                <KanbanBoard :tasks="project.tasks" :projectId="project.id" :initial-columns="project.columns" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>

