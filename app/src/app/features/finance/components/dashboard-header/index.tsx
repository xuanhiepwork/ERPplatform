import React, { useState, useMemo } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { KPICards } from './KPICards';
import { CashflowChart } from './CashflowChart';
import { PendingApprovalsTable } from './PendingApprovalsTable';
import { CashflowData, PendingApproval } from './types';

export function FinanceDashboard() {
    const [timeRange, setTimeRange] = useState('6months');
    const [lastUpdated] = useState(new Date());

    const pendingApprovals: PendingApproval[] = useMemo(() => [
        { id: 'INV-2401', vendor: 'Tech Solutions Inc.', amount: 45000, type: 'Invoice', due: 'May 1', priority: 'high' },
        { id: 'EXP-1829', vendor: 'Marketing Agency', amount: 12500, type: 'Expense', due: 'May 3', priority: 'medium' },
        { id: 'INV-2402', vendor: 'Cloud Services Ltd.', amount: 8900, type: 'Invoice', due: 'May 5', priority: 'low' },
    ], []);

    // Chuyển đổi data thô thành đúng format của CashflowData interface
    const cashflowData: CashflowData[] = useMemo(() => {
        const rawData = [
            { month: 'Oct', revenue: 420000, expense: 380000 },
            { month: 'Nov', revenue: 450000, expense: 390000 },
            { month: 'Dec', revenue: 480000, expense: 420000 },
            { month: 'Jan', revenue: 510000, expense: 440000 },
            { month: 'Feb', revenue: 490000, expense: 430000 },
            { month: 'Mar', revenue: 530000, expense: 450000 },
        ];

        return rawData.map(d => ({
            month: d.month,
            revenue: d.revenue,
            expenses: d.expense,
            netCashflow: d.revenue - d.expense,
            operatingCashflow: (d.revenue - d.expense) * 1.1 // Giả lập dòng tiền hoạt động
        }));
    }, []);

    const { totalRevenue, totalExpenses, netProfit } = useMemo(() => {
        return {
            totalRevenue: cashflowData.reduce((sum, d) => sum + d.revenue, 0),
            totalExpenses: cashflowData.reduce((sum, d) => sum + d.expenses, 0),
            netProfit: cashflowData.reduce((sum, d) => sum + d.netCashflow, 0)
        };
    }, [cashflowData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    lastUpdated={lastUpdated}
                />

                <div className="mt-6">
                    <KPICards
                        cashBalance="$2.4M"
                        revenueMTD="$530K"
                        expensesMTD="$450K"
                        pendingCount={pendingApprovals.length}
                        pendingTotal="$245K"
                    />
                </div>

                <CashflowChart
                    data={cashflowData}
                    totalRevenue={totalRevenue}
                    totalExpenses={totalExpenses}
                    netProfit={netProfit}
                />

                <PendingApprovalsTable approvals={pendingApprovals} />
            </div>
        </div>
    );
}