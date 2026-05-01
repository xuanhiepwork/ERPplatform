import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Sparkles,
  Send,
  Zap,
  Brain,
  MessageSquare,
  Search,
  Wand2,
  Mail,
  Clock,
  ArrowRight,
  Activity,
  BarChart3,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Copy,
  Download,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from './ui/utils';

// Mock data for charts
const roiData = [
  { month: 'Jan', roi: 145, cpc: 2.3, leads: 234 },
  { month: 'Feb', roi: 178, cpc: 2.1, leads: 289 },
  { month: 'Mar', roi: 192, cpc: 1.9, leads: 312 },
  { month: 'Apr', roi: 215, cpc: 1.8, leads: 378 },
  { month: 'May', roi: 245, cpc: 1.6, leads: 425 },
  { month: 'Jun', roi: 268, cpc: 1.5, leads: 456 },
];

const conversionData = [
  { name: 'Converted', value: 68, color: '#8b5cf6' },
  { name: 'In Progress', value: 22, color: '#3b82f6' },
  { name: 'Lost', value: 10, color: '#6b7280' },
];

const channelPerformance = [
  { name: 'Organic', value: 35, color: '#10b981' },
  { name: 'Paid Search', value: 28, color: '#8b5cf6' },
  { name: 'Social', value: 20, color: '#3b82f6' },
  { name: 'Email', value: 12, color: '#f59e0b' },
  { name: 'Direct', value: 5, color: '#6b7280' },
];

const automationWorkflows = [
  {
    id: 1,
    name: 'Welcome Email Series',
    trigger: 'New Lead Sign-up',
    status: 'active',
    sent: 1247,
    openRate: 68,
  },
  {
    id: 2,
    name: 'Cart Abandonment',
    trigger: 'Cart Inactive 24h',
    status: 'active',
    sent: 342,
    openRate: 45,
  },
  {
    id: 3,
    name: 'Re-engagement Campaign',
    trigger: 'No Activity 30d',
    status: 'paused',
    sent: 567,
    openRate: 32,
  },
];

const aiSuggestions = [
  'Increase budget on high-performing keywords by 15%',
  'A/B test new ad copy with emotional triggers',
  'Optimize landing page for mobile conversion',
  'Launch retargeting campaign for cart abandoners',
];

