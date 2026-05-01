import { Shield, AlertTriangle, FileText, Clock, User, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export function RiskComplianceHeatmap() {
  const riskMatrix = [
    { name: 'Data Breach Risk', type: 'Tech', likelihood: 'medium', impact: 'high', x: 2, y: 3 },
    { name: 'Key Person Dependency', type: 'Talent', likelihood: 'high', impact: 'high', x: 3, y: 3 },
    { name: 'Cash Flow Shortage', type: 'Financial', likelihood: 'high', impact: 'critical', x: 3, y: 4 },
    { name: 'Regulatory Compliance', type: 'Legal', likelihood: 'low', impact: 'high', x: 1, y: 3 },
    { name: 'Market Competition', type: 'Financial', likelihood: 'medium', impact: 'medium', x: 2, y: 2 },
    { name: 'IP Infringement', type: 'Legal', likelihood: 'low', impact: 'medium', x: 1, y: 2 },
    { name: 'Server Downtime', type: 'Tech', likelihood: 'low', impact: 'low', x: 1, y: 1 },
    { name: 'Contract Renewal', type: 'Financial', likelihood: 'medium', impact: 'medium', x: 2, y: 2 },
  ];

  const strategicContracts = [
    { name: 'Shareholder Agreement - Series B', type: 'Investment', expiry: '2027-06-15', daysLeft: 412, status: 'active', confidentiality: 'high' },
    { name: 'Master NDA - Enterprise Clients', type: 'Legal', expiry: '2026-08-30', daysLeft: 126, status: 'active', confidentiality: 'high' },
    { name: 'IP License - Core Technology', type: 'IP', expiry: '2026-05-20', daysLeft: 24, status: 'renewal-required', confidentiality: 'critical' },
    { name: 'Strategic Partnership - AWS', type: 'Partnership', expiry: '2026-12-01', daysLeft: 219, status: 'active', confidentiality: 'medium' },
  ];

  const auditTrail = [
    { timestamp: '2026-04-26 14:32', user: 'Sarah Chen - CFO', action: 'Approved $250K marketing budget', level: 'critical' },
    { timestamp: '2026-04-26 11:15', user: 'Michael Rodriguez - CTO', action: 'Modified access controls for production DB', level: 'high' },
    { timestamp: '2026-04-25 16:45', user: 'Emily Watson - COO', action: 'Updated strategic vendor contract terms', level: 'medium' },
    { timestamp: '2026-04-25 09:20', user: 'David Kim - Head of Sales', action: 'Approved enterprise deal discount (18%)', level: 'high' },
  ];

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'Legal':
        return <FileText className="h-4 w-4" />;
      case 'Financial':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Tech':
        return <Shield className="h-4 w-4" />;
      case 'Talent':
        return <User className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (type: string) => {
    switch (type) {
      case 'Legal':
        return 'bg-purple-500';
      case 'Financial':
        return 'bg-amber-500';
      case 'Tech':
        return 'bg-blue-500';
      case 'Talent':
        return 'bg-pink-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Corporate Risk & Compliance</h1>
          <p className="text-slate-400 text-lg">Strategic risk management and governance oversight</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Risk Matrix - 9-box Heatmap */}
          <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-8">Risk Matrix: Likelihood vs. Impact</h2>

            {/* Matrix Grid */}
            <div className="relative">
              {/* Y-axis Label */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90">
                <span className="text-sm font-semibold text-slate-400">IMPACT</span>
              </div>

              {/* Grid Container */}
              <div className="grid grid-cols-3 grid-rows-4 gap-3 mb-4">
                {/* Row 4 - Critical Impact */}
                {[1, 2, 3].map((col) => (
                  <div
                    key={`4-${col}`}
                    className={cn(
                      'h-24 rounded-lg border-2 relative',
                      col === 3 ? 'bg-red-500/20 border-red-500/50' :
                      col === 2 ? 'bg-orange-500/20 border-orange-500/50' :
                      'bg-yellow-500/20 border-yellow-500/50'
                    )}
                  >
                    {riskMatrix.filter(r => r.x === col && r.y === 4).map((risk, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                          'h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform',
                          getRiskColor(risk.type)
                        )}
                        title={risk.name}
                      >
                        {getRiskIcon(risk.type)}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Row 3 - High Impact */}
                {[1, 2, 3].map((col) => (
                  <div
                    key={`3-${col}`}
                    className={cn(
                      'h-24 rounded-lg border-2 relative',
                      col === 3 ? 'bg-orange-500/20 border-orange-500/50' :
                      col === 2 ? 'bg-yellow-500/20 border-yellow-500/50' :
                      'bg-green-500/20 border-green-500/50'
                    )}
                  >
                    {riskMatrix.filter(r => r.x === col && r.y === 3).map((risk, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'absolute h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform',
                          getRiskColor(risk.type)
                        )}
                        style={{
                          top: `${30 + idx * 15}%`,
                          left: `${30 + idx * 15}%`,
                        }}
                        title={risk.name}
                      >
                        {getRiskIcon(risk.type)}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Row 2 - Medium Impact */}
                {[1, 2, 3].map((col) => (
                  <div
                    key={`2-${col}`}
                    className={cn(
                      'h-24 rounded-lg border-2 relative',
                      col === 3 ? 'bg-yellow-500/20 border-yellow-500/50' :
                      'bg-green-500/20 border-green-500/50'
                    )}
                  >
                    {riskMatrix.filter(r => r.x === col && r.y === 2).map((risk, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'absolute h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform',
                          getRiskColor(risk.type)
                        )}
                        style={{
                          top: `${25 + idx * 20}%`,
                          left: `${25 + idx * 20}%`,
                        }}
                        title={risk.name}
                      >
                        {getRiskIcon(risk.type)}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Row 1 - Low Impact */}
                {[1, 2, 3].map((col) => (
                  <div
                    key={`1-${col}`}
                    className="h-24 bg-green-500/20 border-2 border-green-500/50 rounded-lg relative"
                  >
                    {riskMatrix.filter(r => r.x === col && r.y === 1).map((risk, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                          'h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform',
                          getRiskColor(risk.type)
                        )}
                        title={risk.name}
                      >
                        {getRiskIcon(risk.type)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* X-axis Label */}
              <div className="text-center mt-2">
                <span className="text-sm font-semibold text-slate-400">LIKELIHOOD</span>
              </div>

              {/* X-axis Labels */}
              <div className="grid grid-cols-3 gap-3 mt-2 text-xs text-slate-500 text-center">
                <div>Low</div>
                <div>Medium</div>
                <div>High</div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300">Legal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300">Financial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300">Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300">Talent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section D: Secure Vault - Strategic Contracts */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">Secure Vault</h3>
                <p className="text-xs text-slate-400">Strategic contracts</p>
              </div>
            </div>

            <div className="space-y-3">
              {strategicContracts.map((contract, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-4 rounded-lg border',
                    contract.status === 'renewal-required'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-slate-900/50 border-slate-800'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-200 text-sm mb-1">{contract.name}</h4>
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                        {contract.type}
                      </Badge>
                    </div>
                    <Lock className={cn(
                      'h-4 w-4',
                      contract.confidentiality === 'critical' ? 'text-red-400' :
                      contract.confidentiality === 'high' ? 'text-amber-400' :
                      'text-slate-500'
                    )} />
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-xs text-slate-400">
                      Expires: {contract.expiry}
                    </span>
                  </div>

                  <div className={cn(
                    'mt-2 px-2 py-1 rounded text-xs font-semibold inline-block',
                    contract.daysLeft < 30 ? 'bg-red-500/20 text-red-400 animate-pulse' :
                    contract.daysLeft < 90 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-green-500/20 text-green-400'
                  )}>
                    {contract.daysLeft} days remaining
                  </div>

                  {contract.status === 'renewal-required' && (
                    <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">
                      Urgent: Initiate Renewal
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section E: Audit Trail */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Executive Audit Trail</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Department Head</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Critical Action</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Severity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">View</th>
                </tr>
              </thead>
              <tbody>
                {auditTrail.map((log, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-900/50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-xs text-slate-400">{log.timestamp}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-slate-200 text-sm">{log.user}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300 text-sm">{log.action}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          log.level === 'critical' ? 'text-red-400 border-red-500/30' :
                          log.level === 'high' ? 'text-amber-400 border-amber-500/30' :
                          'text-slate-400 border-slate-700'
                        )}
                      >
                        {log.level}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-amber-400">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
