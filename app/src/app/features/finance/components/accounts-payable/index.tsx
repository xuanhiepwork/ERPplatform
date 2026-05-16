import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../../../../services/financeService';
import { DollarSign, FileText, CheckCircle2, Clock, Banknote, Building2, CheckSquare, X, Send, Filter, Search, AlertCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../../components/ui/dialog';
import { Textarea } from '../../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

import { PaymentRequest } from './types';
import { formatCurrency, getDepartmentColor, getPriorityBadge } from './utils';
import { ApprovalStepper } from './ApprovalStepper';
import { InvoiceModal } from './InvoiceModal';

export function AccountsPayable() {
    const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingInvoice, setViewingInvoice] = useState<PaymentRequest | null>(null);
    const [approvalModal, setApprovalModal] = useState<{ open: boolean; mode: 'approve' | 'reject' | null; claimId?: any }>({ open: false, mode: null });

    const queryClient = useQueryClient();

    const { data: payablesData } = useQuery({
        queryKey: ['finance', 'payables'],
        queryFn: () => financeApi.getPayables(),
    });

    const paymentRequests: PaymentRequest[] = useMemo(() => {
        return (payablesData ?? []).map((p: any) => ({
            id: `pay-${p.claim_id}`,
            claimId: p.claim_id,
            requestId: `AP-${p.claim_id}`,
            vendor: p.requester_name || 'Unknown Vendor',
            department: 'Finance',
            amount: Number(p.amount) || 0,
            dueDate: p.created_at || '',
            submittedDate: p.created_at || '',
            description: p.description || 'Expense claim',
            invoiceNumber: `EC-${p.claim_id}`,
            approvalStage: { accountant: 'pending', chiefAccountant: 'pending', director: 'pending' },
            signatures: {},
            status: p.status || 'pending',
            priority: 'medium',
            paymentMethod: 'Bank Transfer',
            category: 'Expense Claim',
        }));
    }, [payablesData]);

    // ĐÃ SỬA: Thay thế '营业mutationFn' thành 'mutationFn' chuẩn hóa
    const approveMutation = useMutation({
        mutationFn: ({ claimId, notes }: { claimId: any; notes: string }) => financeApi.approveExpense(claimId, { notes }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['finance', 'payables'] })
    });

    const rejectMutation = useMutation({
        mutationFn: ({ claimId, reason }: { claimId: any; reason: string }) => financeApi.rejectExpense(claimId, { reason }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['finance', 'payables'] })
    });

    const markPaidMutation = useMutation({
        mutationFn: (claimId: any) => financeApi.markPaymentPaid(claimId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['finance', 'payables'] })
    });

    const filteredRequests = useMemo(() => {
        return paymentRequests.filter((request) => {
            const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
            const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;
            const matchesSearch =
                request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesDepartment && matchesSearch;
        });
    }, [paymentRequests, filterStatus, filterDepartment, searchTerm]);

    const approvedRequests = useMemo(() => filteredRequests.filter((r) => r.status === 'approved'), [filteredRequests]);

    const totalApprovedAmount = useMemo(() => approvedRequests.reduce((sum: number, r: any) => sum + r.amount, 0), [approvedRequests]);

    const selectedAmount = useMemo(() => {
        return paymentRequests
            .filter((r) => selectedRequests.includes(r.id) && r.status === 'approved')
            .reduce((sum: number, r: any) => sum + r.amount, 0);
    }, [paymentRequests, selectedRequests]);

    const stats = useMemo(() => {
        return {
            pending: paymentRequests.filter((r) => r.status === 'pending').length,
            inReview: paymentRequests.filter((r) => r.status === 'in-review').length,
            approved: paymentRequests.filter((r) => r.status === 'approved').length,
            totalAmount: paymentRequests.reduce((sum: number, r: any) => sum + r.amount, 0),
        };
    }, [paymentRequests]);

    const toggleSelectAll = () => {
        if (selectedRequests.length === approvedRequests.length) {
            setSelectedRequests([]);
        } else {
            setSelectedRequests(approvedRequests.map((r) => r.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedRequests((prev) =>
            prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
        );
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center"><DollarSign className="h-6 w-6 text-white" /></div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Accounts Payable & Payment Approval</h1>
                            <p className="text-sm text-gray-500">Manage payment requests and multi-stage approval workflow</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline">Export Report</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">New Payment Request</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4 border-l-4 border-l-amber-600">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center"><Clock className="h-5 w-5 text-amber-600" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Pending Review</p>
                                <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 border-l-4 border-l-blue-600">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center"><FileText className="h-5 w-5 text-blue-600" /></div>
                            <div>
                                <p className="text-sm text-gray-500">In Review</p>
                                <p className="text-xl font-bold text-gray-900">{stats.inReview}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 border-l-4 border-l-emerald-600">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Approved</p>
                                <p className="text-xl font-bold text-gray-900">{stats.approved}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 border-l-4 border-l-indigo-600">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Banknote className="h-5 w-5 text-indigo-600" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        {/* ĐÃ FIX: Thêm định kiểu tường minh cho e */}
                        <Input placeholder="Search by Request ID, Vendor..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className="pl-9" />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-review">In Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                        <SelectTrigger className="w-48">
                            <Building2 className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="BD">Business Development</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {selectedRequests.length > 0 && (
                <div className="bg-blue-50 border-b border-blue-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CheckSquare className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">{selectedRequests.length} request(s) selected</span>
                            <span className="text-sm text-gray-600">Total: {formatCurrency(selectedAmount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedRequests([])}>Clear Selection</Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={selectedRequests.length === 0}><Send className="h-4 w-4 mr-2" />Bulk Pay ({selectedRequests.length})</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-auto p-6">
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left"><Checkbox checked={selectedRequests.length === approvedRequests.length && approvedRequests.length > 0} onCheckedChange={toggleSelectAll} /></th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Request ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vendor</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Approval Stage</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4"><Checkbox checked={selectedRequests.includes(request.id)} onCheckedChange={() => toggleSelect(request.id)} disabled={request.status !== 'approved'} /></td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold text-gray-900">{request.requestId}</p>
                                            <p className="text-xs text-gray-500">INV: {request.invoiceNumber}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-900">{request.vendor}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{request.description}</p>
                                        </td>
                                        <td className="px-4 py-4"><Badge className={getDepartmentColor(request.department)}>{request.department}</Badge></td>
                                        <td className="px-4 py-4">
                                            <p className="font-bold text-gray-900">{formatCurrency(request.amount)}</p>
                                            {getPriorityBadge(request.priority)}
                                        </td>
                                        <td className="px-4 py-4">{request.dueDate}</td>
                                        <td className="px-4 py-4"><ApprovalStepper request={request} /></td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" onClick={() => setViewingInvoice(request)}>View</Button>
                                                {request.status === 'pending' && (
                                                    <>
                                                        <Button size="sm" className="bg-emerald-600 text-white" onClick={() => setApprovalModal({ open: true, mode: 'approve', claimId: request.claimId })}>Approve</Button>
                                                        <Button size="sm" variant="destructive" onClick={() => setApprovalModal({ open: true, mode: 'reject', claimId: request.claimId })}>Reject</Button>
                                                    </>
                                                )}
                                                {request.status === 'approved' && (
                                                    <Button size="sm" className="bg-emerald-600 text-white" onClick={() => request.claimId && confirm('Mark PAID?') && markPaidMutation.mutate(request.claimId)}>Pay</Button>
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

            {viewingInvoice && <InvoiceModal request={viewingInvoice} isOpen={!!viewingInvoice} onClose={() => setViewingInvoice(null)} />}

            {/* ĐÃ FIX: Định kiểu tường minh (open: boolean) */}
            <Dialog open={approvalModal.open} onOpenChange={(open: boolean) => setApprovalModal((s) => ({ ...s, open }))}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>{approvalModal.mode === 'approve' ? 'Approve Payment Request' : 'Reject Payment Request'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <Textarea id="approvalNotes" className="mt-2" rows={6} placeholder="Nhập ghi chú kiểm toán..." />
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <Button className="bg-emerald-600 text-white" onClick={() => {
                                const notes = (document.getElementById('approvalNotes') as HTMLTextAreaElement)?.value ?? '';
                                if (approvalModal.mode === 'approve') approveMutation.mutate({ claimId: approvalModal.claimId, notes });
                                else rejectMutation.mutate({ claimId: approvalModal.claimId, reason: notes });
                                setApprovalModal({ open: false, mode: null });
                            }}>Xác nhận</Button>
                            <Button variant="outline" onClick={() => setApprovalModal({ open: false, mode: null })}>Hủy</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}