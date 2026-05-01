import { Zap, User, Target, DollarSign, Users, TrendingUp, Crown, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { UserRole } from '../App';

interface RoleCardProps {
  role: UserRole;
  icon: React.ReactNode;
  color: string;
  description: string;
  features: string[];
  onViewDemo: () => void;
}

function RoleCard({ role, icon, color, description, features, onViewDemo }: RoleCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group">
      <div className={cn('h-32 flex items-center justify-center relative', color)}>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/20 text-white border-white/30">
            {role}
          </Badge>
        </div>
        <div className="h-16 w-16 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg">
          {icon}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{role}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <ChevronRight className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={onViewDemo}
          className={cn(
            'w-full group-hover:shadow-md transition-all',
            color.includes('gradient') ? color.replace('bg-', 'bg-') : `bg-${color.split('-')[1]}-600 hover:bg-${color.split('-')[1]}-700`
          )}
        >
          View Dashboard
        </Button>
      </div>
    </div>
  );
}

interface RoleBasedOverviewProps {
  onRoleChange: (role: UserRole) => void;
}

export function RoleBasedOverview({ onRoleChange }: RoleBasedOverviewProps) {
  const roles: Array<Omit<RoleCardProps, 'onViewDemo'>> = [
    {
      role: 'Founder',
      icon: <Crown className="h-8 w-8 text-amber-600" />,
      color: 'bg-gradient-to-br from-amber-600 to-amber-800',
      description: 'Ultimate Founder\'s Control Tower with premium command center interface',
      features: [
        'Executive BI Dashboard with vital signs and burn-rate analysis',
        'Strategic Vision & OKR Map with departmental alignment',
        'Finance & Forecasting with what-if simulation tools',
        'Corporate Risk & Compliance Heatmap with 9-box matrix',
        'Human Capital & Partner Portfolio analytics',
        'AI-Powered Decision Support with strategic escalations',
      ],
    },
    {
      role: 'Super Admin',
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      color: 'bg-gradient-to-br from-indigo-600 to-purple-600',
      description: 'Executive command center with department-wide overview and analytics',
      features: [
        'Modular grid dashboard with real-time widgets',
        'Department health metrics (HR, Finance, BD, Marketing, PM)',
        'System logs and user management',
        'Quick navigation to all modules',
        'Dark mode premium interface',
      ],
    },
    {
      role: 'Employee',
      icon: <User className="h-8 w-8 text-gray-600" />,
      color: 'bg-gradient-to-br from-gray-500 to-slate-600',
      description: 'Personal workspace for employee self-service and daily tasks',
      features: [
        'Personal snapshot with today\'s schedule',
        'E-Requests (Leave, OT, Claims)',
        'Quick clock-in/out actions',
        'Leave balance and working hours',
        'Request status tracking',
      ],
    },
    {
      role: 'Project Manager',
      icon: <Target className="h-8 w-8 text-blue-600" />,
      color: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      description: 'Project health dashboard with resource allocation and metrics',
      features: [
        'Project portfolio health overview',
        'Budget burn rate tracking',
        'Resource allocation heat map',
        'Blocked tasks visibility',
        'Gantt chart and timeline views',
      ],
    },
    {
      role: 'Finance & Accounting',
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: 'bg-gradient-to-br from-green-600 to-emerald-600',
      description: 'Financial overview with cashflow, approvals, and tax deadlines',
      features: [
        'Real-time cashflow charts (Revenue vs Expense)',
        'Pending approvals workflow',
        'Tax and compliance deadlines',
        'AP/AR management',
        'Budget and asset tracking',
      ],
    },
    {
      role: 'HR Admin',
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: 'bg-gradient-to-br from-purple-600 to-pink-600',
      description: 'Recruitment funnel, payroll, and employee lifecycle management',
      features: [
        'Recruitment funnel (Applied → Offered)',
        'Payroll deadlines and processing',
        'Employee database (E-Profiles)',
        'Birthday and anniversary tracking',
        'Onboarding and offboarding workflows',
      ],
    },
    {
      role: 'Marketing Lead',
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      color: 'bg-gradient-to-br from-orange-600 to-pink-600',
      description: 'Campaign performance, creative pipeline, and content management',
      features: [
        'Campaign metrics (CTR, CPC, ROI)',
        'Creative production pipeline (To-do → Done)',
        'Content request inbox',
        'Digital asset library (DAM)',
        'AI-powered content tools',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Enterprise Digital Workplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            7 Premium Role-Based UI Variants including Founder's Control Tower
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="outline" className="text-sm px-4 py-1.5">
              Minimalist SaaS UI
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-1.5">
              Indigo & Slate Palette
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-1.5">
              8px Grid System
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-1.5">
              Responsive & High-Density
            </Badge>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-2xl border-2 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Global Features Across All Roles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Collapsible Sidebar</h3>
              <p className="text-sm text-gray-600">
                Fixed-width sidebar with 3 sections: Common Suite, Role Workspace, and Utility
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Search</h3>
              <p className="text-sm text-gray-600">
                Search across all modules with categorized results and quick navigation
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Role Switcher</h3>
              <p className="text-sm text-gray-600">
                Unified notification system with unread badges and role-based badge indicators
              </p>
            </div>
          </div>
        </div>

        {/* Role Cards Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Role to Explore
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((roleData, index) => (
              <RoleCard
                key={index}
                {...roleData}
                onViewDemo={() => onRoleChange(roleData.role)}
              />
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Design System</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Visual Style: Minimalist Professional SaaS UI</li>
                <li>• Icons: Thin-line Lucide icons (1px stroke)</li>
                <li>• Color Palette: Indigo (#4F46E5) & Slate Gray</li>
                <li>• Grid System: 8px base unit</li>
                <li>• Border Radius: 8px for cards and components</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Features</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• RBAC (Role-Based Access Control) logic</li>
                <li>• Responsive card-based layout</li>
                <li>• High-density information display</li>
                <li>• Real-time data widgets with charts</li>
                <li>• Dark mode support (Super Admin)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Click any role card above to view the full dashboard experience
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white px-8 shadow-lg shadow-amber-500/20"
            onClick={() => onRoleChange('Founder')}
          >
            <Crown className="h-5 w-5 mr-2" />
            Start with Founder's Control Tower
          </Button>
        </div>
      </div>
    </div>
  );
}
