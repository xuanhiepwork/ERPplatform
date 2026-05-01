import { Eye, Download, MoreHorizontal, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Contract } from '../../../../mocks/contractMocks';
import { statusConfig, workflowStages, formatCurrency } from './contractUtils';

interface ContractListProps {
    contracts: Contract[];
    onViewTimeline: (contract: Contract) => void;
}

export function ContractList({ contracts, onViewTimeline }: ContractListProps) {
    const getStatusIndex = (status: string) => workflowStages.indexOf(status as any);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <p className="text-sm text-muted-foreground">{contracts.length} contracts in workflow</p>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contract</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Holder</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Holding Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                            {contracts.map((contract) => {
                                const StatusIcon = statusConfig[contract.status].icon;
                                return (
                                    <tr key={contract.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1"><h4 className="text-sm">{contract.title}</h4></div>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="font-mono">{contract.id}</span><span>•</span><span>{contract.type}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[contract.status].bgColor} ${statusConfig[contract.status].color}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {statusConfig[contract.status].label}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {workflowStages.map((stage, index) => {
                                                        const currentIndex = getStatusIndex(contract.status);
                                                        const isCompleted = index < currentIndex;
                                                        const isCurrent = index === currentIndex;
                                                        return (
                                                            <div key={stage} className={`h-1 flex-1 rounded-full ${isCompleted ? 'bg-green-500' : isCurrent ? statusConfig[stage].bgColor.replace('100', '500') : 'bg-gray-200'}`} />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {contract.status !== 'completed' ? (
                                                    <>
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={contract.currentHolder.avatar} />
                                                            <AvatarFallback className="text-xs">{contract.currentHolder.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm">{contract.currentHolder.name}</div>
                                                            <div className="text-xs text-muted-foreground">{contract.currentHolder.role}</div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <CheckCircle2 className="h-5 w-5" /><span className="text-sm">Completed</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {contract.status !== 'completed' ? (
                                                <div className="flex items-center gap-1 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /> {contract.holdingDuration}</div>
                                            ) : <span className="text-sm text-muted-foreground">-</span>}
                                        </td>
                                        <td className="px-6 py-4"><span className="text-sm">{formatCurrency(contract.value)}</span></td>
                                        <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{contract.lastUpdated}</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="ghost" onClick={() => onViewTimeline(contract)}><Eye className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}