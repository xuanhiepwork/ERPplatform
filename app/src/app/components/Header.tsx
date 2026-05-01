import { useState } from 'react';
import { Search, Bell, ChevronDown, X, FileText, Users, Calendar, BarChart3, Briefcase, Shield, Package, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { UserRole } from '../App';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ userRole, onRoleChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock search results across modules
  const searchResults = searchQuery.length > 0 ? [
    { title: 'Employee Records', module: 'HR', icon: <Shield className="h-4 w-4" />, color: 'text-purple-600' },
    { title: 'Financial Reports Q1', module: 'Finance', icon: <BarChart3 className="h-4 w-4" />, color: 'text-green-600' },
    { title: 'Marketing Campaign Assets', module: 'Marketing', icon: <Briefcase className="h-4 w-4" />, color: 'text-orange-600' },
    { title: 'Project Task Board', module: 'Projects', icon: <Package className="h-4 w-4" />, color: 'text-blue-600' },
    { title: 'Team Calendar Events', module: 'Calendar', icon: <Calendar className="h-4 w-4" />, color: 'text-indigo-600' },
    { title: 'Company Directory', module: 'Directory', icon: <Users className="h-4 w-4" />, color: 'text-cyan-600' },
  ].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.module.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New contract awaiting approval', time: '5 min ago', unread: true, type: 'approval' },
    { id: 2, title: 'Sarah Chen updated OKR progress', time: '15 min ago', unread: true, type: 'update' },
    { id: 3, title: 'Budget report ready for review', time: '1 hour ago', unread: false, type: 'report' },
    { id: 4, title: 'Team meeting starting soon', time: '2 hours ago', unread: false, type: 'reminder' },
    { id: 5, title: 'New employee onboarding checklist', time: '3 hours ago', unread: false, type: 'task' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'Founder':
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-200';
      case 'Super Admin':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-200';
      case 'HR Admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Finance & Accounting':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Project Manager':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Marketing Lead':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Employee':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-2xl relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search across all modules (HR, Finance, Projects, Marketing...)"
            className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div className={cn('flex-shrink-0', result.color)}>
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {result.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.module} Module
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {result.module}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-6">
        {/* Role Badge - Demo Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'gap-2 font-semibold text-xs px-3 py-1.5 h-auto border transition-all hover:shadow-sm',
                getRoleBadgeColor(userRole)
              )}
            >
              {userRole}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs text-gray-500">Switch View (Demo Mode)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(['Founder', 'Super Admin', 'Employee', 'Project Manager', 'Finance & Accounting', 'HR Admin', 'Marketing Lead'] as UserRole[]).map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => onRoleChange(role)}
                className={cn(
                  'text-sm',
                  userRole === role && 'bg-indigo-50 text-indigo-700 font-medium'
                )}
              >
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Unified Notification Bell */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 cursor-pointer',
                    notification.unread && 'bg-blue-50'
                  )}
                >
                  <div className="flex items-start gap-2 w-full">
                    {notification.unread && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        'text-sm',
                        notification.unread ? 'font-semibold text-gray-900' : 'text-gray-700'
                      )}>
                        {notification.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-blue-600 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hover:bg-gray-100">
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Enterprise" />
                <AvatarFallback className="bg-blue-600 text-white font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">{userRole}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">john.doe@enterprise.com</div>
                <Badge className={cn('w-fit text-xs mt-1', getRoleBadgeColor(userRole))}>
                  {userRole}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="h-4 w-4 mr-2" />
              My Requests
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="h-4 w-4 mr-2" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


useEffect(() => {
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  socket.on('TING_TING_PAYMENT', (data) => {
    // Hiển thị thông báo đẹp mắt
    notification.success({
      message: '💰 Tiền về! Ting Ting!',
      description: `Nhận ${data.amount.toLocaleString()}đ - ${data.description}`,
      placement: 'topRight',
    });
    // Chạy âm thanh
    new Audio('/sounds/money-receive.mp3').play();
  });
}, []);