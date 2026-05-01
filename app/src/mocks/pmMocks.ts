export interface Task {
    id: string;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    assignee: {
        name: string;
        avatar: string;
        initials: string;
    };
    dueDate: string;
    subTasks: { completed: number; total: number };
    comments?: number;
    attachments?: number;
    tags?: string[];
    status: 'todo' | 'in-progress' | 'review' | 'done';
}

export const mockTeamMembers = [
    { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', initials: 'SC' },
    { name: 'Michael Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', initials: 'MT' },
    { name: 'David Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', initials: 'DM' },
];

export const mockTasks: Task[] = [
    {
        id: 'TASK-101',
        title: 'Design new onboarding flow for mobile app',
        priority: 'High',
        assignee: mockTeamMembers[0],
        dueDate: '2026-05-15',
        subTasks: { completed: 1, total: 5 },
        comments: 3,
        tags: ['Design'],
        status: 'todo',
    },
    {
        id: 'TASK-201',
        title: 'Optimize database query performance',
        priority: 'Medium',
        assignee: mockTeamMembers[2],
        dueDate: '2026-05-10',
        subTasks: { completed: 3, total: 4 },
        status: 'in-progress',
    }
];