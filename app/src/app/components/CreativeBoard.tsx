import { useState } from 'react';
import {
  Plus,
  ArrowRight,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pen,
  Paintbrush,
  Video,
  Image,
  FileText,
  User,
  Filter,
  Search,
  GripVertical
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Priority = 'critical' | 'high' | 'medium' | 'low';
type TicketStatus = 'inbox' | 'briefing' | 'copywriting' | 'design' | 'review' | 'ready';
type RequestType = 'sales-deck' | 'video' | 'social-media' | 'blog' | 'email' | 'presentation';

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface CreativeTicket {
  id: string;
  title: string;
  type: RequestType;
  priority: Priority;
  status: TicketStatus;
  requestedBy: {
    name: string;
    department: string;
    avatar: string;
    initials: string;
  };
  assignedTo: {
    copywriter?: {
      name: string;
      avatar: string;
      initials: string;
    };
    designer?: {
      name: string;
      avatar: string;
      initials: string;
    };
  };
  dueDate: string;
  subTasks: SubTask[];
  description: string;
  requestDate: string;
}

const requestTypeConfig = {
  'sales-deck': { label: 'Sales Deck', icon: FileText, color: 'bg-blue-100 text-blue-700' },
  'video': { label: 'Video', icon: Video, color: 'bg-purple-100 text-purple-700' },
  'social-media': { label: 'Social Media', icon: Image, color: 'bg-pink-100 text-pink-700' },
  'blog': { label: 'Blog Post', icon: Pen, color: 'bg-green-100 text-green-700' },
  'email': { label: 'Email', icon: FileText, color: 'bg-orange-100 text-orange-700' },
  'presentation': { label: 'Presentation', icon: FileText, color: 'bg-cyan-100 text-cyan-700' }
};

const priorityConfig = {
  critical: { label: 'Critical', color: 'bg-red-600 text-white', icon: AlertCircle },
  high: { label: 'High', color: 'bg-orange-600 text-white', icon: AlertCircle },
  medium: { label: 'Medium', color: 'bg-blue-600 text-white', icon: Clock },
  low: { label: 'Low', color: 'bg-gray-600 text-white', icon: Clock }
};

const kanbanColumns = [
  { id: 'briefing', label: 'Briefing', color: 'border-gray-300' },
  { id: 'copywriting', label: 'Copywriting', color: 'border-blue-300' },
  { id: 'design', label: 'Design/Editing', color: 'border-purple-300' },
  { id: 'review', label: 'Internal Review', color: 'border-orange-300' },
  { id: 'ready', label: 'Ready to Post', color: 'border-green-300' }
];

const tickets: CreativeTicket[] = [
  {
    id: 'REQ-001',
    title: 'Update Q2 Sales Deck with New Pricing',
    type: 'sales-deck',
    priority: 'high',
    status: 'inbox',
    requestedBy: {
      name: 'James Wilson',
      department: 'Sales',
      avatar: 'https://i.pravatar.cc/150?img=15',
      initials: 'JW'
    },
    assignedTo: {},
    dueDate: 'Apr 18, 2026',
    subTasks: [],
    description: 'Need to update slides 8-12 with new enterprise pricing tiers',
    requestDate: '2 hours ago'
  },
  {
    id: 'REQ-002',
    title: 'Product Demo Video for APAC Launch',
    type: 'video',
    priority: 'critical',
    status: 'inbox',
    requestedBy: {
      name: 'Sarah Johnson',
      department: 'Product',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ'
    },
    assignedTo: {},
    dueDate: 'Apr 20, 2026',
    subTasks: [],
    description: '3-minute product overview with localized subtitles',
    requestDate: '1 day ago'
  },
  {
    id: 'REQ-003',
    title: 'Social Media Campaign - Earth Day',
    type: 'social-media',
    priority: 'medium',
    status: 'inbox',
    requestedBy: {
      name: 'Amanda Foster',
      department: 'Marketing',
      avatar: 'https://i.pravatar.cc/150?img=27',
      initials: 'AF'
    },
    assignedTo: {},
    dueDate: 'Apr 22, 2026',
    subTasks: [],
    description: 'Series of 5 posts highlighting our sustainability initiatives',
    requestDate: '3 hours ago'
  },
  {
    id: 'REQ-004',
    title: 'Partnership Announcement Blog Post',
    type: 'blog',
    priority: 'high',
    status: 'briefing',
    requestedBy: {
      name: 'Michael Chen',
      department: 'BD',
      avatar: 'https://i.pravatar.cc/150?img=12',
      initials: 'MC'
    },
    assignedTo: {
      copywriter: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=9',
        initials: 'ER'
      }
    },
    dueDate: 'Apr 16, 2026',
    subTasks: [
      { id: 's1', title: 'Draft outline', completed: true },
      { id: 's2', title: 'Get quotes from partners', completed: true },
      { id: 's3', title: 'First draft', completed: false },
      { id: 's4', title: 'Legal review', completed: false }
    ],
    description: 'Announce strategic partnership with TechCorp Solutions',
    requestDate: '5 days ago'
  },
  {
    id: 'REQ-005',
    title: 'Feature Update Email Campaign',
    type: 'email',
    priority: 'medium',
    status: 'copywriting',
    requestedBy: {
      name: 'Amanda Foster',
      department: 'Marketing',
      avatar: 'https://i.pravatar.cc/150?img=27',
      initials: 'AF'
    },
    assignedTo: {
      copywriter: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=9',
        initials: 'ER'
      }
    },
    dueDate: 'Apr 19, 2026',
    subTasks: [
      { id: 's1', title: 'Subject line variations', completed: true },
      { id: 's2', title: 'Body copy', completed: true },
      { id: 's3', title: 'CTA optimization', completed: false }
    ],
    description: 'Announce new AI features to existing customer base',
    requestDate: '3 days ago'
  },
  {
    id: 'REQ-006',
    title: 'Case Study Infographic',
    type: 'social-media',
    priority: 'medium',
    status: 'design',
    requestedBy: {
      name: 'David Martinez',
      department: 'Customer Success',
      avatar: 'https://i.pravatar.cc/150?img=13',
      initials: 'DM'
    },
    assignedTo: {
      copywriter: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=9',
        initials: 'ER'
      },
      designer: {
        name: 'Olivia Brown',
        avatar: 'https://i.pravatar.cc/150?img=24',
        initials: 'OB'
      }
    },
    dueDate: 'Apr 17, 2026',
    subTasks: [
      { id: 's1', title: 'Data collection', completed: true },
      { id: 's2', title: 'Copy written', completed: true },
      { id: 's3', title: 'Design mockup', completed: true },
      { id: 's4', title: 'Final revisions', completed: false }
    ],
    description: 'Visual representation of HealthTech Alliance success metrics',
    requestDate: '1 week ago'
  },
  {
    id: 'REQ-007',
    title: 'Webinar Presentation Deck',
    type: 'presentation',
    priority: 'high',
    status: 'review',
    requestedBy: {
      name: 'Jessica Wang',
      department: 'Product',
      avatar: 'https://i.pravatar.cc/150?img=20',
      initials: 'JW'
    },
    assignedTo: {
      copywriter: {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=9',
        initials: 'ER'
      },
      designer: {
        name: 'Olivia Brown',
        avatar: 'https://i.pravatar.cc/150?img=24',
        initials: 'OB'
      }
    },
    dueDate: 'Apr 15, 2026',
    subTasks: [
      { id: 's1', title: 'Content outline', completed: true },
      { id: 's2', title: 'Slide copy', completed: true },
      { id: 's3', title: 'Design applied', completed: true },
      { id: 's4', title: 'Speaker notes', completed: true },
      { id: 's5', title: 'Final review', completed: false }
    ],
    description: 'Live demo presentation for product launch webinar',
    requestDate: '2 weeks ago'
  },
  {
    id: 'REQ-008',
    title: 'Social Media Announcement Graphics',
    type: 'social-media',
    priority: 'low',
    status: 'ready',
    requestedBy: {
      name: 'Amanda Foster',
      department: 'Marketing',
      avatar: 'https://i.pravatar.cc/150?img=27',
      initials: 'AF'
    },
    assignedTo: {
      designer: {
        name: 'Olivia Brown',
        avatar: 'https://i.pravatar.cc/150?img=24',
        initials: 'OB'
      }
    },
    dueDate: 'Apr 14, 2026',
    subTasks: [
      { id: 's1', title: 'Design concepts', completed: true },
      { id: 's2', title: 'Platform optimization', completed: true },
      { id: 's3', title: 'Approved by marketing', completed: true }
    ],
    description: 'Graphics for new hire announcements (3 variations)',
    requestDate: '10 days ago'
  }
];

