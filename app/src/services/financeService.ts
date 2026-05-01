// Crmwebapp/src/services/financeService.ts
import axiosClient from '../api/axiosClient';
import { CashflowData, PLData } from '../mocks/financeMocks';

export interface CashflowItem {
    month: string;
    revenue: number;
    expenses: number;
    netCashflow: number;
    operatingCashflow: number;
}

export const financeApi = {
    // Lấy dữ liệu dòng tiền
    getCashflow: async (): Promise<CashflowData[]> => {
        const response = await axiosClient.get('/finance/cashflow');
        return response.data.data;  // Lấy mảng data từ cấu trúc trả về của Backend
    },

    // Lấy dữ liệu P&L (Profit & Loss)
    getProfitAndLoss: async (): Promise<PLData[]> => {
        const response = await axiosClient.get('/finance/profit-loss');
        return response.data.data;
    }
};