import axiosClient from '../api/axiosClient';
import { ApprovalRequest, Deadline, EmployeeSnapshot, ScheduleItem } from '../app/types/ess';

const unwrapData = <T>(response: { data: T | { data: T } }): T => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        return response.data.data;
    }

    return response.data as T;
};

export const essApi = {
    getEmployeeSnapshot: async (): Promise<EmployeeSnapshot> => {
        const now = new Date();
        const [profileRes, timesheetRes, leaveRes] = await Promise.all([
            axiosClient.get('/users/me'),
            axiosClient.get(`/attendance/my-timesheet?month=${now.getMonth() + 1}&year=${now.getFullYear()}`).catch(() => ({ data: { data: [] } })),
            axiosClient.get('/leaves').catch(() => ({ data: { data: [] } })),
        ]);

        const profile: any = unwrapData<any>(profileRes);
        const timesheet: any[] = unwrapData<any[]>(timesheetRes);
        const leaves: any[] = unwrapData<any[]>(leaveRes);
        const workHours = timesheet.reduce((sum, row) => {
            if (!row.check_in || !row.check_out) return sum;
            const start = new Date(row.check_in).getTime();
            const end = new Date(row.check_out).getTime();
            if (Number.isNaN(start) || Number.isNaN(end)) return sum;
            return sum + Math.max(0, (end - start) / (1000 * 60 * 60));
        }, 0);
        const approvedLeaveDays = leaves
            .filter((leave) => String(leave.status).toLowerCase() === 'approved')
            .reduce((sum, leave) => {
                const start = new Date(leave.start_date || leave.startDate).getTime();
                const end = new Date(leave.end_date || leave.endDate).getTime();
                if (Number.isNaN(start) || Number.isNaN(end)) return sum;
                return sum + Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
            }, 0);

        return {
            ...profile,
            leaveBalance: Math.max(0, Number(profile.leaveBalance ?? 20) - approvedLeaveDays),
            totalLeave: Number(profile.totalLeave ?? 20),
            workHours: Math.round(workHours * 10) / 10,
            totalWorkHours: Number(profile.totalWorkHours ?? 176),
        };
    },

    getTodaySchedule: async (): Promise<ScheduleItem[]> => {
        const now = new Date();
        const response = await axiosClient.get(`/attendance/my-timesheet?month=${now.getMonth() + 1}&year=${now.getFullYear()}`);
        const rows = unwrapData<any[]>(response);
        const today = now.toDateString();

        return rows
            .filter((row) => row.check_in && new Date(row.check_in).toDateString() === today)
            .map((row) => ({
                time: new Date(row.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                title: row.check_out ? 'Attendance completed' : 'Currently checked in',
                type: 'task',
                status: row.check_out ? 'completed' : 'pending',
            }));
    },

    getUpcomingDeadlines: async (): Promise<Deadline[]> => {
        const response = await axiosClient.get('/approvals/pending');
        const rows = unwrapData<any[]>(response);
        return rows.map((row) => ({
            title: `${String(row.entity_type || 'Request').replace(/_/g, ' ')} approval`,
            date: row.created_at || '',
            priority: row.level > 1 ? 'high' : 'medium',
        }));
    },

    getPendingApprovals: async (): Promise<ApprovalRequest[]> => {
        const response = await axiosClient.get('/approvals/pending');
        const rows = unwrapData<any[]>(response);
        return rows.map((row) => ({
            approval_id: row.approval_id,
            id: row.approval_id,
            type: String(row.entity_type || 'Request').replace(/_/g, ' '),
            employee: row.requester_name || row.requester_email || 'Requester',
            details: `Level ${row.level || 1} approval`,
            date: row.created_at || '',
        }));
    },
};
