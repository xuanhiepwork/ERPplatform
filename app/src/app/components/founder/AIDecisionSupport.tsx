import { useState } from 'react';
import { Sparkles, Send, CheckCircle, AlertTriangle, Clock, User, FileText } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../ui/utils';

export function AIDecisionSupport() {
  const [message, setMessage] = useState('');

  const chatHistory = [
    { role: 'user', content: 'What are the top 3 strategic risks facing us right now?', time: '10:24 AM' },
    {
      role: 'ai',
      content: 'Based on current data analysis, the top 3 strategic risks are:\n\n1. **Cash Runway Critical** - Current runway of 4.2 months is below the 6-month safety threshold. Immediate fundraising or burn rate reduction required.\n\n2. **Key Person Dependency** - 3 critical positions have single points of failure with no succession planning.\n\n3. **Major Client Concentration** - Top 3 clients represent 62% of ARR, creating significant revenue risk.',
      time: '10:24 AM'
    },
    { role: 'user', content: 'Should we approve the $250K marketing budget increase?', time: '10:26 AM' },
    {
      role: 'ai',
      content: '**Recommendation: CONDITIONAL APPROVAL**\n\nBased on scenario modeling:\n- Expected ROI: 3.2x over 6 months\n- Projected lead increase: +2,400 qualified leads\n- Cash impact: Reduces runway from 4.2 to 3.8 months\n\n**Conditions:**\n1. Secure bridge financing commitment first\n2. Implement weekly ROI tracking\n3. Include kill-switch if CAC exceeds $180',
      time: '10:26 AM'
    },
  ];

  const decisionLog = [
    {
      id: 'DEC-2024-042',
      decision: 'Approved AWS infrastructure upgrade ($125K)',
      reasoning: 'Critical for scaling to 10K concurrent users; ROI: 6 months',
      approver: 'Alex Morgan - CEO',
      timestamp: '2026-04-26 14:30',
      impact: 'high',
    },
    {
      id: 'DEC-2024-041',
      decision: 'Rejected Series B fundraising at current valuation',
      reasoning: 'Market conditions unfavorable; recommend waiting for Q2 results',
      approver: 'Alex Morgan - CEO',
      timestamp: '2026-04-25 11:15',
      impact: 'critical',
    },
    {
      id: 'DEC-2024-040',
      decision: 'Approved hiring freeze for non-engineering roles',
      reasoning: 'Cash preservation strategy; runway extension from 4.2 to 5.8 months',
      approver: 'Alex Morgan - CEO',
      timestamp: '2026-04-24 16:45',
      impact: 'high',
    },
  ];

  const escalatedIssues = [
    {
      id: 'ESC-128',
      title: 'Enterprise deal blocked - legal terms dispute',
      pm: 'Michael Rodriguez - CTO',
      value: '$2.4M ARR',
      submitted: '2 hours ago',
      urgency: 'critical',
      description: 'Client requesting custom data residency terms not in standard contract',
    },
    {
      id: 'ESC-127',
      title: 'Product roadmap conflict between sales and engineering',
      pm: 'Sarah Chen - VP Product',
      value: 'Q2 Revenue Impact',
      submitted: '5 hours ago',
      urgency: 'high',
      description: 'Sales committed features not on engineering roadmap',
    },
    {
      id: 'ESC-126',
      title: 'Key vendor threatening price increase (40%)',
      pm: 'Emily Watson - COO',
      value: '$180K annual',
      submitted: '1 day ago',
      urgency: 'medium',
      description: 'Cloud infrastructure provider renegotiating contract terms',
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">AI-Powered Decision Support</h1>
          <p className="text-slate-400 text-lg">Executive summary intelligence and strategic escalations</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* AI Chat Interface */}
          <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col h-[800px]">
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Executive Summary Bot</h2>
                <p className="text-sm text-slate-400">AI-powered strategic advisor</p>
              </div>
              <div className="ml-auto">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Online
                </Badge>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-4',
                    chat.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {chat.role === 'ai' && (
                    <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-2xl rounded-2xl p-5',
                      chat.role === 'user'
                        ? 'bg-amber-500/10 border border-amber-500/30'
                        : 'bg-slate-900/50 border border-slate-800'
                    )}
                  >
                    <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                      {chat.content}
                    </div>
                    <div className="text-xs text-slate-500 mt-3">{chat.time}</div>
                  </div>

                  {chat.role === 'user' && (
                    <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-slate-800">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Ask strategic questions, request analysis, or seek recommendations..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 h-12 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                />
                <Button
                  onClick={handleSend}
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span>Suggestions:</span>
                <button className="hover:text-amber-400 transition-colors">Cash runway analysis</button>
                <button className="hover:text-amber-400 transition-colors">Market position review</button>
                <button className="hover:text-amber-400 transition-colors">Risk assessment</button>
              </div>
            </div>
          </div>

          {/* Decision Log */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Strategic Decision Log</h3>

            <div className="space-y-4">
              {decisionLog.map((log, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-xs text-amber-400">{log.id}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        log.impact === 'critical' ? 'text-red-400 border-red-500/30' :
                        'text-amber-400 border-amber-500/30'
                      )}
                    >
                      {log.impact}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-slate-200 mb-2 text-sm">{log.decision}</h4>

                  <div className="text-xs text-slate-400 mb-3 leading-relaxed">
                    <strong className="text-slate-300">Reasoning:</strong> {log.reasoning}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>{log.approver}</span>
                    </div>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6 border-slate-700 text-slate-300 hover:bg-slate-800">
              View Full Decision History
            </Button>
          </div>
        </div>

        {/* Escalation Dashboard */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-red-500/30 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center animate-pulse">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Escalated Issues Requiring Founder Intervention</h2>
              <p className="text-sm text-slate-400">Unresolved strategic decisions from department heads</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-lg px-4 py-1">
                {escalatedIssues.length} Urgent
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {escalatedIssues.map((issue, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 rounded-xl border bg-slate-900/50',
                  issue.urgency === 'critical' ? 'border-red-500/30' :
                  issue.urgency === 'high' ? 'border-amber-500/30' :
                  'border-slate-800'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-slate-500">{issue.id}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          issue.urgency === 'critical' ? 'text-red-400 border-red-500/30 animate-pulse' :
                          issue.urgency === 'high' ? 'text-amber-400 border-amber-500/30' :
                          'text-slate-400 border-slate-700'
                        )}
                      >
                        {issue.urgency}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2">{issue.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{issue.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Escalated By</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-200">{issue.pm}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Value at Risk</div>
                    <div className="text-lg font-bold text-amber-400">{issue.value}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Time Escalated</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-300">{issue.submitted}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Supporting Docs</div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-blue-400 hover:underline cursor-pointer">View Details</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Resolve
                  </Button>
                  <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                    Request More Info
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    Escalate to Board
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
