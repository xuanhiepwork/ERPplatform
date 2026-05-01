import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Filter,
  Search,
  Grid3x3,
  LayoutList,
  GripVertical,
  Clock,
  CheckCircle2,
  Edit3,
  Facebook,
  Youtube,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Megaphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type CalendarView = 'month' | 'week';
type ContentStatus = 'draft' | 'scheduled' | 'published';
type Channel = 'facebook' | 'youtube' | 'email' | 'twitter' | 'instagram' | 'linkedin' | 'blog';

interface ContentCard {
  id: string;
  title: string;
  channel: Channel;
  status: ContentStatus;
  date: Date;
  time: string;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  campaign: string;
  description: string;
}

interface UnscheduledIdea {
  id: string;
  title: string;
  channel: Channel;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  campaign: string;
}

const channelConfig = {
  facebook: {
    label: 'Facebook',
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    icon: Facebook
  },
  youtube: {
    label: 'YouTube',
    color: 'bg-red-500',
    lightBg: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: Youtube
  },
  email: {
    label: 'Email',
    color: 'bg-green-500',
    lightBg: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: Mail
  },
  twitter: {
    label: 'Twitter',
    color: 'bg-sky-500',
    lightBg: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    icon: Twitter
  },
  instagram: {
    label: 'Instagram',
    color: 'bg-pink-500',
    lightBg: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    icon: Instagram
  },
  linkedin: {
    label: 'LinkedIn',
    color: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
    icon: Linkedin
  },
  blog: {
    label: 'Blog',
    color: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    icon: Megaphone
  }
};

const statusConfig = {
  draft: { label: 'Draft', color: 'text-gray-600', icon: Edit3 },
  scheduled: { label: 'Scheduled', color: 'text-orange-600', icon: Clock },
  published: { label: 'Published', color: 'text-green-600', icon: CheckCircle2 }
};

const campaigns = ['All Campaigns', 'Q2 Product Launch', 'Brand Awareness 2026', 'Customer Success Stories', 'Webinar Series'];

const scheduledContent: ContentCard[] = [
  {
    id: 'c1',
    title: 'Product Feature Announcement',
    channel: 'facebook',
    status: 'scheduled',
    date: new Date(2026, 3, 15),
    time: '10:00 AM',
    assignee: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ'
    },
    campaign: 'Q2 Product Launch',
    description: 'Announce new AI-powered features'
  },
  {
    id: 'c2',
    title: 'Tutorial Video: Getting Started',
    channel: 'youtube',
    status: 'draft',
    date: new Date(2026, 3, 16),
    time: '2:00 PM',
    assignee: {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      initials: 'MC'
    },
    campaign: 'Q2 Product Launch',
    description: 'Step-by-step onboarding video'
  },
  {
    id: 'c3',
    title: 'Weekly Newsletter - April Edition',
    channel: 'email',
    status: 'scheduled',
    date: new Date(2026, 3, 14),
    time: '9:00 AM',
    assignee: {
      name: 'Amanda Foster',
      avatar: 'https://i.pravatar.cc/150?img=27',
      initials: 'AF'
    },
    campaign: 'Brand Awareness 2026',
    description: 'Company updates and industry insights'
  },
  {
    id: 'c4',
    title: 'Customer Success Story: TechCorp',
    channel: 'blog',
    status: 'published',
    date: new Date(2026, 3, 11),
    time: '11:00 AM',
    assignee: {
      name: 'David Martinez',
      avatar: 'https://i.pravatar.cc/150?img=13',
      initials: 'DM'
    },
    campaign: 'Customer Success Stories',
    description: 'Case study featuring enterprise client'
  },
  {
    id: 'c5',
    title: 'Product Demo Webinar Registration',
    channel: 'linkedin',
    status: 'scheduled',
    date: new Date(2026, 3, 17),
    time: '3:00 PM',
    assignee: {
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      initials: 'ER'
    },
    campaign: 'Webinar Series',
    description: 'Promote upcoming product demo'
  },
  {
    id: 'c6',
    title: 'New Feature Teaser',
    channel: 'instagram',
    status: 'scheduled',
    date: new Date(2026, 3, 15),
    time: '1:00 PM',
    assignee: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ'
    },
    campaign: 'Q2 Product Launch',
    description: 'Behind-the-scenes sneak peek'
  },
  {
    id: 'c7',
    title: 'Industry Insights Thread',
    channel: 'twitter',
    status: 'draft',
    date: new Date(2026, 3, 18),
    time: '10:30 AM',
    assignee: {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      initials: 'MC'
    },
    campaign: 'Brand Awareness 2026',
    description: 'Thought leadership content'
  },
  {
    id: 'c8',
    title: 'Product Update Email',
    channel: 'email',
    status: 'scheduled',
    date: new Date(2026, 3, 19),
    time: '9:00 AM',
    assignee: {
      name: 'Amanda Foster',
      avatar: 'https://i.pravatar.cc/150?img=27',
      initials: 'AF'
    },
    campaign: 'Q2 Product Launch',
    description: 'Announce latest release notes'
  },
  {
    id: 'c9',
    title: 'How-To Guide: Advanced Features',
    channel: 'youtube',
    status: 'published',
    date: new Date(2026, 3, 12),
    time: '2:00 PM',
    assignee: {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      initials: 'MC'
    },
    campaign: 'Customer Success Stories',
    description: 'Advanced tutorial video'
  }
];

