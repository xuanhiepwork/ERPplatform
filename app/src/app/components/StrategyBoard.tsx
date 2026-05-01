import { useState } from 'react';
import {
  Plus,
  MoreHorizontal,
  Users,
  Calendar,
  Link2,
  Tag,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  GitBranch
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type BoardColumn = 'backlog' | 'planning' | 'in-progress' | 'review' | 'completed';
type Priority = 'critical' | 'high' | 'medium' | 'low';
type TeamTag = 'Marketing' | 'Legal' | 'Product' | 'Sales' | 'Finance' | 'Operations';

interface Dependency {
  taskId: string;
  type: 'blocks' | 'blocked-by' | 'relates-to';
}

interface StrategyTask {
  id: string;
  title: string;
  description: string;
  column: BoardColumn;
  priority: Priority;
  tags: TeamTag[];
  assignees: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  dueDate: string;
  milestone: string;
  dependencies: Dependency[];
  progress: number;
}

interface Milestone {
  id: string;
  name: string;
  target: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
}

const milestones: Milestone[] = [
  {
    id: 'm1',
    name: 'Q2 APAC Expansion',
    target: 'Jun 30, 2026',
    progress: 68,
    tasksCompleted: 17,
    totalTasks: 25
  },
  {
    id: 'm2',
    name: 'EU Market Entry',
    target: 'Aug 15, 2026',
    progress: 42,
    tasksCompleted: 8,
    totalTasks: 19
  },
  {
    id: 'm3',
    name: 'Product Localization',
    target: 'Jul 31, 2026',
    progress: 55,
    tasksCompleted: 11,
    totalTasks: 20
  }
];

const tasks: StrategyTask[] = [
  {
    id: 't1',
    title: 'Complete market research for Southeast Asia',
    description: 'Conduct comprehensive analysis of Singapore, Malaysia, and Thailand markets',
    column: 'in-progress',
    priority: 'high',
    tags: ['Marketing', 'Sales'],
    assignees: [
      { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5', initials: 'SJ' },
      { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12', initials: 'MC' }
    ],
    dueDate: 'Apr 20, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't5', type: 'blocks' }
    ],
    progress: 75
  },
  {
    id: 't2',
    title: 'Legal entity formation in Singapore',
    description: 'Establish legal presence and register company with ACRA',
    column: 'planning',
    priority: 'critical',
    tags: ['Legal', 'Finance'],
    assignees: [
      { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9', initials: 'ER' }
    ],
    dueDate: 'May 5, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't1', type: 'blocked-by' }
    ],
    progress: 0
  },
  {
    id: 't3',
    title: 'Localize product UI for Asian markets',
    description: 'Translate interface, adapt currency, and modify payment flows',
    column: 'in-progress',
    priority: 'high',
    tags: ['Product', 'Marketing'],
    assignees: [
      { name: 'David Martinez', avatar: 'https://i.pravatar.cc/150?img=13', initials: 'DM' },
      { name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=24', initials: 'OB' }
    ],
    dueDate: 'May 15, 2026',
    milestone: 'Product Localization',
    dependencies: [],
    progress: 60
  },
  {
    id: 't4',
    title: 'Build partnership with regional payment providers',
    description: 'Integrate local payment gateways for each target market',
    column: 'planning',
    priority: 'high',
    tags: ['Product', 'Sales', 'Legal'],
    assignees: [
      { name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=15', initials: 'JW' }
    ],
    dueDate: 'May 25, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't3', type: 'blocked-by' }
    ],
    progress: 0
  },
  {
    id: 't5',
    title: 'Develop go-to-market strategy deck',
    description: 'Create comprehensive GTM presentation for executive review',
    column: 'review',
    priority: 'medium',
    tags: ['Marketing', 'Sales'],
    assignees: [
      { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5', initials: 'SJ' }
    ],
    dueDate: 'Apr 18, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't1', type: 'blocked-by' }
    ],
    progress: 90
  },
  {
    id: 't6',
    title: 'GDPR compliance assessment for EU launch',
    description: 'Complete data protection impact assessment and update policies',
    column: 'in-progress',
    priority: 'critical',
    tags: ['Legal', 'Product'],
    assignees: [
      { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9', initials: 'ER' },
      { name: 'Matthew Thompson', avatar: 'https://i.pravatar.cc/150?img=56', initials: 'MT' }
    ],
    dueDate: 'Apr 25, 2026',
    milestone: 'EU Market Entry',
    dependencies: [],
    progress: 45
  },
  {
    id: 't7',
    title: 'Hire regional sales director - APAC',
    description: 'Recruit experienced BD leader for Asia Pacific expansion',
    column: 'backlog',
    priority: 'high',
    tags: ['Operations'],
    assignees: [
      { name: 'Jessica Wang', avatar: 'https://i.pravatar.cc/150?img=20', initials: 'JW' }
    ],
    dueDate: 'Jun 1, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't2', type: 'blocked-by' }
    ],
    progress: 0
  },
  {
    id: 't8',
    title: 'Launch marketing campaign - Singapore pilot',
    description: 'Execute digital marketing campaign for soft launch',
    column: 'backlog',
    priority: 'medium',
    tags: ['Marketing', 'Sales'],
    assignees: [
      { name: 'Amanda Foster', avatar: 'https://i.pravatar.cc/150?img=27', initials: 'AF' }
    ],
    dueDate: 'Jun 10, 2026',
    milestone: 'Q2 APAC Expansion',
    dependencies: [
      { taskId: 't3', type: 'blocked-by' },
      { taskId: 't4', type: 'blocked-by' }
    ],
    progress: 0
  },
  {
    id: 't9',
    title: 'Complete competitive analysis for EU market',
    description: 'Analyze top 5 competitors in Germany, France, and UK',
    column: 'completed',
    priority: 'medium',
    tags: ['Marketing'],
    assignees: [
      { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12', initials: 'MC' }
    ],
    dueDate: 'Apr 5, 2026',
    milestone: 'EU Market Entry',
    dependencies: [],
    progress: 100
  }
];

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'border-gray-300' },
  { id: 'planning', label: 'Planning', color: 'border-blue-300' },
  { id: 'in-progress', label: 'In Progress', color: 'border-purple-300' },
  { id: 'review', label: 'Review', color: 'border-orange-300' },
  { id: 'completed', label: 'Completed', color: 'border-green-300' }
];

const tagColors: Record<TeamTag, string> = {
  'Marketing': 'bg-pink-100 text-pink-700 border-pink-200',
  'Legal': 'bg-red-100 text-red-700 border-red-200',
  'Product': 'bg-blue-100 text-blue-700 border-blue-200',
  'Sales': 'bg-green-100 text-green-700 border-green-200',
  'Finance': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Operations': 'bg-purple-100 text-purple-700 border-purple-200'
};

const priorityConfig = {
  critical: { color: 'text-red-600', bgColor: 'bg-red-50', label: 'Critical' },
  high: { color: 'text-orange-600', bgColor: 'bg-orange-50', label: 'High' },
  medium: { color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Medium' },
  low: { color: 'text-gray-600', bgColor: 'bg-gray-50', label: 'Low' }
};

export function StrategyBoard() {
  const [selectedView, setSelectedView] = useState<'board' | 'dependencies'>('board');
  const [selectedTask, setSelectedTask] = useState<StrategyTask | null>(null);

  const getTasksByColumn = (columnId: BoardColumn) => {
    return tasks.filter(task => task.column === columnId);
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const getDependencyLabel = (type: Dependency['type']) => {
    switch (type) {
      case 'blocks':
        return 'Blocks';
      case 'blocked-by':
        return 'Blocked by';
      case 'relates-to':
        return 'Relates to';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2">Strategic Project Board</h1>
            <p className="text-muted-foreground">
              Market expansion campaigns and cross-functional initiatives
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Initiative
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant={selectedView === 'board' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('board')}
          >
            Board View
          </Button>
          <Button
            variant={selectedView === 'dependencies' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('dependencies')}
            className="gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Dependencies
          </Button>
        </div>

        {/* Strategy Milestones */}
        <div className="grid grid-cols-3 gap-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm mb-1">{milestone.name}</h4>
                    <p className="text-xs text-muted-foreground">Target: {milestone.target}</p>
                  </div>
                  <span className="text-lg">{milestone.progress}%</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{milestone.tasksCompleted} of {milestone.totalTasks} tasks</span>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        {selectedView === 'board' ? (
          /* Kanban Board */
          <div className="flex gap-4 h-full overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnTasks = getTasksByColumn(column.id as BoardColumn);
              return (
                <div key={column.id} className="flex-shrink-0 w-80 flex flex-col">
                  {/* Column Header */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3>{column.label}</h3>
                      <span className="text-sm text-muted-foreground">
                        {columnTasks.length}
                      </span>
                    </div>
                    <div className={`h-1 rounded-full border-2 ${column.color}`} />
                  </div>

                  {/* Task Cards */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {columnTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedTask(task)}
                      >
                        <CardContent className="p-4">
                          {/* Priority & Milestone */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs px-2 py-0.5 rounded ${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color}`}>
                              {priorityConfig[task.priority].label}
                            </span>
                            {task.dependencies.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Link2 className="h-3 w-3" />
                                {task.dependencies.length}
                              </div>
                            )}
                          </div>

                          {/* Task Title */}
                          <h4 className="text-sm mb-2 line-clamp-2">{task.title}</h4>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {task.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`text-xs px-2 py-0.5 rounded border ${tagColors[tag]}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Progress Bar */}
                          {task.progress > 0 && task.progress < 100 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Milestone */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                            <CheckCircle2 className="h-3 w-3" />
                            <span className="truncate">{task.milestone}</span>
                          </div>

                          {/* Footer: Assignees & Due Date */}
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div className="flex -space-x-2">
                              {task.assignees.slice(0, 3).map((assignee, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-card">
                                  <AvatarImage src={assignee.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {assignee.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {task.assignees.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">
                                  +{task.assignees.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-sm text-muted-foreground">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Dependencies View */
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Task Dependencies</h3>
              <div className="space-y-4">
                {tasks.filter(task => task.dependencies.length > 0).map((task) => (
                  <div key={task.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {/* Source Task */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color}`}>
                            {priorityConfig[task.priority].label}
                          </span>
                          <h4 className="text-sm">{task.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-0.5 rounded border ${tagColors[tag]}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Dependencies */}
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-2">Dependencies</p>
                        <div className="space-y-2">
                          {task.dependencies.map((dep, index) => {
                            const depTask = getTaskById(dep.taskId);
                            if (!depTask) return null;
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-secondary rounded text-sm"
                              >
                                <GitBranch className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {getDependencyLabel(dep.type)}
                                </span>
                                <span className="flex-1 truncate">{depTask.title}</span>
                                {depTask.column === 'completed' ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Clock className="h-4 w-4 text-orange-600" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
