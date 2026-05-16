export interface ScheduleItem {
    time: string;
    title: string;
    type: 'meeting' | 'learning' | 'task';
    status: 'completed' | 'upcoming' | 'pending';
}

export interface ApprovalRequest {
    approval_id?: number;
    id?: number;
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
