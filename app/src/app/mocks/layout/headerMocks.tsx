// app/src/mocks/headerMocks.tsx
import { Shield, BarChart3, Briefcase, Package, Calendar, Users } from 'lucide-react';

export const mockSearchModules = [
    { title: 'Employee Records', module: 'HR', icon: <Shield className="h-4 w-4" />, color: 'text-purple-600' },
    { title: 'Financial Reports Q1', module: 'Finance', icon: <BarChart3 className="h-4 w-4" />, color: 'text-green-600' },
    { title: 'Marketing Campaign Assets', module: 'Marketing', icon: <Briefcase className="h-4 w-4" />, color: 'text-orange-600' },
    { title: 'Project Task Board', module: 'Projects', icon: <Package className="h-4 w-4" />, color: 'text-blue-600' },
    { title: 'Team Calendar Events', module: 'Calendar', icon: <Calendar className="h-4 w-4" />, color: 'text-indigo-600' },
    { title: 'Company Directory', module: 'Directory', icon: <Users className="h-4 w-4" />, color: 'text-cyan-600' },
];

export const mockNotifications = [
    { id: 1, title: 'New contract awaiting approval', time: '5 min ago', unread: true, type: 'approval' },
    { id: 2, title: 'Sarah Chen updated OKR progress', time: '15 min ago', unread: true, type: 'update' },
    { id: 3, title: 'Budget report ready for review', time: '1 hour ago', unread: false, type: 'report' },
    { id: 4, title: 'Team meeting starting soon', time: '2 hours ago', unread: false, type: 'reminder' },
    { id: 5, title: 'New employee onboarding checklist', time: '3 hours ago', unread: false, type: 'task' },
];