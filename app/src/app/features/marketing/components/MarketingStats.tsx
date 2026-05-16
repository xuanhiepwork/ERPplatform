import { TrendingUp, DollarSign, Target, Users } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { marketingApi } from '../../../../services/marketingService';

export function MarketingStats() {
    const { data: perfData } = useQuery({ queryKey: ['marketing-performance'], queryFn: marketingApi.getPerformance, staleTime: 1000 * 60 * 2 });

    const stats = [
        { title: 'Total ROI', value: perfData?.roi ? `${perfData.roi}%` : '268%', trend: perfData?.roi_change ? `${perfData.roi_change}%` : '+23%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { title: 'Avg CPC', value: perfData?.avg_cpc ? `$${perfData.avg_cpc}` : '$1.50', trend: perfData?.cpc_change ? `${perfData.cpc_change}%` : '-15%', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { title: 'Conversion Rate', value: perfData?.conversion_rate ? `${perfData.conversion_rate}%` : '68%', trend: perfData?.conversion_change ? `${perfData.conversion_change}%` : '+18%', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { title: 'Total Leads', value: perfData?.deals_won ?? '456', trend: perfData?.leads_change ? `${perfData.leads_change}%` : '+34%', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
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
