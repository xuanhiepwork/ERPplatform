import React from 'react';
import { Card } from '../../../../components/ui/card';
import { CashflowEntry } from './types';

interface CashflowTrendProps {
    data: CashflowEntry[];
    summary: {
        netProfit: string;
        margin: string;
        growth: string;
    };
}

export function CashflowTrend({ data, summary }: CashflowTrendProps) {
    const maxValue = Math.max(...data.flatMap(d => [d.revenue, d.expense]));

    return (
        <Card className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Cashflow Trend (6 Months)</h2>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded" />
                        <span className="text-gray-600">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-red-500 rounded" />
                        <span className="text-gray-600">Expense</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
                            <div className="flex-1 flex gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-6 bg-green-500 rounded-full"
                                                style={{ width: `${(item.revenue / maxValue) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                                            ${(item.revenue / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-6 bg-red-500 rounded-full"
                                                style={{ width: `${(item.expense / maxValue) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                                            ${(item.expense / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-600">Net Profit (Mar)</div>
                        <div className="text-2xl font-bold text-green-600">{summary.netProfit}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Profit Margin</div>
                        <div className="text-2xl font-bold text-gray-900">{summary.margin}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">YoY Growth</div>
                        <div className="text-2xl font-bold text-blue-600">{summary.growth}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}