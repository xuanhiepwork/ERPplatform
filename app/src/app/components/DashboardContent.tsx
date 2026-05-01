import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Calendar, Clock, AlertCircle, FileText, LogIn, LogOut,
  CheckCircle2, XCircle, Clock3, Umbrella
} from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { Button } from './ui/button';
import { io } from 'socket.io-client';
import { toast } from 'sonner'; // Hoặc Ant Design notification

export function DashboardContent() {
  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const leaveBalance = 12;
  const totalLeave = 20;
  const leavePercentage = (leaveBalance / totalLeave) * 100;

  const workHours = 160;
  const totalWorkHours = 176;
  const workHoursPercentage = (workHours / totalWorkHours) * 100;

  const upcomingDeadlines = [
    { title: 'Q2 Performance Review Submission', date: 'Apr 12, 2026', priority: 'high' },
    { title: 'Project Alpha Milestone Delivery', date: 'Apr 15, 2026', priority: 'high' },
    { title: 'Team Budget Proposal', date: 'Apr 18, 2026', priority: 'medium' },
  ];

  const pendingApprovals = [
    {
      type: 'Leave Request',
      employee: 'Michael Chen',
      details: 'Apr 20-22 (3 days)',
      date: '2 hours ago'
    },
    {
      type: 'Expense Report',
      employee: 'Sarah Williams',
      details: '$487.50',
      date: '5 hours ago'
    },
    {
      type: 'Leave Request',
      employee: 'David Martinez',
      details: 'Apr 25 (1 day)',
      date: '1 day ago'
    },
  ];

  const socket = io('http://localhost:8080');

  useEffect(() => {
    socket.on('payment_success', (data) => {
      toast.success(`Thanh toán thành công! Nhận ${data.amount} VNĐ từ Deal: ${data.dealName}`);
      // Audio "Ting Ting"
      const audio = new Audio('/sounds/tingting.mp3');
      audio.play();
    });

    return () => { socket.off('payment_success'); };
  }, []);

  return (
    <div className="space-y-6">
      {/* Personalized Greeting */}
      <div>
        <h1 className="mb-2">{getGreeting()}, Jane 👋</h1>
        <p className="text-muted-foreground">
          Here's your personalized dashboard for Thursday, April 9, 2026
        </p>
      </div>

      {/* My Snapshot Section */}
      <div>
        <h2 className="mb-4">My Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Leave Balance Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Umbrella className="h-5 w-5 text-blue-600" />
                Leave Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">{leaveBalance} days</h3>
                  <p className="text-sm text-muted-foreground">remaining</p>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Used: {totalLeave - leaveBalance} days</span>
                      <span>{Math.round(leavePercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${leavePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ProgressRing progress={leavePercentage} size={90} strokeWidth={6}>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-blue-600">{leaveBalance}</div>
                    <div className="text-xs text-muted-foreground">days</div>
                  </div>
                </ProgressRing>
              </div>
            </CardContent>
          </Card>

          {/* Work Hours Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-green-600" />
                This Month's Work Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">{workHours}/{totalWorkHours} hrs</h3>
                  <p className="text-sm text-muted-foreground">logged this month</p>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Remaining: {totalWorkHours - workHours} hrs</span>
                      <span>{Math.round(workHoursPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${workHoursPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ProgressRing progress={workHoursPercentage} size={90} strokeWidth={6} color="#16a34a">
                  <div className="text-center">
                    <div className="font-semibold text-lg text-green-600">{Math.round(workHoursPercentage)}%</div>
                    <div className="text-xs text-muted-foreground">done</div>
                  </div>
                </ProgressRing>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines Card */}
          <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${deadline.priority === 'high' ? 'bg-red-500' : 'bg-orange-500'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2">{deadline.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{deadline.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-3 h-auto py-4" variant="outline">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium">Apply for Leave</div>
                <div className="text-xs text-muted-foreground">Submit a new leave request</div>
              </div>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto py-4 flex-col gap-2" variant="outline">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <LogIn className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">Clock In</div>
                  <div className="text-xs text-muted-foreground">Start work</div>
                </div>
              </Button>

              <Button className="h-auto py-4 flex-col gap-2" variant="outline">
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">Clock Out</div>
                  <div className="text-xs text-muted-foreground">End work</div>
                </div>
              </Button>
            </div>

            <Button className="w-full justify-start gap-3 h-auto py-4" variant="outline">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock3 className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium">Submit Timesheet</div>
                <div className="text-xs text-muted-foreground">Log your work hours</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </div>
              <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-red-600">{pendingApprovals.length}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{approval.type}</span>
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                          Pending
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{approval.employee}</p>
                      <p className="text-sm mt-1">{approval.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{approval.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Snapshot</CardTitle>
            <CardDescription>Your key metrics this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">87/95</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Goals Achieved</span>
                  <span className="font-medium">5/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Peer Collaboration</span>
                  <span className="font-medium">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm">Submitted timesheet for Week 14</p>
                  <p className="text-xs text-muted-foreground mt-1">Today at 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm">Completed training: Cybersecurity 101</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday at 3:15 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm">Approved by manager: Expense Report #2847</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
