import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import {
  BarChart3,
  Bell,
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  LogOut,
  Package,
  Search,
  Shield,
  User,
  Users,
  X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { UserRole } from '../../../store/useAppStore';
import authApi from '../../../services/authService';
import { systemApi } from '../../../services/systemService';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: UserRole[] = ['Founder', 'Super Admin', 'Employee', 'Project Manager', 'Finance & Accounting', 'HR Admin', 'Marketing Lead'];

export function Header({ userRole, onRoleChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  })();

  const { data: searchResults = [] } = useQuery({
    queryKey: ['global-search', searchQuery],
    queryFn: () => systemApi.search(searchQuery),
    enabled: searchQuery.trim().length > 1,
    staleTime: 1000 * 30,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['system-notifications'],
    queryFn: systemApi.getNotifications,
    staleTime: 1000 * 30,
  });

  const markNotificationRead = useMutation({
    mutationFn: systemApi.markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['system-notifications'] }),
  });

  const markAllRead = useMutation({
    mutationFn: systemApi.markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['system-notifications'] }),
  });

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    const socket = io(socketUrl);

    const refreshNotifications = () => {
      queryClient.invalidateQueries({ queryKey: ['system-notifications'] });
    };

    const handlePayment = (data: any) => {
      toast.success('Payment received', {
        description: data?.message || `${data?.amount?.toLocaleString ? data.amount.toLocaleString() : data?.amount || ''} ${data?.description || ''}`.trim(),
      });
      refreshNotifications();
      const audio = new Audio('/sounds/money-receive.mp3');
      audio.play().catch(() => undefined);
    };

    socket.on('TING_TING_PAYMENT', handlePayment);
    socket.on('payment_received', handlePayment);
    socket.on('payment_success', handlePayment);
    socket.on('new_approval_request', refreshNotifications);
    socket.on('marketing_update', refreshNotifications);
    socket.on('new_asset_uploaded', refreshNotifications);

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  const handleLogout = () => {
    authApi.logout();
    onRoleChange('Employee');
    navigate('/login');
  };

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'Founder': return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-200';
      case 'Super Admin': return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-200';
      case 'HR Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Finance & Accounting': return 'bg-green-100 text-green-700 border-green-200';
      case 'Project Manager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Marketing Lead': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Employee':
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderSearchIcon = (moduleName: string) => {
    const normalized = moduleName.toLowerCase();
    if (normalized.includes('finance')) return <BarChart3 className="h-4 w-4" />;
    if (normalized.includes('marketing')) return <Briefcase className="h-4 w-4" />;
    if (normalized.includes('project')) return <Package className="h-4 w-4" />;
    if (normalized.includes('calendar')) return <Calendar className="h-4 w-4" />;
    if (normalized.includes('directory') || normalized.includes('business')) return <Users className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  const getModuleColor = (moduleName: string) => {
    const normalized = moduleName.toLowerCase();
    if (normalized.includes('finance')) return 'text-green-600';
    if (normalized.includes('marketing')) return 'text-orange-600';
    if (normalized.includes('project')) return 'text-blue-600';
    if (normalized.includes('business')) return 'text-cyan-600';
    return 'text-purple-600';
  };

  const formatNotificationTime = (value?: string) => {
    if (!value) return 'Just now';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const displayName = storedUser?.full_name || storedUser?.name || 'My Account';
  const displayEmail = storedUser?.email || 'Signed in';
  const initials = displayName.split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase() || 'ME';

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex-1 max-w-2xl relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search across all modules (HR, Finance, Projects, Marketing...)"
            className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
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

        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((result, index) => (
                <button
                  key={`${result.module}-${result.title}-${index}`}
                  onMouseDown={() => {
                    if (result.path) navigate(result.path);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div className={cn('flex-shrink-0', getModuleColor(result.module))}>
                    {renderSearchIcon(result.module)}
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

      <div className="flex items-center gap-3 ml-6">
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
            <DropdownMenuLabel className="text-xs text-gray-500">Switch View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => onRoleChange(role)}
                className={cn('text-sm', userRole === role && 'bg-indigo-50 text-indigo-700 font-medium')}
              >
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
              {notifications.length === 0 && (
                <div className="p-4 text-sm text-gray-500 text-center">No notifications</div>
              )}
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() => {
                    markNotificationRead.mutate(notification.id);
                    if (notification.path) navigate(notification.path);
                  }}
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
                      <div className={cn('text-sm', notification.unread ? 'font-semibold text-gray-900' : 'text-gray-700')}>
                        {notification.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {formatNotificationTime(notification.time)}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-blue-600 font-medium" onClick={() => markAllRead.mutate()}>
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hover:bg-gray-100">
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarImage src={storedUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`} />
                <AvatarFallback className="bg-blue-600 text-white font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">{displayName}</span>
                <span className="text-xs text-gray-500">{userRole}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-semibold">{displayName}</div>
                <div className="text-xs text-gray-500">{displayEmail}</div>
                <Badge className={cn('w-fit text-xs mt-1', getRoleBadgeColor(userRole))}>
                  {userRole}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/hr/core')}>
              <User className="h-4 w-4 mr-2" /> My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
              <FileText className="h-4 w-4 mr-2" /> My Requests
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
              <Shield className="h-4 w-4 mr-2" /> Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
