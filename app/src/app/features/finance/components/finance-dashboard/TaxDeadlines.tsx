import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/components/ui/utils';
import { TaxDeadline } from './types';

interface TaxDeadlinesProps {
    cashBalance: string;
    deadlines: TaxDeadline[];
}

export function TaxDeadlines({ cashBalance, deadlines }: TaxDeadlinesProps) {
    return (
        <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-6 text-white">
                <DollarSign className="h-8 w-8 mb-3" />
                <div className="text-2xl font-bold mb-2">{cashBalance}</div>
                <div className="text-sm opacity-90 mb-4">Available Cash</div>
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    View Details
                </Button>
            </div>

            <Card className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-gray-900">Tax Deadlines</h3>
                </div>
                <div className="space-y-3">
                    {deadlines.map((item, index) => (
                        <div key={index} className={cn("flex items-center justify-between pb-3", index !== deadlines.length - 1 && "border-b")}>
                            <div>
                                <div className="font-medium text-gray-900">{item.title}</div>
                                <div className="text-xs text-gray-500">{item.date}</div>
                            </div>
                            <Badge variant="secondary" className={cn(
                                item.urgency === 'high' ? 'bg-red-100 text-red-700' :
                                    item.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                            )}>
                                {item.daysRemaining} days
                            </Badge>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}