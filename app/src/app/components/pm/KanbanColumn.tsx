// app/src/app/components/pm/KanbanColumn.tsx

import { Plus, MoreHorizontal } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { TaskCard } from './TaskCard';
import { Task } from '../../../mocks/pmMocks';
import { cn } from '../../ui/utils';

interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    colorClass: string;
}

export function KanbanColumn({ title, tasks, colorClass }: KanbanColumnProps) {
    return (
        <div className="flex flex-col w-80 flex-shrink-0 bg-gray-50/50 rounded-xl border border-gray-200">
            {/* Header */}
            <div className={cn("p-4 border-b-2 flex items-center justify-between", colorClass)}>
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
                    <Badge variant="secondary" className="bg-white text-gray-500">
                        {tasks.length}
                    </Badge>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[500px]">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {tasks.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                        No tasks in this stage
                    </div>
                )}

                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-muted-foreground hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all text-xs font-medium flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" /> Add Task
                </button>
            </div>
        </div>
    );
}