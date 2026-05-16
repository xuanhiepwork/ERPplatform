import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '@/services/financeService';
import { TrendingUp, AlertTriangle, Clock, CheckCircle2, DollarSign, FileText, Download, Filter, Search, Calendar, Users, Target, Building2, BarChart3, Plus, RefreshCw } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { cn } from '@/app/components/ui/utils';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { TooltipProps } from '@/app/types/charts';

import { ARRecord } from './types';
import { formatCurrency, getStatusColor, getPriorityColor, getBarColor } from './utils';
import { ReminderModal } from './ReminderModal';

export function AccountsReceivable() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAging, setFilterAging] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reminderRecord, setReminderRecord] = useState<ARRecord | null>(null);

  const queryClient = useQueryClient();

  const { data: receivablesData, isLoading: isReceivablesLoading } = useQuery({
    queryKey: ['finance', 'receivables'],
    queryFn: () => financeApi.getReceivables(),
  });

  const markDealPaidMutation = useMutation({
    mutationFn: (dealId: any) => financeApi.markDealPaid(dealId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['finance', 'receivables'] })
  });

  // 1. Ánh xạ dữ liệu API vào Interface chung (Chỉ chạy lại khi API có dữ liệu mới)
  const arRecords: ARRecord[] = useMemo(() => {
    return (receivablesData ?? []).map((r: any) => {
      const dueDate = r.closing_date || '';
      const daysOverdue = dueDate ? Math.max(0, Math.floor((Date.now() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
      const paymentStatus: ARRecord['paymentStatus'] = r.outstanding_amount && r.outstanding_amount > 0 ? (daysOverdue > 0 ? 'overdue' : 'pending') : 'paid';
      const agingBucket: ARRecord['agingBucket'] = daysOverdue > 90 ? '90+' : daysOverdue > 60 ? '61-90' : daysOverdue > 30 ? '31-60' : daysOverdue > 0 ? '0-30' : 'current';

      return {
        id: `deal-${r.deal_id}`,
        dealId: r.deal_id,
        partnerName: r.partner_name || 'Unknown',
        partnerType: 'Client',
        contactPerson: '',
        email: '',
        phone: '',
        contractValue: Number(r.expected_revenue) || 0,
        invoicedAmount: Number(r.paid_amount) || 0,
        paidAmount: Number(r.paid_amount) || 0,
        outstandingAmount: Number(r.outstanding_amount) || 0,
        invoiceNumber: '',
        invoiceDate: dueDate,
        dueDate: dueDate,
        paymentStatus,
        daysOverdue,
        agingBucket,
        lastReminder: undefined,
        reminderCount: 0,
        contractId: `deal-${r.deal_id}`,
        priority: (Number(r.outstanding_amount) || 0) > 100000 ? 'critical' : 'high',
      };
    });
  }, [receivablesData]);

  // 2. Tính toán số liệu tổng cục
  const { totalOutstanding, overdueAmount, currentAmount, paidAmount, agingData } = useMemo(() => {
    const totalOut = arRecords.reduce((sum, r) => sum + r.outstandingAmount, 0);
    const overdue = arRecords.filter((r) => r.paymentStatus === 'overdue').reduce((sum, r) => sum + r.outstandingAmount, 0);
    const current = arRecords.filter((r) => r.paymentStatus === 'pending').reduce((sum, r) => sum + r.outstandingAmount, 0);
    const paid = arRecords.reduce((sum, r) => sum + r.paidAmount, 0);

    const aging = [
      { bucket: 'Current', amount: arRecords.filter((r) => r.agingBucket === 'current').reduce((sum, r) => sum + r.outstandingAmount, 0), count: arRecords.filter((r) => r.agingBucket === 'current').length },
      { bucket: '0-30 Days', amount: arRecords.filter((r) => r.agingBucket === '0-30').reduce((sum, r) => sum + r.outstandingAmount, 0), count: arRecords.filter((r) => r.agingBucket === '0-30').length },
      { bucket: '31-60 Days', amount: arRecords.filter((r) => r.agingBucket === '31-60').reduce((sum, r) => sum + r.outstandingAmount, 0), count: arRecords.filter((r) => r.agingBucket === '31-60').length },
      { bucket: '61-90 Days', amount: arRecords.filter((r) => r.agingBucket === '61-90').reduce((sum, r) => sum + r.outstandingAmount, 0), count: arRecords.filter((r) => r.agingBucket === '61-90').length },
      { bucket: '90+ Days', amount: arRecords.filter((r) => r.agingBucket === '90+').reduce((sum, r) => sum + r.outstandingAmount, 0), count: arRecords.filter((r) => r.agingBucket === '90+').length },
    ];

    return { totalOutstanding: totalOut, overdueAmount: overdue, currentAmount: current, paidAmount: paid, agingData: aging };
  }, [arRecords]);

  // 3. Phễu lọc cho Table
  const filteredRecords = useMemo(() => {
    return arRecords.filter((record) => {
      const matchesStatus = filterStatus === 'all' || record.paymentStatus === filterStatus;
      const matchesAging = filterAging === 'all' || record.agingBucket === filterAging;
      const matchesSearch =
        record.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.contractId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesAging && matchesSearch;
    });
  }, [arRecords, filterStatus, filterAging, searchTerm]);

  // Component Custom cho Recharts (Chống re-render)
  const CustomTooltip = React.useCallback(({ active, payload }: TooltipProps<{ bucket: string; count: number }>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-900">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.bucket}</p>
          <p className="text-sm text-gray-700">Amount: <span className="font-bold">{formatCurrency(Number(payload[0].value ?? 0))}</span></p>
          <p className="text-xs text-gray-600">{payload[0].payload.count} invoice{payload[0].payload.count !== 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  }, []);

  const getStatusIcon = (status: string) => {
    if (status === 'paid') return <CheckCircle2 className="h-4 w-4" />;
    if (status === 'overdue') return <AlertTriangle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header & Stats (Màu đỏ sẫm) */}
      <div className="bg-gray-950 border-b-2 border-red-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-white" /></div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Accounts Receivable & Debt Tracking</h1>
              <p className="text-sm text-gray-400">Monitor outstanding payments and aging analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800"><Download className="h-4 w-4 mr-2" />Export Report</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700"><Plus className="h-4 w-4 mr-2" />Auto-generate Invoice</Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-red-900 to-red-950 border-2 border-red-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-600 flex items-center justify-center"><DollarSign className="h-6 w-6 text-white" /></div>
              <div>
                <p className="text-xs font-medium text-red-300 uppercase tracking-wider">Total Outstanding</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalOutstanding)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-orange-900 to-orange-950 border-2 border-orange-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-orange-600 flex items-center justify-center"><AlertTriangle className="h-6 w-6 text-white" /></div>
              <div>
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider">Overdue Debt</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(overdueAmount)}</p>
              </div>
            </div>
          </Card>
          {/* (Giữ nguyên thẻ Collected và Current Amount ...) */}
        </div>
      </div>

      {/* Aging Report Chart */}
      <div className="bg-gray-950 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><BarChart3 className="h-6 w-6 text-red-500" />Aging Report</h2>
          </div>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800"><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
        </div>

        <Card className="p-6 bg-gray-900 border-2 border-gray-700">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={agingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="bucket" tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 600 }} tickLine={{ stroke: '#4b5563' }} />
                <YAxis tick={{ fill: '#d1d5db', fontSize: 12 }} tickLine={{ stroke: '#4b5563' }} tickFormatter={(value) => formatCurrency(value)} />
                <RechartsTooltip content={<CustomTooltip active={false} payload={[]} label="" />} cursor={{ fill: 'rgba(75, 85, 99, 0.3)' }} />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.bucket)} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t-2 border-gray-700">
            {agingData.map((bucket, idx) => (
              <div key={idx} className="text-center">
                <div className="h-3 w-full rounded-full mb-2" style={{ backgroundColor: getBarColor(bucket.bucket) }} />
                <p className="text-xs font-medium text-gray-400 uppercase">{bucket.bucket}</p>
                <p className="text-lg font-bold text-white">{formatCurrency(bucket.amount)}</p>
                <p className="text-xs text-gray-500">{bucket.count} invoice(s)</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-gray-950 border-b border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-gray-900 border-gray-700 text-white" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAging} onValueChange={setFilterAging}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Aging Buckets</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="0-30">0-30 Days</SelectItem>
              <SelectItem value="90+">90+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Danh sách Nợ */}
      <div className="flex-1 overflow-auto p-6 bg-gray-900">
        <Card className="bg-gray-950 border-2 border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b-2 border-red-600">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Partner Name</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Contract Value</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Outstanding</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Payment Status</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className={cn('hover:bg-gray-800 transition-colors', record.paymentStatus === 'overdue' && 'bg-red-950/20')}>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className={cn('h-2 w-2 rounded-full mt-2', getPriorityColor(record.priority))} />
                        <div>
                          <p className="font-semibold text-white">{record.partnerName}</p>
                          <p className="text-xs text-gray-400">{record.partnerType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-white">{formatCurrency(record.contractValue)}</p>
                      <p className="text-xs text-gray-500">Contract {record.contractId}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className={cn('text-lg font-bold', record.outstandingAmount > 0 ? 'text-red-400' : 'text-emerald-400')}>
                        {formatCurrency(record.outstandingAmount)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={cn('flex items-center gap-1 w-fit', getStatusColor(record.paymentStatus))}>
                        {getStatusIcon(record.paymentStatus)}
                        {record.paymentStatus.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className={cn('text-sm font-medium', record.paymentStatus === 'overdue' ? 'text-red-400' : 'text-white')}>{record.dueDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {record.paymentStatus === 'overdue' && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => setReminderRecord(record)}>Send Reminder</Button>
                        )}
                        {record.outstandingAmount > 0 && record.paymentStatus !== 'overdue' && (
                          <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950" onClick={() => record.dealId && markDealPaidMutation.mutate(record.dealId)}>
                            Invoice
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {reminderRecord && (
        <ReminderModal record={reminderRecord} isOpen={!!reminderRecord} onClose={() => setReminderRecord(null)} />
      )}
    </div>
  );
}