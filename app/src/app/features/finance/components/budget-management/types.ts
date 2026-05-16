export interface ExpenseCategory {
    name: string;
    planned: number;
    actual: number;
    variance: number;
    variancePercent: number;
}

export interface DepartmentBudget {
    id: string;
    name: string;
    icon: React.ReactNode;
    totalBudget: number;
    consumed: number;
    remaining: number;
    percentConsumed: number;
    status: 'healthy' | 'warning' | 'critical' | 'exceeded';
    categories: ExpenseCategory[];
    quarterlyTarget: number;
    lastUpdated: string;
}