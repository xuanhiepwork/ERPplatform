import { useState } from 'react';
import {
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Banknote,
  Building2,
  User,
  CheckSquare,
  X,
  Send,
  Printer,
  Mail,
  Phone,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { cn } from './ui/utils';

interface PaymentRequest {
  id: string;
  requestId: string;
  vendor: string;
  department: 'Marketing' | 'HR' | 'BD' | 'Operations' | 'IT' | 'Finance';
  amount: number;
  dueDate: string;
  submittedDate: string;
  description: string;
  invoiceNumber: string;
  approvalStage: {
    accountant: 'pending' | 'approved' | 'rejected';
    chiefAccountant: 'pending' | 'approved' | 'rejected';
    director: 'pending' | 'approved' | 'rejected';
  };
  signatures: {
    accountant?: { name: string; date: string; time: string };
    chiefAccountant?: { name: string; date: string; time: string };
    director?: { name: string; date: string; time: string };
  };
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'paid';
  priority: 'high' | 'medium' | 'low';
  paymentMethod: 'Bank Transfer' | 'Check' | 'Wire Transfer';
  category: string;
}

const paymentRequests: PaymentRequest[] = [
  {
    id: 'pay-001',
    requestId: 'AP-2026-0421',
    vendor: 'Google Ads Services',
    department: 'Marketing',
    amount: 15750.00,
    dueDate: 'Apr 25, 2026',
    submittedDate: 'Apr 18, 2026',
    description: 'Q2 Digital Marketing Campaign - Google Ads Budget',
    invoiceNumber: 'INV-GA-2026-04-0158',
    approvalStage: {
      accountant: 'approved',
      chiefAccountant: 'approved',
      director: 'pending',
    },
    signatures: {
      accountant: { name: 'Lisa Anderson', date: 'Apr 18, 2026', time: '10:24 AM' },
      chiefAccountant: { name: 'Robert Chen', date: 'Apr 19, 2026', time: '2:15 PM' },
    },
    status: 'in-review',
    priority: 'high',
    paymentMethod: 'Bank Transfer',
    category: 'Marketing Expenses',
  },
  {
    id: 'pay-002',
    requestId: 'AP-2026-0418',
    vendor: 'LinkedIn Talent Solutions',
    department: 'HR',
    amount: 8500.00,
    dueDate: 'Apr 22, 2026',
    submittedDate: 'Apr 16, 2026',
    description: 'Recruitment Platform Subscription - Annual License',
    invoiceNumber: 'INV-LI-2026-Q2-0042',
    approvalStage: {
      accountant: 'approved',
      chiefAccountant: 'approved',
      director: 'approved',
    },
    signatures: {
      accountant: { name: 'Lisa Anderson', date: 'Apr 16, 2026', time: '3:45 PM' },
      chiefAccountant: { name: 'Robert Chen', date: 'Apr 17, 2026', time: '9:30 AM' },
      director: { name: 'Sarah Thompson', date: 'Apr 17, 2026', time: '4:20 PM' },
    },
    status: 'approved',
    priority: 'medium',
    paymentMethod: 'Bank Transfer',
    category: 'HR Software',
  },
  {
    id: 'pay-003',
    requestId: 'AP-2026-0420',
    vendor: 'Trade Show Expo Inc.',
    department: 'BD',
    amount: 22500.00,
    dueDate: 'Apr 30, 2026',
    submittedDate: 'Apr 19, 2026',
    description: 'Industry Conference Booth & Sponsorship Package',
    invoiceNumber: 'INV-TSE-2026-0314',
    approvalStage: {
      accountant: 'approved',
      chiefAccountant: 'pending',
      director: 'pending',
    },
    signatures: {
      accountant: { name: 'Lisa Anderson', date: 'Apr 19, 2026', time: '11:05 AM' },
    },
    status: 'in-review',
    priority: 'medium',
    paymentMethod: 'Wire Transfer',
    category: 'Events & Conferences',
  },
  {
    id: 'pay-004',
    requestId: 'AP-2026-0415',
    vendor: 'AWS Cloud Services',
    department: 'IT',
    amount: 12350.00,
    dueDate: 'Apr 24, 2026',
    submittedDate: 'Apr 15, 2026',
    description: 'Cloud Infrastructure - Monthly Usage March 2026',
    invoiceNumber: 'INV-AWS-202603-7891',
    approvalStage: {
      accountant: 'approved',
      chiefAccountant: 'approved',
      director: 'approved',
    },
    signatures: {
      accountant: { name: 'Lisa Anderson', date: 'Apr 15, 2026', time: '1:20 PM' },
      chiefAccountant: { name: 'Robert Chen', date: 'Apr 15, 2026', time: '4:10 PM' },
      director: { name: 'Sarah Thompson', date: 'Apr 16, 2026', time: '10:35 AM' },
    },
    status: 'approved',
    priority: 'high',
    paymentMethod: 'Bank Transfer',
    category: 'IT Infrastructure',
  },
  {
    id: 'pay-005',
    requestId: 'AP-2026-0422',
    vendor: 'Office Supplies Plus',
    department: 'Operations',
    amount: 1850.00,
    dueDate: 'May 5, 2026',
    submittedDate: 'Apr 20, 2026',
    description: 'Monthly Office Supplies & Stationery Order',
    invoiceNumber: 'INV-OSP-2026-0891',
    approvalStage: {
      accountant: 'pending',
      chiefAccountant: 'pending',
      director: 'pending',
    },
    signatures: {},
    status: 'pending',
    priority: 'low',
    paymentMethod: 'Check',
    category: 'Office Supplies',
  },
  {
    id: 'pay-006',
    requestId: 'AP-2026-0417',
    vendor: 'Professional Insurance Co.',
    department: 'Finance',
    amount: 18900.00,
    dueDate: 'Apr 28, 2026',
    submittedDate: 'Apr 17, 2026',
    description: 'Business Liability Insurance - Q2 Premium Payment',
    invoiceNumber: 'INV-PIC-2026-Q2-001',
    approvalStage: {
      accountant: 'approved',
      chiefAccountant: 'approved',
      director: 'approved',
    },
    signatures: {
      accountant: { name: 'Lisa Anderson', date: 'Apr 17, 2026', time: '2:50 PM' },
      chiefAccountant: { name: 'Robert Chen', date: 'Apr 18, 2026', time: '10:15 AM' },
      director: { name: 'Sarah Thompson', date: 'Apr 18, 2026', time: '3:40 PM' },
    },
    status: 'approved',
    priority: 'high',
    paymentMethod: 'Bank Transfer',
    category: 'Insurance',
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getDepartmentColor = (department: string) => {
  switch (department) {
    case 'Marketing':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'HR':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'BD':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'Operations':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'IT':
      return 'bg-cyan-100 text-cyan-700 border-cyan-300';
    case 'Finance':
      return 'bg-indigo-100 text-indigo-700 border-indigo-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-100 text-red-700 border-red-300">High Priority</Badge>;
    case 'medium':
      return <Badge className="bg-amber-100 text-amber-700 border-amber-300">Medium</Badge>;
    case 'low':
      return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Low</Badge>;
    default:
      return null;
  }
};

function ApprovalStepper({ request }: { request: PaymentRequest }) {
  const stages = [
    {
      name: 'Accountant',
      status: request.approvalStage.accountant,
      signature: request.signatures.accountant,
    },
    {
      name: 'Chief Accountant',
      status: request.approvalStage.chiefAccountant,
      signature: request.signatures.chiefAccountant,
    },
    {
      name: 'Director',
      status: request.approvalStage.director,
      signature: request.signatures.director,
    },
  ];

  const getStageIcon = (status: string, hasSignature: boolean) => {
    if (status === 'approved' && hasSignature) {
      return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
    } else if (status === 'rejected') {
      return <XCircle className="h-5 w-5 text-red-600" />;
    } else if (status === 'pending') {
      return <Clock className="h-5 w-5 text-gray-400" />;
    }
    return <Clock className="h-5 w-5 text-gray-400" />;
  };

  const getESignatureIcon = (signature: any) => {
    if (signature) {
      return (
        <div className="relative" title={`E-signed by ${signature.name} on ${signature.date} at ${signature.time}`}>
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full border border-white" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-2">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg border',
              stage.status === 'approved'
                ? 'bg-emerald-50 border-emerald-200'
                : stage.status === 'rejected'
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200'
            )}
          >
            {getStageIcon(stage.status, !!stage.signature)}
            <span className="text-xs font-medium text-gray-700">{stage.name}</span>
            {getESignatureIcon(stage.signature)}
          </div>
          {index < stages.length - 1 && (
            <div className="h-0.5 w-4 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}

function InvoiceModal({ request, isOpen, onClose }: { request: PaymentRequest; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

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
          {/* Invoice Header */}
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
                    <span className="text-gray-600">billing@{request.vendor.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
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

          {/* Line Items */}
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

          {/* Approval Timeline */}
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
              {request.signatures.chiefAccountant && (
                <Card className="p-4 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Chief Accountant Approval</p>
                        <p className="text-sm text-gray-600">Verified and approved by {request.signatures.chiefAccountant.name}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium text-gray-900">{request.signatures.chiefAccountant.date}</p>
                      <p className="text-gray-600">{request.signatures.chiefAccountant.time}</p>
                    </div>
                  </div>
                </Card>
              )}
              {request.signatures.director && (
                <Card className="p-4 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Director Approval</p>
                        <p className="text-sm text-gray-600">Final approval by {request.signatures.director.name}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium text-gray-900">{request.signatures.director.date}</p>
                      <p className="text-gray-600">{request.signatures.director.time}</p>
                    </div>
                  </div>
                </Card>
              )}
              {!request.signatures.director && request.approvalStage.director === 'pending' && (
                <Card className="p-4 bg-amber-50 border-amber-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <p className="text-sm text-gray-700">Awaiting approval at {
                      !request.signatures.accountant ? 'Accountant' :
                      !request.signatures.chiefAccountant ? 'Chief Accountant' : 'Director'
                    } level</p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AccountsPayable() {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingInvoice, setViewingInvoice] = useState<PaymentRequest | null>(null);

  const filteredRequests = paymentRequests.filter((request) => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;
    const matchesSearch =
      request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const approvedRequests = filteredRequests.filter((r) => r.status === 'approved');
  const totalApprovedAmount = approvedRequests.reduce((sum, r) => sum + r.amount, 0);
  const selectedAmount = paymentRequests
    .filter((r) => selectedRequests.includes(r.id) && r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

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

  const stats = {
    pending: paymentRequests.filter((r) => r.status === 'pending').length,
    inReview: paymentRequests.filter((r) => r.status === 'in-review').length,
    approved: paymentRequests.filter((r) => r.status === 'approved').length,
    totalAmount: paymentRequests.reduce((sum, r) => sum + r.amount, 0),
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Accounts Payable & Payment Approval
              </h1>
              <p className="text-sm text-gray-500">
                Manage payment requests and multi-stage approval workflow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              New Payment Request
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 border-l-4 border-l-amber-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Review</p>
                <p className="text-xl font-bold text-gray-900">{stats.inReview}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-emerald-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-indigo-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Banknote className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Request ID, Vendor, or Invoice Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
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
              <SelectValue />
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

      {/* Bulk Action Bar */}
      {selectedRequests.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">
                {selectedRequests.length} request(s) selected
              </span>
              <span className="text-sm text-gray-600">
                Total: {formatCurrency(selectedAmount)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRequests([])}
              >
                Clear Selection
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={selectedRequests.length === 0}
              >
                <Send className="h-4 w-4 mr-2" />
                Bulk Pay ({selectedRequests.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Requests Table */}
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Checkbox
                      checked={selectedRequests.length === approvedRequests.length && approvedRequests.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Vendor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Approval Stage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <Checkbox
                        checked={selectedRequests.includes(request.id)}
                        onCheckedChange={() => toggleSelect(request.id)}
                        disabled={request.status !== 'approved'}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{request.requestId}</p>
                        <p className="text-xs text-gray-500">INV: {request.invoiceNumber}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{request.vendor}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{request.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getDepartmentColor(request.department)}>
                        {request.department}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-bold text-gray-900">{formatCurrency(request.amount)}</p>
                        {getPriorityBadge(request.priority)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{request.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <ApprovalStepper request={request} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingInvoice(request)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {request.status === 'approved' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Send className="h-4 w-4 mr-1" />
                            Pay
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

        {/* Summary Footer */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Card className="p-5 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Ready to Pay</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(totalApprovedAmount)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {approvedRequests.length} approved voucher(s)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">E-Signatures</p>
                <p className="text-2xl font-bold text-blue-600">
                  {paymentRequests.filter((r) => r.signatures.director).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Fully signed requests</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-amber-50 to-white border-amber-200">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Awaiting Approval</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending + stats.inReview}
                </p>
                <p className="text-xs text-gray-500 mt-1">Pending action required</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Invoice Modal */}
      {viewingInvoice && (
        <InvoiceModal
          request={viewingInvoice}
          isOpen={!!viewingInvoice}
          onClose={() => setViewingInvoice(null)}
        />
      )}
    </div>
  );
}
