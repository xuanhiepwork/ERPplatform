import { TrendingUp, DollarSign, Target, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function MarketingStats() {
    const stats = [
        { title: 'Total ROI', value: '268%', trend: '+23%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { title: 'Avg CPC', value: '$1.50', trend: '-15%', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { title: 'Conversion Rate', value: '68%', trend: '+18%', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { title: 'Total Leads', value: '456', trend: '+34%', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={i} className={`bg-gradient-to-br from-slate-900 to-slate-950 ${stat.border} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            {stat.trend}
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-gray-400">{stat.title}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}