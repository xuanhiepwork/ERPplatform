import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

// KPI Data
const kpiData = {
  projectedRevenue: {
    value: 12450000,
    change: 18.5,
    trend: 'up',
    previousPeriod: 10500000
  },
  conversionRate: {
    value: 23.7,
    change: -2.3,
    trend: 'down',
    previousPeriod: 26.0
  },
  activePartnerships: {
    value: 47,
    change: 12,
    trend: 'up',
    previousPeriod: 35
  }
};

// Revenue Forecast vs Actual Data (Last 12 months)
const revenueData = [
  { month: 'May 25', forecast: 850000, actual: 820000 },
  { month: 'Jun 25', forecast: 920000, actual: 950000 },
  { month: 'Jul 25', forecast: 980000, actual: 940000 },
  { month: 'Aug 25', forecast: 1050000, actual: 1100000 },
  { month: 'Sep 25', forecast: 1100000, actual: 1080000 },
  { month: 'Oct 25', forecast: 1150000, actual: 1220000 },
  { month: 'Nov 25', forecast: 1200000, actual: 1180000 },
  { month: 'Dec 25', forecast: 1300000, actual: 1350000 },
  { month: 'Jan 26', forecast: 1100000, actual: 1050000 },
  { month: 'Feb 26', forecast: 1250000, actual: 1280000 },
  { month: 'Mar 26', forecast: 1350000, actual: 1400000 },
  { month: 'Apr 26', forecast: 1450000, actual: 1480000 }
];

// Funnel Data - Lead drop-off at each stage
const funnelData = [
  { stage: 'Leads Generated', value: 1200, fill: '#3b82f6' },
  { stage: 'Qualified', value: 680, fill: '#2563eb' },
  { stage: 'Pitching', value: 420, fill: '#1d4ed8' },
  { stage: 'Negotiation', value: 245, fill: '#1e40af' },
  { stage: 'Closed Won', value: 132, fill: '#10b981' }
];

// Regional Performance Data
const regionalData = [
  { region: 'North America', revenue: 4850000, deals: 18, growth: 24.5 },
  { region: 'Europe', revenue: 3920000, deals: 15, growth: 18.2 },
  { region: 'Asia Pacific', revenue: 2150000, deals: 9, growth: 32.8 },
  { region: 'Latin America', revenue: 980000, deals: 3, growth: 15.1 },
  { region: 'Middle East', revenue: 550000, deals: 2, growth: 28.4 }
];

// Pipeline Velocity Data
const pipelineMetrics = [
  { metric: 'Avg. Deal Size', value: '$265K', change: 8.3 },
  { metric: 'Sales Cycle', value: '67 days', change: -5.2 },
  { metric: 'Win Rate', value: '31.4%', change: 4.1 },
  { metric: 'Pipeline Value', value: '$8.2M', change: 15.7 }
];

export function BIDashboard() {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatFullCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const FunnelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const totalLeads = funnelData[0].value;
      const conversionRate = ((data.value / totalLeads) * 100).toFixed(1);

      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium mb-1">{data.stage}</p>
          <p className="text-sm text-muted-foreground">{data.value.toLocaleString()} leads</p>
          <p className="text-sm text-muted-foreground">{conversionRate}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Business Intelligence Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time analytics and performance metrics for business development
        </p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Projected Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Projected Revenue</p>
                <h2 className="text-3xl">{formatFullCurrency(kpiData.projectedRevenue.value)}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {kpiData.projectedRevenue.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+{kpiData.projectedRevenue.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">{kpiData.projectedRevenue.change}%</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">vs. last quarter</span>
            </div>
          </CardContent>
        </Card>

        {/* Market Conversion Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Conversion Rate</p>
                <h2 className="text-3xl">{kpiData.conversionRate.value}%</h2>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {kpiData.conversionRate.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+{kpiData.conversionRate.change}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">{kpiData.conversionRate.change}%</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">vs. last quarter</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Partnerships */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Partnerships</p>
                <h2 className="text-3xl">{kpiData.activePartnerships.value}</h2>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {kpiData.activePartnerships.trend === 'up' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+{kpiData.activePartnerships.change}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm font-medium">{kpiData.activePartnerships.change}</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">new this quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Velocity Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {pipelineMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{metric.metric}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl">{metric.value}</span>
                <span className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1: Revenue Forecast and Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Forecast vs Actual - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Forecast vs. Actual</CardTitle>
            <p className="text-sm text-muted-foreground">Last 12 months performance comparison</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '14px' }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="Forecast"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <p className="text-sm text-muted-foreground">Lead drop-off by stage</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <FunnelChart>
                <Tooltip content={<FunnelTooltip />} />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList
                    position="right"
                    fill="#000"
                    stroke="none"
                    dataKey="stage"
                    style={{ fontSize: '12px' }}
                  />
                  <LabelList
                    position="inside"
                    fill="#fff"
                    stroke="none"
                    dataKey="value"
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                  />
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Performance by Region</CardTitle>
            <p className="text-sm text-muted-foreground">Revenue and growth by geographic region</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={regionalData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="region"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
                          <p className="text-sm font-medium mb-2">{data.region}</p>
                          <p className="text-sm">Revenue: {formatFullCurrency(data.revenue)}</p>
                          <p className="text-sm">Deals: {data.deals}</p>
                          <p className="text-sm text-green-600">Growth: +{data.growth}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {regionalData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${220 - index * 15}, 70%, ${50 + index * 5}%)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">Detailed metrics</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{region.region}</span>
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +{region.growth}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(region.revenue)}</span>
                    <span>{region.deals} deals</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${(region.revenue / regionalData[0].revenue) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
