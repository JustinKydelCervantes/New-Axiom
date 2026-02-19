<script setup>
import { Link, router } from '@inertiajs/vue3';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';

const props = defineProps({
    tasks: Array,
    projectId: Number,
    initialColumns: Array,
});

const columns = ref([]);
const notification = ref(null);
const editingWipColumnId = ref(null);
const tempWipLimit = ref(null);
const editorContainer = ref(null);

const handleClickOutside = (event) => {
    if (editingWipColumnId.value && editorContainer.value) {
        // Check if the click is outside the editor container AND the button that triggered it
        const isClickInside = editorContainer.value.contains(event.target);
        const isActionButton = event.target.closest('button')?.contains(event.target);
        
        if (!isClickInside && !isActionButton) {
            cancelEditingWip();
        }
    }
};

const distributeTasks = () => {
    // Initialize columns from props
    columns.value = props.initialColumns.map(col => ({
        ...col,
        tasks: props.tasks.filter(t => t.column_id === col.id || (!t.column_id && t.status === col.slug))
    }));
};

const isWipColumn = (column) => {
    return ['not_started', 'in_progress'].includes(column.slug);
};

watch(() => [props.tasks, props.initialColumns], distributeTasks, { immediate: true });

const onDragChange = (evt, column) => {
    if (evt.added) {
        const task = evt.added.element;
        moveTask(task, column.id);
    }
};

const moveTask = async (task, newColumnId) => {
    const oldColumnId = task.column_id;
    const oldStatus = task.status;
    
    // Optimistic update already handled by vuedraggable v-model, 
    // but we need to keep the task object updated in case of failure
    task.column_id = newColumnId;

    try {
        await axios.patch(route('tasks.update-status', task.id), {
            column_id: newColumnId
        });
        showNotification('Task moved successfully', 'success');
    } catch (error) {
        // Rollback
        task.column_id = oldColumnId;
        task.status = oldStatus;
        
        const message = error.response?.data?.error || error.response?.data?.message || 'Failed to move task';
        showNotification(message, 'error');
        
        // Reload to ensure UI is in sync with server state
        router.reload({ preserveScroll: true });
    }
};

const startEditingWip = (column) => {
    editingWipColumnId.value = column.id;
    tempWipLimit.value = column.wip_limit;
};

const cancelEditingWip = () => {
    editingWipColumnId.value = null;
    tempWipLimit.value = null;
};

const saveWipLimit = async (column) => {
    try {
        const newLimit = tempWipLimit.value;
        await axios.patch(route('columns.update-wip-limit', column.id), {
            wip_limit: newLimit
        });
        column.wip_limit = newLimit;
        showNotification('WIP limit updated', 'success');
        editingWipColumnId.value = null;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update WIP limit';
        showNotification(message, 'error');
        // Do not close the editor on validation error, as per requirement
    }
};

const updateWipLimit = async (column) => {
    // Legacy method for direct change
    saveWipLimit(column);
};

const showNotification = (message, type = 'info') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = null;
    }, 3000);
};

// Real-time: listen for task updates via Echo/Reverb
let channel = null;

