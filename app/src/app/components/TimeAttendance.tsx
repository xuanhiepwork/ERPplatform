import { useState } from 'react';
import {
  Clock,
  Calendar,
  LogIn,
  LogOut,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Users,
  TrendingUp,
  Filter,
  Download,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Info,
  AlertTriangle,
  Check,
  X,
  Umbrella,
  Baby,
  HeartPulse,
  CalendarDays,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
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
import { cn } from './ui/utils';

interface TimesheetEntry {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: 'on-time' | 'late' | 'early-departure' | 'absent';
  expectedIn: string;
  expectedOut: string;
}

interface ShiftAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  day: string;
  startTime: string;
  endTime: string;
  position: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: 'sick' | 'annual' | 'maternity' | 'personal';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  remainingLeave: {
    annual: number;
    sick: number;
  };
}

const timesheetData: TimesheetEntry[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP-001',
    department: 'Engineering',
    date: 'Apr 16, 2026',
    clockIn: '08:58 AM',
    clockOut: '05:32 PM',
    totalHours: 8.57,
    status: 'on-time',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '2',
    employeeName: 'Michael Chen',
    employeeId: 'EMP-002',
    department: 'Engineering',
    date: 'Apr 16, 2026',
    clockIn: '09:15 AM',
    clockOut: '05:45 PM',
    totalHours: 8.5,
    status: 'late',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '3',
    employeeName: 'Emily Rodriguez',
    employeeId: 'EMP-003',
    department: 'Design',
    date: 'Apr 16, 2026',
    clockIn: '08:45 AM',
    clockOut: '04:15 PM',
    totalHours: 7.5,
    status: 'early-departure',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '4',
    employeeName: 'David Kim',
    employeeId: 'EMP-004',
    department: 'Engineering',
    date: 'Apr 16, 2026',
    clockIn: '--',
    clockOut: '--',
    totalHours: 0,
    status: 'absent',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '5',
    employeeName: 'Jessica Park',
    employeeId: 'EMP-005',
    department: 'Data Science',
    date: 'Apr 16, 2026',
    clockIn: '08:55 AM',
    clockOut: '05:28 PM',
    totalHours: 8.55,
    status: 'on-time',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '6',
    employeeName: 'Alex Thompson',
    employeeId: 'EMP-006',
    department: 'Operations',
    date: 'Apr 16, 2026',
    clockIn: '09:22 AM',
    clockOut: '05:35 PM',
    totalHours: 8.22,
    status: 'late',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
  {
    id: '7',
    employeeName: 'Maria Garcia',
    employeeId: 'EMP-007',
    department: 'Marketing',
    date: 'Apr 16, 2026',
    clockIn: '08:52 AM',
    clockOut: '05:33 PM',
    totalHours: 8.68,
    status: 'on-time',
    expectedIn: '09:00 AM',
    expectedOut: '05:30 PM',
  },
];

const shiftAssignments: ShiftAssignment[] = [
  {
    id: 's1',
    employeeId: 'EMP-001',
    employeeName: 'Sarah J.',
    department: 'Engineering',
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:30',
    position: 'Developer',
  },
  {
    id: 's2',
    employeeId: 'EMP-002',
    employeeName: 'Michael C.',
    department: 'Engineering',
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:30',
    position: 'Developer',
  },
  {
    id: 's3',
    employeeId: 'EMP-003',
    employeeName: 'Emily R.',
    department: 'Design',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '17:30',
    position: 'Designer',
  },
  {
    id: 's4',
    employeeId: 'EMP-005',
    employeeName: 'Jessica P.',
    department: 'Data Science',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '18:30',
    position: 'Analyst',
  },
  {
    id: 's5',
    employeeId: 'EMP-007',
    employeeName: 'Maria G.',
    department: 'Marketing',
    day: 'Thursday',
    startTime: '08:30',
    endTime: '17:00',
    position: 'Manager',
  },
  {
    id: 's6',
    employeeId: 'EMP-001',
    employeeName: 'Sarah J.',
    department: 'Engineering',
    day: 'Friday',
    startTime: '09:00',
    endTime: '17:30',
    position: 'Developer',
  },
];

