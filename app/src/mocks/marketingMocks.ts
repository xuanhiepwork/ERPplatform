export interface CampaignROI {
    month: string;
    roi: number;
    cpc: number;
    leads: number;
}

export interface AutomationWorkflow {
    id: number;
    name: string;
    trigger: string;
    status: 'active' | 'paused';
    sent: number;
    openRate: number;
}

export interface ChannelPerformance {
    name: string;
    value: number;
    color: string;
}

export const mockRoiData: CampaignROI[] = [
    { month: 'Jan', roi: 145, cpc: 2.3, leads: 234 },
    { month: 'Feb', roi: 178, cpc: 2.1, leads: 289 },
    { month: 'Mar', roi: 192, cpc: 1.9, leads: 312 },
    { month: 'Apr', roi: 215, cpc: 1.8, leads: 378 },
    { month: 'May', roi: 245, cpc: 1.6, leads: 425 },
    { month: 'Jun', roi: 268, cpc: 1.5, leads: 456 },
];

export const mockWorkflows: AutomationWorkflow[] = [
    { id: 1, name: 'Welcome Email Series', trigger: 'New Lead Sign-up', status: 'active', sent: 1247, openRate: 68 },
    { id: 2, name: 'Cart Abandonment', trigger: 'Cart Inactive 24h', status: 'active', sent: 342, openRate: 45 },
    { id: 3, name: 'Re-engagement Campaign', trigger: 'No Activity 30d', status: 'paused', sent: 567, openRate: 32 },
];

export const mockChannelPerformance: ChannelPerformance[] = [
    { name: 'Organic', value: 35, color: '#10b981' },
    { name: 'Paid Search', value: 28, color: '#8b5cf6' },
    { name: 'Social', value: 20, color: '#3b82f6' },
    { name: 'Email', value: 12, color: '#f59e0b' },
    { name: 'Direct', value: 5, color: '#6b7280' },
];

export const mockConversionData = [
    { name: 'Converted', value: 68, color: '#8b5cf6' },
    { name: 'In Progress', value: 22, color: '#3b82f6' },
    { name: 'Lost', value: 10, color: '#6b7280' },
];