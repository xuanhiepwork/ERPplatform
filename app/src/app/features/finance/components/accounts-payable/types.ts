export interface PaymentRequest {
    id: string;
    claimId?: number;
    requestId: string;
    vendor: string;
    department: 'Marketing' | 'HR' | 'BD' | 'Operations' | 'IT' | 'Finance';
    amount: number;
    dueDate: string;
    submittedDate: string;
    description: string;
    invoiceNumber: string;
    approvalStage: {
        accountant: 'pending' | 'approved' | 'rejected';
        chiefAccountant: 'pending' | 'approved' | 'rejected';
        director: 'pending' | 'approved' | 'rejected';
    };
    signatures: {
        accountant?: { name: string; date: string; time: string };
        chiefAccountant?: { name: string; date: string; time: string };
        director?: { name: string; date: string; time: string };
    };
    status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'paid';
    priority: 'high' | 'medium' | 'low';
    paymentMethod: 'Bank Transfer' | 'Check' | 'Wire Transfer';
    category: string;
    email?: string;
    phone?: string;
}

export type PaymentSignature = NonNullable<PaymentRequest['signatures'][keyof PaymentRequest['signatures']]>;