<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    project: Object,
    users: Array,
});

const memberForm = useForm({
    project_id: props.project.id,
    user_id: '',
    role: 'member',
});

const addMember = () => {
    memberForm.post(route('project-members.store'), {
        preserveScroll: true,
        onSuccess: () => memberForm.reset('user_id', 'role'),
    });
};

const removeMember = (id) => {
    if (confirm('Are you sure you want to remove this member?')) {
        useForm({}).delete(route('project-members.destroy', id), {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head :title="project.name" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {{ project.name }}
                </h2>
                <div class="space-x-2">
                    <Link :href="route('projects.kanban', project.id)" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm">
                        Kanban Board
                    </Link>
                    <Link :href="route('projects.edit', project.id)" class="text-sm text-blue-600 hover:underline">Edit Project</Link>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <!-- Project Details -->
                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section>
                        <header>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Project Details</h2>
                        </header>
                        <div class="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                            <p><strong>Status:</strong> {{ project.status }}</p>
                            <p><strong>Description:</strong> {{ project.description || 'No description' }}</p>
                            <p><strong>Dates:</strong> {{ project.start_date || 'N/A' }} - {{ project.end_date || 'N/A' }}</p>
                            <p><strong>Owner:</strong> {{ project.owner.name }}</p>
                        </div>
                    </section>
                </div>

                <!-- Tasks -->
                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section>
                        <header class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tasks</h2>
                            <Link :href="route('tasks.create', { project_id: project.id })" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm">
                                Create Task
                            </Link>
                        </header>

                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned To</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="task in project.tasks" :key="task.id">
                                    <td class="px-6 py-4 whitespace-nowrap">{{ task.title }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                            :class="{
                                                'bg-gray-100 text-gray-800': task.status === 'not_started',
                                                'bg-yellow-100 text-yellow-800': task.status === 'in_progress',
                                                'bg-green-100 text-green-800': task.status === 'completed',
                                                'bg-red-100 text-red-800': task.status === 'blocked'
                                            }">
                                            {{ task.status.replace('_', ' ') }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ task.assignee ? task.assignee.name : 'Unassigned' }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ task.due_date || '-' }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link :href="route('tasks.edit', task.id)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                                    </td>
                                </tr>
                                <tr v-if="project.tasks.length === 0">
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">No tasks created yet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <!-- Team Members -->
                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section>
                        <header class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Team Members</h2>
                        </header>

                        <!-- Add Member Form -->
                        <form @submit.prevent="addMember" class="flex gap-4 items-end mb-6">
                            <div class="flex-1">
                                <InputLabel for="user_id" value="User" />
                                <select
                                    id="user_id"
                                    class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    v-model="memberForm.user_id"
                                    required
                                >
                                    <option value="" disabled>Select User</option>
                                    <option v-for="user in users" :key="user.id" :value="user.id">
                                        {{ user.name }} ({{ user.email }})
                                    </option>
                                </select>
                                <InputError :message="memberForm.errors.user_id" class="mt-2" />
                            </div>

                            <div class="w-32">
                                <InputLabel for="role" value="Role" />
                                <select
                                    id="role"
                                    class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    v-model="memberForm.role"
                                >
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            <PrimaryButton :disabled="memberForm.processing">Add Member</PrimaryButton>
                        </form>

                        <!-- Members List -->
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="member in project.members" :key="member.id">
                                    <td class="px-6 py-4 whitespace-nowrap">{{ member.user.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap capitalize">{{ member.role }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <button @click="removeMember(member.id)" class="text-red-600 hover:text-red-900">Remove</button>
                                    </td>
                                </tr>
                                <tr v-if="project.members.length === 0">
                                    <td colspan="3" class="px-6 py-4 text-center text-gray-500">No members assigned yet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>
