// app/src/mocks/pmMocks.ts

export interface TeamMember {
    name: string;
    avatar: string;
    initials: string;
}

export interface Task {
    id: string;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    assignee: TeamMember;
    dueDate: string;
    subTasks: {
        completed: number;
        total: number;
    };
    comments?: number;
    attachments?: number;
    tags?: string[];
    status: 'todo' | 'in-progress' | 'review' | 'done';
}

export const mockTeamMembers: TeamMember[] = [
    { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', initials: 'SC' },
    { name: 'Michael Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', initials: 'MT' },
    { name: 'Emily Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', initials: 'EJ' },
    { name: 'David Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', initials: 'DM' },
    { name: 'Jessica Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica', initials: 'JL' },
    { name: 'Robert Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', initials: 'RK' },
];

export const mockTasks: Task[] = [
    // To-Do
    {
        id: 'TASK-101',
        title: 'Design new onboarding flow for mobile app',
        priority: 'High',
        assignee: mockTeamMembers[0],
        dueDate: '2026-04-15',
        subTasks: { completed: 1, total: 5 },
        comments: 3,
        tags: ['Design'],
        status: 'todo',
    },
    {
        id: 'TASK-102',
        title: 'Update API documentation for v2.0 release',
        priority: 'Medium',
        assignee: mockTeamMembers[1],
        dueDate: '2026-04-18',
        subTasks: { completed: 0, total: 3 },
        attachments: 2,
        tags: ['Documentation'],
        status: 'todo',
    },
    {
        id: 'TASK-103',
        title: 'Implement dark mode for dashboard',
        priority: 'Low',
        assignee: mockTeamMembers[2],
        dueDate: '2026-04-25',
        subTasks: { completed: 0, total: 4 },
        comments: 1,
        tags: ['Feature'],
        status: 'todo',
    },
    {
        id: 'TASK-104',
        title: 'Fix login authentication bug on Safari',
        priority: 'High',
        assignee: mockTeamMembers[3],
        dueDate: '2026-04-12',
        subTasks: { completed: 2, total: 3 },
        comments: 5,
        tags: ['Bug'],
        status: 'todo',
    },

    // In Progress
    {
        id: 'TASK-201',
        title: 'Develop user profile settings page',
        priority: 'High',
        assignee: mockTeamMembers[1],
        dueDate: '2026-04-14',
        subTasks: { completed: 3, total: 6 },
        comments: 8,
        attachments: 1,
        tags: ['Development'],
        status: 'in-progress',
    },
    {
        id: 'TASK-202',
        title: 'Optimize database query performance',
        priority: 'Medium',
        assignee: mockTeamMembers[3],
        dueDate: '2026-04-16',
        subTasks: { completed: 2, total: 4 },
        comments: 4,
        tags: ['Backend'],
        status: 'in-progress',
    },
    {
        id: 'TASK-203',
        title: 'Create marketing landing page mockups',
        priority: 'Medium',
        assignee: mockTeamMembers[0],
        dueDate: '2026-04-17',
        subTasks: { completed: 4, total: 5 },
        attachments: 3,
        tags: ['Design'],
        status: 'in-progress',
    },

    // Review
    {
        id: 'TASK-301',
        title: 'Implement payment gateway integration',
        priority: 'High',
        assignee: mockTeamMembers[4],
        dueDate: '2026-04-11',
        subTasks: { completed: 5, total: 5 },
        comments: 12,
        attachments: 2,
        tags: ['Feature'],
        status: 'review',
    },
    {
        id: 'TASK-302',
        title: 'Write unit tests for user authentication',
        priority: 'Medium',
        assignee: mockTeamMembers[5],
        dueDate: '2026-04-13',
        subTasks: { completed: 7, total: 8 },
        comments: 2,
        tags: ['Testing'],
        status: 'review',
    },
    {
        id: 'TASK-303',
        title: 'Update security compliance documentation',
        priority: 'Low',
        assignee: mockTeamMembers[1],
        dueDate: '2026-04-20',
        subTasks: { completed: 3, total: 3 },
        attachments: 1,
        tags: ['Documentation'],
        status: 'review',
    },

    // Done
    {
        id: 'TASK-401',
        title: 'Set up CI/CD pipeline for staging',
        priority: 'High',
        assignee: mockTeamMembers[3],
        dueDate: '2026-04-08',
        subTasks: { completed: 6, total: 6 },
        comments: 15,
        tags: ['DevOps'],
        status: 'done',
    },
    {
        id: 'TASK-402',
        title: 'Refactor notification system',
        priority: 'Medium',
        assignee: mockTeamMembers[2],
        dueDate: '2026-04-09',
        subTasks: { completed: 4, total: 4 },
        comments: 6,
        tags: ['Refactor'],
        status: 'done',
    },
    {
        id: 'TASK-403',
        title: 'Conduct user research interviews',
        priority: 'Low',
        assignee: mockTeamMembers[0],
        dueDate: '2026-04-07',
        subTasks: { completed: 10, total: 10 },
        attachments: 5,
        tags: ['Research'],
        status: 'done',
    },
];