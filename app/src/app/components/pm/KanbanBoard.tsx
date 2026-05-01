import { useQuery } from '@tanstack/react-query';
import { KanbanColumn } from './KanbanColumn';
import { Button } from '../ui/button';
import { Plus, Filter, Search, Share2 } from 'lucide-react';
import { Input } from '../ui/input';
import { mockTasks } from '../../../mocks/pmMocks';

export function KanbanBoard() {
    // 1. Fetch dữ liệu Task từ Backend
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks-board'],
        queryFn: () => Promise.resolve(mockTasks), // Sau này đổi thành axiosClient.get('/tasks')
    });

    const columns = [
        { id: 'todo', title: 'To-Do', color: 'border-gray-300' },
        { id: 'in-progress', title: 'In Progress', color: 'border-blue-500' },
        { id: 'review', title: 'Review', color: 'border-orange-500' },
        { id: 'done', title: 'Done', color: 'border-green-500' },
    ];

    if (isLoading) return <div className="p-10 animate-pulse">Loading Project Board...</div>;

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Header điều khiển */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Product Development Sprint</h1>
                    <p className="text-sm text-gray-500">Q2 2026 · Milestone 3</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input className="pl-9 bg-white" placeholder="Search tasks..." />
                    </div>
                    <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                    <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" /> New Task</Button>
                </div>
            </div>

            {/* Kanban Grid */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 h-full pb-4 min-w-max">
                    {columns.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            title={col.title}
                            colorClass={col.color}
                            tasks={tasks.filter(t => t.status === col.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}