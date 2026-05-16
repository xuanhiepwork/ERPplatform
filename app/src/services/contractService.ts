import axiosClient from '../api/axiosClient';
import { Contract, ContractStatus, ExpiringContract } from '../app/types/contracts';

const normalizeStatus = (status: string): ContractStatus => {
    const normalized = String(status || '').toLowerCase();
    if (normalized.includes('expir')) return 'e-signature';
    if (normalized.includes('active') || normalized.includes('complete')) return 'completed';
    if (normalized.includes('finance')) return 'finance-approval';
    if (normalized.includes('legal')) return 'legal-review';
    return 'draft';
};

const normalizeContract = (row: any): Contract => {
    const status = normalizeStatus(row.status);
    const owner = row.owner || row.manager_name || 'Contract Owner';

    return {
        id: String(row.id),
        title: row.title || `Contract ${row.id}`,
        partner: row.partner || row.party || row.vendor || 'Unknown partner',
        type: row.type || 'Service Agreement',
        value: Number(row.value || row.amount || 0),
        status,
        currentHolder: row.currentHolder || {
            name: owner,
            role: status === 'completed' ? 'Completed' : 'Owner',
            avatar: row.owner_avatar || '',
            initials: owner.split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase(),
            department: row.department || 'Operations',
        },
        holdingDuration: row.holdingDuration || row.holding_duration || 'N/A',
        startDate: row.startDate || row.start_date || '',
        expirationDate: row.expirationDate || row.end_date || row.expiration_date || '',
        lastUpdated: row.lastUpdated || row.updated_at || row.created_at || '',
        timeline: row.timeline || [{ stage: status, completedAt: row.updated_at || row.created_at }],
    };
};

const normalizeExpiringContract = (row: any): ExpiringContract => {
    const expirationDate = row.expirationDate || row.end_date || row.expiration_date || '';
    const end = new Date(expirationDate).getTime();
    const daysRemaining = Number.isNaN(end) ? Number(row.daysRemaining || 0) : Math.ceil((end - Date.now()) / (1000 * 60 * 60 * 24));

    return {
        id: String(row.id),
        title: row.title || `Contract ${row.id}`,
        partner: row.partner || row.party || 'Unknown partner',
        expirationDate,
        daysRemaining,
        value: Number(row.value || row.amount || 0),
        owner: row.owner || row.manager_name || 'Contract Owner',
    };
};

export const contractApi = {
    getAllContracts: async (): Promise<Contract[]> => {
        const response = await axiosClient.get('/contracts');
        const rows = response.data.data ?? response.data ?? [];
        return Array.isArray(rows) ? rows.map(normalizeContract) : [];
    },

    getExpiringContracts: async (): Promise<ExpiringContract[]> => {
        const response = await axiosClient.get('/contracts/expiring');
        const rows = response.data.data ?? response.data ?? [];
        return Array.isArray(rows) ? rows.map(normalizeExpiringContract) : [];
    },
};
