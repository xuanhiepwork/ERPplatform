export type Priority = 'high' | 'medium' | 'low';

export interface PendingApproval {
    id: string;
    vendor: string;
    amount: number;
    type: string;
    due: string;
    priority: Priority;
}

export interface CashflowData {
    month: string;
    revenue: number;
    expenses: number;
    netCashflow: number;
    operatingCashflow: number;
}