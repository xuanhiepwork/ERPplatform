export interface ScheduleItem {
    time: string;
    title: string;
    type: 'meeting' | 'learning' | 'task';
    status: 'completed' | 'upcoming' | 'pending';
}

export interface ApprovalRequest {
    type: string;
    employee: string;
    details: string;
    date: string;
}

export interface Deadline {
    title: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
}

export interface EmployeeSnapshot {
    leaveBalance: number;
    totalLeave: number;
    workHours: number;
    totalWorkHours: number;
}

export const mockSnapshot: EmployeeSnapshot = {
    leaveBalance: 12,
    totalLeave: 20,
    workHours: 160,
    totalWorkHours: 176,
};

export const mockTodaySchedule: ScheduleItem[] = [
    { time: '09:00 AM', title: 'Team Stand-up', type: 'meeting', status: 'completed' },
    { time: '10:30 AM', title: 'Project Review with Manager', type: 'meeting', status: 'upcoming' },
    { time: '02:00 PM', title: 'Training: Advanced Excel', type: 'learning', status: 'upcoming' },
    { time: '04:00 PM', title: 'Submit Weekly Report', type: 'task', status: 'pending' },
];

export const mockUpcomingDeadlines: Deadline[] = [
    { title: 'Q2 Performance Review Submission', date: 'Apr 12, 2026', priority: 'high' },
    { title: 'Project Alpha Milestone Delivery', date: 'Apr 15, 2026', priority: 'high' },
    { title: 'Team Budget Proposal', date: 'Apr 18, 2026', priority: 'medium' },
];

export const mockPendingApprovals: ApprovalRequest[] = [
    { type: 'Leave Request', employee: 'Michael Chen', details: 'Apr 20-22 (3 days)', date: '2 hours ago' },
    { type: 'Expense Report', employee: 'Sarah Williams', details: '$487.50', date: '5 hours ago' },
    { type: 'Leave Request', employee: 'David Martinez', details: 'Apr 25 (1 day)', date: '1 day ago' },
];