import axiosClient from '../api/axiosClient';
import { CampaignROI } from '../app/types/marketing';

const unwrapData = <T>(response: { data: T | { data: T } }): T => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        return response.data.data as T;
    }

    return response.data as T;
};

export const marketingApi = {
    getPerformance: async (): Promise<any> => {
        const response = await axiosClient.get('/marketing/performance');
        return unwrapData<any>(response);
    },

    getCampaigns: async (): Promise<any[]> => {
        const response = await axiosClient.get('/marketing/campaigns');
        return unwrapData<any[]>(response);
    },

    getAssets: async (searchQuery?: string): Promise<any[]> => {
        const response = await axiosClient.get('/marketing/assets', { params: { search_query: searchQuery } });
        return unwrapData<any[]>(response);
    },

    generateContent: async (prompt: string, mode = 'content'): Promise<{ text: string; provider?: string }> => {
        const response = await axiosClient.post('/marketing/ai/generate', { prompt, mode });
        return unwrapData<{ text: string; provider?: string }>(response);
    },

    updateCampaignStatus: async (id: string | number, status: string) => {
        const response = await axiosClient.patch(`/marketing/campaigns/${id}/status`, { status });
        return response.data.data ?? response.data;
    }
};

export default marketingApi;
