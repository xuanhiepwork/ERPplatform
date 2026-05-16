import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeDetails } from '../../../../../services/financeService';
import { FileText, Building2, Mail, Phone, ShieldCheck, CheckCircle2, Download, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../../components/ui/dialog';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { PaymentRequest } from './types';
import { formatCurrency } from './utils';

interface InvoiceModalProps {
    request: PaymentRequest;
    isOpen: boolean;
    onClose: () => void;
}

export function InvoiceModal({ request, isOpen, onClose }: InvoiceModalProps) {
    if (!isOpen) return null;

    const { data: expenseDetail, isLoading } = useQuery({
        queryKey: ['finance', 'expense', request.claimId],
        enabled: !!request.claimId && isOpen,
        queryFn: () => financeDetails.getExpense(request.claimId!)
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Invoice Details - {request.invoiceNumber}
                    </DialogTitle>
                    <DialogDescription>
                        Payment request {request.requestId} · {request.department} Department
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Vendor Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{request.vendor}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{request.email || `billing@${request.vendor.toLowerCase().replace(/\s+/g, '')}.com`}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">{request.phone || '+1 (555) 123-4567'}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Invoice Number:</span>
                                        <span className="font-medium">{request.invoiceNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Issue Date:</span>
                                        <span className="font-medium">{request.submittedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Due Date:</span>
                                        <span className="font-medium text-red-600">{request.dueDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Method:</span>
                                        <span className="font-medium">{request.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Description of Services</h3>
                        <Card className="p-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-start pb-3 border-b">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{request.description}</p>
                                        <p className="text-sm text-gray-600 mt-1">Category: {request.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{formatCurrency(request.amount)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-semibold text-gray-900">Total Amount Due:</span>
                                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(request.amount)}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            E-Signature & Approval Timeline
                        </h3>
                        <div className="space-y-3">
                            {request.signatures.accountant && (
                                <Card className="p-4 bg-emerald-50 border-emerald-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Accountant Approval</p>
                                                <p className="text-sm text-gray-600">Verified and approved by {request.signatures.accountant.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right text-sm">
                                            <p className="font-medium text-gray-900">{request.signatures.accountant.date}</p>
                                            <p className="text-gray-600">{request.signatures.accountant.time}</p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {isLoading ? (
                                <div className="text-sm text-gray-500">Loading audit notes...</div>
                            ) : (
                                expenseDetail && (
                                    <Card className="p-4 bg-gray-50">
                                        <div>
                                            <h4 className="font-semibold mb-2">Audit Notes</h4>
                                            <pre className="text-xs whitespace-pre-wrap">{expenseDetail.approval_notes || expenseDetail.reject_reason || 'No notes recorded'}</pre>
                                        </div>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2" /> Download Invoice
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Printer className="h-4 w-4 mr-2" /> Print
                        </Button>
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}