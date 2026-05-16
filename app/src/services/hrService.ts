import axiosClient from '../api/axiosClient';
import { Employee, OrgNode } from '../app/types/hr';

const unwrapData = <T>(response: { data: T | { data: T } }): T => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        return response.data.data;
    }

    return response.data as T;
};

export const hrApi = {
    getEmployeeProfile: async (): Promise<Employee> => {
        // Backend exposes user profile via /api/v1/users/me
        const response = await axiosClient.get('/users/me');
        return unwrapData<Employee>(response);
    },

    getOrgChart: async (): Promise<OrgNode> => {
        // Backend exposes departments which can be used to build an org-chart
        const response = await axiosClient.get('/departments');
        return unwrapData<OrgNode>(response);
    },

    // Attendance & Leave APIs
    getMyTimesheet: async (month?: number, year?: number): Promise<any[]> => {
        const now = new Date();
        const m = month || now.getMonth() + 1; // JS months are 0-based
        const y = year || now.getFullYear();
        const response = await axiosClient.get(`/attendance/my-timesheet?month=${m}&year=${y}`);
        return unwrapData<any[]>(response);
    },

    checkIn: async (payload: { location_data?: any; work_mode?: string } = {}) => {
        const response = await axiosClient.post('/attendance', payload);
        return unwrapData<any>(response);
    },

    checkOut: async (attendanceId: string) => {
        const response = await axiosClient.patch(`/attendance/${attendanceId}/checkout`);
        return unwrapData<any>(response);
    },

    getAllAttendance: async (): Promise<any[]> => {
        const response = await axiosClient.get('/attendance');
        return unwrapData<any[]>(response);
    },

    getMyLeaveRequests: async (): Promise<any[]> => {
        const response = await axiosClient.get('/leaves');
        return unwrapData<any[]>(response);
    },

    createLeaveRequest: async (body: any) => {
        const response = await axiosClient.post('/leaves', body);
        return unwrapData<any>(response);
    }
    ,

    // Payroll APIs
    getMyPayslips: async (): Promise<any[]> => {
        const response = await axiosClient.get('/payroll/my-payslips');
        return unwrapData<any[]>(response);
    },

    generatePayrollDraft: async (month: number, year: number): Promise<any[]> => {
        const response = await axiosClient.post('/payroll/generate', { month, year });
        return unwrapData<any[]>(response);
    }
};
