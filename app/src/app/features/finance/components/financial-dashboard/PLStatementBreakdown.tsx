import React from 'react';
import { FileText, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { PLData } from '../../../../types/finance';
import { formatCurrencyLong } from './utils';

interface PLStatementBreakdownProps {
    plData: PLData[];
    netProfit: number;
    totalRevenue: number;
}

export function PLStatementBreakdown({ plData, netProfit, totalRevenue }: PLStatementBreakdownProps) {
    // Đã đẩy logic tính tổng ra ngoài JSX để code gọn gàng, sạch sẽ hơn
    const totalIncome = plData.filter((d) => d.type === 'income').reduce((sum: number, d) => sum + d.amount, 0);
    const totalExpense = plData.filter((d) => d.type === 'expense').reduce((sum: number, d) => sum + d.amount, 0);
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : 0;

    return (
        <Card className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    P&L Statement Breakdown
                </h3>
                <p className="text-sm text-gray-500 mt-1">Detailed category analysis</p>
            </div>

            <div className="space-y-4">
                {/* Income Section */}
                <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-emerald-200">
                        <h4 className="font-semibold text-emerald-700 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Income
                        </h4>
                        <span className="font-bold text-emerald-700">
                            {formatCurrencyLong(totalIncome)}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {plData.filter((d: PLData) => d.type === 'income').map((item, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{item.category}</span>
                                <span className="font-semibold text-gray-900">{formatCurrencyLong(item.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expenses Section */}
                <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-red-200">
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4" /> Expenses
                        </h4>
                        <span className="font-bold text-red-700">
                            {formatCurrencyLong(totalExpense)}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {plData.filter((d: PLData) => d.type === 'expense').map((item, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{item.category}</span>
                                <span className="font-semibold text-gray-900">{formatCurrencyLong(item.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Net Profit Section */}
                <div className="pt-4 border-t-2 border-gray-300">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <DollarSign className="h-5 w-5" /> Net Profit
                        </h4>
                        <span className="text-xl font-bold text-emerald-600">{formatCurrencyLong(netProfit)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                        Profit Margin: {profitMargin}%
                    </p>
                </div>
            </div>
        </Card>
    );
}