const unscheduledIdeas: UnscheduledIdea[] = [
  {
    id: 'u1',
    title: 'Behind the Scenes: Team Culture',
    channel: 'instagram',
    assignee: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ'
    },
    campaign: 'Brand Awareness 2026'
  },
  {
    id: 'u2',
    title: 'Industry Report Download',
    channel: 'linkedin',
    assignee: {
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      initials: 'ER'
    },
    campaign: 'Brand Awareness 2026'
  },
  {
    id: 'u3',
    title: 'Product Comparison Blog Post',
    channel: 'blog',
    assignee: {
      name: 'David Martinez',
      avatar: 'https://i.pravatar.cc/150?img=13',
      initials: 'DM'
    },
    campaign: 'Q2 Product Launch'
  },
  {
    id: 'u4',
    title: 'Customer Interview Video',
    channel: 'youtube',
    assignee: {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      initials: 'MC'
    },
    campaign: 'Customer Success Stories'
  }
];

export function MarketingCalendar() {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 11));
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [showUnscheduled, setShowUnscheduled] = useState(true);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getContentForDate = (date: Date | null) => {
    if (!date) return [];

    const filtered = scheduledContent.filter(content => {
      const matchesDate = content.date.getDate() === date.getDate() &&
        content.date.getMonth() === date.getMonth() &&
        content.date.getFullYear() === date.getFullYear();

      const matchesCampaign = selectedCampaign === 'All Campaigns' || content.campaign === selectedCampaign;

      return matchesDate && matchesCampaign;
    });

    return filtered;
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setDate(currentDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2026, 3, 11);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const filteredUnscheduled = unscheduledIdeas.filter(idea =>
    selectedCampaign === 'All Campaigns' || idea.campaign === selectedCampaign
  );

  return (
    <div className="h-full flex gap-6">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Marketing Content Calendar</h1>
              <p className="text-muted-foreground">
                Plan and schedule content across all marketing channels
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Content
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(2026, 3, 11))}>
                  Today
                </Button>
              </div>
              <h2>{formatMonthYear()}</h2>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {campaigns.map((campaign) => (
                  <option key={campaign} value={campaign}>{campaign}</option>
                ))}
              </select>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
            </div>
          </div>

          {/* Channel Legend */}
          <div className="flex flex-wrap gap-2 mt-4 p-3 bg-muted/30 rounded-lg">
            {Object.entries(channelConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-0 h-full">
            {view === 'month' ? (
              <div className="h-full flex flex-col">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b border-border bg-muted/50">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 flex-1" style={{ gridAutoRows: '1fr' }}>
                  {getDaysInMonth().map((date, index) => {
                    const dayContent = getContentForDate(date);
                    const isTodayDate = isToday(date);

                    return (
                      <div
                        key={index}
                        className={`border-r border-b last:border-r-0 p-2 overflow-y-auto ${!date ? 'bg-muted/20' : isTodayDate ? 'bg-blue-50' : ''
                          }`}
                      >
                        {date && (
                          <>
                            <div className={`text-sm mb-2 flex items-center justify-between ${isTodayDate ? 'font-bold' : ''
                              }`}>
                              <span className={isTodayDate ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs' : ''}>
                                {date.getDate()}
                              </span>
                              {dayContent.length > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  {dayContent.length}
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              {dayContent.map((content) => {
                                const ChannelIcon = channelConfig[content.channel].icon;
                                const StatusIcon = statusConfig[content.status].icon;
                                return (
                                  <div
                                    key={content.id}
                                    className={`p-2 rounded border cursor-move hover:shadow-sm transition-shadow ${channelConfig[content.channel].lightBg
                                      } ${channelConfig[content.channel].borderColor}`}
                                  >
                                    <div className="flex items-start gap-1 mb-1">
                                      <GripVertical className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 mb-1">
                                          <ChannelIcon className={`h-3 w-3 ${channelConfig[content.channel].textColor}`} />
                                          <StatusIcon className={`h-3 w-3 ${statusConfig[content.status].color}`} />
                                        </div>
                                        <p className="text-xs line-clamp-2 mb-1">{content.title}</p>
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-muted-foreground">{content.time}</span>
                                          <Avatar className="h-4 w-4">
                                            <AvatarImage src={content.assignee.avatar} />
                                            <AvatarFallback className="text-xs">
                                              {content.assignee.initials}
                                            </AvatarFallback>
                                          </Avatar>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Week View */
              <div className="h-full flex flex-col">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b border-border bg-muted/50">
                  {getWeekDays().map((date) => {
                    const isTodayDate = isToday(date);
                    return (
                      <div key={date.toISOString()} className="p-3 text-center">
                        <div className="text-sm text-muted-foreground">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className={`text-lg mt-1 ${isTodayDate ? 'bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto' : ''
                          }`}>
                          {date.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Week Content */}
                <div className="grid grid-cols-7 flex-1 overflow-y-auto">
                  {getWeekDays().map((date) => {
                    const dayContent = getContentForDate(date);
                    return (
                      <div key={date.toISOString()} className="border-r last:border-r-0 p-3 space-y-2">
                        {dayContent.map((content) => {
                          const ChannelIcon = channelConfig[content.channel].icon;
                          const StatusIcon = statusConfig[content.status].icon;
                          return (
                            <Card
                              key={content.id}
                              className={`cursor-move hover:shadow-md transition-shadow ${channelConfig[content.channel].lightBg
                                } border-l-4 ${channelConfig[content.channel].color}`}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-start gap-2 mb-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <ChannelIcon className={`h-4 w-4 ${channelConfig[content.channel].textColor}`} />
                                      <span className={`text-xs ${statusConfig[content.status].color}`}>
                                        {statusConfig[content.status].label}
                                      </span>
                                    </div>
                                    <h4 className="text-sm mb-1">{content.title}</h4>
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {content.time}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-5 w-5">
                                        <AvatarImage src={content.assignee.avatar} />
                                        <AvatarFallback className="text-xs">
                                          {content.assignee.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs text-muted-foreground">
                                        {content.assignee.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unscheduled Ideas Panel */}
      {showUnscheduled && (
        <div className="w-80 flex-shrink-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Unscheduled Ideas</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUnscheduled(false)}
                >
                  ✕
                </Button>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag content to schedule
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredUnscheduled.map((idea) => {
                const ChannelIcon = channelConfig[idea.channel].icon;
                return (
                  <Card
                    key={idea.id}
                    className={`cursor-move hover:shadow-md transition-shadow ${channelConfig[idea.channel].lightBg
                      } border-l-4 ${channelConfig[idea.channel].color}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <ChannelIcon className={`h-4 w-4 ${channelConfig[idea.channel].textColor}`} />
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                              Draft
                            </span>
                          </div>
                          <h4 className="text-sm mb-2">{idea.title}</h4>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={idea.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {idea.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground truncate">
                              {idea.assignee.name}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {idea.campaign}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
