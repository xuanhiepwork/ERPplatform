export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
        case 'partial': return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'pending': return 'bg-amber-100 text-amber-700 border-amber-300';
        case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'critical': return 'bg-red-600 text-white';
        case 'high': return 'bg-orange-600 text-white';
        case 'medium': return 'bg-amber-600 text-white';
        case 'low': return 'bg-gray-600 text-white';
        default: return 'bg-gray-600 text-white';
    }
};

export const getBarColor = (bucket: string) => {
    switch (bucket) {
        case 'Current': return '#10b981'; // emerald-500
        case '0-30 Days': return '#3b82f6'; // blue-500
        case '31-60 Days': return '#f59e0b'; // amber-500
        case '61-90 Days': return '#f97316'; // orange-500
        case '90+ Days': return '#dc2626'; // red-600
        default: return '#6b7280';
    }
};