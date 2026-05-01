import { useState } from 'react';
import { Users, DollarSign, Briefcase, TrendingUp, Target, Smile, ChevronRight, Activity, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  mainValue: string;
  subtitle: string;
  trend: number;
  color: string;
  chartData?: number[];
  onNavigate: () => void;
}

function DashboardWidget({ title, icon, mainValue, subtitle, trend, color, chartData, onNavigate }: WidgetProps) {
  const isPositive = trend >= 0;

  return (
    <div className={cn(
      'bg-white rounded-lg border p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer',
      'hover:border-indigo-200'
    )} onClick={onNavigate}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', color)}>
          {icon}
        </div>
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs mr-1">View</span>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-gray-900">{mainValue}</div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-semibold',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {Math.abs(trend)}%
          </div>
        </div>
        <div className="text-sm text-gray-500">{subtitle}</div>

        {/* Mini Sparkline Chart */}
        {chartData && (
          <div className="h-12 flex items-end gap-1 mt-4">
            {chartData.map((value, index) => (
              <div
                key={index}
                className={cn('flex-1 rounded-t', color.replace('bg-', 'bg-').replace('/10', '/30'))}
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface SuperAdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function SuperAdminDashboard({ onNavigate }: SuperAdminDashboardProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const widgets = [
    {
      title: 'HR & Workforce',
      icon: <Users className="h-6 w-6 text-purple-600" />,
      mainValue: '1,247',
      subtitle: '42 new hires this month',
      trend: 8.5,
      color: 'bg-purple-100',
      chartData: [45, 60, 50, 75, 65, 80, 70, 85],
      page: 'core-hr'
    },
    {
      title: 'Finance Overview',
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      mainValue: '$4.2M',
      subtitle: 'Monthly revenue +12% MoM',
      trend: 12.3,
      color: 'bg-green-100',
      chartData: [50, 55, 60, 65, 70, 75, 80, 85],
      page: 'financial'
    },
    {
      title: 'BD Pipeline',
      icon: <Briefcase className="h-6 w-6 text-blue-600" />,
      mainValue: '$12.8M',
      subtitle: '28 active opportunities',
      trend: 15.7,
      color: 'bg-blue-100',
      chartData: [40, 50, 45, 60, 70, 65, 75, 80],
      page: 'partners'
    },
    {
      title: 'Marketing ROI',
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      mainValue: '342%',
      subtitle: 'Lead conversion 18.5%',
      trend: 24.1,
      color: 'bg-orange-100',
      chartData: [35, 45, 55, 60, 70, 75, 85, 90],
      page: 'marketing-ai'
    },
    {
      title: 'Project Health',
      icon: <Target className="h-6 w-6 text-indigo-600" />,
      mainValue: '87%',
      subtitle: '42 on track, 6 at risk',
      trend: 5.2,
      color: 'bg-indigo-100',
      chartData: [60, 65, 62, 70, 75, 80, 85, 87],
      page: 'strategy'
    },
    {
      title: 'Employee Engagement',
      icon: <Smile className="h-6 w-6 text-pink-600" />,
      mainValue: '8.4/10',
      subtitle: 'Satisfaction score',
      trend: 3.8,
      color: 'bg-pink-100',
      chartData: [70, 72, 75, 78, 80, 82, 83, 84],
      page: 'performance-review'
    },
  ];

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300',
      isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50'
    )}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className={cn(
                'text-3xl font-bold',
                isDarkMode ? 'text-white' : 'text-gray-900'
              )}>
                Command Center
              </h1>
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Super Admin
              </Badge>
            </div>
            <p className={cn(
              'text-sm',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              Real-time executive overview across all departments
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={isDarkMode ? 'bg-slate-800 text-white border-slate-700' : ''}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className={cn(
            'rounded-lg border p-4',
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Activity className={cn('h-4 w-4', isDarkMode ? 'text-indigo-400' : 'text-indigo-600')} />
              <span className={cn('text-xs font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                System Health
              </span>
            </div>
            <div className={cn('text-2xl font-bold', isDarkMode ? 'text-white' : 'text-gray-900')}>
              99.8%
            </div>
            <div className="text-xs text-green-600 mt-1">All systems operational</div>
          </div>

          <div className={cn(
            'rounded-lg border p-4',
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Users className={cn('h-4 w-4', isDarkMode ? 'text-purple-400' : 'text-purple-600')} />
              <span className={cn('text-xs font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                Active Users
              </span>
            </div>
            <div className={cn('text-2xl font-bold', isDarkMode ? 'text-white' : 'text-gray-900')}>
              1,089
            </div>
            <div className="text-xs text-gray-500 mt-1">Online now</div>
          </div>

          <div className={cn(
            'rounded-lg border p-4',
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Target className={cn('h-4 w-4', isDarkMode ? 'text-green-400' : 'text-green-600')} />
              <span className={cn('text-xs font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                Tasks Completed
              </span>
            </div>
            <div className={cn('text-2xl font-bold', isDarkMode ? 'text-white' : 'text-gray-900')}>
              842
            </div>
            <div className="text-xs text-gray-500 mt-1">This week</div>
          </div>

          <div className={cn(
            'rounded-lg border p-4',
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className={cn('h-4 w-4', isDarkMode ? 'text-orange-400' : 'text-orange-600')} />
              <span className={cn('text-xs font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                Revenue Growth
              </span>
            </div>
            <div className={cn('text-2xl font-bold', isDarkMode ? 'text-white' : 'text-gray-900')}>
              +18.4%
            </div>
            <div className="text-xs text-green-600 mt-1">vs last quarter</div>
          </div>
        </div>

        {/* Department Widgets Grid */}
        <div>
          <h2 className={cn(
            'text-lg font-semibold mb-4',
            isDarkMode ? 'text-white' : 'text-gray-900'
          )}>
            Department Overview
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {widgets.map((widget, index) => (
              <DashboardWidget
                key={index}
                title={widget.title}
                icon={widget.icon}
                mainValue={widget.mainValue}
                subtitle={widget.subtitle}
                trend={widget.trend}
                color={widget.color}
                chartData={widget.chartData}
                onNavigate={() => onNavigate(widget.page)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={cn(
          'rounded-lg border p-6',
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'
        )}>
          <h3 className={cn(
            'font-semibold mb-4',
            isDarkMode ? 'text-white' : 'text-gray-900'
          )}>
            Recent System Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'New contract approved', dept: 'Finance', time: '2 min ago', status: 'success' },
              { action: 'Marketing campaign launched', dept: 'Marketing', time: '15 min ago', status: 'info' },
              { action: 'Project milestone completed', dept: 'PM', time: '1 hour ago', status: 'success' },
              { action: 'HR policy updated', dept: 'HR', time: '2 hours ago', status: 'warning' },
              { action: 'BD deal closed - $2.4M', dept: 'Sales', time: '3 hours ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-2 w-2 rounded-full',
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  )} />
                  <div>
                    <div className={cn('text-sm font-medium', isDarkMode ? 'text-white' : 'text-gray-900')}>
                      {activity.action}
                    </div>
                    <div className="text-xs text-gray-500">{activity.dept}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
