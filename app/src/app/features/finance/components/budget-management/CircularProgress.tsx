import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getStatusColor } from './utils';

interface CircularProgressProps {
    percent: number;
    status: string;
}

export function CircularProgress({ percent, status }: CircularProgressProps) {
    const colors = getStatusColor(status);
    const cappedPercent = Math.min(percent, 100);

    const data = [
        { value: cappedPercent },
        { value: 100 - cappedPercent },
    ];

    return (
        <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={45}
                        outerRadius={60}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        <Cell fill={colors.progressColor} />
                        <Cell fill={colors.bgColor} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{percent}%</p>
                    <p className="text-xs text-gray-600">consumed</p>
                </div>
            </div>
        </div>
    );
}