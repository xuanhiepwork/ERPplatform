import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../../../components/ui/button';

export interface DashboardHeaderProps {
    timeRange: string;
    setTimeRange: (v: string) => void;
    lastUpdated: Date;
}

export function DashboardHeader({ timeRange, setTimeRange, lastUpdated }: DashboardHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border-b">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">Finance Dashboard</h2>
                <p className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="rounded-md border px-2 py-1 text-sm bg-white"
                >
                    <option value="6months">Last 6 months</option>
                    <option value="12months">Last 12 months</option>
                    <option value="ytd">Year to date</option>
                </select>

                <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}