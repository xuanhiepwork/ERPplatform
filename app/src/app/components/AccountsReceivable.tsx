import { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  DollarSign,
  FileText,
  Send,
  Bell,
  Download,
  Filter,
  Search,
  Calendar,
  Users,
  Target,
  Mail,
  Phone,
  Building2,
  BarChart3,
  Plus,
  RefreshCw,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
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
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ARRecord {
  id: string;
  partnerName: string;
  partnerType: string;
  contactPerson: string;
  email: string;
  phone: string;
  contractValue: number;
  invoicedAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentStatus: 'paid' | 'partial' | 'overdue' | 'pending';
  daysOverdue: number;
  agingBucket: '0-30' | '31-60' | '61-90' | '90+' | 'current';
  lastReminder?: string;
  reminderCount: number;
  contractId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const arRecords: ARRecord[] = [
  {
    id: 'ar-001',
    partnerName: 'TechCorp Solutions Ltd.',
    partnerType: 'Enterprise Client',
    contactPerson: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    phone: '+1 (555) 234-5678',
    contractValue: 250000,
    invoicedAmount: 125000,
    paidAmount: 0,
    outstandingAmount: 125000,
    invoiceNumber: 'INV-2026-0315',
    invoiceDate: 'Mar 15, 2026',
    dueDate: 'Mar 20, 2026',
    paymentStatus: 'overdue',
    daysOverdue: 31,
    agingBucket: '31-60',
    lastReminder: 'Apr 15, 2026',
    reminderCount: 3,
    contractId: 'CTR-BD-2026-045',
    priority: 'critical',
  },
  {
    id: 'ar-002',
    partnerName: 'Global Ventures Inc.',
    partnerType: 'Strategic Partner',
    contactPerson: 'Sarah Williams',
    email: 'sarah.w@globalventures.com',
    phone: '+1 (555) 345-6789',
    contractValue: 180000,
    invoicedAmount: 90000,
    paidAmount: 45000,
    outstandingAmount: 45000,
    invoiceNumber: 'INV-2026-0328',
    invoiceDate: 'Mar 28, 2026',
    dueDate: 'Apr 12, 2026',
    paymentStatus: 'overdue',
    daysOverdue: 8,
    agingBucket: '0-30',
    lastReminder: 'Apr 18, 2026',
    reminderCount: 1,
    contractId: 'CTR-BD-2026-052',
    priority: 'high',
  },
  {
    id: 'ar-003',
    partnerName: 'Innovate Systems',
    partnerType: 'Technology Partner',
    contactPerson: 'David Park',
    email: 'dpark@innovatesystems.com',
    phone: '+1 (555) 456-7890',
    contractValue: 320000,
    invoicedAmount: 320000,
    paidAmount: 320000,
    outstandingAmount: 0,
    invoiceNumber: 'INV-2026-0310',
    invoiceDate: 'Mar 10, 2026',
    dueDate: 'Mar 25, 2026',
    paymentStatus: 'paid',
    daysOverdue: 0,
    agingBucket: 'current',
    reminderCount: 0,
    contractId: 'CTR-BD-2026-041',
    priority: 'low',
  },
  {
    id: 'ar-004',
    partnerName: 'Pacific Trade Co.',
    partnerType: 'Distribution Partner',
    contactPerson: 'Jennifer Lee',
    email: 'jlee@pacifictrade.com',
    phone: '+1 (555) 567-8901',
    contractValue: 450000,
    invoicedAmount: 225000,
    paidAmount: 0,
    outstandingAmount: 225000,
    invoiceNumber: 'INV-2026-0201',
    invoiceDate: 'Feb 1, 2026',
    dueDate: 'Feb 15, 2026',
    paymentStatus: 'overdue',
    daysOverdue: 64,
    agingBucket: '61-90',
    lastReminder: 'Apr 10, 2026',
    reminderCount: 5,
    contractId: 'CTR-BD-2026-038',
    priority: 'critical',
  },
  {
    id: 'ar-005',
    partnerName: 'Summit Consulting Group',
    partnerType: 'Service Partner',
    contactPerson: 'Robert Martinez',
    email: 'rmartinez@summitconsult.com',
    phone: '+1 (555) 678-9012',
    contractValue: 95000,
    invoicedAmount: 95000,
    paidAmount: 0,
    outstandingAmount: 95000,
    invoiceNumber: 'INV-2026-0405',
    invoiceDate: 'Apr 5, 2026',
    dueDate: 'Apr 20, 2026',
    paymentStatus: 'pending',
    daysOverdue: 0,
    agingBucket: 'current',
    reminderCount: 0,
    contractId: 'CTR-BD-2026-058',
    priority: 'medium',
  },
  {
    id: 'ar-006',
    partnerName: 'Metro Industries LLC',
    partnerType: 'Manufacturing Partner',
    contactPerson: 'Amanda Foster',
    email: 'afoster@metroindustries.com',
    phone: '+1 (555) 789-0123',
    contractValue: 580000,
    invoicedAmount: 290000,
    paidAmount: 145000,
    outstandingAmount: 145000,
    invoiceNumber: 'INV-2026-0318',
    invoiceDate: 'Mar 18, 2026',
    dueDate: 'Apr 2, 2026',
    paymentStatus: 'overdue',
    daysOverdue: 18,
    agingBucket: '0-30',
    lastReminder: 'Apr 17, 2026',
    reminderCount: 2,
    contractId: 'CTR-BD-2026-048',
    priority: 'high',
  },
  {
    id: 'ar-007',
    partnerName: 'Digital Dynamics Corp.',
    partnerType: 'Technology Partner',
    contactPerson: 'Kevin Zhang',
    email: 'kzhang@digitaldynamics.com',
    phone: '+1 (555) 890-1234',
    contractValue: 175000,
    invoicedAmount: 175000,
    paidAmount: 0,
    outstandingAmount: 175000,
    invoiceNumber: 'INV-2026-0125',
    invoiceDate: 'Jan 25, 2026',
    dueDate: 'Feb 10, 2026',
    paymentStatus: 'overdue',
    daysOverdue: 69,
    agingBucket: '61-90',
    lastReminder: 'Apr 12, 2026',
    reminderCount: 6,
    contractId: 'CTR-BD-2026-032',
    priority: 'critical',
  },
  {
    id: 'ar-008',
    partnerName: 'Coastal Enterprises',
    partnerType: 'Distribution Partner',
    contactPerson: 'Lisa Thompson',
    email: 'lthompson@coastalent.com',
    phone: '+1 (555) 901-2345',
    contractValue: 210000,
    invoicedAmount: 105000,
    paidAmount: 52500,
    outstandingAmount: 52500,
    invoiceNumber: 'INV-2026-0410',
    invoiceDate: 'Apr 10, 2026',
    dueDate: 'Apr 25, 2026',
    paymentStatus: 'pending',
    daysOverdue: 0,
    agingBucket: 'current',
    reminderCount: 0,
    contractId: 'CTR-BD-2026-061',
    priority: 'medium',
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'partial':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'pending':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'overdue':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'partial':
      return <Clock className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'overdue':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-600 text-white';
    case 'high':
      return 'bg-orange-600 text-white';
    case 'medium':
      return 'bg-amber-600 text-white';
    case 'low':
      return 'bg-gray-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

function ReminderModal({ record, isOpen, onClose }: { record: ARRecord; isOpen: boolean; onClose: () => void }) {
  const [reminderMessage, setReminderMessage] = useState(
    `Dear ${record.contactPerson},\n\nThis is a payment reminder for Invoice ${record.invoiceNumber} in the amount of ${formatCurrency(record.outstandingAmount)}.\n\nThe payment was due on ${record.dueDate} and is currently ${record.daysOverdue} days overdue.\n\nPlease arrange payment at your earliest convenience.\n\nBest regards,\nAccounts Receivable Team`
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Bell className="h-6 w-6 text-red-600" />
            Send Payment Reminder
          </DialogTitle>
          <DialogDescription>
            {record.partnerName} · Invoice {record.invoiceNumber} · {record.daysOverdue} days overdue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Recipient Info */}
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-600" />
                <span className="font-medium">{record.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-600" />
                <span>{record.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span>{record.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                <span>Outstanding: {formatCurrency(record.outstandingAmount)}</span>
              </div>
            </div>
          </Card>

          {/* Reminder History */}
          {record.reminderCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                <span>
                  {record.reminderCount} reminder{record.reminderCount > 1 ? 's' : ''} sent previously. 
                  Last sent: {record.lastReminder}
                </span>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Message
            </label>
            <textarea
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-red-600 hover:bg-red-700">
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AccountsReceivable() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAging, setFilterAging] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reminderRecord, setReminderRecord] = useState<ARRecord | null>(null);

  // Calculate metrics
  const totalOutstanding = arRecords.reduce((sum, r) => sum + r.outstandingAmount, 0);
  const overdueAmount = arRecords
    .filter((r) => r.paymentStatus === 'overdue')
    .reduce((sum, r) => sum + r.outstandingAmount, 0);
  const currentAmount = arRecords
    .filter((r) => r.paymentStatus === 'pending')
    .reduce((sum, r) => sum + r.outstandingAmount, 0);
  const paidAmount = arRecords.reduce((sum, r) => sum + r.paidAmount, 0);

  // Aging report data
  const agingData = [
    {
      bucket: 'Current',
      amount: arRecords
        .filter((r) => r.agingBucket === 'current')
        .reduce((sum, r) => sum + r.outstandingAmount, 0),
      count: arRecords.filter((r) => r.agingBucket === 'current').length,
    },
    {
      bucket: '0-30 Days',
      amount: arRecords
        .filter((r) => r.agingBucket === '0-30')
        .reduce((sum, r) => sum + r.outstandingAmount, 0),
      count: arRecords.filter((r) => r.agingBucket === '0-30').length,
    },
    {
      bucket: '31-60 Days',
      amount: arRecords
        .filter((r) => r.agingBucket === '31-60')
        .reduce((sum, r) => sum + r.outstandingAmount, 0),
      count: arRecords.filter((r) => r.agingBucket === '31-60').length,
    },
    {
      bucket: '61-90 Days',
      amount: arRecords
        .filter((r) => r.agingBucket === '61-90')
        .reduce((sum, r) => sum + r.outstandingAmount, 0),
      count: arRecords.filter((r) => r.agingBucket === '61-90').length,
    },
    {
      bucket: '90+ Days',
      amount: arRecords
        .filter((r) => r.agingBucket === '90+')
        .reduce((sum, r) => sum + r.outstandingAmount, 0),
      count: arRecords.filter((r) => r.agingBucket === '90+').length,
    },
  ];

  const getBarColor = (bucket: string) => {
    switch (bucket) {
      case 'Current':
        return '#10b981'; // emerald-500
      case '0-30 Days':
        return '#3b82f6'; // blue-500
      case '31-60 Days':
        return '#f59e0b'; // amber-500
      case '61-90 Days':
        return '#f97316'; // orange-500
      case '90+ Days':
        return '#dc2626'; // red-600
      default:
        return '#6b7280';
    }
  };

  const filteredRecords = arRecords.filter((record) => {
    const matchesStatus = filterStatus === 'all' || record.paymentStatus === filterStatus;
    const matchesAging = filterAging === 'all' || record.agingBucket === filterAging;
    const matchesSearch =
      record.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.contractId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesAging && matchesSearch;
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-900">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.bucket}</p>
          <p className="text-sm text-gray-700">
            Amount: <span className="font-bold">{formatCurrency(payload[0].value)}</span>
          </p>
          <p className="text-xs text-gray-600">
            {payload[0].payload.count} invoice{payload[0].payload.count !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b-2 border-red-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Accounts Receivable & Debt Tracking
              </h1>
              <p className="text-sm text-gray-400">
                Monitor outstanding payments and aging analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Auto-generate Invoice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-red-900 to-red-950 border-2 border-red-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-600 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-red-300 uppercase tracking-wider">
                  Total Outstanding
                </p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalOutstanding)}</p>
                <p className="text-xs text-red-400 mt-1">Requires immediate attention</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-900 to-orange-950 border-2 border-orange-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-orange-600 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wider">
                  Overdue Debt
                </p>
                <p className="text-2xl font-bold text-white">{formatCurrency(overdueAmount)}</p>
                <p className="text-xs text-orange-400 mt-1">
                  {arRecords.filter((r) => r.paymentStatus === 'overdue').length} overdue invoices
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-emerald-900 to-emerald-950 border-2 border-emerald-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Collected YTD
                </p>
                <p className="text-2xl font-bold text-white">{formatCurrency(paidAmount)}</p>
                <p className="text-xs text-emerald-400 mt-1">Year to date collections</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-amber-900 to-amber-950 border-2 border-amber-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-amber-600 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-300 uppercase tracking-wider">
                  Current (Not Due)
                </p>
                <p className="text-2xl font-bold text-white">{formatCurrency(currentAmount)}</p>
                <p className="text-xs text-amber-400 mt-1">Within payment terms</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Aging Report Section */}
      <div className="bg-gray-950 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-red-500" />
              Aging Report - Outstanding Receivables
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Distribution of outstanding debt by aging bucket
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <Card className="p-6 bg-gray-900 border-2 border-gray-700">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={agingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="bucket"
                  tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 600 }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <YAxis
                  tick={{ fill: '#d1d5db', fontSize: 12 }}
                  tickLine={{ stroke: '#4b5563' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(75, 85, 99, 0.3)' }} />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.bucket)} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          {/* Aging Summary */}
          <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t-2 border-gray-700">
            {agingData.map((bucket, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="h-3 w-full rounded-full mb-2"
                  style={{ backgroundColor: getBarColor(bucket.bucket) }}
                />
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
            <Input
              placeholder="Search by Partner Name, Invoice, or Contract ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
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
              <SelectItem value="partial">Partial Payment</SelectItem>
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
              <SelectItem value="31-60">31-60 Days</SelectItem>
              <SelectItem value="61-90">61-90 Days</SelectItem>
              <SelectItem value="90+">90+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AR Table */}
      <div className="flex-1 overflow-auto p-6 bg-gray-900">
        <Card className="bg-gray-950 border-2 border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b-2 border-red-600">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Partner Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Contract Value
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Invoiced Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Outstanding
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-red-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className={cn(
                      'hover:bg-gray-800 transition-colors',
                      record.paymentStatus === 'overdue' && 'bg-red-950/20'
                    )}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className={cn('h-2 w-2 rounded-full mt-2', getPriorityColor(record.priority))} />
                        <div>
                          <p className="font-semibold text-white">{record.partnerName}</p>
                          <p className="text-xs text-gray-400">{record.partnerType}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{record.contactPerson}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-white">{formatCurrency(record.contractValue)}</p>
                      <p className="text-xs text-gray-500">Contract {record.contractId}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-blue-400">{formatCurrency(record.invoicedAmount)}</p>
                      <p className="text-xs text-gray-500">{record.invoiceNumber}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p
                        className={cn(
                          'text-lg font-bold',
                          record.outstandingAmount > 0 ? 'text-red-400' : 'text-emerald-400'
                        )}
                      >
                        {formatCurrency(record.outstandingAmount)}
                      </p>
                      {record.paidAmount > 0 && (
                        <p className="text-xs text-gray-500">
                          Paid: {formatCurrency(record.paidAmount)}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <Badge className={cn('flex items-center gap-1 w-fit', getStatusColor(record.paymentStatus))}>
                          {getStatusIcon(record.paymentStatus)}
                          {record.paymentStatus.charAt(0).toUpperCase() + record.paymentStatus.slice(1)}
                        </Badge>
                        {record.paymentStatus === 'overdue' && (
                          <div className="flex items-center gap-1 text-xs text-red-400">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="font-semibold">{record.daysOverdue} days overdue</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className={cn(
                            'text-sm font-medium',
                            record.paymentStatus === 'overdue' ? 'text-red-400' : 'text-white'
                          )}>
                            {record.dueDate}
                          </p>
                          {record.reminderCount > 0 && (
                            <p className="text-xs text-amber-500">
                              {record.reminderCount} reminder(s) sent
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {record.paymentStatus === 'overdue' && (
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 border-2 border-red-400"
                            onClick={() => setReminderRecord(record)}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Send Reminder
                          </Button>
                        )}
                        {record.outstandingAmount > 0 && record.paymentStatus !== 'overdue' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-600 text-emerald-400 hover:bg-emerald-950"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                        {record.paymentStatus === 'paid' && (
                          <Badge className="bg-emerald-900 text-emerald-300 border-emerald-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
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
          <Card className="p-5 bg-gradient-to-br from-red-950 to-gray-950 border-2 border-red-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-600 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-red-300 uppercase tracking-wider">
                  Critical Priority
                </p>
                <p className="text-2xl font-bold text-white">
                  {arRecords.filter((r) => r.priority === 'critical').length}
                </p>
                <p className="text-xs text-red-400 mt-1">
                  {formatCurrency(
                    arRecords
                      .filter((r) => r.priority === 'critical')
                      .reduce((sum, r) => sum + r.outstandingAmount, 0)
                  )}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-amber-950 to-gray-950 border-2 border-amber-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-amber-600 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-300 uppercase tracking-wider">
                  Avg Days Outstanding
                </p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(
                    arRecords
                      .filter((r) => r.daysOverdue > 0)
                      .reduce((sum, r) => sum + r.daysOverdue, 0) /
                      Math.max(arRecords.filter((r) => r.daysOverdue > 0).length, 1)
                  )}{' '}
                  days
                </p>
                <p className="text-xs text-amber-400 mt-1">For overdue invoices</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-blue-950 to-gray-950 border-2 border-blue-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-300 uppercase tracking-wider">
                  Total Partners
                </p>
                <p className="text-2xl font-bold text-white">{arRecords.length}</p>
                <p className="text-xs text-blue-400 mt-1">
                  {arRecords.filter((r) => r.outstandingAmount > 0).length} with outstanding balance
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Reminder Modal */}
      {reminderRecord && (
        <ReminderModal
          record={reminderRecord}
          isOpen={!!reminderRecord}
          onClose={() => setReminderRecord(null)}
        />
      )}
    </div>
  );
}
