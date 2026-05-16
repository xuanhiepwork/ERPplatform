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

export interface FinanceTrends {
    revenue: number;
    expenses: number;
    profit: number;
}

export interface CashflowChartProps {
    data: CashflowData[];
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
}

export interface ProfitAndLossSectionProps {
    plData: PLData[];
    plChartData: PLChartData[];
    netProfit: number;
    totalRevenue: number;
    monthlySeries?: Array<{ month: string; revenue?: number; expense?: number; net?: number }>;
}

export interface KeyMetricsGridProps {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    currentLiquidity: number;
    trends: FinanceTrends;
    margin: number;
}

export interface FinancialRatiosProps {
    totalOperatingCashflow: number;
    totalRevenue: number;
}

export interface ReceivableRecord {
    deal_id: number;
    deal_name: string;
    partner_name: string;
    expected_revenue: number;
    paid_amount: number;
    outstanding_amount: number;
    closing_date?: string;
}

export interface PayableRecord {
    claim_id: number;
    requester_name: string;
    amount: number;
    description?: string;
    status?: string;
    created_at?: string;
}
