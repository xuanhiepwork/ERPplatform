import { Clock, FileText, Calendar, CheckCircle, AlertCircle, Coffee, TrendingUp, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function EmployeeDashboard() {
  const todaySchedule = [
    { time: '09:00 AM', title: 'Team Stand-up', type: 'meeting', status: 'completed' },
    { time: '10:30 AM', title: 'Project Review with Manager', type: 'meeting', status: 'upcoming' },
    { time: '02:00 PM', title: 'Training: Advanced Excel', type: 'learning', status: 'upcoming' },
    { time: '04:00 PM', title: 'Submit Weekly Report', type: 'task', status: 'pending' },
  ];

  const pendingRequests = [
    { type: 'Annual Leave', dates: 'May 15-19, 2026', status: 'pending', days: 5 },
    { type: 'OT Claim', dates: 'April 20, 2026', status: 'approved', amount: '$120' },
    { type: 'Medical Claim', dates: 'April 18, 2026', status: 'pending', amount: '$85' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening today</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">Sunday, April 26, 2026</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          <Button className="h-24 flex flex-col gap-2 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800">
            <Clock className="h-6 w-6" />
            <span className="text-sm font-semibold">Clock In/Out</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-blue-50">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">New Request</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-purple-50">
            <Calendar className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-semibold text-gray-900">My Calendar</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-green-50">
            <Award className="h-6 w-6 text-green-600" />
            <span className="text-sm font-semibold text-gray-900">My Achievements</span>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
              <Badge variant="outline" className="text-xs">
                {todaySchedule.filter(s => s.status === 'upcoming').length} upcoming
              </Badge>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-lg border-l-4 transition-all',
                    item.status === 'completed' ? 'bg-gray-50 border-gray-300 opacity-60' :
                    item.status === 'upcoming' ? 'bg-blue-50 border-blue-500' :
                    'bg-yellow-50 border-yellow-500'
                  )}
                >
                  <div className="flex-shrink-0 text-center min-w-[80px]">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="font-semibold text-gray-900">{item.time}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <Badge
                        variant={item.type === 'meeting' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : item.status === 'upcoming' ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-8 w-8" />
                <div>
                  <div className="text-sm opacity-90">Working Hours</div>
                  <div className="text-2xl font-bold">38.5h</div>
                </div>
              </div>
              <div className="text-sm opacity-90">This week</div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>96%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white rounded-full h-2" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="h-6 w-6 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Leave Balance</div>
                  <div className="text-2xl font-bold text-gray-900">12 days</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Annual leave remaining</div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Performance</div>
                  <div className="text-2xl font-bold text-gray-900">8.5/10</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Last review score</div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">My Requests Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Request Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date/Details</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount/Days</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{request.type}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{request.dates}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-semibold">
                      {request.days ? `${request.days} days` : request.amount}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={request.status === 'approved' ? 'default' : 'secondary'}
                        className={cn(
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
