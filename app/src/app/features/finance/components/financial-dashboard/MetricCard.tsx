import React from 'react';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { cn } from '../../../../components/ui/utils';
import { formatCurrencyLong } from './utils'; // Nhúng hàm format từ utils

export interface MetricCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    trend?: number;
    trendLabel: string;
    colorClass: string;
    isNegativeTrendGood?: boolean;
}

export function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel,
    colorClass,
    isNegativeTrendGood = false
}: MetricCardProps) {
    const isPositive = trend !== undefined && trend >= 0;
    const isGood = isNegativeTrendGood ? !isPositive : isPositive;

    // Tách logic xử lý chuỗi class ra ngoài để JSX sạch sẽ hơn
    const bgColorClass = colorClass.replace('border-l-', 'bg-').replace('-600', '-100');
    const textColorClass = colorClass.replace('border-l-', 'text-');

    return (
        <Card className={cn(`p-6 border-l-4 bg-gradient-to-br from-white to-gray-50`, colorClass)}>
            <div className="flex items-start justify-between mb-3">
                <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", bgColorClass)}>
                    <Icon className={cn("h-6 w-6", textColorClass)} />
                </div>
                {trend !== undefined && (
                    <Badge className={cn(
                        'flex items-center gap-1',
                        isGood ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300'
                    )}>
                        {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(trend).toFixed(1)}%
                    </Badge>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className={cn(
                    "text-3xl font-bold",
                    title === 'Net Profit' && trend !== undefined && !isGood ? 'text-red-600' : 'text-gray-900'
                )}>
                    {formatCurrencyLong(value)}
                </p>
                <p className="text-xs text-gray-500 mt-2">{trendLabel}</p>
            </div>
        </Card>
    );
}