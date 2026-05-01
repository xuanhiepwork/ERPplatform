import { useState } from 'react';
import { Building2, Users, ChevronRight, ChevronDown, Search, Download } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { OrgNode } from '../../../mocks/hrMocks';

function OrgNodeComponent({ node, level }: { node: OrgNode; level: number }) {
    const [isExpanded, setIsExpanded] = useState(level < 2);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            <Card className={cn('p-4 min-w-[240px] cursor-pointer hover:shadow-lg transition-all border-2',
                level === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white')}>
                <div className="flex items-start gap-3" onClick={() => hasChildren && setIsExpanded(!isExpanded)}>
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className={level === 0 ? 'bg-blue-500' : 'bg-blue-100 text-blue-600'}>
                            {node.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h4 className={cn('font-semibold truncate', level === 0 ? 'text-white' : 'text-gray-900')}>{node.name}</h4>
                        <p className={cn('text-sm truncate', level === 0 ? 'text-blue-100' : 'text-gray-600')}>{node.position}</p>
                    </div>
                    {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                </div>
            </Card>
            {hasChildren && isExpanded && (
                <div className="flex gap-8 mt-8 relative">
                    <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 -translate-y-8" />
                    {node.children!.map(child => <OrgNodeComponent key={child.id} node={child} level={level + 1} />)}
                </div>
            )}
        </div>
    );
}

export function OrgChart({ data }: { data: OrgNode }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Organization Structure</h2>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export PDF</Button>
            </div>
            <Card className="p-12 overflow-auto bg-gray-50/50">
                <div className="inline-flex justify-center min-w-full">
                    <OrgNodeComponent node={data} level={0} />
                </div>
            </Card>
        </div>
    );
}