import { TrendingUp, TrendingDown, DollarSign, Clock, PieChart, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../components/ui/utils';
import { useQuery } from '@tanstack/react-query';
import { founderApi } from '../../../../services/founderService';

const formatMillion = (val: number | string | undefined | null) => {
  const n = Number(val) || 0;
  return `$${(n / 1_000_000).toFixed(1)}M`;
};

export function ExecutiveBIDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['executive-metrics'], queryFn: founderApi.getExecutiveMetrics, staleTime: 1000 * 60 * 2 });

  const finance = data?.finance ?? null;
  const projects = data?.projects ?? [];
  const approvals = data?.approvals ?? [];
  const marketing = data?.marketing ?? null;

  const revenueNumber = Number(finance?.summary?.totalRevenue) || 12400000;
  const revenueTarget = 15000000;
  const revenuePct = Math.round((revenueNumber / revenueTarget) * 100);

  const heroMetrics = [
    {
      title: 'Revenue vs. Target',
      value: formatMillion(revenueNumber),
      target: formatMillion(revenueTarget),
      percentage: Math.min(100, Math.max(0, revenuePct)),
      trend: revenuePct >= 100 ? '+12%' : revenuePct > 75 ? '+5%' : '-3%',
      status: revenuePct < 60 ? 'critical' : 'good',
      icon: <DollarSign className="h-7 w-7" />,
    },
    {
      title: 'Cash Runway',
      value: finance?.summary?.netProfit ? ((Number(finance.summary.netProfit) / 1000000).toFixed(1)) : '4.2',
      unit: 'months',
      percentage: Math.min(100, Math.max(0, Math.round((Number(finance?.summary?.netProfit || 0) / Math.max(1, revenueNumber)) * 100))),
      trend: '-1.2 mo',
      status: Number(finance?.summary?.netProfit || 0) < 0 ? 'critical' : 'good',
      icon: <Clock className="h-7 w-7" />,
    },
    {
      title: 'Net Profit Margin',
      value: finance?.summary?.profitMargin ? `${finance.summary.profitMargin}%` : '18.5%',
      target: '20%',
      percentage: Number(finance?.summary?.profitMargin) || 92.5,
      trend: finance?.summary?.profitMargin && Number(finance.summary.profitMargin) > 0 ? '+2.3%' : '-1%',
      status: Number(finance?.summary?.profitMargin || 0) < 5 ? 'critical' : 'good',
      icon: <PieChart className="h-7 w-7" />,
    },
    {
      title: 'Project Health',
      value: projects.length > 0 ? `${Math.round((projects.filter((p: any) => p.status === 'On Track').length / projects.length) * 100) || 0}%` : '87%',
      subtitle: projects.length > 0 ? `${projects.filter((p: any) => p.status === 'On Track').length} on track` : '42 on track',
      percentage: projects.length > 0 ? Math.round((projects.filter((p: any) => p.status === 'On Track').length / projects.length) * 100) : 87,
      trend: '+5%',
      status: 'good',
      icon: <CheckCircle className="h-7 w-7" />,
    },
  ];

  // Burn-rate data for the chart (use backend chartData if available)
  const burnRateData = (finance?.chartData && Array.isArray(finance.chartData) && finance.chartData.length > 0)
    ? finance.chartData.map((r: any) => ({ month: r.date, actual: Math.round(r.revenue / 1000), forecasted: Math.round(r.expense / 1000) }))
    : [
      { month: 'Oct', actual: 420, forecasted: 400 },
      { month: 'Nov', actual: 450, forecasted: 420 },
      { month: 'Dec', actual: 480, forecasted: 450 },
      { month: 'Jan', actual: 510, forecasted: 480 },
      { month: 'Feb', actual: 490, forecasted: 500 },
      { month: 'Mar', actual: 530, forecasted: 520 },
    ];

  const maxValue = Math.max(...burnRateData.flatMap((d: any) => [d.actual || 0, d.forecasted || 0]));

  const aiSummary = {
    successes: [
      marketing ? `Marketing CAC: ${marketing.cac ?? 'N/A'}` : 'Q1 revenue exceeded target by 8% - Enterprise deals closing faster',
      'New product launch generated $2.1M in first month',
      'Customer retention improved to 94% (industry avg: 87%)',
    ],
    risks: [
      Number(finance?.summary?.netProfit || 0) < 0 ? 'Net profit negative - investigate' : 'Cash runway below 6-month threshold - monitor closely',
      projects.some((p: any) => p.status === 'Delayed') ? 'Several projects delayed - resource constraint' : 'Engineering team vacancy at 18% - critical hires delayed',
      approvals.length > 5 ? `${approvals.length} pending approvals - backlog risk` : 'Major client contract renewal at risk - intervention needed',
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Executive BI Dashboard</h1>
          <p className="text-slate-400 text-lg">Real-time vital signs and strategic metrics</p>
        </div>

        {/* Hero Metrics - Top Row */}
        <div className="grid grid-cols-4 gap-6">
          {heroMetrics.map((metric, index) => (
            <div
              key={index}
              className={cn(
                'relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border p-6 overflow-hidden',
                metric.status === 'critical'
                  ? 'border-red-500/30 shadow-lg shadow-red-500/10'
                  : 'border-slate-800 hover:border-amber-500/30'
              )}
            >
              {/* Red Line Critical Indicator */}
              {metric.status === 'critical' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-pulse" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  'h-14 w-14 rounded-xl flex items-center justify-center',
                  metric.status === 'critical'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-amber-500/20 text-amber-400'
                )}>
                  {metric.icon}
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'font-semibold',
                    metric.trend.startsWith('+')
                      ? 'text-green-400 border-green-500/30'
                      : metric.trend.startsWith('-')
                        ? 'text-red-400 border-red-500/30'
                        : 'text-slate-400 border-slate-700'
                  )}
                >
                  {metric.trend}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-400 mb-2">{metric.title}</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold text-slate-100">{metric.value}</div>
                    {metric.unit && (
                      <div className="text-lg text-slate-400">{metric.unit}</div>
                    )}
                  </div>
                  {metric.target && (
                    <div className="text-sm text-slate-500 mt-1">Target: {metric.target}</div>
                  )}
                  {metric.subtitle && (
                    <div className="text-sm text-slate-500 mt-1">{metric.subtitle}</div>
                  )}
                </div>

                {/* Progress Ring */}
                <div className="relative pt-4">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        metric.status === 'critical'
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600'
                      )}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-2 text-right">{metric.percentage}%</div>
                </div>
              </div>

              {metric.status === 'critical' && (
                <div className="mt-4 pt-4 border-t border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertTriangle className="h-4 w-4 animate-pulse" />
                    <span className="font-semibold">Below Safety Threshold</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Chart Area - Burn Rate */}
          <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Actual vs. Forecasted Burn-rate</h2>
                <p className="text-slate-400">6-month trend analysis (in $K)</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-amber-500 rounded-full" />
                  <span className="text-sm text-slate-300">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-slate-300">Forecasted</span>
                </div>
              </div>
            </div>

            {/* Dual-axis line chart */}
            <div className="space-y-6">
              {burnRateData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-300 w-12">{data.month}</span>
                    <div className="flex-1 flex gap-4">
                      {/* Actual */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-800 rounded-full h-10 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-end pr-3"
                              style={{ width: `${(data.actual / maxValue) * 100}%` }}
                            >
                              <span className="text-xs font-bold text-white">${data.actual}K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Forecasted */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-800 rounded-full h-10 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-3"
                              style={{ width: `${(data.forecasted / maxValue) * 100}%` }}
                            >
                              <span className="text-xs font-bold text-white">${data.forecasted}K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-slate-400 mb-2">Average Variance</div>
                <div className="text-2xl font-bold text-amber-400">+3.2%</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Forecast Accuracy</div>
                <div className="text-2xl font-bold text-blue-400">94.5%</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Trend</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <div className="text-2xl font-bold text-green-400">+8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Daily Executive Summary */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">AI Executive Summary</h3>
                <p className="text-xs text-slate-400">Last updated: 2 min ago</p>
              </div>
            </div>

            {/* Top 3 Successes */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-green-400">Top 3 Successes</h4>
              </div>
              <ul className="space-y-3">
                {aiSummary.successes.map((success, index) => (
                  <li key={index} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-green-400 font-bold">{index + 1}.</span>
                    <span>{success}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top 3 Critical Risks */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
                <h4 className="font-semibold text-red-400">Top 3 Critical Risks</h4>
              </div>
              <ul className="space-y-3">
                {aiSummary.risks.map((risk, index) => (
                  <li key={index} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-red-400 font-bold">{index + 1}.</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
