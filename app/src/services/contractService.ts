import axiosClient from '../api/axiosClient';
import { Contract, ExpiringContract } from '../mocks/contractMocks';

export const contractApi = {
    getAllContracts: async (): Promise<Contract[]> => {
        // const response = await axiosClient.get('/contracts');
        // return response.data.data;

        // Tạm thời trả về mock data để UI hoạt động khi Backend chưa có endpoint này
        const { mockContracts } = await import('../mocks/contractMocks');
        return mockContracts;
    },

    getExpiringContracts: async (): Promise<ExpiringContract[]> => {
        // const response = await axiosClient.get('/contracts/expiring');
        // return response.data.data;

        const { mockExpiringContracts } = await import('../mocks/contractMocks');
        return mockExpiringContracts;
    }
};