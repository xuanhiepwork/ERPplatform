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
