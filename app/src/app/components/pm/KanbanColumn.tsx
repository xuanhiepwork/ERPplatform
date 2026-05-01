import { Plus, MoreHorizontal } from 'lucide-react';
import { Badge } from '../ui/badge';
import { TaskCard } from './TaskCard';
import { Task } from '../../../mocks/pmMocks';
import { cn } from '../ui/utils';

interface KanbanColumnProps {
    title: string;
    status: string;
    tasks: Task[];
    colorClass: string;
}

export function KanbanColumn({ title, tasks, colorClass }: KanbanColumnProps) {
    return (
        <div className="flex flex-col w-80 flex-shrink-0 bg-gray-50/50 rounded-xl border border-gray-200">
            <div className={cn("p-4 border-b-2 flex items-center justify-between", colorClass)}>
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
                    <Badge variant="secondary" className="bg-white text-gray-500">{tasks.length}</Badge>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-4 w-4" /></button>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[500px]">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all text-xs flex items-center justify-center gap-2">
                    <Plus className="h-3 w-3" /> Add Task
                </button>
            </div>
        </div>
    );
}