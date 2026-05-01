import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Users,
  Briefcase,
  Star,
  Clock,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Filter,
  Search,
  Plus,
  CheckCircle2,
  Circle,
  TrendingUp,
  Download,
  MoreVertical,
  User,
  Award,
  BookOpen,
  Laptop,
  FileText,
  Key,
  Building,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

interface Candidate {
  id: string;
  name: string;
  position: string;
  source: string;
  rating: number;
  appliedDate: string;
  email: string;
  phone: string;
  location: string;
  stage: string;
  avatar?: string;
  experience: string;
  skills: string[];
}

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
  icon: React.ReactNode;
}

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    source: 'LinkedIn',
    rating: 5,
    appliedDate: '2 days ago',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    stage: 'new',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Product Manager',
    source: 'Indeed',
    rating: 4,
    appliedDate: '3 days ago',
    email: 'mchen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    stage: 'new',
    experience: '7 years',
    skills: ['Product Strategy', 'Agile', 'Analytics'],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'UX/UI Designer',
    source: 'Referral',
    rating: 5,
    appliedDate: '1 week ago',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    stage: 'screening',
    experience: '4 years',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    id: '4',
    name: 'David Kim',
    position: 'Backend Engineer',
    source: 'Company Website',
    rating: 4,
    appliedDate: '1 week ago',
    email: 'david.k@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    stage: 'screening',
    experience: '6 years',
    skills: ['Python', 'AWS', 'Microservices'],
  },
  {
    id: '5',
    name: 'Jessica Park',
    position: 'Data Scientist',
    source: 'LinkedIn',
    rating: 5,
    appliedDate: '2 weeks ago',
    email: 'jessica.p@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    stage: 'interviewing',
    experience: '5 years',
    skills: ['Machine Learning', 'Python', 'SQL'],
  },
  {
    id: '6',
    name: 'Alex Thompson',
    position: 'DevOps Engineer',
    source: 'Indeed',
    rating: 4,
    appliedDate: '2 weeks ago',
    email: 'alex.t@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Denver, CO',
    stage: 'interviewing',
    experience: '4 years',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    id: '7',
    name: 'Maria Garcia',
    position: 'Marketing Manager',
    source: 'Referral',
    rating: 5,
    appliedDate: '3 weeks ago',
    email: 'maria.g@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Miami, FL',
    stage: 'offer',
    experience: '6 years',
    skills: ['Digital Marketing', 'SEO', 'Analytics'],
  },
  {
    id: '8',
    name: 'James Wilson',
    position: 'Sales Director',
    source: 'LinkedIn',
    rating: 5,
    appliedDate: '1 month ago',
    email: 'james.w@email.com',
    phone: '+1 (555) 890-1234',
    location: 'Chicago, IL',
    stage: 'hired',
    experience: '8 years',
    skills: ['B2B Sales', 'Team Leadership', 'CRM'],
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    position: 'HR Specialist',
    source: 'Company Website',
    rating: 4,
    appliedDate: '1 month ago',
    email: 'lisa.a@email.com',
    phone: '+1 (555) 901-2345',
    location: 'Portland, OR',
    stage: 'hired',
    experience: '5 years',
    skills: ['Recruitment', 'Employee Relations', 'Benefits'],
  },
];

const stages = [
  { id: 'new', title: 'New Applied', color: 'bg-blue-500', count: 0 },
  { id: 'screening', title: 'Screening', color: 'bg-purple-500', count: 0 },
  { id: 'interviewing', title: 'Interviewing', color: 'bg-orange-500', count: 0 },
  { id: 'offer', title: 'Offer Sent', color: 'bg-emerald-500', count: 0 },
  { id: 'hired', title: 'Hired', color: 'bg-green-600', count: 0 },
];

const onboardingTasks: OnboardingTask[] = [
  {
    id: '1',
    title: 'Send Welcome Email',
    description: 'Send company welcome email with first-day details',
    completed: true,
    assignee: 'HR Team',
    dueDate: 'Apr 10, 2026',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Create Email Account',
    description: 'Set up corporate email and access credentials',
    completed: true,
    assignee: 'IT Department',
    dueDate: 'Apr 12, 2026',
    icon: <Key className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Assign Laptop',
    description: 'Configure and assign company laptop with required software',
    completed: true,
    assignee: 'IT Department',
    dueDate: 'Apr 13, 2026',
    icon: <Laptop className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Send Culture Handbook',
    description: 'Share company culture guide and policies',
    completed: false,
    assignee: 'HR Team',
    dueDate: 'Apr 15, 2026',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Building Access Setup',
    description: 'Arrange security badge and office access',
    completed: false,
    assignee: 'Facilities',
    dueDate: 'Apr 16, 2026',
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: '6',
    title: 'Schedule Orientation',
    description: 'Book orientation session and team introductions',
    completed: false,
    assignee: 'HR Team',
    dueDate: 'Apr 17, 2026',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: '7',
    title: 'Benefits Enrollment',
    description: 'Complete health insurance and 401(k) setup',
    completed: false,
    assignee: 'HR Team',
    dueDate: 'Apr 18, 2026',
    icon: <Award className="h-4 w-4" />,
  },
];

