import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '../../../../components/ui/card';
import { TooltipProps } from '../../../../types/charts';
import { PLChartData } from '../../../../types/finance';
import { formatCurrency } from './utils';

interface PLSummaryChartProps {
    plChartData: PLChartData[];
    monthlySeries?: any[];
}

export function PLSummaryChart({ plChartData, monthlySeries }: PLSummaryChartProps) {
    const CustomTooltip = React.useCallback(({ active, payload, label }: TooltipProps<PLChartData>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2">{label}</p>
                    {/* 2. THÊM :any VÀO ENTRY Ở DÒNG DƯỚI ĐÂY */}
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {formatCurrency(Number(entry.value ?? 0))}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    }, []);

    return (
        <Card className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                    Profit & Loss Summary
                </h3>
                <p className="text-sm text-gray-500 mt-1">Side-by-side comparison of income vs expenses</p>
            </div>

            {monthlySeries && monthlySeries.length > 0 && (
                <div className="mb-4 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlySeries} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="expense" stroke="#dc2626" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={plChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#d1d5db' }} tickFormatter={(value) => formatCurrency(value)} />
                        <RechartsTooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>} />
                        <Bar dataKey="income" name="Income" fill="#059669" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}