import { LineChart as LineChartIcon, Filter, RefreshCw } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
};

export function CashflowChart({ data, totalRevenue, totalExpenses, netProfit }: any) {
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
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <LineChartIcon className="h-5 w-5 text-emerald-600" />
                        Cashflow Trends (12 Months)
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Multi-line analysis of revenue, expenses, and net cashflow</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
                        <Line type="monotone" dataKey="revenue" name="Revenue (Inflow)" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="expenses" name="Expenses (Outflow)" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="netCashflow" name="Net Cashflow" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="operatingCashflow" name="Operating Cashflow" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#7c3aed', r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded bg-emerald-600" />
                    <div>
                        <p className="text-xs font-medium text-gray-500">Avg Monthly Revenue</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(totalRevenue / data.length)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded bg-red-600" />
                    <div>
                        <p className="text-xs font-medium text-gray-500">Avg Monthly Expenses</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(totalExpenses / data.length)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded bg-blue-600" />
                    <div>
                        <p className="text-xs font-medium text-gray-500">Avg Net Cashflow</p>
                        <p className="text-lg font-bold text-emerald-600">{formatCurrency(netProfit / data.length)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded bg-purple-600" />
                    <div>
                        <p className="text-xs font-medium text-gray-500">Operating Cashflow</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(data.reduce((sum: number, d: any) => sum + d.operatingCashflow, 0) / data.length)}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}