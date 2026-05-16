import React from 'react';
import { ProfitAndLossSectionProps } from '../../../../types/finance';
// Import chính xác hai thành phần con nằm cùng thư mục con
import { PLSummaryChart } from './PLSummaryChart';
import { PLStatementBreakdown } from './PLStatementBreakdown';

export function ProfitAndLossSection({
    plData,
    plChartData,
    netProfit,
    totalRevenue,
    monthlySeries
}: ProfitAndLossSectionProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Thành phần bên trái: Đồ thị cột P&L và đường xu hướng */}
            <PLSummaryChart
                plChartData={plChartData}
                monthlySeries={monthlySeries}
            />

            {/* Thành phần bên phải: Bảng chi tiết doanh thu, chi phí, biên lợi nhuận */}
            <PLStatementBreakdown
                plData={plData}
                netProfit={netProfit}
                totalRevenue={totalRevenue}
            />
        </div>
    );
}