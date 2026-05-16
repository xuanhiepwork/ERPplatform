import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, AlertTriangle, TrendingUp, Download, Filter, Search, Bell, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';
import { financeApi } from '../../../../../services/financeService'; // Thêm 1 nấc ../
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

import { DepartmentBudget } from './types';
import { formatCurrency } from './utils';
import { DepartmentCard } from './DepartmentCard';

export function BudgetManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ĐÃ SỬA: Đưa useQuery và phần map dữ liệu vào ĐÚNG bên trong Component chính
    const { data: budgetsData, isLoading: isBudgetsLoading } = useQuery({
        queryKey: ['finance', 'budgets'],
        queryFn: () => financeApi.getBudgets(),
    });

    const departments: DepartmentBudget[] = useMemo(() => {
        return (budgetsData ?? []).map((b: any) => ({
            id: b.id || b.department || b.name,
            name: b.name || b.department || 'Unknown',
            icon: <Briefcase className="h-6 w-6" />,
            totalBudget: Number(b.totalBudget || b.total_budget || 0),
            consumed: Number(b.consumed || 0),
            remaining: Number(b.remaining || 0),
            percentConsumed: Number(b.percentConsumed || b.percent_consumed || 0),
            status: b.status || 'healthy',
            categories: b.categories || [],
            quarterlyTarget: Number(b.quarterlyTarget || b.quarterly_target || Number(b.totalBudget || b.total_budget || 0)),
            lastUpdated: b.lastUpdated || b.last_updated || '',
        }));
    }, [budgetsData]);

    // Bộ tính toán Thống kê tổng cục
    const budgetStats = useMemo(() => {
        const totalBudget = departments.reduce((sum, d) => sum + d.totalBudget, 0);
        const totalConsumed = departments.reduce((sum, d) => sum + d.consumed, 0);
        const totalRemaining = departments.reduce((sum, d) => sum + d.remaining, 0);
        const avgConsumption = totalBudget > 0 ? (totalConsumed / totalBudget) * 100 : 0;

        const criticalDepartments = departments.filter(d => d.percentConsumed >= 90);
        const warningDepartments = departments.filter(d => d.percentConsumed >= 80 && d.percentConsumed < 90);

        return { totalBudget, totalConsumed, totalRemaining, avgConsumption, criticalDepartments, warningDepartments };
    }, [departments]);

    // Bộ lọc dữ liệu tìm kiếm
    const filteredDepartments = useMemo(() => {
        return departments.filter((dept) => {
            const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [departments, searchTerm, filterStatus]);

    if (isBudgetsLoading) {
        return <div className="p-6 text-center">Đang tải dữ liệu ngân sách...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
                            <DollarSign className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Departmental Budget Management</h1>
                            <p className="text-sm text-gray-600">Q2 2026 Budget Overview - Real-time monitoring and alerts</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-gray-300"><Download className="h-4 w-4 mr-2" /> Export Report</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700"><Bell className="h-4 w-4 mr-2" /> Set Alert Thresholds</Button>
                    </div>
                </div>

                {/* Critical Alerts Banner */}
                {budgetStats.criticalDepartments.length > 0 && (
                    <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">{budgetStats.criticalDepartments.length}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-red-900 text-lg">Critical Budget Alert!</h3>
                                <p className="text-sm text-red-700">
                                    {budgetStats.criticalDepartments.length} department{budgetStats.criticalDepartments.length > 1 ? 's have' : ' has'} exceeded 90% budget consumption:{' '}
                                    <span className="font-semibold">{budgetStats.criticalDepartments.map(d => d.name).join(', ')}</span>
                                </p>
                            </div>
                            <Button className="bg-red-600 hover:bg-red-700">Review Now</Button>
                        </div>
                    </Card>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-5 border-l-4 border-l-blue-600">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center"><DollarSign className="h-6 w-6 text-blue-600" /></div>
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">Total Budget</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(budgetStats.totalBudget)}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-amber-600">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-amber-600" /></div>
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">Total Consumed</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(budgetStats.totalConsumed)}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-emerald-600">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="h-6 w-6 text-emerald-600" /></div>
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">Total Remaining</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(budgetStats.totalRemaining)}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-5 border-l-4 border-l-red-600">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center"><AlertCircle className="h-6 w-6 text-red-600" /></div>
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">Critical Alerts</p>
                                <p className="text-xl font-bold text-gray-900">{budgetStats.criticalDepartments.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search departments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white" />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-64 bg-white">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="healthy">Healthy (0-80%)</SelectItem>
                            <SelectItem value="warning">Warning (80-90%)</SelectItem>
                            <SelectItem value="critical">Critical (90-100%)</SelectItem>
                            <SelectItem value="exceeded">Exceeded (100%+)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grid phòng ban */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDepartments.map((department) => (
                    <DepartmentCard key={department.id} department={department} />
                ))}
            </div>
        </div>
    );
}