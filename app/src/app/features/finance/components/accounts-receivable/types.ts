export interface ARRecord {
    id: string;
    dealId?: number;
    partnerName: string;
    partnerType: string;
    contactPerson: string;
    email: string;
    phone: string;
    contractValue: number;
    invoicedAmount: number;
    paidAmount: number;
    outstandingAmount: number;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    paymentStatus: 'paid' | 'partial' | 'overdue' | 'pending';
    daysOverdue: number;
    agingBucket: '0-30' | '31-60' | '61-90' | '90+' | 'current';
    lastReminder?: string;
    reminderCount: number;
    contractId: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
}