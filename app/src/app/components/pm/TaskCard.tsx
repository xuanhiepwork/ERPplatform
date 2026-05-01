import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '../ui/utils';
import { Task } from '../../../mocks/pmMocks';

export function TaskCard({ task }: { task: Task }) {
    const priorityStyles = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-orange-100 text-orange-700 border-orange-200',
        Low: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    const progress = (task.subTasks.completed / task.subTasks.total) * 100;

    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
            <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className={cn('text-[10px] px-2', priorityStyles[task.priority])}>
                    {task.priority}
                </Badge>
                <span className="text-[10px] font-mono text-gray-400">{task.id}</span>
            </div>

            <h4 className="text-sm font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {task.title}
            </h4>

            <div className="space-y-3">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400">
                        {task.comments !== undefined && (
                            <div className="flex items-center gap-1 text-[10px]">
                                <MessageSquare className="h-3 w-3" /> {task.comments}
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-[10px]">
                            <Calendar className="h-3 w-3" /> {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-[10px]">{task.assignee.initials}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}