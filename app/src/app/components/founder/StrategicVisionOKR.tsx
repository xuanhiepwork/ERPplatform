import { Target, TrendingUp, Users, Rocket, Award, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

export function StrategicVisionOKR() {
  const annualGoals = [
    'Achieve $50M ARR by end of 2026',
    'Expand to 3 new international markets',
    'Build world-class product team of 100+ engineers',
  ];

  const departmentalOKRs = [
    {
      dept: 'Marketing',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-orange-500 to-pink-600',
      objectives: [
        { title: 'Increase brand awareness by 200%', completion: 75, alignment: 92 },
        { title: 'Generate 10K qualified leads', completion: 68, alignment: 88 },
        { title: 'Launch in 3 new markets', completion: 45, alignment: 85 },
      ],
    },
    {
      dept: 'Business Development',
      icon: <Rocket className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-600',
      objectives: [
        { title: 'Close $30M in enterprise deals', completion: 82, alignment: 95 },
        { title: 'Build strategic partnerships with Fortune 500', completion: 60, alignment: 90 },
        { title: 'Expand partner ecosystem to 50 companies', completion: 70, alignment: 87 },
      ],
    },
    {
      dept: 'Technology',
      icon: <Users className="h-6 w-6" />,
      color: 'from-purple-500 to-blue-600',
      objectives: [
        { title: 'Ship v3.0 product with AI features', completion: 55, alignment: 93 },
        { title: 'Achieve 99.9% uptime SLA', completion: 95, alignment: 98 },
        { title: 'Reduce technical debt by 40%', completion: 38, alignment: 82 },
      ],
    },
    {
      dept: 'Human Resources',
      icon: <Award className="h-6 w-6" />,
      color: 'from-pink-500 to-purple-600',
      objectives: [
        { title: 'Hire 50 top-tier engineers', completion: 64, alignment: 88 },
        { title: 'Improve employee NPS to 85+', completion: 78, alignment: 90 },
        { title: 'Launch executive development program', completion: 42, alignment: 85 },
      ],
    },
  ];

  const visionTimeline = [
    { year: '2024', milestone: 'Series A Funding', status: 'completed' },
    { year: '2025', milestone: 'Product-Market Fit', status: 'completed' },
    { year: '2026', milestone: '$50M ARR Target', status: 'in-progress' },
    { year: '2027', milestone: 'IPO Preparation', status: 'upcoming' },
    { year: '2028', milestone: 'Public Company', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Top 3 Annual Company Goals - Hero Typography */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/30 p-12 shadow-2xl shadow-amber-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-100">2026 Strategic Vision</h1>
              <p className="text-slate-400 text-lg">Top 3 Annual Company Goals</p>
            </div>
          </div>

          <div className="space-y-6">
            {annualGoals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-xl flex items-center justify-center border border-amber-500/30">
                  <span className="text-3xl font-bold text-amber-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-100">{goal}</h3>
                </div>
                <ChevronRight className="h-6 w-6 text-amber-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Departmental OKRs - Cascading Card Layout */}
        <div>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Departmental OKRs</h2>
          <div className="grid grid-cols-2 gap-6">
            {departmentalOKRs.map((dept, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn('h-12 w-12 bg-gradient-to-br rounded-xl flex items-center justify-center', dept.color)}>
                    <div className="text-white">{dept.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{dept.dept}</h3>
                    <p className="text-sm text-slate-400">{dept.objectives.length} Key Objectives</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {dept.objectives.map((obj, objIndex) => (
                    <div
                      key={objIndex}
                      className="p-4 bg-slate-900/50 rounded-lg border border-slate-800"
                    >
                      <div className="mb-3">
                        <h4 className="font-semibold text-slate-200 mb-2">{obj.title}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Completion % */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">Completion</span>
                            <span className="text-xs font-bold text-slate-200">{obj.completion}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                obj.completion >= 70 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                obj.completion >= 40 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                                'bg-gradient-to-r from-red-500 to-red-600'
                              )}
                              style={{ width: `${obj.completion}%` }}
                            />
                          </div>
                        </div>

                        {/* Leadership Alignment Score */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">Alignment</span>
                            <span className="text-xs font-bold text-slate-200">{obj.alignment}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                              style={{ width: `${obj.alignment}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Department Summary */}
                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Avg Completion</div>
                    <div className="text-2xl font-bold text-amber-400">
                      {Math.round(dept.objectives.reduce((acc, obj) => acc + obj.completion, 0) / dept.objectives.length)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Avg Alignment</div>
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(dept.objectives.reduce((acc, obj) => acc + obj.alignment, 0) / dept.objectives.length)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Timeline - Multi-year Milestones */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-8">Vision Timeline: Road to IPO</h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-slate-800" />
            <div className="absolute top-8 left-0 h-1 bg-gradient-to-r from-amber-500 to-blue-500" style={{ width: '40%' }} />

            {/* Timeline Items */}
            <div className="relative flex items-start justify-between">
              {visionTimeline.map((item, index) => (
                <div key={index} className="flex flex-col items-center" style={{ width: '20%' }}>
                  {/* Node */}
                  <div className={cn(
                    'h-16 w-16 rounded-full flex items-center justify-center border-4 bg-slate-950 z-10 mb-4',
                    item.status === 'completed' ? 'border-green-500 bg-green-500/20' :
                    item.status === 'in-progress' ? 'border-amber-500 bg-amber-500/20 animate-pulse' :
                    'border-slate-700'
                  )}>
                    {item.status === 'completed' ? (
                      <ChevronRight className="h-8 w-8 text-green-400" />
                    ) : item.status === 'in-progress' ? (
                      <Target className="h-8 w-8 text-amber-400" />
                    ) : (
                      <span className="text-lg font-bold text-slate-500">{item.year}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-100 mb-1">{item.year}</div>
                    <div className="text-sm text-slate-400">{item.milestone}</div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'mt-2',
                        item.status === 'completed' ? 'text-green-400 border-green-500/30' :
                        item.status === 'in-progress' ? 'text-amber-400 border-amber-500/30' :
                        'text-slate-500 border-slate-700'
                      )}
                    >
                      {item.status === 'completed' ? 'Completed' :
                       item.status === 'in-progress' ? 'In Progress' :
                       'Upcoming'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
