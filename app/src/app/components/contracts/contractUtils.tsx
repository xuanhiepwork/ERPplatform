import { FileText, Shield, DollarSign, CheckCircle2 } from 'lucide-react';
import { ContractStatus } from '../../../../mocks/contractMocks';

// Tách config UI ra đây để List và Modal dùng chung
export const statusConfig: Record<ContractStatus, { label: string; color: string; bgColor: string; icon: any }> = {
    'draft': { label: 'Draft', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: FileText },
    'legal-review': { label: 'Legal Review', color: 'text-orange-700', bgColor: 'bg-orange-100', icon: Shield },
    'finance-approval': { label: 'Finance Approval', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: DollarSign },
    'e-signature': { label: 'E-Signature', color: 'text-purple-700', bgColor: 'bg-purple-100', icon: FileText },
    'completed': { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100', icon: CheckCircle2 }
};

export const workflowStages: ContractStatus[] = ['draft', 'legal-review', 'finance-approval', 'e-signature', 'completed'];

export const formatCurrency = (value: number) => {
    if (value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};