import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/services/financeService';

import { DashboardHeader } from './DashboardHeader';
import { KeyMetricsGrid } from './KeyMetricsGrid';
import { CashflowChart } from './CashflowChart';
import { ProfitAndLossSection } from './ProfitAndLossSection';
import { FinancialRatios } from './FinancialRatios';
import { PLData } from './types';

export function FinancialDashboard() {
    const [timeRange, setTimeRange] = useState('12months');
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const { data: cashflowData, isLoading: isCashflowLoading, isError: isCashflowError } = useQuery({
        queryKey: ['cashflow', timeRange],
        queryFn: () => {
            setLastUpdated(new Date());
            return financeApi.getCashflow();
        }
    });

    const { data: plResult, isLoading: isPlLoading } = useQuery({
        queryKey: ['profit-loss', timeRange],
        queryFn: financeApi.getProfitAndLoss
    });

    const metrics = useMemo(() => {
        if (!cashflowData || !plResult) return null;

        const totalRevenue = cashflowData.reduce((sum: number, d: any) => sum + d.revenue, 0);
        const totalExpenses = cashflowData.reduce((sum: number, d: any) => sum + d.expenses, 0);
        const netProfit = totalRevenue - totalExpenses;
        const currentLiquidity = 2450000;

        const totalOperatingCashflow = cashflowData.reduce((sum: number, d: any) => sum + d.operatingCashflow, 0);
        const avgOperatingCashflow = totalOperatingCashflow / Math.max(cashflowData.length, 1);

        const latestMonth = cashflowData[cashflowData.length - 1] || { revenue: 0, expenses: 0, netCashflow: 0 };
        const previousMonth = cashflowData[cashflowData.length - 2] || { revenue: 1, expenses: 1, netCashflow: 1 };

        const trends = {
            revenue: ((latestMonth.revenue - previousMonth.revenue) / Math.max(1, previousMonth.revenue)) * 100,
            expenses: ((latestMonth.expenses - previousMonth.expenses) / Math.max(1, previousMonth.expenses)) * 100,
            profit: ((latestMonth.netCashflow - previousMonth.netCashflow) / Math.max(1, Math.abs(previousMonth.netCashflow))) * 100
        };

        const items: PLData[] = (plResult && Array.isArray(plResult.items)) ? plResult.items : (Array.isArray(plResult) ? plResult : []);

        const plChartData = [
            {
                category: 'Revenue',
                income: items.filter((d: PLData) => d.type === 'income').reduce((sum: number, d: PLData) => sum + d.amount, 0),
                expense: 0,
            },
            {
                category: 'Expenses',
                income: 0,
                expense: items.filter((d: PLData) => d.type === 'expense').reduce((sum: number, d: PLData) => sum + d.amount, 0),
            },
            {
                category: 'Net Profit',
                income: netProfit > 0 ? netProfit : 0,
                expense: netProfit < 0 ? Math.abs(netProfit) : 0,
            },
        ];

        return { totalRevenue, totalExpenses, netProfit, currentLiquidity, avgOperatingCashflow, trends, items, plChartData };
    }, [cashflowData, plResult]);

    if (isCashflowLoading || isPlLoading) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Đang tải dữ liệu tài chính...</p>
                </div>
            </div>
        );
    }

    if (isCashflowError || !metrics) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-red-500 font-medium">Lỗi kết nối máy chủ hoặc không có dữ liệu.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} lastUpdated={lastUpdated} />

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <KeyMetricsGrid
                    totalRevenue={metrics.totalRevenue}
                    totalExpenses={metrics.totalExpenses}
                    netProfit={metrics.netProfit}
                    currentLiquidity={metrics.currentLiquidity}
                    trends={metrics.trends}
                    margin={(metrics.netProfit / Math.max(1, metrics.totalRevenue)) * 100}
                />

                <CashflowChart
                    data={cashflowData}
                    totalRevenue={metrics.totalRevenue}
                    totalExpenses={metrics.totalExpenses}
                    netProfit={metrics.netProfit}
                />

                <ProfitAndLossSection
                    plData={metrics.items}
                    plChartData={metrics.plChartData}
                    netProfit={metrics.netProfit}
                    totalRevenue={metrics.totalRevenue}
                    monthlySeries={plResult?.monthlySeries}
                />

                <FinancialRatios
                    totalOperatingCashflow={metrics.avgOperatingCashflow}
                    totalRevenue={metrics.totalRevenue / Math.max(cashflowData.length, 1)}
                />
            </div>
        </div>
    );
}