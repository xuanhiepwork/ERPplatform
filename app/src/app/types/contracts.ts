export type ContractStatus = 'draft' | 'legal-review' | 'finance-approval' | 'e-signature' | 'completed';

export interface ContractHolder {
    name: string;
    role: string;
    avatar: string;
    initials: string;
    department: string;
}

export interface ContractTimelineItem {
    stage: ContractStatus;
    completedAt?: string;
    assignee?: {
        name: string;
        avatar: string;
    };
    duration?: string;
}

export interface Contract {
    id: string;
    title: string;
    partner: string;
    type: string;
    value: number;
    status: ContractStatus;
    currentHolder: ContractHolder;
    holdingDuration: string;
    startDate: string;
    expirationDate: string;
    lastUpdated: string;
    timeline: ContractTimelineItem[];
}

export interface ExpiringContract {
    id: string;
    title: string;
    partner: string;
    expirationDate: string;
    daysRemaining: number;
    value: number;
    owner: string;
}
