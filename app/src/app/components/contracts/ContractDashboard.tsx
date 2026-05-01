import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contractApi } from '../../../../services/contractService';
import { Contract } from '../../../../mocks/contractMocks';

import { ContractHeader } from './ContractHeader';
import { ContractAlerts } from './ContractAlerts';
import { ContractList } from './ContractList';
import { ContractTimelineModal } from './ContractTimelineModal'; // Copy Modal cũ của bạn sang file riêng nếu muốn, hoặc nhúng thẳng

export function ContractDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

    // Gọi API (Sử dụng React Query)
    const { data: contracts = [], isLoading: isLoadingContracts } = useQuery({
        queryKey: ['contracts'],
        queryFn: contractApi.getAllContracts
    });

    const { data: expiringAlerts = [], isLoading: isLoadingAlerts } = useQuery({
        queryKey: ['expiringContracts'],
        queryFn: contractApi.getExpiringContracts
    });

    if (isLoadingContracts || isLoadingAlerts) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Logic lọc dữ liệu
    const filteredContracts = contracts.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <ContractHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ContractAlerts alerts={expiringAlerts} />
            <ContractList contracts={filteredContracts} onViewTimeline={(c) => setSelectedContract(c)} />

            {/* Tích hợp Modal của bạn ở đây (giữ nguyên logic JSX modal cũ trong file này hoặc file riêng) */}
            {/* {selectedContract && <ContractTimelineModal contract={selectedContract} onClose={() => setSelectedContract(null)} />} */}
        </div>
    );
}