export function CreativeBoard() {
  const [activeView, setActiveView] = useState<'split' | 'kanban'>('split');

  const inboxTickets = tickets.filter(t => t.status === 'inbox');
  const kanbanTickets = tickets.filter(t => t.status !== 'inbox');

  const getTicketsByStatus = (status: TicketStatus) => {
    return kanbanTickets.filter(t => t.status === status);
  };

  const calculateProgress = (subTasks: SubTask[]) => {
    if (subTasks.length === 0) return 0;
    const completed = subTasks.filter(t => t.completed).length;
    return Math.round((completed / subTasks.length) * 100);
  };

  const moveToKanban = (ticketId: string) => {
    console.log('Moving ticket to Kanban:', ticketId);
  };

  const TicketCard = ({ ticket, showMoveButton = false }: { ticket: CreativeTicket; showMoveButton?: boolean }) => {
    const TypeIcon = requestTypeConfig[ticket.type].icon;
    const PriorityIcon = priorityConfig[ticket.priority].icon;
    const progress = calculateProgress(ticket.subTasks);

    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${requestTypeConfig[ticket.type].color}`}>
                  <TypeIcon className="h-3 w-3 inline mr-1" />
                  {requestTypeConfig[ticket.type].label}
                </span>
              </div>
              <h4 className="text-sm mb-2">{ticket.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {ticket.description}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Priority & Due Date */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${priorityConfig[ticket.priority].color}`}>
              <PriorityIcon className="h-3 w-3" />
              {priorityConfig[ticket.priority].label}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {ticket.dueDate}
            </span>
          </div>

          {/* Sub-tasks Progress */}
          {ticket.subTasks.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Sub-tasks</span>
                <span>{ticket.subTasks.filter(t => t.completed).length}/{ticket.subTasks.length}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Requested By & Assigned To */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ticket.requestedBy.avatar} />
                <AvatarFallback className="text-xs">
                  {ticket.requestedBy.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">
                  {ticket.requestedBy.department}
                </p>
              </div>
            </div>

            {/* Role Icons */}
            <div className="flex items-center gap-1">
              {ticket.assignedTo.copywriter && (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded">
                  <Pen className="h-3 w-3 text-blue-600" />
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={ticket.assignedTo.copywriter.avatar} />
                    <AvatarFallback className="text-xs">
                      {ticket.assignedTo.copywriter.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              {ticket.assignedTo.designer && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded">
                  <Paintbrush className="h-3 w-3 text-purple-600" />
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={ticket.assignedTo.designer.avatar} />
                    <AvatarFallback className="text-xs">
                      {ticket.assignedTo.designer.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {/* Move to Kanban Button */}
          {showMoveButton && (
            <div className="mt-3 pt-3 border-t border-border">
              <Button
                size="sm"
                className="w-full gap-2"
                onClick={() => moveToKanban(ticket.id)}
              >
                <ArrowRight className="h-3 w-3" />
                Start Work
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2">Creative Requests & Production</h1>
            <p className="text-muted-foreground">
              Manage creative requests and track production workflow
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={activeView === 'split' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('split')}
          >
            Split View
          </Button>
          <Button
            variant={activeView === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('kanban')}
          >
            Kanban Only
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Request Inbox */}
        {activeView === 'split' && (
          <div className="w-96 flex-shrink-0">
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
                <div className="mb-4">
                  <h3 className="mb-2">Request Inbox</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {inboxTickets.length} new requests
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="w-full pl-10 pr-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {inboxTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} showMoveButton />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Production Kanban */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full min-w-max">
            {kanbanColumns.map((column) => {
              const columnTickets = getTicketsByStatus(column.id as TicketStatus);
              return (
                <div key={column.id} className="w-80 flex flex-col flex-shrink-0">
                  {/* Column Header */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3>{column.label}</h3>
                      <span className="text-sm text-muted-foreground">
                        {columnTickets.length}
                      </span>
                    </div>
                    <div className={`h-1 rounded-full border-2 ${column.color}`} />
                  </div>

                  {/* Column Cards */}
                  <div className="flex-1 space-y-3 overflow-y-auto pb-4">
                    {columnTickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}

                    {columnTickets.length === 0 && (
                      <div className="text-center py-8 text-sm text-muted-foreground">
                        No tickets
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
