import React from 'react';
import { Badge } from '../../../../components/ui/badge';

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

export const getDepartmentColor = (department: string) => {
    switch (department) {
        case 'Marketing': return 'bg-purple-100 text-purple-700 border-purple-300';
        case 'HR': return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'BD': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
        case 'Operations': return 'bg-orange-100 text-orange-700 border-orange-300';
        case 'IT': return 'bg-cyan-100 text-cyan-700 border-cyan-300';
        case 'Finance': return 'bg-indigo-100 text-indigo-700 border-indigo-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

export const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'high': return <Badge className="bg-red-100 text-red-700 border-red-300">High Priority</Badge>;
        case 'medium': return <Badge className="bg-amber-100 text-amber-700 border-amber-300">Medium</Badge>;
        case 'low': return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Low</Badge>;
        default: return null;
    }
};