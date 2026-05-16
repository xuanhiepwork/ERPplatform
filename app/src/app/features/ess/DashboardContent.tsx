import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import {
  Calendar, Clock, AlertCircle, FileText, LogIn, LogOut,
  CheckCircle2, Umbrella
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { cn } from '../../components/ui/utils';

// Import Mocks (Sẽ được thay thế bằng API calls)
import { essApi } from '../../../services/essService';
import { approvalApi } from '../../../services/approvalService';
import { hrApi } from '../../../services/hrService';

export function DashboardContent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // 1. Fetching Data with React Query
  const { data: snapshot, isLoading: isLoadingSnapshot } = useQuery({
    queryKey: ['employee-snapshot'],
    queryFn: essApi.getEmployeeSnapshot,
  });

  const { data: schedule = [] } = useQuery({
    queryKey: ['today-schedule'],
    queryFn: essApi.getTodaySchedule,
  });

  const { data: deadlines = [] } = useQuery({
    queryKey: ['upcoming-deadlines'],
    queryFn: essApi.getUpcomingDeadlines,
  });

  const { data: approvals = [] } = useQuery({
    queryKey: ['pending-approvals'],
    queryFn: essApi.getPendingApprovals,
  });

  const approvalMutation = useMutation({
    mutationFn: ({ approvalId, action }: { approvalId: number | string; action: 'Approved' | 'Rejected' }) =>
      approvalApi.act(approvalId, action),
    onSuccess: (_, variables) => {
      toast.success(variables.action === 'Approved' ? 'Approval accepted' : 'Approval rejected');
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-deadlines'] });
      queryClient.invalidateQueries({ queryKey: ['system-notifications'] });
    },
    onError: () => toast.error('Could not update approval'),
  });

  const checkInMutation = useMutation({
    mutationFn: () => hrApi.checkIn({ work_mode: 'Office' }),
    onSuccess: () => {
      toast.success('Clocked in');
      queryClient.invalidateQueries({ queryKey: ['today-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['employee-snapshot'] });
    },
    onError: () => toast.error('Could not clock in'),
  });

  // 2. Real-time Notifications (Socket.IO)
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    const socket = io(socketUrl);

    const handlePayment = (data: any) => {
      toast.success(`Thanh toán thành công! Nhận ${data?.amount || data?.orderCode || ''} VNĐ` + (data?.dealName ? ` từ Deal: ${data.dealName}` : ''));
      const audio = new Audio('/sounds/tingting.mp3');
      audio.play().catch(e => console.warn("Audio play failed:", e));
    };

    socket.on('payment_success', handlePayment);
    socket.on('payment_received', handlePayment);
    socket.on('TING_TING_PAYMENT', handlePayment);

    return () => {
      socket.disconnect();
    };
  }, []);

  // 3. Helper Functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (isLoadingSnapshot || !snapshot) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const leavePercentage = (snapshot.leaveBalance / snapshot.totalLeave) * 100;
  const workHoursPercentage = (snapshot.workHours / snapshot.totalWorkHours) * 100;
  const latestOpenAttendance = schedule.find((item) => item.status === 'pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Personalized Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getGreeting()}, Jane 👋</h1>
        <p className="text-muted-foreground">
          Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* My Snapshot Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Leave Balance Card */}
          <Card className="relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Umbrella className="h-5 w-5 text-blue-600" /> Leave Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl font-bold text-gray-900">{snapshot.leaveBalance} days</h3>
                  <p className="text-sm text-muted-foreground">remaining</p>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Used: {snapshot.totalLeave - snapshot.leaveBalance} days</span>
                      <span>{Math.round(leavePercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${leavePercentage}%` }} />
                    </div>
                  </div>
                </div>
                <ProgressRing progress={leavePercentage} size={90} strokeWidth={6}>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-blue-600">{snapshot.leaveBalance}</div>
                    <div className="text-xs text-muted-foreground">days</div>
                  </div>
                </ProgressRing>
              </div>
            </CardContent>
          </Card>

          {/* Work Hours Card */}
          <Card className="relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-green-600" /> This Month's Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl font-bold text-gray-900">{snapshot.workHours}/{snapshot.totalWorkHours} hrs</h3>
                  <p className="text-sm text-muted-foreground">logged this month</p>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Remaining: {snapshot.totalWorkHours - snapshot.workHours} hrs</span>
                      <span>{Math.round(workHoursPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${workHoursPercentage}%` }} />
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
          <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-5 w-5 text-orange-600" /> Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className={cn("h-2 w-2 rounded-full mt-2 flex-shrink-0", deadline.priority === 'high' ? 'bg-red-500' : 'bg-orange-500')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{deadline.title}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Schedule */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your meetings and tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div key={index} className={cn(
                  'flex items-start gap-4 p-4 rounded-lg border-l-4 transition-all',
                  item.status === 'completed' ? 'bg-gray-50 border-gray-300 opacity-60' :
                    item.status === 'upcoming' ? 'bg-blue-50 border-blue-500' :
                      'bg-yellow-50 border-yellow-500'
                )}>
                  <div className="flex-shrink-0 text-center min-w-[80px]">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="font-semibold text-gray-900">{item.time}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <Badge variant={item.type === 'meeting' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    {item.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> :
                      item.status === 'upcoming' ? <Clock className="h-5 w-5 text-blue-600" /> :
                        <AlertCircle className="h-5 w-5 text-yellow-600" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Pending Approvals */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3 h-auto py-3" variant="outline" onClick={() => navigate('/hr')}>
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">Apply for Leave</div>
                </div>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="h-auto py-3 flex-col gap-2"
                  variant="outline"
                  onClick={() => checkInMutation.mutate()}
                  disabled={checkInMutation.isPending}
                >
                  <LogIn className="h-5 w-5 text-green-600" />
                  <span className="text-xs font-medium">Clock In</span>
                </Button>
                <Button
                  className="h-auto py-3 flex-col gap-2"
                  variant="outline"
                  onClick={() => navigate('/hr')}
                  disabled={!latestOpenAttendance}
                >
                  <LogOut className="h-5 w-5 text-orange-600" />
                  <span className="text-xs font-medium">Clock Out</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pending Approvals</CardTitle>
                <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-red-600">{approvals.length}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvals.map((approval, index) => (
                  <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{approval.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{approval.employee} • {approval.details}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs bg-green-600 hover:bg-green-700"
                        disabled={!approval.approval_id || approvalMutation.isPending}
                        onClick={() => approval.approval_id && approvalMutation.mutate({ approvalId: approval.approval_id, action: 'Approved' })}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                        disabled={!approval.approval_id || approvalMutation.isPending}
                        onClick={() => approval.approval_id && approvalMutation.mutate({ approvalId: approval.approval_id, action: 'Rejected' })}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
