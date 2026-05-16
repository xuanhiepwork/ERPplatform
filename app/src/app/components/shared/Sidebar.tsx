import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // SỬ DỤNG REACT ROUTER
import {
  LayoutDashboard, User, Calendar, BookOpen, ChevronLeft, ChevronRight,
  Settings, HelpCircle, LogOut, UserCheck, Shield, Clock, DollarSign,
  GraduationCap, UserMinus, Target, Activity, CreditCard, Receipt, PieChart,
  Package, CheckSquare, Layers, FileCheck, Kanban, ImageIcon, Sparkles,
  CalendarDays, BarChart3, TrendingUp, Briefcase, FileText,
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { UserRole } from '../../App';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, isCollapsed, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
        'hover:bg-blue-50 group relative',
        isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'text-gray-700',
        isCollapsed && 'justify-center px-2'
      )}
    >
      <div className={cn(
        'flex-shrink-0 transition-colors',
        isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
      )}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className="truncate text-sm font-medium">{label}</span>
      )}
      {isActive && !isCollapsed && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
      )}
    </button>
  );
}

function SectionHeader({ title, isCollapsed }: { title: string; isCollapsed: boolean }) {
  if (isCollapsed) return <div className="h-px bg-gray-200 my-2 mx-2" />;
  return (
    <div className="px-4 py-2 mt-4 mb-1">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userRole: UserRole;
}

export function Sidebar({ isCollapsed, onToggle, userRole }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm kiểm tra đường dẫn hiện tại có khớp với menu không
  const isActiveRoute = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const commonSuiteItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Layers className="h-5 w-5" />, label: 'View All Roles', path: '/overview' },
    { icon: <User className="h-5 w-5" />, label: 'My Profile', path: '/profile' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Shared Calendar', path: '/calendar' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Knowledge Base', path: '/knowledge' },
  ];

  const getWorkspaceItems = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return [
          { icon: <Shield className="h-5 w-5" />, label: 'User Management', path: '/hr/core' },
          { icon: <Activity className="h-5 w-5" />, label: 'System Logs', path: '/executive/bi' },
          { icon: <Layers className="h-5 w-5" />, label: 'Dept. Overview', path: '/pm/strategy' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'Analytics Hub', path: '/executive/bi' },
        ];
      case 'HR Admin':
        return [
          { icon: <UserCheck className="h-5 w-5" />, label: 'Recruitment (ATS)', path: '/hr/recruitment' },
          { icon: <Shield className="h-5 w-5" />, label: 'Core HR Database', path: '/hr/core' },
          { icon: <FileCheck className="h-5 w-5" />, label: 'Contract Management', path: '/hr/contracts' },
          { icon: <Clock className="h-5 w-5" />, label: 'Time & Attendance', path: '/hr/time-attendance' },
          { icon: <DollarSign className="h-5 w-5" />, label: 'Payroll', path: '/hr/payroll' },
          { icon: <GraduationCap className="h-5 w-5" />, label: 'Learning & Dev', path: '/hr/learning' },
          { icon: <UserMinus className="h-5 w-5" />, label: 'Offboarding', path: '/hr/offboarding' },
          { icon: <Target className="h-5 w-5" />, label: 'Performance', path: '/hr/performance' },
        ];
      case 'Finance & Accounting':
        return [
          { icon: <Activity className="h-5 w-5" />, label: 'Financial Dashboard', path: '/finance' },
          { icon: <CreditCard className="h-5 w-5" />, label: 'Accounts Payable', path: '/finance/ap' },
          { icon: <Receipt className="h-5 w-5" />, label: 'Accounts Receivable', path: '/finance/ar' },
          { icon: <PieChart className="h-5 w-5" />, label: 'Budget Management', path: '/finance/budget' },
          { icon: <Package className="h-5 w-5" />, label: 'Asset Register', path: '/finance/assets' },
        ];
      case 'Project Manager':
        return [
          { icon: <CheckSquare className="h-5 w-5" />, label: 'Project Portfolio', path: '/pm/tasks' },
          { icon: <Layers className="h-5 w-5" />, label: 'Strategy Board', path: '/pm/strategy' },
          { icon: <Target className="h-5 w-5" />, label: 'OKRs & KPIs', path: '/hr/performance' },
        ];
      case 'Marketing Lead':
        return [
          { icon: <Sparkles className="h-5 w-5" />, label: 'Marketing AI Hub', path: '/marketing/ai-hub' },
          { icon: <CalendarDays className="h-5 w-5" />, label: 'Content Calendar', path: '/marketing/calendar' },
          { icon: <Kanban className="h-5 w-5" />, label: 'Creative Board', path: '/marketing/creative' },
          { icon: <ImageIcon className="h-5 w-5" />, label: 'Asset Library (DAM)', path: '/marketing/dam' },
        ];
      case 'Employee':
      default:
        return [
          { icon: <FileText className="h-5 w-5" />, label: 'E-Requests (ESS)', path: '/requests' },
          { icon: <CheckSquare className="h-5 w-5" />, label: 'My Tasks', path: '/tasks' },
          { icon: <Target className="h-5 w-5" />, label: 'My OKRs', path: '/performance' },
          { icon: <GraduationCap className="h-5 w-5" />, label: 'My Learning', path: '/learning' },
        ];
    }
  };

  const workspaceItems = getWorkspaceItems(userRole);

  const utilityItems = [
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help Center', path: '/help' },
    { icon: <LogOut className="h-5 w-5" />, label: 'Logout', path: '/logout' },
  ];

  return (
    <aside className={cn(
      'h-full bg-white border-r flex flex-col transition-all duration-300 relative shadow-sm',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Logo Area */}
      <div className="h-16 border-b flex items-center px-4 justify-between bg-gradient-to-r from-blue-600 to-blue-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">EP</div>
            <h1 className="font-bold text-white truncate">Enterprise</h1>
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">EP</div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <div>
          <SectionHeader title="Common Suite" isCollapsed={isCollapsed} />
          <div className="space-y-1">
            {commonSuiteItems.map((item, idx) => (
              <NavItem key={idx} icon={item.icon} label={item.label} isCollapsed={isCollapsed} isActive={isActiveRoute(item.path)} onClick={() => handleNavigation(item.path)} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title={isCollapsed ? 'Workspace' : `${userRole} Workspace`} isCollapsed={isCollapsed} />
          <div className="space-y-1">
            {workspaceItems.map((item, idx) => (
              <NavItem key={idx} icon={item.icon} label={item.label} isCollapsed={isCollapsed} isActive={isActiveRoute(item.path)} onClick={() => handleNavigation(item.path)} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Utility" isCollapsed={isCollapsed} />
          <div className="space-y-1">
            {utilityItems.map((item, idx) => (
              <NavItem key={idx} icon={item.icon} label={item.label} isCollapsed={isCollapsed} isActive={isActiveRoute(item.path)} onClick={() => handleNavigation(item.path)} />
            ))}
          </div>
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t bg-gray-50">
        <Button variant="ghost" size="icon" onClick={onToggle} className={cn('w-full hover:bg-gray-200 transition-colors', isCollapsed && 'mx-auto')}>
          {isCollapsed ? <ChevronRight className="h-5 w-5 text-gray-600" /> : <ChevronLeft className="h-5 w-5 text-gray-600" />}
        </Button>
      </div>
    </aside>
  );
}