const leaveRequests: LeaveRequest[] = [
  {
    id: 'lr1',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP-001',
    department: 'Engineering',
    leaveType: 'annual',
    startDate: 'Apr 20, 2026',
    endDate: 'Apr 24, 2026',
    days: 5,
    reason: 'Family vacation',
    status: 'pending',
    submittedDate: 'Apr 10, 2026',
    remainingLeave: {
      annual: 15,
      sick: 10,
    },
  },
  {
    id: 'lr2',
    employeeName: 'Michael Chen',
    employeeId: 'EMP-002',
    department: 'Engineering',
    leaveType: 'sick',
    startDate: 'Apr 17, 2026',
    endDate: 'Apr 18, 2026',
    days: 2,
    reason: 'Medical appointment',
    status: 'approved',
    submittedDate: 'Apr 15, 2026',
    remainingLeave: {
      annual: 12,
      sick: 8,
    },
  },
  {
    id: 'lr3',
    employeeName: 'Emily Rodriguez',
    employeeId: 'EMP-003',
    department: 'Design',
    leaveType: 'maternity',
    startDate: 'May 01, 2026',
    endDate: 'Aug 01, 2026',
    days: 90,
    reason: 'Maternity leave',
    status: 'approved',
    submittedDate: 'Mar 15, 2026',
    remainingLeave: {
      annual: 20,
      sick: 10,
    },
  },
  {
    id: 'lr4',
    employeeName: 'David Kim',
    employeeId: 'EMP-004',
    department: 'Engineering',
    leaveType: 'annual',
    startDate: 'Apr 25, 2026',
    endDate: 'Apr 27, 2026',
    days: 3,
    reason: 'Personal matters',
    status: 'pending',
    submittedDate: 'Apr 12, 2026',
    remainingLeave: {
      annual: 18,
      sick: 10,
    },
  },
  {
    id: 'lr5',
    employeeName: 'Jessica Park',
    employeeId: 'EMP-005',
    department: 'Data Science',
    leaveType: 'sick',
    startDate: 'Apr 14, 2026',
    endDate: 'Apr 15, 2026',
    days: 2,
    reason: 'Flu symptoms',
    status: 'rejected',
    submittedDate: 'Apr 14, 2026',
    remainingLeave: {
      annual: 14,
      sick: 6,
    },
  },
  {
    id: 'lr6',
    employeeName: 'Alex Thompson',
    employeeId: 'EMP-006',
    department: 'Operations',
    leaveType: 'annual',
    startDate: 'May 10, 2026',
    endDate: 'May 17, 2026',
    days: 6,
    reason: 'Wedding anniversary trip',
    status: 'pending',
    submittedDate: 'Apr 08, 2026',
    remainingLeave: {
      annual: 10,
      sick: 10,
    },
  },
];

