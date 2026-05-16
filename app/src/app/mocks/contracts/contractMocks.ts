export type ContractStatus = 'draft' | 'legal-review' | 'finance-approval' | 'e-signature' | 'completed';

export interface Contract {
    id: string;
    title: string;
    partner: string;
    type: string;
    value: number;
    status: ContractStatus;
    currentHolder: {
        name: string;
        role: string;
        avatar: string;
        initials: string;
        department: string;
    };
    holdingDuration: string;
    startDate: string;
    expirationDate: string;
    lastUpdated: string;
    timeline: {
        stage: ContractStatus;
        completedAt?: string;
        assignee?: {
            name: string;
            avatar: string;
        };
        duration?: string;
    }[];
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

export const mockContracts: Contract[] = [
    {
        id: 'CNT-2026-001',
        title: 'Master Service Agreement - TechCorp Solutions',
        partner: 'TechCorp Solutions',
        type: 'MSA',
        value: 250000,
        status: 'legal-review',
        currentHolder: {
            name: 'Emily Rodriguez',
            role: 'Senior Legal Counsel',
            avatar: 'https://i.pravatar.cc/150?img=9',
            initials: 'ER',
            department: 'Legal'
        },
        holdingDuration: '2 days',
        startDate: 'Apr 10, 2026',
        expirationDate: 'Apr 10, 2027',
        lastUpdated: '2 hours ago',
        timeline: [
            { stage: 'draft', completedAt: 'Apr 8, 2026', assignee: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' }, duration: '3 days' },
            { stage: 'legal-review', assignee: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9' }, duration: '2 days' }
        ]
    },
    // Bạn có thể copy nốt các object Contract còn lại từ file gốc vào đây...
];

export const mockExpiringContracts: ExpiringContract[] = [
    { id: 'CNT-2025-087', title: 'Master Service Agreement - Global Analytics Inc', partner: 'Global Analytics Inc', expirationDate: 'Apr 25, 2026', daysRemaining: 14, value: 450000, owner: 'Michael Chen' },
    { id: 'CNT-2025-112', title: 'Partnership Agreement - LogiChain Global', partner: 'LogiChain Global', expirationDate: 'May 8, 2026', daysRemaining: 27, value: 290000, owner: 'Sarah Johnson' },
    { id: 'CNT-2025-098', title: 'SLA - EduPlatform Systems', partner: 'EduPlatform Systems', expirationDate: 'Apr 30, 2026', daysRemaining: 19, value: 195000, owner: 'Amanda Foster' }
];