// Crmwebapp/src/services/financeService.ts
import axiosClient from '../api/axiosClient';
import { CashflowData, PLData, ReceivableRecord, PayableRecord } from '../app/types/finance';

export interface CashflowItem {
    month: string;
    revenue: number;
    expenses: number;
    netCashflow: number;
    operatingCashflow: number;
}

export const financeApi = {
    // Lấy dữ liệu dòng tiền (defensive for several backend shapes)
    getCashflow: async (): Promise<CashflowData[]> => {
        const response = await axiosClient.get('/finance/cashflow-stats');
        const payload = response?.data?.data ?? response?.data;

        // Backend may return { summary, chartData } or an array directly
        if (Array.isArray(payload)) return payload as CashflowData[];
        if (payload && Array.isArray(payload.chartData)) return payload.chartData as CashflowData[];
        if (payload && Array.isArray(payload.data)) return payload.data as CashflowData[];

        // Try common fields
        if (payload && Array.isArray(payload.processedData)) return payload.processedData as CashflowData[];

        return [];
    },

    // Lấy dữ liệu P&L (Profit & Loss) - returns structured object when available
    getProfitAndLoss: async (): Promise<any> => {
        const response = await axiosClient.get('/finance/profit-loss');
        const payload = response?.data?.data ?? response?.data;

        if (!payload) return { summary: { totalRevenue: 0, totalExpense: 0, netProfit: 0 }, items: [], monthlySeries: [], groups: {} };

        // If payload already has structured fields, return as-is
        if (payload.summary || payload.items || payload.monthlySeries || payload.groups) {
            return payload;
        }

        // Fallbacks: payload may be array of PLData
        if (Array.isArray(payload)) return { summary: { totalRevenue: 0, totalExpense: 0, netProfit: 0 }, items: payload, monthlySeries: [], groups: {} };
        if (Array.isArray(payload.items)) return { summary: payload.summary ?? {}, items: payload.items, monthlySeries: payload.monthlySeries ?? [], groups: payload.groups ?? {} };
        if (Array.isArray(payload.data)) return { summary: payload.summary ?? {}, items: payload.data, monthlySeries: payload.monthlySeries ?? [], groups: payload.groups ?? {} };

        // Last resort synthesize
        if (payload.summary) {
            const totalRevenue = Number(payload.summary.totalRevenue) || 0;
            const totalExpense = Number(payload.summary.totalExpense) || 0;
            return { summary: payload.summary, items: [{ category: 'Revenue', amount: totalRevenue, type: 'income' }, { category: 'Expenses', amount: totalExpense, type: 'expense' }], monthlySeries: payload.monthlySeries ?? [], groups: payload.groups ?? {} };
        }

        return { summary: { totalRevenue: 0, totalExpense: 0, netProfit: 0 }, items: [], monthlySeries: [], groups: {} };
    }
    ,

    // Receivables list (outstanding by deal)
    getReceivables: async (): Promise<ReceivableRecord[]> => {
        const response = await axiosClient.get('/finance/receivables');
        const payload = response?.data?.data ?? response?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload as ReceivableRecord[];
        if (Array.isArray(payload.data)) return payload.data as ReceivableRecord[];
        return [];
    },

    // Payables list (pending expense claims)
    getPayables: async (): Promise<PayableRecord[]> => {
        const response = await axiosClient.get('/finance/payables');
        const payload = response?.data?.data ?? response?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload as PayableRecord[];
        if (Array.isArray(payload.data)) return payload.data as PayableRecord[];
        return [];
    }
    ,

    // Asset register
    getAssets: async (): Promise<any[]> => {
        const response = await axiosClient.get('/finance/assets');
        const payload = response?.data?.data ?? response?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload as any[];
        if (Array.isArray(payload.data)) return payload.data as any[];
        return [];
    },

    // Department budgets
    getBudgets: async (): Promise<any[]> => {
        const response = await axiosClient.get('/finance/budgets');
        const payload = response?.data?.data ?? response?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload as any[];
        if (Array.isArray(payload.data)) return payload.data as any[];
        return [];
    }
    ,

    // Asset maintenance
    getAssetMaintenance: async (assetId: string): Promise<any[]> => {
        const response = await axiosClient.get(`/finance/assets/${assetId}/maintenance`);
        const payload = response?.data?.data ?? response?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload as any[];
        if (Array.isArray(payload.data)) return payload.data as any[];
        return [];
    },

    addAssetMaintenance: async (assetId: string, body: { date: string; type: string; cost?: number; status?: string }) => {
        const response = await axiosClient.post(`/finance/assets/${assetId}/maintenance`, body);
        return response.data.data ?? response.data;
    }
    ,

    // Approvals / Payments
    approveExpense: async (expenseId: string | number, body?: { notes?: string }) => {
        const id = String(expenseId).replace(/^pay-/, '').replace(/^ec-/, '');
        const response = await axiosClient.post(`/finance/expenses/${id}/approve`, body || {});
        return response.data.data ?? response.data;
    },

    rejectExpense: async (expenseId: string | number, body?: { reason?: string }) => {
        const id = String(expenseId).replace(/^pay-/, '').replace(/^ec-/, '');
        const response = await axiosClient.post(`/finance/expenses/${id}/reject`, body || {});
        return response.data.data ?? response.data;
    },

    markPaymentPaid: async (paymentId: string | number) => {
        const id = String(paymentId).replace(/^pay-/, '');
        const response = await axiosClient.post(`/finance/payments/${id}/mark-paid`);
        return response.data.data ?? response.data;
    },

    markDealPaid: async (dealId: string | number) => {
        const id = String(dealId).replace(/^deal-/, '');
        const response = await axiosClient.post(`/finance/deals/${id}/mark-paid`);
        return response.data.data ?? response.data;
    }
};

// Fetch single expense details
export const financeDetails = {
    getExpense: async (expenseId: string | number) => {
        const id = String(expenseId).replace(/^pay-/, '').replace(/^ec-/, '');
        const response = await axiosClient.get(`/finance/expenses/${id}`);
        return response.data.data ?? response.data;
    }
};
