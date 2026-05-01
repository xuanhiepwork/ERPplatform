import { ArrowUp, ArrowDown, DollarSign, TrendingUp, TrendingDown, Droplet } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

const formatCurrencyLong = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

interface MetricCardProps {
    title: string;
    value: number;
    icon: any;
    trend?: number;
    trendLabel: string;
    colorClass: string;
    isNegativeTrendGood?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, trend, trendLabel, colorClass, isNegativeTrendGood = false }: MetricCardProps) => {
    const isPositive = trend !== undefined && trend >= 0;
    const isGood = isNegativeTrendGood ? !isPositive : isPositive;

    return (
        <Card className={cn(`p-6 border-l-4 bg-gradient-to-br from-white to-gray-50`, colorClass)}>
            <div className="flex items-start justify-between mb-3">
                <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", colorClass.replace('border-l-', 'bg-').replace('-600', '-100'))}>
                    <Icon className={cn("h-6 w-6", colorClass.replace('border-l-', 'text-'))} />
                </div>
                {trend !== undefined && (
                    <Badge className={cn('flex items-center gap-1', isGood ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300')}>
                        {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(trend).toFixed(1)}%
                    </Badge>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className={cn("text-3xl font-bold", title === 'Net Profit' && trend !== undefined && !isGood ? 'text-red-600' : 'text-gray-900')}>
                    {formatCurrencyLong(value)}
                </p>
                <p className="text-xs text-gray-500 mt-2">{trendLabel}</p>
            </div>
        </Card>
    );
};

export function KeyMetricsGrid({ totalRevenue, totalExpenses, netProfit, currentLiquidity, trends, margin }: any) {
    return (
        <div className="grid grid-cols-4 gap-6">
            <MetricCard
                title="Total Revenue"
                value={totalRevenue}
                icon={TrendingUp}
                trend={trends.revenue}
                trendLabel="Inflow · Last 12 Months"
                colorClass="border-l-emerald-600"
            />
            <MetricCard
                title="Total Expenses"
                value={totalExpenses}
                icon={TrendingDown}
                trend={trends.expenses}
                trendLabel="Outflow · Last 12 Months"
                colorClass="border-l-red-600"
                isNegativeTrendGood={true}
            />
            <MetricCard
                title="Net Profit"
                value={netProfit}
                icon={DollarSign}
                trend={trends.profit}
                trendLabel={`${margin.toFixed(1)}% Margin · Last 12 Months`}
                colorClass={netProfit >= 0 ? "border-l-emerald-600" : "border-l-red-600"}
            />
            <MetricCard
                title="Current Liquidity"
                value={currentLiquidity}
                icon={Droplet}
                trendLabel={`Cash & Liquid Assets · As of ${new Date().toLocaleDateString()}`}
                colorClass="border-l-blue-600"
            />
        </div>
    );
}