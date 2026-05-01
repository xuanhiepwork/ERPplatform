import { useState } from 'react';
import {
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Search,
  Bell,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Target,
  Users,
  Briefcase,
  Megaphone,
  Code,
  Building2,
  Truck,
  Shield,
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
import { cn } from './ui/utils';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface ExpenseCategory {
  name: string;
  planned: number;
  actual: number;
  variance: number;
  variancePercent: number;
}

interface DepartmentBudget {
  id: string;
  name: string;
  icon: React.ReactNode;
  totalBudget: number;
  consumed: number;
  remaining: number;
  percentConsumed: number;
  status: 'healthy' | 'warning' | 'critical' | 'exceeded';
  categories: ExpenseCategory[];
  quarterlyTarget: number;
  lastUpdated: string;
}

const departments: DepartmentBudget[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <Megaphone className="h-6 w-6" />,
    totalBudget: 500000,
    consumed: 465000,
    remaining: 35000,
    percentConsumed: 93,
    status: 'critical',
    quarterlyTarget: 500000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Digital Advertising',
        planned: 200000,
        actual: 195000,
        variance: -5000,
        variancePercent: -2.5,
      },
      {
        name: 'Content Production',
        planned: 80000,
        actual: 92000,
        variance: 12000,
        variancePercent: 15,
      },
      {
        name: 'Events & Conferences',
        planned: 120000,
        actual: 118000,
        variance: -2000,
        variancePercent: -1.7,
      },
      {
        name: 'Brand Partnerships',
        planned: 60000,
        actual: 35000,
        variance: -25000,
        variancePercent: -41.7,
      },
      {
        name: 'Marketing Tools & Software',
        planned: 40000,
        actual: 25000,
        variance: -15000,
        variancePercent: -37.5,
      },
    ],
  },
  {
    id: 'hr',
    name: 'Human Resources',
    icon: <Users className="h-6 w-6" />,
    totalBudget: 350000,
    consumed: 245000,
    remaining: 105000,
    percentConsumed: 70,
    status: 'healthy',
    quarterlyTarget: 350000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Recruitment & Hiring',
        planned: 120000,
        actual: 85000,
        variance: -35000,
        variancePercent: -29.2,
      },
      {
        name: 'Training & Development',
        planned: 80000,
        actual: 75000,
        variance: -5000,
        variancePercent: -6.3,
      },
      {
        name: 'Employee Benefits',
        planned: 100000,
        actual: 65000,
        variance: -35000,
        variancePercent: -35,
      },
      {
        name: 'HR Software & Systems',
        planned: 30000,
        actual: 15000,
        variance: -15000,
        variancePercent: -50,
      },
      {
        name: 'Employee Engagement',
        planned: 20000,
        actual: 5000,
        variance: -15000,
        variancePercent: -75,
      },
    ],
  },
  {
    id: 'it',
    name: 'Information Technology',
    icon: <Code className="h-6 w-6" />,
    totalBudget: 800000,
    consumed: 730000,
    remaining: 70000,
    percentConsumed: 91.25,
    status: 'critical',
    quarterlyTarget: 800000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Cloud Infrastructure',
        planned: 350000,
        actual: 340000,
        variance: -10000,
        variancePercent: -2.9,
      },
      {
        name: 'Software Licenses',
        planned: 200000,
        actual: 210000,
        variance: 10000,
        variancePercent: 5,
      },
      {
        name: 'Hardware & Equipment',
        planned: 150000,
        actual: 125000,
        variance: -25000,
        variancePercent: -16.7,
      },
      {
        name: 'Cybersecurity',
        planned: 80000,
        actual: 45000,
        variance: -35000,
        variancePercent: -43.8,
      },
      {
        name: 'IT Support & Maintenance',
        planned: 20000,
        actual: 10000,
        variance: -10000,
        variancePercent: -50,
      },
    ],
  },
  {
    id: 'bd',
    name: 'Business Development',
    icon: <Briefcase className="h-6 w-6" />,
    totalBudget: 450000,
    consumed: 395000,
    remaining: 55000,
    percentConsumed: 87.8,
    status: 'warning',
    quarterlyTarget: 450000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Sales Commissions',
        planned: 200000,
        actual: 185000,
        variance: -15000,
        variancePercent: -7.5,
      },
      {
        name: 'Client Entertainment',
        planned: 80000,
        actual: 90000,
        variance: 10000,
        variancePercent: 12.5,
      },
      {
        name: 'Travel & Accommodation',
        planned: 100000,
        actual: 85000,
        variance: -15000,
        variancePercent: -15,
      },
      {
        name: 'Market Research',
        planned: 40000,
        actual: 25000,
        variance: -15000,
        variancePercent: -37.5,
      },
      {
        name: 'Partnership Development',
        planned: 30000,
        actual: 10000,
        variance: -20000,
        variancePercent: -66.7,
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: <Truck className="h-6 w-6" />,
    totalBudget: 600000,
    consumed: 420000,
    remaining: 180000,
    percentConsumed: 70,
    status: 'healthy',
    quarterlyTarget: 600000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Facility Management',
        planned: 200000,
        actual: 155000,
        variance: -45000,
        variancePercent: -22.5,
      },
      {
        name: 'Supply Chain',
        planned: 180000,
        actual: 140000,
        variance: -40000,
        variancePercent: -22.2,
      },
      {
        name: 'Equipment & Machinery',
        planned: 120000,
        actual: 85000,
        variance: -35000,
        variancePercent: -29.2,
      },
      {
        name: 'Logistics & Shipping',
        planned: 70000,
        actual: 30000,
        variance: -40000,
        variancePercent: -57.1,
      },
      {
        name: 'Quality Control',
        planned: 30000,
        actual: 10000,
        variance: -20000,
        variancePercent: -66.7,
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    icon: <DollarSign className="h-6 w-6" />,
    totalBudget: 280000,
    consumed: 196000,
    remaining: 84000,
    percentConsumed: 70,
    status: 'healthy',
    quarterlyTarget: 280000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Accounting Software',
        planned: 80000,
        actual: 65000,
        variance: -15000,
        variancePercent: -18.8,
      },
      {
        name: 'Audit & Compliance',
        planned: 90000,
        actual: 75000,
        variance: -15000,
        variancePercent: -16.7,
      },
      {
        name: 'Financial Consulting',
        planned: 60000,
        actual: 40000,
        variance: -20000,
        variancePercent: -33.3,
      },
      {
        name: 'Banking & Transaction Fees',
        planned: 35000,
        actual: 12000,
        variance: -23000,
        variancePercent: -65.7,
      },
      {
        name: 'Insurance',
        planned: 15000,
        actual: 4000,
        variance: -11000,
        variancePercent: -73.3,
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    icon: <Shield className="h-6 w-6" />,
    totalBudget: 220000,
    consumed: 209000,
    remaining: 11000,
    percentConsumed: 95,
    status: 'exceeded',
    quarterlyTarget: 220000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Legal Counsel & Retainers',
        planned: 120000,
        actual: 135000,
        variance: 15000,
        variancePercent: 12.5,
      },
      {
        name: 'Contract Review',
        planned: 45000,
        actual: 38000,
        variance: -7000,
        variancePercent: -15.6,
      },
      {
        name: 'Compliance & Regulatory',
        planned: 35000,
        actual: 28000,
        variance: -7000,
        variancePercent: -20,
      },
      {
        name: 'Intellectual Property',
        planned: 15000,
        actual: 6000,
        variance: -9000,
        variancePercent: -60,
      },
      {
        name: 'Litigation & Disputes',
        planned: 5000,
        actual: 2000,
        variance: -3000,
        variancePercent: -60,
      },
    ],
  },
  {
    id: 'facilities',
    name: 'Facilities',
    icon: <Building2 className="h-6 w-6" />,
    totalBudget: 320000,
    consumed: 240000,
    remaining: 80000,
    percentConsumed: 75,
    status: 'healthy',
    quarterlyTarget: 320000,
    lastUpdated: 'Apr 20, 2026',
    categories: [
      {
        name: 'Rent & Lease',
        planned: 150000,
        actual: 125000,
        variance: -25000,
        variancePercent: -16.7,
      },
      {
        name: 'Utilities',
        planned: 70000,
        actual: 60000,
        variance: -10000,
        variancePercent: -14.3,
      },
      {
        name: 'Maintenance & Repairs',
        planned: 50000,
        actual: 38000,
        variance: -12000,
        variancePercent: -24,
      },
      {
        name: 'Office Supplies',
        planned: 30000,
        actual: 12000,
        variance: -18000,
        variancePercent: -60,
      },
      {
        name: 'Security & Safety',
        planned: 20000,
        actual: 5000,
        variance: -15000,
        variancePercent: -75,
      },
    ],
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
    case 'healthy':
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-500',
        text: 'text-emerald-700',
        progressColor: '#10b981',
        bgColor: '#d1fae5',
      };
    case 'warning':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-500',
        text: 'text-amber-700',
        progressColor: '#f59e0b',
        bgColor: '#fef3c7',
      };
    case 'critical':
      return {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-700',
        progressColor: '#ef4444',
        bgColor: '#fee2e2',
      };
    case 'exceeded':
      return {
        bg: 'bg-red-100',
        border: 'border-red-600',
        text: 'text-red-800',
        progressColor: '#dc2626',
        bgColor: '#fecaca',
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-500',
        text: 'text-gray-700',
        progressColor: '#6b7280',
        bgColor: '#f3f4f6',
      };
  }
};

