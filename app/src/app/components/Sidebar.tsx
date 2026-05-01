import { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  UserCheck,
  Shield,
  Clock,
  DollarSign,
  GraduationCap,
  UserMinus,
  Target,
  Activity,
  CreditCard,
  Receipt,
  PieChart,
  Package,
  CheckSquare,
  Layers,
  Handshake,
  FileCheck,
  FolderOpen,
  Kanban,
  ImageIcon,
  Sparkles,
  CalendarDays,
  BarChart3,
  TrendingUp,
  Briefcase,
  FileText,
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { UserRole } from '../App';

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

interface SectionHeaderProps {
  title: string;
  isCollapsed: boolean;
}

function SectionHeader({ title, isCollapsed }: SectionHeaderProps) {
  if (isCollapsed) {
    return <div className="h-px bg-gray-200 my-2 mx-2" />;
  }

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
  activePage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
}

export function Sidebar({ isCollapsed, onToggle, activePage, onNavigate, userRole }: SidebarProps) {
  // Common Suite - Fixed for all users
  const commonSuiteItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', page: 'dashboard' },
    { icon: <Layers className="h-5 w-5" />, label: 'View All Roles', page: 'overview' },
    { icon: <User className="h-5 w-5" />, label: 'My Profile', page: 'profile' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Shared Calendar', page: 'calendar' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Knowledge Base', page: 'knowledge' },
  ];

  // Workspace Switcher - Changes based on role
  const getWorkspaceItems = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return [
          { icon: <Shield className="h-5 w-5" />, label: 'User Management', page: 'core-hr' },
          { icon: <Activity className="h-5 w-5" />, label: 'System Logs', page: 'bi-analytics' },
          { icon: <Layers className="h-5 w-5" />, label: 'Dept. Overview', page: 'strategy' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'Analytics Hub', page: 'bi-analytics' },
          { icon: <Settings className="h-5 w-5" />, label: 'System Config', page: 'dashboard' },
        ];
      case 'HR Admin':
        return [
          { icon: <UserCheck className="h-5 w-5" />, label: 'Recruitment (ATS)', page: 'ats-dashboard' },
          { icon: <Shield className="h-5 w-5" />, label: 'Core HR Database', page: 'core-hr' },
          { icon: <Clock className="h-5 w-5" />, label: 'Time & Attendance', page: 'time-attendance' },
          { icon: <DollarSign className="h-5 w-5" />, label: 'Payroll', page: 'payroll' },
          { icon: <GraduationCap className="h-5 w-5" />, label: 'Learning & Dev', page: 'learning' },
          { icon: <UserMinus className="h-5 w-5" />, label: 'Offboarding', page: 'offboarding' },
          { icon: <Target className="h-5 w-5" />, label: 'Performance', page: 'performance-review' },
        ];
      case 'Finance & Accounting':
        return [
          { icon: <Activity className="h-5 w-5" />, label: 'Financial Dashboard', page: 'financial' },
          { icon: <CreditCard className="h-5 w-5" />, label: 'Accounts Payable', page: 'accounts-payable' },
          { icon: <Receipt className="h-5 w-5" />, label: 'Accounts Receivable', page: 'accounts-receivable' },
          { icon: <PieChart className="h-5 w-5" />, label: 'Budget Management', page: 'budget-management' },
          { icon: <Package className="h-5 w-5" />, label: 'Asset Register', page: 'asset-register' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'BI Analytics', page: 'bi-analytics' },
        ];
      case 'Project Manager':
        return [
          { icon: <CheckSquare className="h-5 w-5" />, label: 'Project Portfolio', page: 'tasks' },
          { icon: <Layers className="h-5 w-5" />, label: 'Strategy Board', page: 'strategy' },
          { icon: <Target className="h-5 w-5" />, label: 'OKRs & KPIs', page: 'performance' },
          { icon: <CalendarDays className="h-5 w-5" />, label: 'Gantt Timeline', page: 'calendar' },
          { icon: <TrendingUp className="h-5 w-5" />, label: 'Resource Planning', page: 'bi-analytics' },
        ];
      case 'Marketing Lead':
        return [
          { icon: <Sparkles className="h-5 w-5" />, label: 'Marketing AI Hub', page: 'marketing-ai' },
          { icon: <CalendarDays className="h-5 w-5" />, label: 'Content Calendar', page: 'marketing-calendar' },
          { icon: <Kanban className="h-5 w-5" />, label: 'Creative Board', page: 'creative-board' },
          { icon: <ImageIcon className="h-5 w-5" />, label: 'Asset Library (DAM)', page: 'dam-portal' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'Campaigns', page: 'bi-analytics' },
        ];
      case 'Employee':
      default:
        return [
          { icon: <FileText className="h-5 w-5" />, label: 'E-Requests (ESS)', page: 'requests' },
          { icon: <CheckSquare className="h-5 w-5" />, label: 'My Tasks', page: 'tasks' },
          { icon: <Target className="h-5 w-5" />, label: 'My OKRs', page: 'performance' },
          { icon: <GraduationCap className="h-5 w-5" />, label: 'My Learning', page: 'learning' },
          { icon: <Clock className="h-5 w-5" />, label: 'My Timesheet', page: 'time-attendance' },
        ];
    }
  };

  const workspaceItems = getWorkspaceItems(userRole);

  // Utility Items - Fixed for all users
  const utilityItems = [
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', page: 'dashboard' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help Center', page: 'dashboard' },
    { icon: <LogOut className="h-5 w-5" />, label: 'Logout', page: 'dashboard' },
  ];

  return (
    <aside
      className={cn(
        'h-full bg-white border-r flex flex-col transition-all duration-300 relative shadow-sm',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Area */}
      <div className="h-16 border-b flex items-center px-4 justify-between bg-gradient-to-r from-blue-600 to-blue-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
              EP
            </div>
            <h1 className="font-bold text-white truncate">
              Enterprise
            </h1>
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
              EP
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        {/* Common Suite Section */}
        <div>
          <SectionHeader title="Common Suite" isCollapsed={isCollapsed} />
          <div className="space-y-1">
            {commonSuiteItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
                isActive={activePage === item.page}
                onClick={() => onNavigate(item.page)}
              />
            ))}
          </div>
        </div>

        {/* Workspace Section */}
        <div>
          <SectionHeader
            title={isCollapsed ? 'Workspace' : `${userRole} Workspace`}
            isCollapsed={isCollapsed}
          />
          <div className="space-y-1">
            {workspaceItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
                isActive={activePage === item.page}
                onClick={() => onNavigate(item.page)}
              />
            ))}
          </div>
        </div>

        {/* Utility Section */}
        <div>
          <SectionHeader title="Utility" isCollapsed={isCollapsed} />
          <div className="space-y-1">
            {utilityItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
                isActive={false}
                onClick={() => {
                  if (item.label === 'Logout') {
                    alert('Logout clicked');
                  } else {
                    onNavigate(item.page);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            'w-full hover:bg-gray-200 transition-colors',
            isCollapsed && 'mx-auto'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </Button>
      </div>
    </aside>
  );
}
