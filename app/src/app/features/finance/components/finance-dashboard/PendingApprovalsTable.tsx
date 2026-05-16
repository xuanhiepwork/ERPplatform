import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/components/ui/utils';
import { PendingApproval } from './types';

interface PendingApprovalsTableProps {
    approvals: PendingApproval[];
}

export function PendingApprovalsTable({ approvals }: PendingApprovalsTableProps) {
    return (
        <Card className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Vendor/Payee</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priority</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvals.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4">
                                    <span className="font-mono text-sm text-gray-900">{item.id}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="font-medium text-gray-900">{item.vendor}</div>
                                </td>
                                <td className="py-4 px-4">
                                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-semibold text-gray-900">
                                        ${item.amount.toLocaleString()}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-600">{item.due}</td>
                                <td className="py-4 px-4">
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                        )}
                                    >
                                        {item.priority}
                                    </Badge>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}