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
        case 'healthy':
            return {
                bg: 'bg-emerald-50',
                border: 'border-emerald-500',
                text: 'text-emerald-700',
                progressColor: '#10b981',
                bgColor: '#d1fae5',
            };
        case 'warning':
            return {
                bg: 'bg-amber-50',
                border: 'border-amber-500',
                text: 'text-amber-700',
                progressColor: '#f59e0b',
                bgColor: '#fef3c7',
            };
        case 'critical':
            return {
                bg: 'bg-red-50',
                border: 'border-red-500',
                text: 'text-red-700',
                progressColor: '#ef4444',
                bgColor: '#fee2e2',
            };
        case 'exceeded':
            return {
                bg: 'bg-red-100',
                border: 'border-red-600',
                text: 'text-red-800',
                progressColor: '#dc2626',
                bgColor: '#fecaca',
            };
        default:
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-500',
                text: 'text-gray-700',
                progressColor: '#6b7280',
                bgColor: '#f3f4f6',
            };
    }
};