import axiosClient from '../api/axiosClient';

export const approvalApi = {
  act: async (approvalId: number | string, action: 'Approved' | 'Rejected', comment?: string) => {
    const response = await axiosClient.patch('/approvals/action', {
      approval_id: approvalId,
      action,
      comment,
    });

    return response.data.data ?? response.data;
  },
};

export default approvalApi;
