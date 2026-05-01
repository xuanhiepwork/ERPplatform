import { PiggyBank, Wallet, CreditCard } from 'lucide-react';
import { Card } from '../ui/card';

export function FinancialRatios({ totalOperatingCashflow, totalRevenue }: any) {
    return (
        <div className="grid grid-cols-3 gap-6">
            <Card className="p-5 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Operating Margin</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {((totalOperatingCashflow / totalRevenue) * 100).toFixed(1)}%
                        </p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">Efficiency ratio for core operations</p>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Cash Runway</p>
                        <p className="text-2xl font-bold text-blue-600">18.5 mo</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">Months of operations at current burn rate</p>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Quick Ratio</p>
                        <p className="text-2xl font-bold text-purple-600">2.8</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">Ability to meet short-term obligations</p>
            </Card>
        </div>
    );
}