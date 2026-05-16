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
