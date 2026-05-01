import axiosClient from '../api/axiosClient';

export const taskApi = {
    getAllTasks: () => axiosClient.get('/tasks'),
    updateTaskStatus: (id: string, status: string) => axiosClient.patch(`/tasks/${id}`, { status }),
    // API cho khung C.R.E.A.T.E
    generateSubtasks: (taskId: string) => axiosClient.post(`/tasks/${taskId}/generate-subtasks`),
};