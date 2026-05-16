import axiosClient from '../api/axiosClient';
import { Task } from '../app/types/projectManagement';

const normalizeStatus = (status: string): Task['status'] => {
    const normalized = String(status || '').toLowerCase().replace(/\s+/g, '-');
    if (normalized === 'to-do' || normalized === 'todo') return 'todo';
    if (normalized === 'in-progress') return 'in-progress';
    if (normalized === 'review') return 'review';
    if (normalized === 'done' || normalized === 'completed') return 'done';
    return 'todo';
};

const normalizeTask = (task: any): Task => ({
    id: String(task.id),
    title: task.title || 'Untitled task',
    priority: task.priority || 'Medium',
    assignee: {
        name: task.assignee?.name || task.assignee_name || 'Unassigned',
        avatar: task.assignee?.avatar || task.assignee_avatar || '',
        initials: (task.assignee?.initials || task.assignee_name || 'UA')
            .split(' ')
            .map((part: string) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
    },
    dueDate: task.dueDate || task.due_date || '',
    subTasks: task.subTasks || { completed: Number(task.completed_subtasks || 0), total: Math.max(1, Number(task.total_subtasks || 0)) },
    comments: Number(task.comments || 0),
    attachments: Number(task.attachments || 0),
    tags: Array.isArray(task.tags) ? task.tags : task.project_name ? [task.project_name] : [],
    status: normalizeStatus(task.status),
});

export const taskApi = {
    getTasksByProject: async (projectId: string): Promise<Task[]> => {
        const response = await axiosClient.get(`/pm/projects/${projectId}/tasks`);
        const rows = response.data.data ?? response.data ?? [];
        return Array.isArray(rows) ? rows.map(normalizeTask) : [];
    },

    getAllTasks: async (): Promise<Task[]> => {
        const response = await axiosClient.get(`/pm/tasks`);
        const rows = response.data.data ?? response.data ?? [];
        return Array.isArray(rows) ? rows.map(normalizeTask) : [];
    },

    updateTaskStatus: (id: string, status: string) => axiosClient.patch(`/pm/tasks/${id}/status`, { status }),

    generateSubtasks: (title: string, description?: string) => axiosClient.post(`/tasks/ai-decompose`, { title, description }),
};