onMounted(() => {
    if (props.projectId && window.Echo) {
        channel = window.Echo.channel(`project.${props.projectId}`);

        // When a task is moved (status changed)
        channel.listen('.task.moved', (e) => {
            columns.value.forEach(col => {
                const idx = col.tasks.findIndex(t => t.id === e.task_id);
                if (idx !== -1) {
                    const [task] = col.tasks.splice(idx, 1);
                    const newCol = columns.value.find(c => c.id === e.new_column_id);
                    if (newCol) {
                        task.status = e.new_status;
                        task.column_id = e.new_column_id;
                        newCol.tasks.push(task);
                    }
                }
            });
        });

        // When a task is updated (title, assignee, etc.)
        channel.listen('.task.updated', (e) => {
            columns.value.forEach(col => {
                const idx = col.tasks.findIndex(t => t.id === e.task.id);
                if (idx !== -1) {
                    col.tasks[idx] = { ...col.tasks[idx], ...e.task };
                }
            });
        });
    }

    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    if (props.projectId && window.Echo) {
        window.Echo.leaveChannel(`project.${props.projectId}`);
    }
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-950 p-6 rounded-xl shadow-inner relative overflow-hidden">
        <!-- Notification Toast -->
        <Transition
            enter-active-class="transform transition ease-out duration-300"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="notification" class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div class="p-4">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <svg v-if="notification.type === 'success'" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg v-else-if="notification.type === 'error'" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg v-else class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {{ notification.message }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <div class="flex gap-6 h-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            <div v-for="column in columns" :key="column.id" 
                class="w-80 flex-shrink-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 flex flex-col border border-gray-200 dark:border-gray-800"
            >
                <div class="flex justify-between items-center mb-6 px-1">
                    <div class="flex flex-col">
                        <h3 class="font-bold text-gray-800 dark:text-gray-200 text-lg tracking-tight">{{ column.name }}</h3>
                        <span v-if="isWipColumn(column)" class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {{ column.tasks.length }} Tasks 
                            <span v-if="column.wip_limit" :class="column.tasks.length >= column.wip_limit ? 'text-red-500' : 'text-indigo-400'">
                                / LIMIT:{{ column.wip_limit }} 
                            </span>
                        </span>
                        <span v-else class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {{ column.tasks.length }} Tasks
                        </span>
                    </div>
                    
                    <!-- WIP Limit Editor -->
                    <div v-if="isWipColumn(column)" class="relative">
                        <button 
                            @click="startEditingWip(column)"
                            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-600 transition-colors"
                            :class="{ 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20': editingWipColumnId === column.id }"
                        >
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </button>
                        
                        <!-- Persistent Editor for WIP Limit -->
                        <div v-if="editingWipColumnId === column.id" ref="editorContainer" class="absolute right-0 top-full mt-2 z-50 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                            <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Set WIP Limit</label>
                            <div class="space-y-3">
                                <input 
                                    type="number" 
                                    v-model="tempWipLimit" 
                                    ref="wipInput"
                                    placeholder="∞ Unlimited"
                                    class="w-full text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-9"
                                    @keyup.enter="saveWipLimit(column)"
                                    @keyup.esc="cancelEditingWip"
                                    autofocus
                                />
                                <div class="flex gap-2">
                                    <button 
                                        @click="saveWipLimit(column)"
                                        class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        @click="cancelEditingWip"
                                        class="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold py-2 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <p class="mt-3 text-[10px] text-gray-400 leading-tight italic">Leave blank for unlimited tasks.</p>
                        </div>
                    </div>
                </div>
                
                <draggable
                    v-model="column.tasks"
                    group="tasks"
                    item-key="id"
                    class="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar min-h-[100px]"
                    ghost-class="opacity-50"
                    drag-class="rotate-1"
                    @change="(evt) => onDragChange(evt, column)"
                >
                    <template #item="{ element }">
                        <div class="group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-grab active:cursor-grabbing border-l-4"
                            :class="{
                                'border-l-gray-300 dark:border-l-gray-600': element.priority === 'low',
                                'border-l-blue-400 dark:border-l-blue-500': element.priority === 'medium',
                                'border-l-orange-400 dark:border-l-orange-500': element.priority === 'high',
                                'border-l-rose-500 dark:border-l-rose-600': element.priority === 'urgent',
                            }"
                        >
                            <div class="flex justify-between items-start mb-3">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                                    :class="{
                                        'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300': element.priority === 'low',
                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400': element.priority === 'medium',
                                        'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400': element.priority === 'high',
                                        'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400': element.priority === 'urgent',
                                    }"
                                >
                                    {{ element.priority }}
                                </span>
                                <Link :href="route('tasks.edit', element.id)" class="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full">
                                    <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </Link>
                            </div>
                            
                            <h4 class="font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3 line-clamp-2">{{ element.title }}</h4>
                            
                            <div class="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center text-[11px]">
                                <div class="flex items-center text-gray-500 dark:text-gray-400">
                                    <svg class="h-3.5 w-3.5 mr-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span class="font-medium">{{ element.assignee ? element.assignee.name : 'Unassigned' }}</span>
                                </div>
                                <div v-if="element.due_date" class="flex items-center px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold">
                                    <svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ new Date(element.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}
</style>
