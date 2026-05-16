import React, { useMemo } from 'react';
import { KPICards } from './KPICards';
import { CashflowTrend } from './CashflowTrend';
import { TaxDeadlines } from './TaxDeadlines';
import { PendingApprovalsTable } from './PendingApprovalsTable';
import { PendingApproval, CashflowEntry, TaxDeadline } from './types';

export function FinanceDashboard() {
    // Dùng useMemo để chứa data, sau này dễ dàng thay thế bằng useQuery gọi từ API
    const { pendingApprovals, cashflowData, taxDeadlines } = useMemo(() => {
        const approvals: PendingApproval[] = [
            { id: 'INV-2401', vendor: 'Tech Solutions Inc.', amount: 45000, type: 'Invoice', due: 'May 1', priority: 'high' },
            { id: 'EXP-1829', vendor: 'Marketing Agency', amount: 12500, type: 'Expense', due: 'May 3', priority: 'medium' },
            { id: 'INV-2402', vendor: 'Cloud Services Ltd.', amount: 8900, type: 'Invoice', due: 'May 5', priority: 'low' },
        ];

        const cashflows: CashflowEntry[] = [
            { month: 'Oct', revenue: 420000, expense: 380000 },
            { month: 'Nov', revenue: 450000, expense: 390000 },
            { month: 'Dec', revenue: 480000, expense: 420000 },
            { month: 'Jan', revenue: 510000, expense: 440000 },
            { month: 'Feb', revenue: 490000, expense: 430000 },
            { month: 'Mar', revenue: 530000, expense: 450000 },
        ];

        const deadlines: TaxDeadline[] = [
            { title: 'Q1 VAT Return', date: 'May 15, 2026', daysRemaining: 19, urgency: 'high' },
            { title: 'Corporate Tax', date: 'June 30, 2026', daysRemaining: 65, urgency: 'medium' },
            { title: 'Annual Report', date: 'Dec 31, 2026', daysRemaining: 249, urgency: 'low' },
        ];

        return { pendingApprovals: approvals, cashflowData: cashflows, taxDeadlines: deadlines };
    }, []);

    const profitSummary = {
        netProfit: '$80K',
        margin: '15.1%',
        growth: '+18.4%'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance & Accounting</h1>
                    <p className="text-gray-600">Real-time financial overview and pending approvals</p>
                </div>

                {/* Cụm KPI */}
                <KPICards
                    cashBalance="$2.4M"
                    revenue="$530K"
                    expenses="$450K"
                    pendingCount={pendingApprovals.length}
                    pendingTotal="$245K"
                />

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Cụm Biểu đồ dòng tiền */}
                    <CashflowTrend data={cashflowData} summary={profitSummary} />

                    {/* Cụm Thuế và Tiền mặt */}
                    <TaxDeadlines cashBalance="$2.4M" deadlines={taxDeadlines} />
                </div>

                {/* Bảng duyệt chi */}
                <PendingApprovalsTable approvals={pendingApprovals} />

            </div>
        </div>
    );
}