export function MarketingAIHub() {
  const [contentPrompt, setContentPrompt] = useState('');
  const [keywordQuery, setKeywordQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState('content');

  const handleGenerateContent = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setAiResponse(
        `📝 AI-Generated Content:\n\n"Unlock Your Business Potential with Data-Driven Marketing\n\nIn today's competitive landscape, leveraging AI-powered insights isn't just an advantage—it's essential. Our platform combines cutting-edge analytics with intuitive automation to help you maximize ROI and convert more leads.\n\nKey Benefits:\n✓ 3x faster campaign optimization\n✓ 45% reduction in cost per acquisition\n✓ Real-time performance tracking\n\nReady to transform your marketing strategy? Let's connect."\n\nSEO Score: 92/100 | Readability: Excellent | Tone: Professional`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleKeywordAnalysis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiResponse(
        `🔍 Keyword Analysis Results:\n\nTop Keywords:\n• "AI marketing automation" - Vol: 18.5K | CPC: $12.30 | Difficulty: Medium\n• "marketing analytics platform" - Vol: 14.2K | CPC: $8.90 | Difficulty: Low\n• "ROI tracking software" - Vol: 9.8K | CPC: $15.40 | Difficulty: High\n\nRecommendations:\n✓ Target "marketing analytics platform" for quick wins\n✓ Create content around "AI marketing automation"\n✓ Consider long-tail: "best ROI tracking for small business"\n\nEstimated Monthly Traffic: 2.4K - 3.8K visitors`
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Marketing Performance & AI Hub</h1>
                <p className="text-sm text-gray-400">
                  AI-powered insights and automation at your fingertips
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Activity className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Top Section - Performance Dashboard */}
        <div className="grid grid-cols-4 gap-4">
          {/* KPI Cards */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                +23%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Total ROI</p>
              <p className="text-3xl font-bold text-white">268%</p>
              <p className="text-xs text-gray-500">vs last month: +23%</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                -15%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Avg CPC</p>
              <p className="text-3xl font-bold text-white">$1.50</p>
              <p className="text-xs text-gray-500">vs last month: -15%</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                +18%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">68%</p>
              <p className="text-xs text-gray-500">vs last month: +18%</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-400" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                +34%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Total Leads</p>
              <p className="text-3xl font-bold text-white">456</p>
              <p className="text-xs text-gray-500">vs last month: +34%</p>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* ROI Trend */}
          <Card className="col-span-2 bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">ROI & Performance Trends</h3>
                <p className="text-sm text-gray-400">6-month overview</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  ROI
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  CPC
                </Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={roiData}>
                <defs>
                  <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCpc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="roi"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRoi)"
                />
                <Area
                  type="monotone"
                  dataKey="cpc"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCpc)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Breakdown */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">Lead Conversion</h3>
              <p className="text-sm text-gray-400">Current status</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {conversionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Channel Performance & AI Insights */}
        <div className="grid grid-cols-3 gap-4">
          {/* Channel Performance */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">Channel Performance</h3>
              <p className="text-sm text-gray-400">Traffic distribution</p>
            </div>
            <div className="space-y-4">
              {channelPerformance.map((channel) => (
                <div key={channel.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{channel.name}</span>
                    <span className="text-sm font-medium text-white">{channel.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${channel.value}%`,
                        backgroundColor: channel.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="col-span-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
                <p className="text-sm text-gray-400">Smart recommendations for optimization</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                      <Zap className="h-4 w-4 text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section - AI Assistant & Automation */}
        <div className="grid grid-cols-3 gap-4">
          {/* AI Marketing Assistant */}
          <Card className="col-span-2 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Marketing Assistant</h3>
                <p className="text-sm text-gray-400">
                  Generate content and analyze keywords with AI
                </p>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Content Drafting
                </TabsTrigger>
                <TabsTrigger
                  value="keywords"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Keyword Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Describe your content needs
                  </label>
                  <Textarea
                    placeholder="e.g., Write a LinkedIn post about our new AI marketing platform..."
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 min-h-[100px]"
                    value={contentPrompt}
                    onChange={(e) => setContentPrompt(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleGenerateContent}
                  disabled={isGenerating || !contentPrompt}
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="keywords" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Enter topic or keywords
                  </label>
                  <Input
                    placeholder="e.g., AI marketing automation, ROI tracking..."
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                    value={keywordQuery}
                    onChange={(e) => setKeywordQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleKeywordAnalysis}
                  disabled={isGenerating || !keywordQuery}
                >
                  {isGenerating ? (
                    <>
                      <Search className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Keywords
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            {/* AI Response */}
            {aiResponse && (
              <div className="mt-4 p-4 bg-slate-800/50 border border-purple-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-400">AI Response</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => navigator.clipboard.writeText(aiResponse)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {aiResponse}
                </pre>
              </div>
            )}
          </Card>

          {/* Automation Workflows */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Email Automation</h3>
                <p className="text-sm text-gray-400">Active workflows</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {automationWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white mb-1 truncate">
                        {workflow.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Zap className="h-3 w-3" />
                        {workflow.trigger}
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        'ml-2',
                        workflow.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      )}
                    >
                      {workflow.status === 'active' ? (
                        <Play className="h-3 w-3 mr-1" />
                      ) : (
                        <Pause className="h-3 w-3 mr-1" />
                      )}
                      {workflow.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Mail className="h-3 w-3" />
                        <span>{workflow.sent}</span>
                      </div>
                      <div className="text-purple-400 font-medium">
                        {workflow.openRate}% open
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-gray-400 hover:text-white"
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Progress value={workflow.openRate} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Create New Workflow
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
