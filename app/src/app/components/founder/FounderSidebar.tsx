import { Activity, Target, DollarSign, Shield, Users, Sparkles, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

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
        'w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 group relative',
        'hover:bg-slate-800',
        isActive
          ? 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-500/30 shadow-lg shadow-amber-500/10'
          : 'border border-transparent',
        isCollapsed && 'justify-center px-2'
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-r" />
      )}
      <div className={cn(
        'flex-shrink-0 transition-colors',
        isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'
      )}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className={cn(
          'truncate text-sm font-semibold transition-colors',
          isActive ? 'text-amber-400' : 'text-slate-300 group-hover:text-amber-400'
        )}>
          {label}
        </span>
      )}
    </button>
  );
}

interface FounderSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
}

export function FounderSidebar({ isCollapsed, onToggle, activeView, onNavigate }: FounderSidebarProps) {
  const strategicViews = [
    { icon: <Activity className="h-5 w-5" />, label: 'Vital Signs', view: 'vital-signs' },
    { icon: <Target className="h-5 w-5" />, label: 'Vision & OKRs', view: 'vision-okr' },
    { icon: <DollarSign className="h-5 w-5" />, label: 'Finance & Forecast', view: 'finance' },
    { icon: <Shield className="h-5 w-5" />, label: 'Risk & Compliance', view: 'risk' },
    { icon: <Users className="h-5 w-5" />, label: 'Human Capital', view: 'human-capital' },
    { icon: <Sparkles className="h-5 w-5" />, label: 'AI Decision Support', view: 'ai-decision' },
  ];

  return (
    <aside
      className={cn(
        'h-full bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 relative',
        isCollapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Logo Area */}
      <div className="h-20 border-b border-slate-800 flex items-center px-5 justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-100">Control Tower</h1>
              <p className="text-xs text-amber-400">Enterprise OS</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        <div>
          {!isCollapsed && (
            <div className="px-4 mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Strategic Command
              </h3>
            </div>
          )}
          {strategicViews.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
              isActive={activeView === item.view}
              onClick={() => onNavigate(item.view)}
            />
          ))}
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-slate-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            'w-full hover:bg-slate-800 text-slate-400 hover:text-amber-400',
            isCollapsed && 'mx-auto'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
