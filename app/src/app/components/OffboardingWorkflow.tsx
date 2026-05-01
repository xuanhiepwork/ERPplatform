import { useState } from 'react';
import {
  UserMinus,
  CheckSquare,
  ClipboardList,
  MessageSquare,
  TrendingDown,
  Calendar,
  Laptop,
  CreditCard,
  Lock,
  Key,
  FileText,
  Package,
  Shield,
  DollarSign,
  Users,
  Star,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  ChevronRight,
  Info,
  Archive,
  XCircle,
  Building2,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from './ui/utils';

interface ChecklistTask {
  id: string;
  category: string;
  task: string;
  description: string;
  responsible: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
}

interface ExitInterviewData {
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  lastWorkingDay: string;
  tenure: string;
  exitDate: string;
}

interface TurnoverData {
  month: string;
  turnoverRate: number;
  headcount: number;
  departures: number;
}

const checklistTasks: ChecklistTask[] = [
  {
    id: 'task-001',
    category: 'Asset Recovery',
    task: 'Collect Company Laptop',
    description: 'Retrieve assigned laptop and charger from employee',
    responsible: 'IT Department',
    status: 'completed',
    dueDate: 'Apr 15, 2026',
    icon: Laptop,
    priority: 'high',
  },
  {
    id: 'task-002',
    category: 'Asset Recovery',
    task: 'Retrieve ID Card & Access Badge',
    description: 'Collect employee ID card and building access badge',
    responsible: 'Security',
    status: 'completed',
    dueDate: 'Apr 15, 2026',
    icon: CreditCard,
    priority: 'high',
  },
  {
    id: 'task-003',
    category: 'Asset Recovery',
    task: 'Return Company Mobile Device',
    description: 'Collect company-issued mobile phone and accessories',
    responsible: 'IT Department',
    status: 'in-progress',
    dueDate: 'Apr 16, 2026',
    icon: Package,
    priority: 'high',
  },
  {
    id: 'task-004',
    category: 'IT Access',
    task: 'Revoke Email Access',
    description: 'Disable employee email account and set auto-reply',
    responsible: 'IT Department',
    status: 'completed',
    dueDate: 'Apr 15, 2026',
    icon: Lock,
    priority: 'high',
  },
  {
    id: 'task-005',
    category: 'IT Access',
    task: 'Disable System Accounts',
    description: 'Revoke access to all internal systems and applications',
    responsible: 'IT Department',
    status: 'in-progress',
    dueDate: 'Apr 16, 2026',
    icon: Shield,
    priority: 'high',
  },
  {
    id: 'task-006',
    category: 'IT Access',
    task: 'Remove from Security Groups',
    description: 'Remove user from all access groups and permissions',
    responsible: 'IT Department',
    status: 'pending',
    dueDate: 'Apr 16, 2026',
    icon: Key,
    priority: 'medium',
  },
  {
    id: 'task-007',
    category: 'Financial',
    task: 'Calculate Final Pay Settlement',
    description: 'Process final salary, unused leave, and benefits payout',
    responsible: 'Payroll Team',
    status: 'in-progress',
    dueDate: 'Apr 18, 2026',
    icon: DollarSign,
    priority: 'high',
  },
  {
    id: 'task-008',
    category: 'Financial',
    task: 'Process Benefits Termination',
    description: 'Terminate health insurance and other benefits',
    responsible: 'HR Benefits',
    status: 'pending',
    dueDate: 'Apr 20, 2026',
    icon: FileText,
    priority: 'medium',
  },
  {
    id: 'task-009',
    category: 'Documentation',
    task: 'Conduct Exit Interview',
    description: 'Schedule and complete exit interview with employee',
    responsible: 'HR Manager',
    status: 'pending',
    dueDate: 'Apr 17, 2026',
    icon: MessageSquare,
    priority: 'medium',
  },
  {
    id: 'task-010',
    category: 'Documentation',
    task: 'Issue Employment Certificate',
    description: 'Prepare and provide employment verification letter',
    responsible: 'HR Administration',
    status: 'pending',
    dueDate: 'Apr 19, 2026',
    icon: FileText,
    priority: 'low',
  },
  {
    id: 'task-011',
    category: 'Knowledge Transfer',
    task: 'Document Handover Completion',
    description: 'Ensure all work responsibilities are transferred',
    responsible: 'Department Manager',
    status: 'in-progress',
    dueDate: 'Apr 16, 2026',
    icon: ClipboardList,
    priority: 'high',
  },
  {
    id: 'task-012',
    category: 'Knowledge Transfer',
    task: 'Archive Work Files',
    description: 'Backup and archive all employee work documents',
    responsible: 'IT Department',
    status: 'pending',
    dueDate: 'Apr 18, 2026',
    icon: Archive,
    priority: 'medium',
  },
];

const turnoverData: TurnoverData[] = [
  { month: 'Oct 2025', turnoverRate: 3.2, headcount: 625, departures: 20 },
  { month: 'Nov 2025', turnoverRate: 2.8, headcount: 630, departures: 18 },
  { month: 'Dec 2025', turnoverRate: 1.9, headcount: 635, departures: 12 },
  { month: 'Jan 2026', turnoverRate: 4.1, headcount: 640, departures: 26 },
  { month: 'Feb 2026', turnoverRate: 3.5, headcount: 645, departures: 23 },
  { month: 'Mar 2026', turnoverRate: 5.2, headcount: 650, departures: 34 },
];

const exitReasons = [
  { reason: 'Better Compensation', count: 42, percentage: 28 },
  { reason: 'Career Growth', count: 38, percentage: 25 },
  { reason: 'Work-Life Balance', count: 27, percentage: 18 },
  { reason: 'Relocation', count: 18, percentage: 12 },
  { reason: 'Company Culture', count: 15, percentage: 10 },
  { reason: 'Other', count: 10, percentage: 7 },
];

function TerminationChecklist() {
  const [tasks, setTasks] = useState(checklistTasks);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTasks = tasks.filter(
    (task) => selectedCategory === 'all' || task.category === selectedCategory
  );

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  const getStatusBadge = (status: ChecklistTask['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: ChecklistTask['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Low</Badge>;
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
            }
          : task
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Offboarding Checklist
        </h2>
        <p className="text-sm text-gray-500">
          Track all tasks required for employee offboarding
        </p>
      </div>

      {/* Employee Info Card */}
      <Card className="p-5 bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-slate-600 text-white">
                SJ
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">
                Senior Software Engineer · EMP-001 · Engineering
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last Working Day: April 20, 2026
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-slate-600 text-white mb-2">
              <UserMinus className="h-3 w-3 mr-1" />
              Offboarding in Progress
            </Badge>
            <p className="text-xs text-gray-500">Started: April 15, 2026</p>
          </div>
        </div>
      </Card>

      {/* Progress Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-bold text-gray-900">{tasks.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-gray-900">{completedCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Overall Completion</h3>
            <p className="text-sm text-gray-600">
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
          <div className="text-3xl font-bold text-slate-700">{completionPercentage}%</div>
        </div>
        <Progress value={completionPercentage} className="h-3" />
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-64">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Asset Recovery">Asset Recovery</SelectItem>
            <SelectItem value="IT Access">IT Access</SelectItem>
            <SelectItem value="Financial">Financial</SelectItem>
            <SelectItem value="Documentation">Documentation</SelectItem>
            <SelectItem value="Knowledge Transfer">Knowledge Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checklist Tasks */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const TaskIcon = task.icon;
          return (
            <Card
              key={task.id}
              className={cn(
                'p-5 hover:shadow-md transition-shadow',
                task.status === 'completed' && 'bg-emerald-50/30 border-emerald-200'
              )}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />
                <div
                  className={cn(
                    'h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    task.status === 'completed'
                      ? 'bg-emerald-100'
                      : 'bg-slate-100'
                  )}
                >
                  <TaskIcon
                    className={cn(
                      'h-5 w-5',
                      task.status === 'completed'
                        ? 'text-emerald-600'
                        : 'text-slate-600'
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={cn(
                            'font-semibold',
                            task.status === 'completed'
                              ? 'text-gray-500 line-through'
                              : 'text-gray-900'
                          )}
                        >
                          {task.task}
                        </h4>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {task.responsible}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {task.dueDate}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    <div>{getStatusBadge(task.status)}</div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ExitInterviewForm() {
  const [overallRating, setOverallRating] = useState(0);
  const [workEnvironmentRating, setWorkEnvironmentRating] = useState(0);
  const [managementRating, setManagementRating] = useState(0);
  const [careerGrowthRating, setCareerGrowthRating] = useState(0);
  const [compensationRating, setCompensationRating] = useState(0);

  const employeeData: ExitInterviewData = {
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP-001',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    lastWorkingDay: 'April 20, 2026',
    tenure: '3 years 7 months',
    exitDate: 'April 15, 2026',
  };

  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (rating: number) => void;
    label: string;
  }) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'h-8 w-8',
                  rating <= value
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            </button>
          ))}
          <span className="ml-3 text-sm text-gray-600">
            {value > 0 ? `${value} / 5` : 'Not rated'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Exit Interview</h2>
        <p className="text-sm text-gray-500">
          Collect valuable feedback from departing employees
        </p>
      </div>

      {/* Employee Information */}
      <Card className="p-6 bg-slate-50 border-slate-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-slate-600" />
          Employee Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-gray-900 mt-1">{employeeData.employeeName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Employee ID</label>
            <p className="text-gray-900 mt-1">{employeeData.employeeId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Department</label>
            <p className="text-gray-900 mt-1">{employeeData.department}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Position</label>
            <p className="text-gray-900 mt-1">{employeeData.position}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Tenure</label>
            <p className="text-gray-900 mt-1">{employeeData.tenure}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Last Working Day
            </label>
            <p className="text-gray-900 mt-1">{employeeData.lastWorkingDay}</p>
          </div>
        </div>
      </Card>

      {/* Ratings Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Experience Ratings
        </h3>
        <div className="space-y-6">
          <StarRating
            value={overallRating}
            onChange={setOverallRating}
            label="Overall Experience"
          />
          <StarRating
            value={workEnvironmentRating}
            onChange={setWorkEnvironmentRating}
            label="Work Environment"
          />
          <StarRating
            value={managementRating}
            onChange={setManagementRating}
            label="Management & Leadership"
          />
          <StarRating
            value={careerGrowthRating}
            onChange={setCareerGrowthRating}
            label="Career Growth Opportunities"
          />
          <StarRating
            value={compensationRating}
            onChange={setCompensationRating}
            label="Compensation & Benefits"
          />
        </div>
      </Card>

      {/* Feedback Form */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-slate-600" />
          Feedback & Comments
        </h3>
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Primary Reason for Leaving *
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compensation">Better Compensation</SelectItem>
                <SelectItem value="growth">Career Growth</SelectItem>
                <SelectItem value="balance">Work-Life Balance</SelectItem>
                <SelectItem value="relocation">Relocation</SelectItem>
                <SelectItem value="culture">Company Culture</SelectItem>
                <SelectItem value="management">Management Issues</SelectItem>
                <SelectItem value="personal">Personal Reasons</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Please elaborate on your reason for leaving
            </label>
            <Textarea
              placeholder="Share more details about your decision to leave..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              What did you enjoy most about working here?
            </label>
            <Textarea
              placeholder="Tell us about the positive aspects of your experience..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              What could we have done better?
            </label>
            <Textarea
              placeholder="Your suggestions for improvement..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Would you consider returning to the company in the future?
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, definitely</SelectItem>
                <SelectItem value="maybe">Maybe, under certain conditions</SelectItem>
                <SelectItem value="no">No, unlikely</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Would you recommend this company to others?
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, I would recommend</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="no">No, I would not recommend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Additional Comments (Optional)
            </label>
            <Textarea
              placeholder="Any other feedback you'd like to share..."
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-slate-700 hover:bg-slate-800">
          <Send className="h-4 w-4 mr-2" />
          Submit Exit Interview
        </Button>
        <Button variant="outline" className="flex-1">
          Save as Draft
        </Button>
      </div>

      {/* Privacy Notice */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium text-gray-900 mb-1">Confidentiality Notice</p>
            <p>
              Your feedback is valuable and will be kept confidential. Exit interview
              responses are used to improve our workplace and employee experience. Thank
              you for your honest feedback.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TurnoverAnalytics() {
  const avgTurnoverRate =
    turnoverData.reduce((sum, d) => sum + d.turnoverRate, 0) / turnoverData.length;
  const totalDepartures = turnoverData.reduce((sum, d) => sum + d.departures, 0);
  const latestMonth = turnoverData[turnoverData.length - 1];
  const previousMonth = turnoverData[turnoverData.length - 2];
  const trendChange = latestMonth.turnoverRate - previousMonth.turnoverRate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Turnover Analytics
          </h2>
          <p className="text-sm text-gray-500">
            Monitor employee turnover trends and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Turnover Rate</p>
              <p className="text-xl font-bold text-gray-900">
                {avgTurnoverRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <UserMinus className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Departures</p>
              <p className="text-xl font-bold text-gray-900">{totalDepartures}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Latest Month</p>
              <p className="text-xl font-bold text-gray-900">
                {latestMonth.turnoverRate}%
              </p>
            </div>
          </div>
        </Card>
        <Card
          className={cn(
            'p-4 border-l-4',
            trendChange > 0 ? 'border-l-red-600' : 'border-l-emerald-600'
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-10 w-10 rounded-lg flex items-center justify-center',
                trendChange > 0 ? 'bg-red-100' : 'bg-emerald-100'
              )}
            >
              <TrendingDown
                className={cn(
                  'h-5 w-5',
                  trendChange > 0 ? 'text-red-600' : 'text-emerald-600'
                )}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Month Trend</p>
              <p
                className={cn(
                  'text-xl font-bold',
                  trendChange > 0 ? 'text-red-600' : 'text-emerald-600'
                )}
              >
                {trendChange > 0 ? '+' : ''}
                {trendChange.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Turnover Trend Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-slate-600" />
          Monthly Turnover Rate Trend
        </h3>
        <div className="space-y-3">
          {turnoverData.map((data, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {data.departures} departures / {data.headcount} employees
                  </span>
                  <span className="font-semibold text-gray-900 w-12 text-right">
                    {data.turnoverRate}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-lg transition-all',
                      data.turnoverRate > 4
                        ? 'bg-red-500'
                        : data.turnoverRate > 3
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    )}
                    style={{ width: `${(data.turnoverRate / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Common Exit Reasons */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-slate-600" />
          Common Reasons for Resignation
        </h3>
        <div className="space-y-4">
          {exitReasons.map((reason, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-700">
                      {idx + 1}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{reason.reason}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {reason.count} cases
                  </Badge>
                  <span className="font-semibold text-gray-900 w-12 text-right">
                    {reason.percentage}%
                  </span>
                </div>
              </div>
              <Progress value={reason.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Department Breakdown */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-slate-600" />
          Turnover by Department
        </h3>
        <div className="space-y-4">
          {[
            { dept: 'Engineering', rate: 4.8, departures: 12, headcount: 250 },
            { dept: 'Sales & Marketing', rate: 6.2, departures: 15, headcount: 242 },
            { dept: 'Operations', rate: 3.1, departures: 5, headcount: 161 },
            { dept: 'Finance', rate: 2.5, departures: 2, headcount: 80 },
          ].map((dept, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">{dept.dept}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {dept.departures} / {dept.headcount}
                  </span>
                  <span className="font-semibold text-gray-900 w-12 text-right">
                    {dept.rate}%
                  </span>
                </div>
              </div>
              <Progress
                value={(dept.rate / 10) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Insights Card */}
      <Card className="p-5 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-gray-900 mb-2">Key Insights</p>
            <ul className="space-y-1 text-gray-700">
              <li>
                • Turnover rate increased by {trendChange.toFixed(1)}% from previous
                month
              </li>
              <li>
                • "Better Compensation" remains the top reason for departures (28%)
              </li>
              <li>• Sales & Marketing department shows highest turnover at 6.2%</li>
              <li>
                • Consider conducting retention interviews and compensation reviews
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function OffboardingWorkflow() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'interview' | 'analytics'>(
    'checklist'
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-600 flex items-center justify-center">
              <UserMinus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Offboarding Workflow
              </h1>
              <p className="text-sm text-gray-500">
                Systematic employee offboarding process management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="checklist">
              <CheckSquare className="h-4 w-4 mr-2" />
              Termination Checklist
            </TabsTrigger>
            <TabsTrigger value="interview">
              <MessageSquare className="h-4 w-4 mr-2" />
              Exit Interview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Turnover Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'checklist' && <TerminationChecklist />}
        {activeTab === 'interview' && <ExitInterviewForm />}
        {activeTab === 'analytics' && <TurnoverAnalytics />}
      </div>
    </div>
  );
}
