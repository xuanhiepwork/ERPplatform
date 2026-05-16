export type Priority = 'high' | 'medium' | 'low';

export interface PendingApproval {
    id: string;
    vendor: string;
    amount: number;
    type: string;
    due: string;
    priority: Priority;
}

export interface CashflowEntry {
    month: string;
    revenue: number;
    expense: number;
}

export interface TaxDeadline {
    title: string;
    date: string;
    daysRemaining: number;
    urgency: 'high' | 'medium' | 'low';
}