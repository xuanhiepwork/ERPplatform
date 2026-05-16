// app/src/app/features/pm/components/KanbanBoard.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter, Search, Share2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { KanbanColumn } from './KanbanColumn';
import { taskApi } from '../../../../services/taskService';
import { Task } from '../../../types/projectManagement';

export function KanbanBoard() {
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterAssignee, setFilterAssignee] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // 1. Fetch Task Data
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks-board'],
        queryFn: taskApi.getAllTasks,
    });

    const teamMembers = Array.from(
        new Map(
            tasks
                .map((t: any) => ({ id: t.assignee?.id || t.assignee?.name, name: t.assignee?.name, avatar: t.assignee?.avatar }))
                .filter((m: any) => m.id && m.name)
                .map((m: any) => [m.id, m])
        ).values()
    );

    // 2. Filter Tasks
    const filteredTasks = tasks.filter((task: Task) => {
        if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
        if (filterAssignee !== 'all' && task.assignee.name !== filterAssignee) return false;
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // 3. Status Helper
    const getTasksByStatus = (status: Task['status']) => {
        return filteredTasks.filter((task: Task) => task.status === status);
    };

    const columns = [
        { id: 'todo', title: 'To-Do', color: 'border-gray-300' },
        { id: 'in-progress', title: 'In Progress', color: 'border-blue-500' },
        { id: 'review', title: 'Review', color: 'border-orange-500' },
        { id: 'done', title: 'Done', color: 'border-green-500' },
    ];

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading project board...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white rounded-lg border shadow-sm">
            {/* Controls Header */}
            <div className="border-b p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Product Development Sprint</h1>
                        <p className="text-sm text-gray-500">Q2 2026 · Milestone 3</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                    </Button>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Team Members (derived from tasks) */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium">Team:</span>
                        <div className="flex -space-x-2">
                            {teamMembers.map((member: any, index: number) => (
                                <Avatar
                                    key={index}
                                    className="h-8 w-8 border-2 border-white hover:z-10 cursor-pointer transition-transform hover:scale-110 shadow-sm"
                                    title={member.name}
                                >
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">{(member.name || '').split(' ').map((n: string) => n[0] || '').join('').slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search tasks..."
                                className="pl-9 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                {teamMembers.map((member: any, index: number) => (
                                    <SelectItem key={index} value={member.name}>
                                        {member.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button variant="outline" size="icon" title="More Filters">
                            <Filter className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="outline" size="icon" title="Share Board">
                            <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                    </div>
                </div>

                {/* Board Stats */}
                <div className="flex gap-6 text-sm pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Total Tasks:</span>
                        <span className="font-semibold text-gray-900">{filteredTasks.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Completed:</span>
                        <span className="font-semibold text-green-600">
                            {getTasksByStatus('done').length}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">In Progress:</span>
                        <span className="font-semibold text-blue-600">
                            {getTasksByStatus('in-progress').length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Kanban Grid Container */}
            <div className="flex-1 overflow-x-auto p-6 bg-gray-50 rounded-b-lg">
                <div className="flex gap-6 h-full min-w-max pb-4">
                    {columns.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            title={col.title}
                            colorClass={col.color}
                            tasks={getTasksByStatus(col.id as Task['status'])}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
