import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Clock, XCircle, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { cn } from '../../../../components/ui/utils';
import { DepartmentBudget } from './types';
import { formatCurrency, getStatusColor } from './utils';
import { CircularProgress } from './CircularProgress';

export function DepartmentCard({ department }: { department: DepartmentBudget }) {
    const [expanded, setExpanded] = useState(false);
    const colors = getStatusColor(department.status);
    const isCritical = department.percentConsumed >= 90;

    return (
        <Card className={cn('p-6 border-l-4', colors.border, colors.bg)}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', colors.text, 'bg-white border-2', colors.border)}>
                        {department.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{department.name}</h3>
                        <p className="text-xs text-gray-500">Updated {department.lastUpdated}</p>
                    </div>
                </div>
                {isCritical && (
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full animate-pulse" />
                        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center mb-4">
                <CircularProgress percent={department.percentConsumed} status={department.status} />
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Budget:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(department.totalBudget)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Consumed:</span>
                    <span className={cn('font-semibold', colors.text)}>{formatCurrency(department.consumed)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(department.remaining)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <Badge className={cn(
                        'px-3 py-1',
                        department.status === 'healthy' && 'bg-emerald-100 text-emerald-700 border-emerald-300',
                        department.status === 'warning' && 'bg-amber-100 text-amber-700 border-amber-300',
                        department.status === 'critical' && 'bg-red-100 text-red-700 border-red-300',
                        department.status === 'exceeded' && 'bg-red-200 text-red-900 border-red-400'
                    )}>
                        {department.status === 'healthy' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {department.status === 'warning' && <Clock className="h-3 w-3 mr-1" />}
                        {department.status === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {department.status === 'exceeded' && <XCircle className="h-3 w-3 mr-1" />}
                        {department.status.charAt(0).toUpperCase() + department.status.slice(1)}
                    </Badge>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="h-4 w-4 mr-1" /> Hide Details
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mr-1" /> View Details
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 pt-4 border-t-2 border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-600" /> Expense Categories
                    </h4>
                    <div className="space-y-4">
                        {department.categories.map((category, idx) => {
                            const isOverBudget = category.actual > category.planned;
                            const percentOfPlanned = (category.actual / category.planned) * 100;

                            return (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                        <div className="flex items-center gap-2">
                                            {isOverBudget ? <TrendingUp className="h-4 w-4 text-red-500" /> : <TrendingDown className="h-4 w-4 text-emerald-500" />}
                                            <span className={cn('text-xs font-semibold', isOverBudget ? 'text-red-600' : 'text-emerald-600')}>
                                                {category.variancePercent > 0 ? '+' : ''}{category.variancePercent.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 w-16">Planned:</span>
                                            <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden relative">
                                                <div className="h-full bg-blue-500 rounded-md flex items-center justify-end pr-2" style={{ width: '100%' }}>
                                                    <span className="text-xs font-semibold text-white">{formatCurrency(category.planned)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 w-16">Actual:</span>
                                            <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden relative">
                                                <div className={cn('h-full rounded-md flex items-center pr-2 justify-end', isOverBudget ? 'bg-red-500' : 'bg-emerald-500')} style={{ width: `${Math.min(percentOfPlanned, 100)}%` }}>
                                                    <span className="text-xs font-semibold text-white">{formatCurrency(category.actual)}</span>
                                                </div>
                                                {percentOfPlanned > 100 && (
                                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                        <AlertTriangle className="h-4 w-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <span className={cn('text-xs font-medium', isOverBudget ? 'text-red-600' : 'text-emerald-600')}>
                                                Variance: {category.variance > 0 ? '+' : ''}{formatCurrency(category.variance)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Card>
    );
}