function CircularProgress({ percent, status }: { percent: number; status: string }) {
  const colors = getStatusColor(status);
  const cappedPercent = Math.min(percent, 100);
  
  const data = [
    { value: cappedPercent },
    { value: 100 - cappedPercent },
  ];

  return (
    <div className="relative w-32 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={45}
            outerRadius={60}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={colors.progressColor} />
            <Cell fill={colors.bgColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{percent}%</p>
          <p className="text-xs text-gray-600">consumed</p>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ department }: { department: DepartmentBudget }) {
  const [expanded, setExpanded] = useState(false);
  const colors = getStatusColor(department.status);
  const isCritical = department.percentConsumed >= 90;

  return (
    <Card className={cn('p-6 border-l-4', colors.border, colors.bg)}>
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', colors.text, 'bg-white border-2', colors.border)}>
            {department.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{department.name}</h3>
            <p className="text-xs text-gray-500">Updated {department.lastUpdated}</p>
          </div>
        </div>
        {isCritical && (
          <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full animate-pulse" />
            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-4">
        <CircularProgress percent={department.percentConsumed} status={department.status} />
      </div>

      {/* Budget Summary */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Budget:</span>
          <span className="font-bold text-gray-900">{formatCurrency(department.totalBudget)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Consumed:</span>
          <span className={cn('font-semibold', colors.text)}>{formatCurrency(department.consumed)}</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Remaining:</span>
          <span className="font-semibold text-emerald-600">{formatCurrency(department.remaining)}</span>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <Badge className={cn(
            'px-3 py-1',
            department.status === 'healthy' && 'bg-emerald-100 text-emerald-700 border-emerald-300',
            department.status === 'warning' && 'bg-amber-100 text-amber-700 border-amber-300',
            department.status === 'critical' && 'bg-red-100 text-red-700 border-red-300',
            department.status === 'exceeded' && 'bg-red-200 text-red-900 border-red-400'
          )}>
            {department.status === 'healthy' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {department.status === 'warning' && <Clock className="h-3 w-3 mr-1" />}
            {department.status === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {department.status === 'exceeded' && <XCircle className="h-3 w-3 mr-1" />}
            {department.status.charAt(0).toUpperCase() + department.status.slice(1)}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-700"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                View Details
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Category Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            Expense Categories - Planned vs. Actual
          </h4>
          <div className="space-y-4">
            {department.categories.map((category, idx) => {
              const isOverBudget = category.actual > category.planned;
              const percentOfPlanned = (category.actual / category.planned) * 100;
              
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <div className="flex items-center gap-2">
                      {isOverBudget ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-emerald-500" />
                      )}
                      <span className={cn(
                        'text-xs font-semibold',
                        isOverBudget ? 'text-red-600' : 'text-emerald-600'
                      )}>
                        {category.variancePercent > 0 ? '+' : ''}{category.variancePercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Planned vs Actual Bars */}
                  <div className="space-y-1">
                    {/* Planned Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">Planned:</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden relative">
                        <div
                          className="h-full bg-blue-500 rounded-md flex items-center justify-end pr-2"
                          style={{ width: '100%' }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {formatCurrency(category.planned)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actual Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">Actual:</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden relative">
                        <div
                          className={cn(
                            'h-full rounded-md flex items-center pr-2',
                            isOverBudget ? 'bg-red-500 justify-end' : 'bg-emerald-500 justify-end'
                          )}
                          style={{ width: `${Math.min(percentOfPlanned, 100)}%` }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {formatCurrency(category.actual)}
                          </span>
                        </div>
                        {percentOfPlanned > 100 && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Variance */}
                    <div className="flex items-center justify-end">
                      <span className={cn(
                        'text-xs font-medium',
                        category.variance > 0 ? 'text-red-600' : 'text-emerald-600'
                      )}>
                        Variance: {category.variance > 0 ? '+' : ''}{formatCurrency(category.variance)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

export function BudgetManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Calculate overall metrics
  const totalBudget = departments.reduce((sum, d) => sum + d.totalBudget, 0);
  const totalConsumed = departments.reduce((sum, d) => sum + d.consumed, 0);
  const totalRemaining = departments.reduce((sum, d) => sum + d.remaining, 0);
  const avgConsumption = (totalConsumed / totalBudget) * 100;

  const criticalDepartments = departments.filter(d => d.percentConsumed >= 90);
  const warningDepartments = departments.filter(d => d.percentConsumed >= 80 && d.percentConsumed < 90);

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">
                Departmental Budget Management
              </h1>
              <p className="text-sm text-gray-600">
                Q2 2026 Budget Overview - Real-time monitoring and alerts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bell className="h-4 w-4 mr-2" />
              Set Alert Thresholds
            </Button>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {criticalDepartments.length > 0 && (
          <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{criticalDepartments.length}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 text-lg">Critical Budget Alert!</h3>
                <p className="text-sm text-red-700">
                  {criticalDepartments.length} department{criticalDepartments.length > 1 ? 's have' : ' has'} exceeded 90% budget consumption:{' '}
                  <span className="font-semibold">
                    {criticalDepartments.map(d => d.name).join(', ')}
                  </span>
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Bell className="h-4 w-4 mr-2" />
                Review Now
              </Button>
            </div>
          </Card>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-5 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Budget</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
                <p className="text-xs text-gray-500 mt-1">Across all departments</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Consumed</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalConsumed)}</p>
                <p className="text-xs text-amber-600 font-semibold mt-1">{avgConsumption.toFixed(1)}% of budget</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Remaining</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalRemaining)}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Available to spend</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-red-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Critical Alerts</p>
                <p className="text-xl font-bold text-gray-900">{criticalDepartments.length}</p>
                <p className="text-xs text-red-600 font-semibold mt-1">
                  {warningDepartments.length} warnings
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
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-64">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
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

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDepartments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
}
