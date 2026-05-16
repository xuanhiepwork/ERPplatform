import React from 'react';
import { PiggyBank, Wallet, CreditCard } from 'lucide-react';
import { FinancialRatiosProps } from '../../../../types/finance';
import { RatioCard } from './RatioCard';

export function FinancialRatios({ totalOperatingCashflow, totalRevenue }: FinancialRatiosProps) {
    // Xử lý an toàn phép chia cho 0
    const operatingMargin = totalRevenue > 0
        ? ((totalOperatingCashflow / totalRevenue) * 100).toFixed(1)
        : '0.0';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RatioCard
                title="Operating Margin"
                value={`${operatingMargin}%`}
                description="Efficiency ratio for core operations"
                icon={PiggyBank}
                theme="emerald"
            />

            <RatioCard
                title="Cash Runway"
                value="18.5 mo"
                description="Months of operations at current burn rate"
                icon={Wallet}
                theme="blue"
            />

            <RatioCard
                title="Quick Ratio"
                value="2.8"
                description="Ability to meet short-term obligations"
                icon={CreditCard}
                theme="purple"
            />
        </div>
    );
}