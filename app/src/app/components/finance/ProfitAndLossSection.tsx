import { BarChart3, FileText, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card } from '../ui/card';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const formatCurrencyLong = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
};

export function ProfitAndLossSection({ plData, plChartData, netProfit, totalRevenue }: any) {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {formatCurrency(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-emerald-600" />
                        Profit & Loss Summary
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Side-by-side comparison of income vs expenses</p>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={plChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} />
                            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
                            <Bar dataKey="income" name="Income" fill="#059669" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-emerald-600" />
                        P&L Statement Breakdown
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Detailed category analysis</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-emerald-200">
                            <h4 className="font-semibold text-emerald-700 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" /> Income
                            </h4>
                            <span className="font-bold text-emerald-700">
                                {formatCurrencyLong(plData.filter((d: any) => d.type === 'income').reduce((sum: number, d: any) => sum + d.amount, 0))}
                            </span>
                        </div>
                        <div className="space-y-2">
                            {plData.filter((d: any) => d.type === 'income').map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{item.category}</span>
                                    <span className="font-semibold text-gray-900">{formatCurrencyLong(item.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-red-200">
                            <h4 className="font-semibold text-red-700 flex items-center gap-2">
                                <TrendingDown className="h-4 w-4" /> Expenses
                            </h4>
                            <span className="font-bold text-red-700">
                                {formatCurrencyLong(plData.filter((d: any) => d.type === 'expense').reduce((sum: number, d: any) => sum + d.amount, 0))}
                            </span>
                        </div>
                        <div className="space-y-2">
                            {plData.filter((d: any) => d.type === 'expense').map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{item.category}</span>
                                    <span className="font-semibold text-gray-900">{formatCurrencyLong(item.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t-2 border-gray-300">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                <DollarSign className="h-5 w-5" /> Net Profit
                            </h4>
                            <span className="text-xl font-bold text-emerald-600">{formatCurrencyLong(netProfit)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            Profit Margin: {((netProfit / totalRevenue) * 100).toFixed(2)}%
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}