// Định nghĩa các interface (Export để tái sử dụng ở component)
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

// Copy array từ FinancialDashboard.tsx sang đây
export const mockCashflowData: CashflowData[] = [
    { month: 'May 2025', revenue: 485000, expenses: 312000, netCashflow: 173000, operatingCashflow: 165000 },
    { month: 'Jun 2025', revenue: 512000, expenses: 328000, netCashflow: 184000, operatingCashflow: 178000 },
    { month: 'Jul 2025', revenue: 548000, expenses: 345000, netCashflow: 203000, operatingCashflow: 195000 },
    { month: 'Aug 2025', revenue: 523000, expenses: 358000, netCashflow: 165000, operatingCashflow: 158000 },
    { month: 'Sep 2025', revenue: 592000, expenses: 372000, netCashflow: 220000, operatingCashflow: 212000 },
    { month: 'Oct 2025', revenue: 618000, expenses: 385000, netCashflow: 233000, operatingCashflow: 225000 },
    { month: 'Nov 2025', revenue: 645000, expenses: 398000, netCashflow: 247000, operatingCashflow: 238000 },
    { month: 'Dec 2025', revenue: 723000, expenses: 425000, netCashflow: 298000, operatingCashflow: 285000 },
    { month: 'Jan 2026', revenue: 658000, expenses: 412000, netCashflow: 246000, operatingCashflow: 238000 },
    { month: 'Feb 2026', revenue: 687000, expenses: 428000, netCashflow: 259000, operatingCashflow: 251000 },
    { month: 'Mar 2026', revenue: 712000, expenses: 445000, netCashflow: 267000, operatingCashflow: 259000 },
    { month: 'Apr 2026', revenue: 748000, expenses: 462000, netCashflow: 286000, operatingCashflow: 278000 },
];

export const mockPlData: PLData[] = [
    { category: 'Product Sales', amount: 4250000, type: 'income' },
    { category: 'Service Revenue', amount: 2180000, type: 'income' },
    { category: 'Licensing', amount: 820000, type: 'income' },
    { category: 'Other Income', amount: 165000, type: 'income' },
    { category: 'Salaries & Benefits', amount: 2850000, type: 'expense' },
    { category: 'Operations', amount: 1245000, type: 'expense' },
    { category: 'Marketing', amount: 685000, type: 'expense' },
    { category: 'Technology', amount: 425000, type: 'expense' },
    { category: 'Rent & Facilities', amount: 312000, type: 'expense' },
    { category: 'Other Expenses', amount: 218000, type: 'expense' },
];