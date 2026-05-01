import { UserCheck, Users, Cake, Trophy, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function HRAdminDashboard() {
  const recruitmentFunnel = [
    { stage: 'Applied', count: 248, color: 'bg-blue-500' },
    { stage: 'Screening', count: 124, color: 'bg-indigo-500' },
    { stage: 'Interview', count: 68, color: 'bg-purple-500' },
    { stage: 'Offered', count: 24, color: 'bg-pink-500' },
    { stage: 'Accepted', count: 18, color: 'bg-green-500' },
  ];

  const upcomingEvents = [
    { type: 'birthday', name: 'Sarah Chen', date: 'Apr 28', dept: 'Marketing' },
    { type: 'anniversary', name: 'Michael Rodriguez', date: 'May 1', dept: 'Engineering', years: 5 },
    { type: 'birthday', name: 'Emily Watson', date: 'May 3', dept: 'Finance' },
    { type: 'anniversary', name: 'David Kim', date: 'May 5', dept: 'Sales', years: 3 },
  ];

  const payrollDeadlines = [
    { task: 'Process Monthly Payroll', due: 'Apr 30', status: 'pending', amount: '$1.2M' },
    { task: 'Submit Tax Reports', due: 'May 5', status: 'upcoming', amount: null },
    { task: 'Benefits Enrollment Review', due: 'May 10', status: 'upcoming', amount: null },
  ];

  const maxApplicants = Math.max(...recruitmentFunnel.map(s => s.count));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Administration</h1>
          <p className="text-gray-600">Recruitment, payroll, and employee lifecycle management</p>
        </div>

        {/* HR KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Total Headcount</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">1,247</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +42 this month
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">New Hires (MTD)</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">18</div>
            <div className="text-xs text-blue-600 mt-1">Onboarding in progress</div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Payroll (MTD)</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$1.2M</div>
            <div className="text-xs text-gray-600 mt-1">Processing due Apr 30</div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Retention Rate</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">94.2%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% YoY
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recruitment Funnel */}
          <div className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recruitment Funnel</h2>
              <Button variant="outline" size="sm">View ATS</Button>
            </div>

            <div className="space-y-4">
              {recruitmentFunnel.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn('h-3 w-3 rounded-full', stage.color)} />
                      <span className="font-medium text-gray-900">{stage.stage}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{stage.count} candidates</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={cn('absolute top-0 left-0 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold', stage.color)}
                      style={{ width: `${(stage.count / maxApplicants) * 100}%` }}
                    >
                      {index > 0 && (
                        <span className="text-xs opacity-90">
                          {Math.round((stage.count / recruitmentFunnel[index - 1].count) * 100)}% conversion
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Time to Hire</div>
                <div className="text-2xl font-bold text-gray-900">28 days</div>
                <div className="text-xs text-green-600">-5 days vs avg</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Offer Acceptance</div>
                <div className="text-2xl font-bold text-gray-900">75%</div>
                <div className="text-xs text-blue-600">Above target</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Active Openings</div>
                <div className="text-2xl font-bold text-gray-900">32</div>
                <div className="text-xs text-gray-600">Across 8 depts</div>
              </div>
            </div>
          </div>

          {/* Payroll & Upcoming Events */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white">
              <UserCheck className="h-8 w-8 mb-3" />
              <div className="text-2xl font-bold mb-2">1,247</div>
              <div className="text-sm opacity-90 mb-4">Total Employees</div>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Directory
              </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Payroll Deadlines</h3>
              </div>
              <div className="space-y-3">
                {payrollDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start justify-between pb-3 border-b last:border-0">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{deadline.task}</div>
                      <div className="text-xs text-gray-500 mt-1">Due: {deadline.due}</div>
                      {deadline.amount && (
                        <div className="text-sm font-semibold text-gray-900 mt-1">{deadline.amount}</div>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        deadline.status === 'pending' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      )}
                    >
                      {deadline.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Birthdays & Anniversaries */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Celebrations</h2>
            <Button variant="outline" size="sm">View Calendar</Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className={cn(
                  'border-2 rounded-lg p-4 text-center',
                  event.type === 'birthday' ? 'border-pink-200 bg-pink-50' : 'border-purple-200 bg-purple-50'
                )}
              >
                <div className="text-3xl mb-2">
                  {event.type === 'birthday' ? <Cake className="h-8 w-8 text-pink-600 mx-auto" /> : <Trophy className="h-8 w-8 text-purple-600 mx-auto" />}
                </div>
                <div className="font-semibold text-gray-900 mb-1">{event.name}</div>
                <div className="text-xs text-gray-600 mb-2">{event.dept}</div>
                {event.type === 'anniversary' && (
                  <Badge className="bg-purple-600 text-white mb-2">
                    {event.years} Years
                  </Badge>
                )}
                <div className="text-xs font-medium text-gray-500">{event.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Database Quick Access */}
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-blue-50">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Employee Profiles</span>
          </Button>
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-green-50">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="font-semibold">Payroll System</span>
          </Button>
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-purple-50">
            <AlertCircle className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">Leave Management</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
