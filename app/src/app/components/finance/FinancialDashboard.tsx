import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // IMPORT REACT QUERY
import { financeApi } from '../../../../services/financeService'; // IMPORT API SERVICE

import { DashboardHeader } from './DashboardHeader';
import { KeyMetricsGrid } from './KeyMetricsGrid';
import { CashflowChart } from './CashflowChart';
import { ProfitAndLossSection } from './ProfitAndLossSection';
import { FinancialRatios } from './FinancialRatios';

export function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState('12months');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 1. Gọi API lấy dữ liệu Cashflow
  const {
    data: cashflowData,
    isLoading: isCashflowLoading,
    isError: isCashflowError
  } = useQuery({
    queryKey: ['cashflow', timeRange], // Query Key chứa timeRange để tự động gọi lại API khi đổi filter
    queryFn: () => {
      setLastUpdated(new Date());
      return financeApi.getCashflow();
    }
  });

  // 2. Gọi API lấy dữ liệu Profit & Loss
  const {
    data: plData,
    isLoading: isPlLoading
  } = useQuery({
    queryKey: ['profit-loss', timeRange],
    queryFn: financeApi.getProfitAndLoss
  });

  // Xử lý trạng thái Loading
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

  // Xử lý trạng thái Lỗi
  if (isCashflowError || !cashflowData || !plData) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">Lỗi kết nối máy chủ. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  // --- LOGIC TÍNH TOÁN (Giữ nguyên, nhưng giờ dùng data thật) ---
  const totalRevenue = cashflowData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = cashflowData.reduce((sum, d) => sum + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const currentLiquidity = 2450000; // Có thể tách thành API riêng nếu muốn

  const totalOperatingCashflow = cashflowData.reduce((sum, d) => sum + d.operatingCashflow, 0);
  const avgOperatingCashflow = totalOperatingCashflow / cashflowData.length;

  const latestMonth = cashflowData[cashflowData.length - 1] || { revenue: 0, expenses: 0, netCashflow: 0 };
  const previousMonth = cashflowData[cashflowData.length - 2] || { revenue: 1, expenses: 1, netCashflow: 1 };

  const trends = {
    revenue: ((latestMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100,
    expenses: ((latestMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100,
    profit: ((latestMonth.netCashflow - previousMonth.netCashflow) / previousMonth.netCashflow) * 100
  };

  const plChartData = [
    {
      category: 'Revenue',
      income: plData.filter((d) => d.type === 'income').reduce((sum, d) => sum + d.amount, 0),
      expense: 0,
    },
    {
      category: 'Expenses',
      income: 0,
      expense: plData.filter((d) => d.type === 'expense').reduce((sum, d) => sum + d.amount, 0),
    },
    {
      category: 'Net Profit',
      income: netProfit > 0 ? netProfit : 0,
      expense: netProfit < 0 ? Math.abs(netProfit) : 0,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <DashboardHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        lastUpdated={lastUpdated}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <KeyMetricsGrid
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
          netProfit={netProfit}
          currentLiquidity={currentLiquidity}
          trends={trends}
          margin={(netProfit / totalRevenue) * 100}
        />

        <CashflowChart
          data={cashflowData}
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
          netProfit={netProfit}
        />

        <ProfitAndLossSection
          plData={plData}
          plChartData={plChartData}
          netProfit={netProfit}
          totalRevenue={totalRevenue}
        />

        <FinancialRatios
          totalOperatingCashflow={avgOperatingCashflow}
          totalRevenue={totalRevenue / cashflowData.length}
        />
      </div>
    </div>
  );
}