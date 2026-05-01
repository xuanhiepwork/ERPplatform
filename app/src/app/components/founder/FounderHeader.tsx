import { useState } from 'react';
import { Search, Bell, ChevronDown, Crown, AlertTriangle, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { cn } from '../ui/utils';

export function FounderHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Critical alerts only
  const criticalAlerts = [
    { id: 1, title: 'Cash runway below 6 months', severity: 'critical', time: '2 min ago' },
    { id: 2, title: 'Major contract renewal due in 7 days', severity: 'high', time: '1 hour ago' },
    { id: 3, title: 'Key executive resignation pending', severity: 'critical', time: '3 hours ago' },
  ];

  return (
    <header className="h-20 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 px-8 flex items-center justify-between">
      {/* Strategic Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            type="search"
            placeholder="Strategic Search: Companies, KPIs, Decisions, Risks..."
            className="pl-12 h-12 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-amber-500/50 focus:ring-amber-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right Side: Role Badge & Notifications */}
      <div className="flex items-center gap-4 ml-8">
        {/* Current View Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg border border-amber-500/30">
          <Crown className="h-5 w-5 text-amber-100" />
          <span className="text-sm font-bold text-white">Founder View</span>
        </div>

        {/* Notification Center (Critical Alerts Only) */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-700"
            >
              <Bell className="h-5 w-5 text-amber-400" />
              {criticalAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
                  {criticalAlerts.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 bg-slate-900 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">
              Critical Alerts Only
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <div className="max-h-80 overflow-y-auto">
              {criticalAlerts.map((alert) => (
                <DropdownMenuItem
                  key={alert.id}
                  className="flex items-start gap-3 p-4 cursor-pointer focus:bg-slate-800"
                >
                  <div className={cn(
                    'h-2 w-2 rounded-full mt-2 flex-shrink-0',
                    alert.severity === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                  )} />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-200 mb-1">{alert.title}</div>
                    <div className="text-xs text-slate-400">{alert.time}</div>
                  </div>
                  {alert.severity === 'critical' && (
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-center justify-center text-amber-400 font-semibold focus:bg-slate-800">
              View All Strategic Alerts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Founder Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3 px-3 h-12 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-700">
              <Avatar className="h-9 w-9 ring-2 ring-amber-500">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Founder" />
                <AvatarFallback className="bg-amber-600 text-white font-bold">FC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-slate-200">Alex Morgan</span>
                <span className="text-xs text-amber-400">Founder & CEO</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-bold">Alex Morgan</div>
                <div className="text-xs text-amber-400">alex.morgan@enterprise.com</div>
                <Badge className="w-fit mt-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500/30">
                  Founder & CEO
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-200 focus:bg-slate-800">
              Executive Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-200 focus:bg-slate-800">
              Security & Privacy
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-red-400 focus:bg-slate-800 focus:text-red-400">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
