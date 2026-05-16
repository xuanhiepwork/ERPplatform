import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';

interface KPICardsProps {
    cashBalance: string;
    revenueMTD: string;
    expensesMTD: string;
    pendingCount: number;
    pendingTotal: string;
}

export function KPICards({ cashBalance, revenueMTD, expensesMTD, pendingCount, pendingTotal }: KPICardsProps) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-600">Cash Balance</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{cashBalance}</div>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3" /> +8.2% vs last month
                </div>
            </Card>

            <Card className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-600">Revenue (MTD)</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{revenueMTD}</div>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                    <TrendingUp className="h-3 w-3" /> +12% vs target
                </div>
            </Card>

            <Card className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingDown className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-600">Expenses (MTD)</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{expensesMTD}</div>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                    <TrendingDown className="h-3 w-3" /> -5% vs last month
                </div>
            </Card>

            <Card className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-600">Pending Approvals</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{pendingCount}</div>
                <div className="text-xs text-gray-600 mt-1">Total: {pendingTotal}</div>
            </Card>
        </div>
    );
}