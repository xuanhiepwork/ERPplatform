import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from './ui/utils';

interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate: string;
  subTasks: {
    completed: number;
    total: number;
  };
  comments?: number;
  attachments?: number;
  tags?: string[];
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

export function KanbanBoard() {
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');

  // Team members
  const teamMembers = [
    { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', initials: 'SC' },
    { name: 'Michael Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', initials: 'MT' },
    { name: 'Emily Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', initials: 'EJ' },
    { name: 'David Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', initials: 'DM' },
    { name: 'Jessica Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica', initials: 'JL' },
    { name: 'Robert Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', initials: 'RK' },
  ];

  // Mock tasks data
  const allTasks: Task[] = [
    // To-Do
    {
      id: 'TASK-101',
      title: 'Design new onboarding flow for mobile app',
      priority: 'High',
      assignee: teamMembers[0],
      dueDate: '2026-04-15',
      subTasks: { completed: 1, total: 5 },
      comments: 3,
      tags: ['Design'],
      status: 'todo',
    },
    {
      id: 'TASK-102',
      title: 'Update API documentation for v2.0 release',
      priority: 'Medium',
      assignee: teamMembers[1],
      dueDate: '2026-04-18',
      subTasks: { completed: 0, total: 3 },
      attachments: 2,
      tags: ['Documentation'],
      status: 'todo',
    },
    {
      id: 'TASK-103',
      title: 'Implement dark mode for dashboard',
      priority: 'Low',
      assignee: teamMembers[2],
      dueDate: '2026-04-25',
      subTasks: { completed: 0, total: 4 },
      comments: 1,
      tags: ['Feature'],
      status: 'todo',
    },
    {
      id: 'TASK-104',
      title: 'Fix login authentication bug on Safari',
      priority: 'High',
      assignee: teamMembers[3],
      dueDate: '2026-04-12',
      subTasks: { completed: 2, total: 3 },
      comments: 5,
      tags: ['Bug'],
      status: 'todo',
    },

    // In Progress
    {
      id: 'TASK-201',
      title: 'Develop user profile settings page',
      priority: 'High',
      assignee: teamMembers[1],
      dueDate: '2026-04-14',
      subTasks: { completed: 3, total: 6 },
      comments: 8,
      attachments: 1,
      tags: ['Development'],
      status: 'in-progress',
    },
    {
      id: 'TASK-202',
      title: 'Optimize database query performance',
      priority: 'Medium',
      assignee: teamMembers[3],
      dueDate: '2026-04-16',
      subTasks: { completed: 2, total: 4 },
      comments: 4,
      tags: ['Backend'],
      status: 'in-progress',
    },
    {
      id: 'TASK-203',
      title: 'Create marketing landing page mockups',
      priority: 'Medium',
      assignee: teamMembers[0],
      dueDate: '2026-04-17',
      subTasks: { completed: 4, total: 5 },
      attachments: 3,
      tags: ['Design'],
      status: 'in-progress',
    },

    // Review
    {
      id: 'TASK-301',
      title: 'Implement payment gateway integration',
      priority: 'High',
      assignee: teamMembers[4],
      dueDate: '2026-04-11',
      subTasks: { completed: 5, total: 5 },
      comments: 12,
      attachments: 2,
      tags: ['Feature'],
      status: 'review',
    },
    {
      id: 'TASK-302',
      title: 'Write unit tests for user authentication',
      priority: 'Medium',
      assignee: teamMembers[5],
      dueDate: '2026-04-13',
      subTasks: { completed: 7, total: 8 },
      comments: 2,
      tags: ['Testing'],
      status: 'review',
    },
    {
      id: 'TASK-303',
      title: 'Update security compliance documentation',
      priority: 'Low',
      assignee: teamMembers[1],
      dueDate: '2026-04-20',
      subTasks: { completed: 3, total: 3 },
      attachments: 1,
      tags: ['Documentation'],
      status: 'review',
    },

    // Done
    {
      id: 'TASK-401',
      title: 'Set up CI/CD pipeline for staging',
      priority: 'High',
      assignee: teamMembers[3],
      dueDate: '2026-04-08',
      subTasks: { completed: 6, total: 6 },
      comments: 15,
      tags: ['DevOps'],
      status: 'done',
    },
    {
      id: 'TASK-402',
      title: 'Refactor notification system',
      priority: 'Medium',
      assignee: teamMembers[2],
      dueDate: '2026-04-09',
      subTasks: { completed: 4, total: 4 },
      comments: 6,
      tags: ['Refactor'],
      status: 'done',
    },
    {
      id: 'TASK-403',
      title: 'Conduct user research interviews',
      priority: 'Low',
      assignee: teamMembers[0],
      dueDate: '2026-04-07',
      subTasks: { completed: 10, total: 10 },
      attachments: 5,
      tags: ['Research'],
      status: 'done',
    },
  ];

  // Filter tasks
  const filteredTasks = allTasks.filter((task) => {
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterAssignee !== 'all' && task.assignee.name !== filterAssignee) return false;
    return true;
  });

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const columns = [
    {
      id: 'todo',
      title: 'To-Do',
      color: 'bg-gray-100',
      borderColor: 'border-gray-300',
      count: getTasksByStatus('todo').length,
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-100',
      borderColor: 'border-blue-300',
      count: getTasksByStatus('in-progress').length,
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-orange-100',
      borderColor: 'border-orange-300',
      count: getTasksByStatus('review').length,
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100',
      borderColor: 'border-green-300',
      count: getTasksByStatus('done').length,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Product Development Sprint</h1>
            <p className="text-sm text-muted-foreground">Q2 2026 - Milestone 3</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Team Members */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Team:</span>
            <div className="flex -space-x-2">
              {teamMembers.map((member, index) => (
                <Avatar
                  key={index}
                  className="h-8 w-8 border-2 border-white hover:z-10 cursor-pointer transition-transform hover:scale-110"
                  title={member.name}
                >
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                </Avatar>
              ))}
              <button className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-300 transition-colors">
                +3
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-9 w-64"
              />
            </div>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {teamMembers.map((member, index) => (
                  <SelectItem key={index} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total Tasks:</span>
            <span className="font-semibold">{filteredTasks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-semibold text-green-600">
              {getTasksByStatus('done').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">In Progress:</span>
            <span className="font-semibold text-blue-600">
              {getTasksByStatus('in-progress').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Completion Rate:</span>
            <span className="font-semibold">
              {Math.round((getTasksByStatus('done').length / allTasks.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col w-80 flex-shrink-0">
              {/* Column Header */}
              <div
                className={cn(
                  'rounded-t-lg border-t-4 p-4 mb-3',
                  column.color,
                  column.borderColor
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base">{column.title}</h3>
                  <Badge variant="secondary" className="bg-white">
                    {column.count}
                  </Badge>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 overflow-y-auto space-y-3 pb-4">
                {getTasksByStatus(column.id as Task['status']).map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {/* Add Task Button */}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-muted-foreground hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Add Task</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
