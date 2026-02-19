<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    task: Object,
    project: Object,
    members: Array,
    availableTasks: Array,
});

const form = useForm({
    title: props.task.title,
    description: props.task.description,
    assigned_to: props.task.assigned_to,
    priority: props.task.priority,
    status: props.task.status,
    progress_percent: props.task.progress_percent,
    start_date: props.task.start_date,
    due_date: props.task.due_date,
    dependencies: props.task.dependencies ? props.task.dependencies.map(d => d.id) : [],
});

const submit = () => {
    form.put(route('tasks.update', props.task.id));
};

const destroy = () => {
    if (confirm('Are you sure you want to delete this task?')) {
        form.delete(route('tasks.destroy', props.task.id));
    }
};

const commentForm = useForm({ body: '' });
const submitComment = () => {
    commentForm.post(route('task-comments.store', props.task.id), {
        onSuccess: () => commentForm.reset(),
    });
};

const timeForm = useForm({ hours: '', description: '', logged_at: new Date().toISOString().slice(0, 10) });
const submitTime = () => {
    timeForm.post(route('time-logs.store', props.task.id), {
        onSuccess: () => timeForm.reset(),
    });
};
</script>

<template>
    <Head :title="'Edit Task: ' + task.title" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Task: {{ task.title }}</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                <!-- Task Edit Form -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <form @submit.prevent="submit">
                            <div>
                                <InputLabel for="title" value="Task Title" />
                                <TextInput id="title" type="text" class="mt-1 block w-full" v-model="form.title" required autofocus />
                                <InputError class="mt-2" :message="form.errors.title" />
                            </div>

                            <div class="mt-4">
                                <InputLabel for="description" value="Description" />
                                <textarea id="description" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="form.description"></textarea>
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel for="assigned_to" value="Assign To" />
                                    <select id="assigned_to" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="form.assigned_to">
                                        <option value="">Unassigned</option>
                                        <option v-for="member in members" :key="member.id" :value="member.id">{{ member.name }}</option>
                                    </select>
                                    <InputError class="mt-2" :message="form.errors.assigned_to" />
                                </div>
                                <div>
                                    <InputLabel for="priority" value="Priority" />
                                    <select id="priority" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="form.priority">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                    <InputError class="mt-2" :message="form.errors.priority" />
                                </div>
                            </div>

                            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel for="status" value="Status" />
                                    <select id="status" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="form.status">
                                        <option value="not_started">Not Started</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                    <InputError class="mt-2" :message="form.errors.status" />
                                </div>
                                <div>
                                    <InputLabel for="progress_percent" value="Progress (%)" />
                                    <TextInput id="progress_percent" type="number" min="0" max="100" class="mt-1 block w-full" v-model="form.progress_percent" />
                                    <InputError class="mt-2" :message="form.errors.progress_percent" />
                                </div>
                            </div>

                            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel for="start_date" value="Start Date" />
                                    <TextInput id="start_date" type="date" class="mt-1 block w-full" v-model="form.start_date" />
                                    <InputError class="mt-2" :message="form.errors.start_date" />
                                </div>
                                <div>
                                    <InputLabel for="due_date" value="Due Date" />
                                    <TextInput id="due_date" type="date" class="mt-1 block w-full" v-model="form.due_date" />
                                    <InputError class="mt-2" :message="form.errors.due_date" />
                                </div>
                            </div>

                            <div class="mt-4">
                                <InputLabel value="Dependencies" />
                                <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    <label v-for="t in availableTasks" :key="t.id" class="inline-flex items-center">
                                        <input type="checkbox" :value="t.id" v-model="form.dependencies" class="rounded border-gray-300 text-indigo-600 shadow-sm">
                                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ t.title }} ({{ t.status }})</span>
                                    </label>
                                </div>
                                <p class="text-xs text-gray-500 mt-1" v-if="availableTasks.length === 0">No other tasks available.</p>
                            </div>

                            <div class="flex items-center justify-between mt-6">
                                <DangerButton @click="destroy" type="button" :disabled="form.processing">Delete Task</DangerButton>
                                <div class="flex items-center">
                                    <Link :href="route('projects.show', project.id)" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">Cancel</Link>
                                    <PrimaryButton class="ms-4" :disabled="form.processing">Update Task</PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Comments Section -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Comments</h3>

                        <div class="space-y-4 mb-6">
                            <div v-if="task.comments.length === 0" class="text-gray-500 text-sm">No comments yet.</div>
                            <div v-for="comment in task.comments" :key="comment.id" class="flex gap-3">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                                    {{ comment.user.name.charAt(0) }}
                                </div>
                                <div class="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ comment.user.name }}</span>
                                        <span class="text-xs text-gray-500">{{ comment.created_at }}</span>
                                    </div>
                                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ comment.body }}</p>
                                </div>
                            </div>
                        </div>

                        <form @submit.prevent="submitComment" class="flex gap-3">
                            <textarea
                                v-model="commentForm.body"
                                placeholder="Add a comment..."
                                rows="2"
                                class="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                            ></textarea>
                            <PrimaryButton type="submit" :disabled="commentForm.processing" class="self-end">Post</PrimaryButton>
                        </form>
                    </div>
                </div>

                <!-- Time Tracking Section -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Time Tracking</h3>

                        <div class="mb-4">
                            <div v-if="task.time_logs && task.time_logs.length === 0" class="text-gray-500 text-sm">No time logged yet.</div>
                            <table v-else class="min-w-full text-sm">
                                <thead>
                                    <tr class="text-left text-gray-500 dark:text-gray-400">
                                        <th class="pb-2">User</th>
                                        <th class="pb-2">Hours</th>
                                        <th class="pb-2">Date</th>
                                        <th class="pb-2">Note</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="log in task.time_logs" :key="log.id">
                                        <td class="py-2">{{ log.user.name }}</td>
                                        <td class="py-2 font-medium">{{ log.hours }}h</td>
                                        <td class="py-2 text-gray-500">{{ log.logged_at }}</td>
                                        <td class="py-2 text-gray-500">{{ log.description || '-' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="text-sm font-medium text-indigo-600 mt-2" v-if="task.time_logs && task.time_logs.length > 0">
                                Total: {{ task.time_logs.reduce((s, l) => s + parseFloat(l.hours), 0).toFixed(1) }}h
                            </p>
                        </div>

                        <form @submit.prevent="submitTime" class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                            <div>
                                <InputLabel value="Hours" />
                                <TextInput type="number" step="0.5" min="0.5" max="24" v-model="timeForm.hours" class="mt-1 block w-full" placeholder="e.g. 2.5" />
                            </div>
                            <div>
                                <InputLabel value="Date" />
                                <TextInput type="date" v-model="timeForm.logged_at" class="mt-1 block w-full" />
                            </div>
                            <div>
                                <InputLabel value="Note (optional)" />
                                <TextInput type="text" v-model="timeForm.description" class="mt-1 block w-full" placeholder="What did you work on?" />
                            </div>
                            <PrimaryButton type="submit" :disabled="timeForm.processing">Log Time</PrimaryButton>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>