interface CandidateCardProps {
  candidate: Candidate;
  onMove: (candidateId: string, newStage: string) => void;
}

function CandidateCard({ candidate, onMove }: CandidateCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'candidate',
    item: { id: candidate.id, stage: candidate.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-3 w-3" />;
      case 'referral':
        return <Users className="h-3 w-3" />;
      default:
        return <Briefcase className="h-3 w-3" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card
      ref={drag}
      className={cn(
        'p-4 cursor-move hover:shadow-lg transition-all border-gray-200',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {getInitials(candidate.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{candidate.name}</h4>
            <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <FileText className="h-4 w-4 mr-2" />
              Reject Candidate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          {getSourceIcon(candidate.source)}
          <span>{candidate.source}</span>
          <span className="text-gray-400">•</span>
          <Clock className="h-3 w-3" />
          <span>{candidate.appliedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          <span>{candidate.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-3.5 w-3.5',
                i < candidate.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          ))}
        </div>
        <Badge variant="outline" className="text-xs">
          {candidate.experience} exp
        </Badge>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {candidate.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

interface StageColumnProps {
  stage: typeof stages[0];
  candidates: Candidate[];
  onMove: (candidateId: string, newStage: string) => void;
}

function StageColumn({ stage, candidates, onMove }: StageColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'candidate',
    drop: (item: { id: string; stage: string }) => {
      if (item.stage !== stage.id) {
        onMove(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex flex-col h-full min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn('h-2 w-2 rounded-full', stage.color)} />
          <h3 className="font-semibold text-gray-900">{stage.title}</h3>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {candidates.length}
        </Badge>
      </div>

      <div
        ref={drop}
        className={cn(
          'flex-1 space-y-3 p-3 rounded-lg border-2 border-dashed transition-colors min-h-[200px]',
          isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'
        )}
      >
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} onMove={onMove} />
        ))}
        {candidates.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-gray-400">
            Drop candidates here
          </div>
        )}
      </div>
    </div>
  );
}

function ATSDashboardContent() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<OnboardingTask[]>(onboardingTasks);

  const handleMoveCandidate = (candidateId: string, newStage: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId ? { ...candidate, stage: newStage } : candidate
      )
    );
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCandidatesByStage = (stageId: string) => {
    return filteredCandidates.filter((c) => c.stage === stageId);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const stats = [
    {
      label: 'Total Candidates',
      value: candidates.length,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Active Positions',
      value: '12',
      icon: Briefcase,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      label: 'Interviews This Week',
      value: '8',
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      label: 'Hired This Month',
      value: '5',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
  ];

  return (
    <div className="h-full flex gap-6">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Recruitment Pipeline</h1>
              <p className="text-sm text-gray-500 mt-1">
                Track and manage candidates through the hiring process
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', stat.bg)}>
                    <stat.icon className={cn('h-5 w-5', stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates by name or position..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 pb-4 min-w-max">
            {stages.map((stage) => (
              <StageColumn
                key={stage.id}
                stage={stage}
                candidates={getCandidatesByStage(stage.id)}
                onMove={handleMoveCandidate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding Checklist Side Panel */}
      <div className="w-96 flex-shrink-0">
        <Card className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Onboarding Checklist</h2>
                <p className="text-sm text-gray-500 mt-1">James Wilson - Sales Director</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium text-gray-900">
                  {completedTasks}/{tasks.length} tasks
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500">{Math.round(progressPercentage)}% complete</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className={cn(
                    'p-4 transition-all cursor-pointer hover:shadow-md',
                    task.completed && 'bg-gray-50 border-gray-200'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={cn(
                            'h-7 w-7 rounded-lg flex items-center justify-center',
                            task.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                          )}
                        >
                          {task.icon}
                        </div>
                        <h4
                          className={cn(
                            'font-medium text-sm',
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          )}
                        >
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 ml-9">{task.description}</p>
                      <div className="flex items-center gap-3 ml-9 text-xs text-gray-500">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {task.assignee}
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.dueDate}
                          </div>
                        )}
                      </div>
                    </div>
                    {task.completed && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-6 border-t">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ATSDashboard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ATSDashboardContent />
    </DndProvider>
  );
}
