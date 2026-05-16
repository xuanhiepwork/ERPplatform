import axiosClient from '../api/axiosClient';

export interface GlobalSearchResult {
  title: string;
  module: string;
  path?: string;
  type?: string;
}

export interface SystemNotification {
  id: string | number;
  title: string;
  time?: string;
  unread?: boolean;
  type?: string;
  path?: string;
  approval_id?: number;
}

const unwrapData = <T>(response: { data: T | { data: T } }): T => {
  if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    return response.data.data as T;
  }

  return response.data as T;
};

export const systemApi = {
  search: async (query: string): Promise<GlobalSearchResult[]> => {
    const response = await axiosClient.get('/system/search', { params: { q: query } });
    return unwrapData<GlobalSearchResult[]>(response);
  },

  getNotifications: async (): Promise<SystemNotification[]> => {
    const response = await axiosClient.get('/system/notifications');
    return unwrapData<SystemNotification[]>(response);
  },

  markNotificationRead: async (id: string | number) => {
    const response = await axiosClient.patch(`/system/notifications/${id}/read`);
    return response.data.data ?? response.data;
  },

  markAllNotificationsRead: async () => {
    const response = await axiosClient.patch('/system/notifications/read-all');
    return response.data.data ?? response.data;
  },
};

export default systemApi;
