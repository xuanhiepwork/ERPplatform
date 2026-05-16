export interface CashflowData {
    month: string;
    revenue: number;
    expenses: number;
    netCashflow: number;
    operatingCashflow: number;
}

export interface PLData {
    category: string;
    amount: number;
    type: 'income' | 'expense';
}

export interface PLChartData {
    category: string;
    income: number;
    expense: number;
}

export interface FinancialTrends {
    revenue: number;
    expenses: number;
    profit: number;
}