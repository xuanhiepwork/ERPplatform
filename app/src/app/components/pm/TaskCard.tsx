// app/src/app/components/pm/TaskCard.tsx

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '../../ui/utils';
import { Task } from '../../../mocks/pmMocks';

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    const priorityStyles = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-orange-100 text-orange-700 border-orange-200',
        Low: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    const isOverdue = new Date(task.dueDate) < new Date('2026-04-20'); // Using static reference for example
    const subTaskProgress = (task.subTasks.completed / task.subTasks.total) * 100;

    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
            {/* Priority Badge */}
            <div className="flex items-start justify-between mb-3">
                <Badge
                    variant="outline"
                    className={cn('text-[10px] px-2', priorityStyles[task.priority])}
                >
                    {task.priority}
                </Badge>
                {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-1">
                        {task.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Task Title */}
            <h4 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {task.title}
            </h4>

            {/* Sub-tasks Progress */}
            <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Sub-tasks</span>
                    <span className="font-medium">
                        {task.subTasks.completed}/{task.subTasks.total}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                        className={cn(
                            'h-1.5 rounded-full transition-all',
                            subTaskProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        )}
                        style={{ width: `${subTaskProgress}%` }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                {/* Due Date */}
                <div
                    className={cn(
                        'flex items-center gap-1 text-xs',
                        isOverdue && task.status !== 'done' ? 'text-red-600' : 'text-muted-foreground'
                    )}
                >
                    <Calendar className="h-3 w-3" />
                    <span>
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                </div>

                {/* Meta Info & Assignee */}
                <div className="flex items-center gap-2">
                    {task.comments !== undefined && task.comments > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.comments}</span>
                        </div>
                    )}
                    {task.attachments !== undefined && task.attachments > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachments}</span>
                        </div>
                    )}

                    <Avatar className="h-6 w-6 border-2 border-white ml-1">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-[10px]">
                            {task.assignee.initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}