import { useState } from 'react';
import {
  DollarSign,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Download,
  Play,
  Filter,
  Search,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  CreditCard,
  UserCheck,
  MoreVertical,
  ChevronRight,
  Info,
  Smartphone,
  Mail,
  Clock,
  Receipt,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from './ui/utils';

interface PayrollEntry {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  grossSalary: number;
  deductions: {
    socialInsurance: number;
    healthInsurance: number;
    personalIncomeTax: number;
  };
  bonuses: {
    performance: number;
    attendance: number;
    other: number;
  };
  netPay: number;
  paymentStatus: 'pending' | 'processed' | 'paid';
  paymentDate?: string;
  bankAccount: string;
}

interface PayslipData extends PayrollEntry {
  payPeriod: string;
  payDate: string;
  workingDays: number;
  totalWorkingDays: number;
  overtimeHours: number;
  overtimePay: number;
}

const payrollData: PayrollEntry[] = [
  {
    id: 'pr-001',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP-001',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    grossSalary: 12000,
    deductions: {
      socialInsurance: 960,
      healthInsurance: 360,
      personalIncomeTax: 2100,
    },
    bonuses: {
      performance: 2000,
      attendance: 500,
      other: 0,
    },
    netPay: 11080,
    paymentStatus: 'paid',
    paymentDate: 'Apr 01, 2026',
    bankAccount: '****6789',
  },
  {
    id: 'pr-002',
    employeeName: 'Michael Chen',
    employeeId: 'EMP-002',
    department: 'Engineering',
    position: 'Engineering Manager',
    grossSalary: 15000,
    deductions: {
      socialInsurance: 1200,
      healthInsurance: 450,
      personalIncomeTax: 3000,
    },
    bonuses: {
      performance: 3000,
      attendance: 500,
      other: 1000,
    },
    netPay: 13850,
    paymentStatus: 'paid',
    paymentDate: 'Apr 01, 2026',
    bankAccount: '****4321',
  },
  {
    id: 'pr-003',
    employeeName: 'Emily Rodriguez',
    employeeId: 'EMP-003',
    department: 'Design',
    position: 'Senior UX Designer',
    grossSalary: 10000,
    deductions: {
      socialInsurance: 800,
      healthInsurance: 300,
      personalIncomeTax: 1500,
    },
    bonuses: {
      performance: 1500,
      attendance: 500,
      other: 0,
    },
    netPay: 9400,
    paymentStatus: 'processed',
    bankAccount: '****8765',
  },
  {
    id: 'pr-004',
    employeeName: 'David Kim',
    employeeId: 'EMP-004',
    department: 'Engineering',
    position: 'Backend Engineer',
    grossSalary: 11000,
    deductions: {
      socialInsurance: 880,
      healthInsurance: 330,
      personalIncomeTax: 1800,
    },
    bonuses: {
      performance: 1800,
      attendance: 500,
      other: 0,
    },
    netPay: 10290,
    paymentStatus: 'processed',
    bankAccount: '****2468',
  },
  {
    id: 'pr-005',
    employeeName: 'Jessica Park',
    employeeId: 'EMP-005',
    department: 'Data Science',
    position: 'Lead Data Scientist',
    grossSalary: 13000,
    deductions: {
      socialInsurance: 1040,
      healthInsurance: 390,
      personalIncomeTax: 2400,
    },
    bonuses: {
      performance: 2500,
      attendance: 500,
      other: 500,
    },
    netPay: 12670,
    paymentStatus: 'pending',
    bankAccount: '****1357',
  },
  {
    id: 'pr-006',
    employeeName: 'Alex Thompson',
    employeeId: 'EMP-006',
    department: 'Operations',
    position: 'Operations Manager',
    grossSalary: 11500,
    deductions: {
      socialInsurance: 920,
      healthInsurance: 345,
      personalIncomeTax: 1900,
    },
    bonuses: {
      performance: 1700,
      attendance: 500,
      other: 300,
    },
    netPay: 10835,
    paymentStatus: 'pending',
    bankAccount: '****9753',
  },
  {
    id: 'pr-007',
    employeeName: 'Maria Garcia',
    employeeId: 'EMP-007',
    department: 'Marketing',
    position: 'Marketing Director',
    grossSalary: 14000,
    deductions: {
      socialInsurance: 1120,
      healthInsurance: 420,
      personalIncomeTax: 2700,
    },
    bonuses: {
      performance: 2800,
      attendance: 500,
      other: 700,
    },
    netPay: 13760,
    paymentStatus: 'pending',
    bankAccount: '****5791',
  },
];

const samplePayslip: PayslipData = {
  ...payrollData[0],
  payPeriod: 'April 2026',
  payDate: 'April 01, 2026',
  workingDays: 22,
  totalWorkingDays: 22,
  overtimeHours: 8,
  overtimePay: 400,
};

function formatCurrency(amount: number, masked: boolean = false): string {
  if (masked) {
    return '****.**';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function PayrollTable({ data }: { data: PayrollEntry[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('april-2026');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showSensitive, setShowSensitive] = useState(false);

  const filteredData = data.filter((entry) => {
    const matchesSearch =
      entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' || entry.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalGross = filteredData.reduce((sum, e) => sum + e.grossSalary, 0);
  const totalNet = filteredData.reduce((sum, e) => sum + e.netPay, 0);
  const totalDeductions = filteredData.reduce(
    (sum, e) =>
      sum +
      e.deductions.socialInsurance +
      e.deductions.healthInsurance +
      e.deductions.personalIncomeTax,
    0
  );
  const totalBonuses = filteredData.reduce(
    (sum, e) => sum + e.bonuses.performance + e.bonuses.attendance + e.bonuses.other,
    0
  );

  const pendingCount = filteredData.filter((e) => e.paymentStatus === 'pending').length;

  const getStatusBadge = (status: PayrollEntry['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'processed':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Processed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">Payroll Management</h2>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Manage employee compensation and benefits
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSensitive(!showSensitive)}
              className="border-gray-300"
            >
              {showSensitive ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Amounts
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Amounts
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Play className="h-4 w-4 mr-2" />
              Run Payroll
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="p-4 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Gross</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalGross, !showSensitive)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-emerald-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Net Pay</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalNet, !showSensitive)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-red-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Deductions</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalDeductions, !showSensitive)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-purple-600">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bonuses</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalBonuses, !showSensitive)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by employee name or ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="april-2026">April 2026</SelectItem>
              <SelectItem value="march-2026">March 2026</SelectItem>
              <SelectItem value="february-2026">February 2026</SelectItem>
              <SelectItem value="january-2026">January 2026</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <Building2 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pending Alert */}
      {pendingCount > 0 && (
        <Card className="p-4 bg-yellow-50 border-yellow-300">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {pendingCount} payroll {pendingCount === 1 ? 'entry' : 'entries'} pending
                processing
              </p>
              <p className="text-xs text-gray-600">
                Review and run payroll to process payments
              </p>
            </div>
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              Review Now
            </Button>
          </div>
        </Card>
      )}

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Employee</TableHead>
                <TableHead className="text-right">Gross Salary</TableHead>
                <TableHead className="text-right">Social Ins.</TableHead>
                <TableHead className="text-right">Health Ins.</TableHead>
                <TableHead className="text-right">Income Tax</TableHead>
                <TableHead className="text-right">Bonuses</TableHead>
                <TableHead className="text-right font-semibold">Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry) => {
                const totalDeduction =
                  entry.deductions.socialInsurance +
                  entry.deductions.healthInsurance +
                  entry.deductions.personalIncomeTax;
                const totalBonus =
                  entry.bonuses.performance + entry.bonuses.attendance + entry.bonuses.other;

                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {entry.employeeName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {entry.employeeName}
                          </p>
                          <p className="text-xs text-gray-500">{entry.employeeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(entry.grossSalary, !showSensitive)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -{formatCurrency(entry.deductions.socialInsurance, !showSensitive)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -{formatCurrency(entry.deductions.healthInsurance, !showSensitive)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -{formatCurrency(entry.deductions.personalIncomeTax, !showSensitive)}
                    </TableCell>
                    <TableCell className="text-right text-emerald-600">
                      +{formatCurrency(totalBonus, !showSensitive)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-gray-900 text-base">
                      {formatCurrency(entry.netPay, !showSensitive)}
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.paymentStatus)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Payslip
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email Payslip
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Info className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function EPayslipView({ data }: { data: PayslipData }) {
  const [showSensitive, setShowSensitive] = useState(false);

  const totalDeductions =
    data.deductions.socialInsurance +
    data.deductions.healthInsurance +
    data.deductions.personalIncomeTax;

  const totalBonuses =
    data.bonuses.performance + data.bonuses.attendance + data.bonuses.other + data.overtimePay;

  const totalEarnings = data.grossSalary + totalBonuses;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Security Badge */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Electronic Payslip</h1>
            </div>
            <p className="text-blue-100 text-sm">Confidential & Secure Document</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Pay Period</p>
            <p className="text-xl font-semibold">{data.payPeriod}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-500">
          <div>
            <p className="text-blue-100 text-sm">Employee</p>
            <p className="text-lg font-semibold">{data.employeeName}</p>
            <p className="text-blue-200 text-sm">{data.employeeId}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Payment Date</p>
            <p className="text-lg font-semibold">{data.payDate}</p>
          </div>
        </div>
      </Card>

      {/* Privacy Toggle */}
      <Card className="p-4 bg-yellow-50 border-yellow-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Privacy Protection Enabled</p>
              <p className="text-xs text-gray-600">
                Sensitive financial information is {showSensitive ? 'visible' : 'hidden'}
              </p>
            </div>
          </div>
          <Button
            variant={showSensitive ? 'default' : 'outline'}
            onClick={() => setShowSensitive(!showSensitive)}
            className={showSensitive ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            {showSensitive ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Amounts
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Amounts
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Employee Information */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-blue-600" />
          Employee Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-gray-900 mt-1">{data.employeeName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Employee ID</label>
            <p className="text-gray-900 mt-1">{data.employeeId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Department</label>
            <p className="text-gray-900 mt-1">{data.department}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Position</label>
            <p className="text-gray-900 mt-1">{data.position}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Working Days</label>
            <p className="text-gray-900 mt-1">
              {data.workingDays} / {data.totalWorkingDays} days
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Bank Account</label>
            <p className="text-gray-900 mt-1 font-mono">{data.bankAccount}</p>
          </div>
        </div>
      </Card>

      {/* Earnings */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          Earnings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-700">Base Salary</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(data.grossSalary, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-700">Performance Bonus</span>
            <span className="font-semibold text-emerald-600">
              +{formatCurrency(data.bonuses.performance, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-700">Attendance Bonus</span>
            <span className="font-semibold text-emerald-600">
              +{formatCurrency(data.bonuses.attendance, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-700">
              Overtime Pay ({data.overtimeHours} hours)
            </span>
            <span className="font-semibold text-emerald-600">
              +{formatCurrency(data.overtimePay, !showSensitive)}
            </span>
          </div>
          {data.bonuses.other > 0 && (
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-700">Other Allowances</span>
              <span className="font-semibold text-emerald-600">
                +{formatCurrency(data.bonuses.other, !showSensitive)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-3 bg-emerald-50 px-3 rounded-lg mt-2">
            <span className="font-semibold text-gray-900">Total Earnings</span>
            <span className="font-bold text-emerald-700 text-lg">
              {formatCurrency(totalEarnings, !showSensitive)}
            </span>
          </div>
        </div>
      </Card>

      {/* Deductions */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Receipt className="h-5 w-5 text-red-600" />
          Deductions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="text-gray-700">Social Insurance</p>
              <p className="text-xs text-gray-500">8% of base salary</p>
            </div>
            <span className="font-semibold text-red-600">
              -{formatCurrency(data.deductions.socialInsurance, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="text-gray-700">Health Insurance</p>
              <p className="text-xs text-gray-500">3% of base salary</p>
            </div>
            <span className="font-semibold text-red-600">
              -{formatCurrency(data.deductions.healthInsurance, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="text-gray-700">Personal Income Tax</p>
              <p className="text-xs text-gray-500">Progressive rate</p>
            </div>
            <span className="font-semibold text-red-600">
              -{formatCurrency(data.deductions.personalIncomeTax, !showSensitive)}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 bg-red-50 px-3 rounded-lg mt-2">
            <span className="font-semibold text-gray-900">Total Deductions</span>
            <span className="font-bold text-red-700 text-lg">
              -{formatCurrency(totalDeductions, !showSensitive)}
            </span>
          </div>
        </div>
      </Card>

      {/* Net Pay */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Final Net Pay</p>
            <p className="text-4xl font-bold text-blue-900">
              {formatCurrency(data.netPay, !showSensitive)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Payment via bank transfer to {data.bankAccount}
            </p>
          </div>
          <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <Mail className="h-4 w-4 mr-2" />
          Email Copy
        </Button>
        <Button variant="outline" className="flex-1">
          <Smartphone className="h-4 w-4 mr-2" />
          Share Mobile
        </Button>
      </div>

      {/* Footer */}
      <Card className="p-4 bg-gray-50">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-gray-500 mt-0.5" />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Important Notice:</p>
            <p>
              This payslip is generated electronically and is valid without signature. All
              amounts are calculated in accordance with local tax regulations. For inquiries,
              contact HR Department at hr@company.com or call +1 (555) 000-0000.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function PayrollBenefits() {
  const [activeTab, setActiveTab] = useState<'payroll' | 'payslip'>('payroll');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Payroll & Benefits</h1>
              <p className="text-sm text-gray-500">
                Secure financial management and employee compensation
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="payroll">
              <FileText className="h-4 w-4 mr-2" />
              Payroll Management
            </TabsTrigger>
            <TabsTrigger value="payslip">
              <Receipt className="h-4 w-4 mr-2" />
              E-Payslip View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'payroll' && <PayrollTable data={payrollData} />}
        {activeTab === 'payslip' && <EPayslipView data={samplePayslip} />}
      </div>
    </div>
  );
}