function TimesheetTable({ data }: { data: TimesheetEntry[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status: TimesheetEntry['status']) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'early-departure':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: TimesheetEntry['status']) => {
    switch (status) {
      case 'on-time':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            On Time
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-300">
            Late Arrival
          </Badge>
        );
      case 'early-departure':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            Early Leave
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            Absent
          </Badge>
        );
    }
  };

  const filteredData = data.filter(
    (entry) =>
      entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    onTime: data.filter((d) => d.status === 'on-time').length,
    late: data.filter((d) => d.status === 'late').length,
    earlyLeave: data.filter((d) => d.status === 'early-departure').length,
    absent: data.filter((d) => d.status === 'absent').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Daily Timesheet</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track employee attendance and working hours
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="p-4 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.onTime}</p>
                <p className="text-sm text-gray-500">On Time</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
                <p className="text-sm text-gray-500">Late Arrivals</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.earlyLeave}</p>
                <p className="text-sm text-gray-500">Early Departures</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-red-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
                <p className="text-sm text-gray-500">Absent</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by employee name or ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((entry) => (
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
                      <p className="font-medium text-gray-900">{entry.employeeName}</p>
                      <p className="text-xs text-gray-500">{entry.employeeId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">{entry.clockIn}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">{entry.clockOut}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-gray-900">
                    {entry.totalHours > 0 ? `${entry.totalHours.toFixed(2)}h` : '--'}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {entry.expectedIn} - {entry.expectedOut}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(entry.status)}
                    {getStatusBadge(entry.status)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Info className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        Edit Time
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ShiftScheduler({ shifts }: { shifts: ShiftAssignment[] }) {
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const departments = ['Engineering', 'Design', 'Data Science', 'Marketing', 'Operations'];

  const getShiftsForDay = (day: string) => {
    return shifts.filter((s) => s.day === day);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Shift Scheduler</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee shift assignments across departments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700">
            Week of Apr 14 - Apr 20, 2026
          </span>
          <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Shift
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-8 border-b bg-gray-50">
          <div className="p-4 border-r">
            <span className="text-sm font-semibold text-gray-700">Department</span>
          </div>
          {daysOfWeek.map((day) => (
            <div key={day} className="p-4 border-r last:border-r-0">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">{day}</p>
                <p className="text-xs text-gray-500 mt-1">Apr {14 + daysOfWeek.indexOf(day)}</p>
              </div>
            </div>
          ))}
        </div>

        {departments.map((dept) => (
          <div key={dept} className="grid grid-cols-8 border-b last:border-b-0">
            <div className="p-4 border-r bg-gray-50 flex items-center">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{dept}</span>
              </div>
            </div>
            {daysOfWeek.map((day) => {
              const dayShifts = getShiftsForDay(day).filter((s) => s.department === dept);
              return (
                <div key={`${dept}-${day}`} className="p-2 border-r last:border-r-0 min-h-[100px]">
                  <div className="space-y-2">
                    {dayShifts.map((shift) => (
                      <Card
                        key={shift.id}
                        className="p-2 bg-blue-50 border-blue-200 cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate">
                              {shift.employeeName}
                            </p>
                            <p className="text-[10px] text-gray-600 truncate">
                              {shift.position}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-blue-600" />
                              <span className="text-[10px] text-blue-700 font-medium">
                                {shift.startTime} - {shift.endTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {dayShifts.length === 0 && (
                      <button className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <Plus className="h-4 w-4 text-gray-400 mx-auto" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </Card>
    </div>
  );
}

function LeaveManagement({ requests }: { requests: LeaveRequest[] }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const getLeaveIcon = (type: LeaveRequest['leaveType']) => {
    switch (type) {
      case 'sick':
        return <HeartPulse className="h-5 w-5 text-red-600" />;
      case 'annual':
        return <Umbrella className="h-5 w-5 text-blue-600" />;
      case 'maternity':
        return <Baby className="h-5 w-5 text-purple-600" />;
      case 'personal':
        return <CalendarDays className="h-5 w-5 text-orange-600" />;
    }
  };

  const getLeaveTypeBadge = (type: LeaveRequest['leaveType']) => {
    switch (type) {
      case 'sick':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Sick Leave</Badge>;
      case 'annual':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Annual Leave</Badge>;
      case 'maternity':
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            Maternity Leave
          </Badge>
        );
      case 'personal':
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-300">Personal Leave</Badge>
        );
    }
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="h-full flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Leave Management</h2>
              <p className="text-sm text-gray-500 mt-1">
                Review and manage employee leave requests
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Requests
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('approved')}
              className={filter === 'approved' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Approved
            </Button>
            <Button
              variant={filter === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('rejected')}
              className={filter === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              Rejected
            </Button>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    {getLeaveIcon(request.leaveType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.employeeName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">{request.employeeId}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{request.department}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getLeaveTypeBadge(request.leaveType)}
                        {getStatusBadge(request.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 mb-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Start Date</label>
                        <p className="text-sm text-gray-900 mt-0.5">{request.startDate}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">End Date</label>
                        <p className="text-sm text-gray-900 mt-0.5">{request.endDate}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Duration</label>
                        <p className="text-sm text-gray-900 mt-0.5">
                          {request.days} {request.days === 1 ? 'day' : 'days'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="text-xs font-medium text-gray-500">Reason</label>
                      <p className="text-sm text-gray-900 mt-1">{request.reason}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>Submitted: {request.submittedDate}</span>
                    </div>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Leave Balance Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Leave Balance Summary</h3>
          </div>

          <div className="space-y-4">
            {requests
              .filter((r, i, self) => self.findIndex((t) => t.employeeId === r.employeeId) === i)
              .slice(0, 6)
              .map((request) => (
                <Card key={request.employeeId} className="p-4 bg-gray-50">
                  <div className="mb-3">
                    <p className="font-medium text-gray-900 text-sm">{request.employeeName}</p>
                    <p className="text-xs text-gray-500">{request.department}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Annual Leave</span>
                        <span className="text-xs font-semibold text-blue-600">
                          {request.remainingLeave.annual} days
                        </span>
                      </div>
                      <Progress
                        value={(request.remainingLeave.annual / 20) * 100}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Sick Leave</span>
                        <span className="text-xs font-semibold text-red-600">
                          {request.remainingLeave.sick} days
                        </span>
                      </div>
                      <Progress
                        value={(request.remainingLeave.sick / 10) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function TimeAttendance() {
  const [activeTab, setActiveTab] = useState<'timesheet' | 'shifts' | 'leave'>('timesheet');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Time & Attendance</h1>
              <p className="text-sm text-gray-500">
                Manage timesheets, shifts, and leave requests
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="timesheet">
              <Clock className="h-4 w-4 mr-2" />
              Timesheet
            </TabsTrigger>
            <TabsTrigger value="shifts">
              <Calendar className="h-4 w-4 mr-2" />
              Shift Scheduler
            </TabsTrigger>
            <TabsTrigger value="leave">
              <Users className="h-4 w-4 mr-2" />
              Leave Management
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'timesheet' && <TimesheetTable data={timesheetData} />}
        {activeTab === 'shifts' && <ShiftScheduler shifts={shiftAssignments} />}
        {activeTab === 'leave' && <LeaveManagement requests={leaveRequests} />}
      </div>
    </div>
  );
}
