import { Users, TrendingUp, TrendingDown, Award, Briefcase, Heart, DollarSign, TrendingDown as TrendIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export function HumanCapitalPortfolio() {
  const talentMetrics = {
    turnoverRate: 8.5,
    turnoverTrend: -2.1,
    enps: 72,
    enpsTrend: +8,
  };

  const executiveAppointments = [
    { position: 'VP of Engineering', candidate: 'Jennifer Martinez', stage: 'Final Interview', salary: '$280K', priority: 'critical' },
    { position: 'Head of Product', candidate: 'Robert Chen', stage: 'Offer Extended', salary: '$250K', priority: 'high' },
    { position: 'CFO', candidate: 'Sarah Johnson', stage: 'Background Check', salary: '$320K', priority: 'critical' },
  ];

  const strategicPartners = [
    {
      name: 'Enterprise Solutions Corp',
      logo: 'ES',
      revenue: 4200000,
      relationship: 'excellent',
      trend: '+18%',
      status: 'Strategic Alliance',
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Global Tech Partners',
      logo: 'GT',
      revenue: 3800000,
      relationship: 'good',
      trend: '+12%',
      status: 'Platinum Partner',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Innovation Ventures LLC',
      logo: 'IV',
      revenue: 2900000,
      relationship: 'excellent',
      trend: '+24%',
      status: 'Strategic Alliance',
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Cloud Infrastructure Inc',
      logo: 'CI',
      revenue: 2400000,
      relationship: 'at-risk',
      trend: '-5%',
      status: 'Standard Partner',
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Digital Marketing Group',
      logo: 'DM',
      revenue: 1800000,
      relationship: 'good',
      trend: '+8%',
      status: 'Gold Partner',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      name: 'AI Solutions Co',
      logo: 'AI',
      revenue: 1500000,
      relationship: 'excellent',
      trend: '+32%',
      status: 'Strategic Alliance',
      color: 'from-pink-500 to-red-600',
    },
  ];

  const marketIntelligence = [
    { source: 'TechCrunch', headline: 'Competitor XYZ raises $50M Series C', time: '2 hours ago', impact: 'high' },
    { source: 'Bloomberg', headline: 'Industry leader announces major product pivot', time: '4 hours ago', impact: 'medium' },
    { source: 'Forbes', headline: 'New regulations affecting SaaS companies', time: '1 day ago', impact: 'critical' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Human Capital & Partner Portfolio</h1>
          <p className="text-slate-400 text-lg">Talent metrics, strategic partnerships, and market intelligence</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Talent Dashboard */}
          <div className="space-y-6">
            {/* Turnover Rate Donut */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold text-slate-100 mb-6">Talent Metrics</h3>

              <div className="flex items-center justify-center mb-6">
                <div className="relative h-48 w-48">
                  <svg className="transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="20"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#gradient-turnover)"
                      strokeWidth="20"
                      strokeDasharray={`${(talentMetrics.turnoverRate / 20) * 314} 314`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient-turnover" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-slate-100">{talentMetrics.turnoverRate}%</div>
                    <div className="text-sm text-slate-400">Turnover Rate</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <TrendingDown className="h-5 w-5 text-green-400" />
                <span className="text-lg font-semibold text-green-400">
                  {talentMetrics.turnoverTrend}% vs industry avg
                </span>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-2 text-center">Industry Average: 12%</div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '29%' }} />
                </div>
              </div>
            </div>

            {/* eNPS Donut */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold text-slate-100 mb-6">Employee Happiness (eNPS)</h3>

              <div className="flex items-center justify-center mb-6">
                <div className="relative h-48 w-48">
                  <svg className="transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="20"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#gradient-enps)"
                      strokeWidth="20"
                      strokeDasharray={`${(talentMetrics.enps / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient-enps" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-slate-100">{talentMetrics.enps}</div>
                    <div className="text-sm text-slate-400">eNPS Score</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-lg font-semibold text-green-400">
                  +{talentMetrics.enpsTrend} points this quarter
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-lg font-bold text-green-400">65%</div>
                  <div className="text-xs text-slate-400">Promoters</div>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-slate-300">28%</div>
                  <div className="text-xs text-slate-400">Passives</div>
                </div>
                <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div className="text-lg font-bold text-red-400">7%</div>
                  <div className="text-xs text-slate-400">Detractors</div>
                </div>
              </div>
            </div>

            {/* Market Intelligence Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold text-slate-100 mb-6">Market Intelligence</h3>

              <div className="space-y-3">
                {marketIntelligence.map((news, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-3 rounded-lg border cursor-pointer hover:bg-slate-900/50 transition-colors',
                      news.impact === 'critical' ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800'
                    )}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                        {news.source}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
                          news.impact === 'critical' ? 'text-red-400 border-red-500/30' :
                          news.impact === 'high' ? 'text-amber-400 border-amber-500/30' :
                          'text-slate-400 border-slate-700'
                        )}
                      >
                        {news.impact}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-200 mb-1">{news.headline}</div>
                    <div className="text-xs text-slate-500">{news.time}</div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                View All Intelligence
              </Button>
            </div>
          </div>

          {/* Center & Right - Executive Search & Partner Portfolio */}
          <div className="col-span-2 space-y-6">
            {/* Executive Appointments */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Executive Appointments & Approvals</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Position</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Candidate</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Stage</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Salary</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Priority</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executiveAppointments.map((appointment, index) => (
                      <tr key={index} className="border-b border-slate-800 hover:bg-slate-900/50">
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-200">{appointment.position}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-amber-400" />
                            <span className="text-slate-300">{appointment.candidate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                            {appointment.stage}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-amber-400">{appointment.salary}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              appointment.priority === 'critical' ? 'text-red-400 border-red-500/30 animate-pulse' :
                              'text-amber-400 border-amber-500/30'
                            )}
                          >
                            {appointment.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top 10 Strategic Partners Grid */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Top Strategic Partners</h2>

              <div className="grid grid-cols-3 gap-4">
                {strategicPartners.map((partner, index) => (
                  <div
                    key={index}
                    className={cn(
                      'bg-slate-900/50 rounded-xl border p-5 hover:shadow-lg transition-all cursor-pointer',
                      partner.relationship === 'at-risk' ? 'border-red-500/30' : 'border-slate-800 hover:border-amber-500/30'
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        'h-14 w-14 bg-gradient-to-br rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg',
                        partner.color
                      )}>
                        {partner.logo}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
                          partner.relationship === 'excellent' ? 'text-green-400 border-green-500/30' :
                          partner.relationship === 'good' ? 'text-blue-400 border-blue-500/30' :
                          'text-red-400 border-red-500/30'
                        )}
                      >
                        {partner.relationship}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-slate-100 mb-2 text-sm">{partner.name}</h3>
                    <div className="text-xs text-slate-400 mb-3">{partner.status}</div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400">Revenue</div>
                        <div className="text-lg font-bold text-amber-400">
                          ${(partner.revenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Trend</div>
                        <div className={cn(
                          'text-sm font-bold',
                          partner.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        )}>
                          {partner.trend}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Total Partner Revenue</div>
                  <div className="text-3xl font-bold text-amber-400">
                    ${(strategicPartners.reduce((acc, p) => acc + p.revenue, 0) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Strategic Alliances</div>
                  <div className="text-3xl font-bold text-green-400">
                    {strategicPartners.filter(p => p.status === 'Strategic Alliance').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">At-Risk Partners</div>
                  <div className="text-3xl font-bold text-red-400">
                    {strategicPartners.filter(p => p.relationship === 'at-risk').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
