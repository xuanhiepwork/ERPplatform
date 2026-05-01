import { useState } from 'react';
import {
  Target,
  TrendingUp,
  Award,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Filter,
  Download,
  Eye,
  MessageSquare,
  ChevronRight,
  Zap,
  Trophy,
  Activity,
  PieChart,
  Grid3x3,
  User,
  Building2,
  Lightbulb,
  Flag,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from './ui/utils';

interface OKR {
  id: string;
  type: 'individual' | 'department' | 'company';
  objective: string;
  owner: string;
  department?: string;
  keyResults: KeyResult[];
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind';
  dueDate: string;
}

interface KeyResult {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  progress: number;
}

interface EvaluationScore {
  category: string;
  self: number;
  manager: number;
  peer: number;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  performance: number; // 1-3 scale
  potential: number; // 1-3 scale
  category: string;
  overallScore: number;
  trend: 'up' | 'down' | 'stable';
}

const okrs: OKR[] = [
  {
    id: 'okr-001',
    type: 'individual',
    objective: 'Improve Team Productivity & Code Quality',
    owner: 'Sarah Johnson',
    department: 'Engineering',
    keyResults: [
      {
        id: 'kr-001',
        description: 'Reduce code review cycle time',
        target: 24,
        current: 18,
        unit: 'hours',
        progress: 75,
      },
      {
        id: 'kr-002',
        description: 'Increase automated test coverage',
        target: 85,
        current: 72,
        unit: '%',
        progress: 85,
      },
      {
        id: 'kr-003',
        description: 'Deploy new features to production',
        target: 12,
        current: 9,
        unit: 'features',
        progress: 75,
      },
    ],
    progress: 78,
    status: 'on-track',
    dueDate: 'Jun 30, 2026',
  },
  {
    id: 'okr-002',
    type: 'individual',
    objective: 'Enhance Customer Satisfaction & Support Quality',
    owner: 'Michael Chen',
    department: 'Customer Success',
    keyResults: [
      {
        id: 'kr-004',
        description: 'Achieve customer satisfaction score',
        target: 90,
        current: 88,
        unit: '%',
        progress: 98,
      },
      {
        id: 'kr-005',
        description: 'Reduce average response time',
        target: 2,
        current: 3.5,
        unit: 'hours',
        progress: 43,
      },
      {
        id: 'kr-006',
        description: 'Complete customer onboarding sessions',
        target: 50,
        current: 42,
        unit: 'sessions',
        progress: 84,
      },
    ],
    progress: 75,
    status: 'at-risk',
    dueDate: 'Jun 30, 2026',
  },
  {
    id: 'okr-003',
    type: 'department',
    objective: 'Scale Engineering Team & Infrastructure',
    owner: 'Engineering',
    department: 'Engineering',
    keyResults: [
      {
        id: 'kr-007',
        description: 'Hire senior engineers',
        target: 8,
        current: 5,
        unit: 'hires',
        progress: 63,
      },
      {
        id: 'kr-008',
        description: 'Reduce system downtime',
        target: 99.9,
        current: 99.7,
        unit: '%',
        progress: 80,
      },
      {
        id: 'kr-009',
        description: 'Launch new microservices',
        target: 5,
        current: 2,
        unit: 'services',
        progress: 40,
      },
    ],
    progress: 61,
    status: 'at-risk',
    dueDate: 'Jun 30, 2026',
  },
  {
    id: 'okr-004',
    type: 'department',
    objective: 'Increase Marketing ROI & Brand Awareness',
    owner: 'Marketing',
    department: 'Marketing',
    keyResults: [
      {
        id: 'kr-010',
        description: 'Increase website traffic',
        target: 100000,
        current: 85000,
        unit: 'visitors',
        progress: 85,
      },
      {
        id: 'kr-011',
        description: 'Improve conversion rate',
        target: 5,
        current: 4.2,
        unit: '%',
        progress: 84,
      },
      {
        id: 'kr-012',
        description: 'Generate qualified leads',
        target: 500,
        current: 425,
        unit: 'leads',
        progress: 85,
      },
    ],
    progress: 85,
    status: 'on-track',
    dueDate: 'Jun 30, 2026',
  },
];

const evaluationScores: EvaluationScore[] = [
  { category: 'Technical Skills', self: 4.5, manager: 4.2, peer: 4.3 },
  { category: 'Communication', self: 4.0, manager: 4.5, peer: 4.4 },
  { category: 'Leadership', self: 3.8, manager: 4.0, peer: 4.2 },
  { category: 'Problem Solving', self: 4.3, manager: 4.4, peer: 4.1 },
  { category: 'Collaboration', self: 4.2, manager: 4.3, peer: 4.6 },
  { category: 'Initiative', self: 3.9, manager: 4.1, peer: 4.0 },
];

const employees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Sarah Johnson',
    position: 'Senior Engineer',
    department: 'Engineering',
    performance: 3,
    potential: 3,
    category: 'Star / High Performer',
    overallScore: 4.5,
    trend: 'up',
  },
  {
    id: 'emp-002',
    name: 'Michael Chen',
    position: 'Engineering Manager',
    department: 'Engineering',
    performance: 3,
    potential: 2,
    category: 'Core Player',
    overallScore: 4.2,
    trend: 'stable',
  },
  {
    id: 'emp-003',
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    department: 'Design',
    performance: 2,
    potential: 3,
    category: 'High Potential',
    overallScore: 4.0,
    trend: 'up',
  },
  {
    id: 'emp-004',
    name: 'David Kim',
    position: 'Backend Engineer',
    department: 'Engineering',
    performance: 3,
    potential: 2,
    category: 'Core Player',
    overallScore: 4.1,
    trend: 'stable',
  },
  {
    id: 'emp-005',
    name: 'Jessica Park',
    position: 'Data Scientist',
    department: 'Data Science',
    performance: 3,
    potential: 3,
    category: 'Star / High Performer',
    overallScore: 4.6,
    trend: 'up',
  },
  {
    id: 'emp-006',
    name: 'Alex Thompson',
    position: 'Product Manager',
    department: 'Product',
    performance: 2,
    potential: 2,
    category: 'Solid Performer',
    overallScore: 3.8,
    trend: 'stable',
  },
  {
    id: 'emp-007',
    name: 'Maria Garcia',
    position: 'Marketing Lead',
    department: 'Marketing',
    performance: 2,
    potential: 3,
    category: 'High Potential',
    overallScore: 3.9,
    trend: 'up',
  },
  {
    id: 'emp-008',
    name: 'James Wilson',
    position: 'Sales Rep',
    department: 'Sales',
    performance: 1,
    potential: 2,
    category: 'Improvement Needed',
    overallScore: 3.2,
    trend: 'down',
  },
  {
    id: 'emp-009',
    name: 'Lisa Anderson',
    position: 'HR Specialist',
    department: 'HR',
    performance: 2,
    potential: 2,
    category: 'Solid Performer',
    overallScore: 3.7,
    trend: 'stable',
  },
];

function OKRTracking() {
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'department'>('all');

  const filteredOKRs = okrs.filter((okr) => filterType === 'all' || okr.type === filterType);

  const getStatusBadge = (status: OKR['status']) => {
    switch (status) {
      case 'on-track':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            On Track
          </Badge>
        );
      case 'at-risk':
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        );
      case 'behind':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Behind
          </Badge>
        );
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const stats = {
    onTrack: okrs.filter((okr) => okr.status === 'on-track').length,
    atRisk: okrs.filter((okr) => okr.status === 'at-risk').length,
    avgProgress: Math.round(okrs.reduce((sum, okr) => sum + okr.progress, 0) / okrs.length),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">OKR & Goal Tracking</h2>
          <p className="text-sm text-gray-500">Monitor objectives and key results progress</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All OKRs</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Target className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total OKRs</p>
              <p className="text-xl font-bold text-gray-900">{okrs.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">On Track</p>
              <p className="text-xl font-bold text-gray-900">{stats.onTrack}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">At Risk</p>
              <p className="text-xl font-bold text-gray-900">{stats.atRisk}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Progress</p>
              <p className="text-xl font-bold text-gray-900">{stats.avgProgress}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* OKR List */}
      <div className="space-y-4">
        {filteredOKRs.map((okr) => (
          <Card key={okr.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* OKR Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      okr.type === 'individual'
                        ? 'border-indigo-300 text-indigo-700 bg-indigo-50'
                        : 'border-purple-300 text-purple-700 bg-purple-50'
                    )}
                  >
                    {okr.type === 'individual' ? (
                      <User className="h-3 w-3 mr-1" />
                    ) : (
                      <Building2 className="h-3 w-3 mr-1" />
                    )}
                    {okr.type === 'individual' ? 'Individual' : 'Department'}
                  </Badge>
                  {getStatusBadge(okr.status)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{okr.objective}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {okr.owner}
                  </span>
                  {okr.department && (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {okr.department}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {okr.dueDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600 mb-1">{okr.progress}%</div>
                <p className="text-xs text-gray-500">Overall Progress</p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-4">
              <Progress value={okr.progress} className="h-3" />
            </div>

            {/* Key Results */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Key Results
              </h4>
              {okr.keyResults.map((kr) => (
                <div key={kr.id} className="pl-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{kr.description}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 font-mono">
                        {kr.current} / {kr.target} {kr.unit}
                      </span>
                      <span className="font-semibold text-gray-900 w-12 text-right">
                        {kr.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', getProgressColor(kr.progress))}
                        style={{ width: `${kr.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Degree360Evaluation() {
  const maxScore = 5;
  const categories = evaluationScores.map((s) => s.category);

  // Calculate averages
  const avgSelf =
    evaluationScores.reduce((sum, s) => sum + s.self, 0) / evaluationScores.length;
  const avgManager =
    evaluationScores.reduce((sum, s) => sum + s.manager, 0) / evaluationScores.length;
  const avgPeer =
    evaluationScores.reduce((sum, s) => sum + s.peer, 0) / evaluationScores.length;
  const overallAvg = (avgSelf + avgManager + avgPeer) / 3;

  // Simple radar chart visualization using CSS
  const RadarChart = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const numPoints = categories.length;

    const getPoint = (index: number, value: number) => {
      const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
      const distance = (value / maxScore) * radius;
      return {
        x: centerX + distance * Math.cos(angle),
        y: centerY + distance * Math.sin(angle),
      };
    };

    const getPolygonPoints = (scores: number[]) => {
      return scores
        .map((score, index) => {
          const point = getPoint(index, score);
          return `${point.x},${point.y}`;
        })
        .join(' ');
    };

    const selfPoints = getPolygonPoints(evaluationScores.map((s) => s.self));
    const managerPoints = getPolygonPoints(evaluationScores.map((s) => s.manager));
    const peerPoints = getPolygonPoints(evaluationScores.map((s) => s.peer));

    return (
      <div className="relative">
        <svg width="300" height="300" className="mx-auto">
          {/* Background circles */}
          {[1, 2, 3, 4, 5].map((level) => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={(level * radius) / maxScore}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {categories.map((_, index) => {
            const point = getPoint(index, maxScore);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}

          {/* Peer evaluation (background) */}
          <polygon
            points={peerPoints}
            fill="rgba(168, 85, 247, 0.15)"
            stroke="rgb(168, 85, 247)"
            strokeWidth="2"
          />

          {/* Manager evaluation (middle) */}
          <polygon
            points={managerPoints}
            fill="rgba(59, 130, 246, 0.15)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
          />

          {/* Self evaluation (foreground) */}
          <polygon
            points={selfPoints}
            fill="rgba(16, 185, 129, 0.15)"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2"
          />

          {/* Data points */}
          {evaluationScores.map((score, index) => {
            const selfPoint = getPoint(index, score.self);
            const managerPoint = getPoint(index, score.manager);
            const peerPoint = getPoint(index, score.peer);
            return (
              <g key={index}>
                <circle cx={selfPoint.x} cy={selfPoint.y} r="4" fill="rgb(16, 185, 129)" />
                <circle cx={managerPoint.x} cy={managerPoint.y} r="4" fill="rgb(59, 130, 246)" />
                <circle cx={peerPoint.x} cy={peerPoint.y} r="4" fill="rgb(168, 85, 247)" />
              </g>
            );
          })}

          {/* Labels */}
          {categories.map((category, index) => {
            const labelPoint = getPoint(index, maxScore + 0.3);
            return (
              <text
                key={index}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {category}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-700">Self ({avgSelf.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-700">Manager ({avgManager.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-700">Peer ({avgPeer.toFixed(1)})</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">360-Degree Evaluation</h2>
        <p className="text-sm text-gray-500">
          Comprehensive feedback from multiple perspectives
        </p>
      </div>

      {/* Employee Info */}
      <Card className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-indigo-600 text-white text-lg">SJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">
                Senior Software Engineer · Engineering Department
              </p>
              <p className="text-xs text-gray-500 mt-1">Review Period: Q1 2026</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-indigo-600 mb-1">
              {overallAvg.toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    star <= Math.round(overallAvg)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <User className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Self Evaluation</p>
              <p className="text-2xl font-bold text-gray-900">{avgSelf.toFixed(1)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Manager Evaluation</p>
              <p className="text-2xl font-bold text-gray-900">{avgManager.toFixed(1)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Peer Evaluation</p>
              <p className="text-2xl font-bold text-gray-900">{avgPeer.toFixed(1)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-6 text-center">
          Competency Comparison
        </h3>
        <RadarChart />
      </Card>

      {/* Detailed Scores */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          Detailed Score Breakdown
        </h3>
        <div className="space-y-4">
          {evaluationScores.map((score, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{score.category}</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-600 font-semibold">
                    Self: {score.self.toFixed(1)}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    Mgr: {score.manager.toFixed(1)}
                  </span>
                  <span className="text-purple-600 font-semibold">
                    Peer: {score.peer.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(score.self / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(score.manager / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(score.peer / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-5 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-gray-900 mb-2">Key Insights</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Peers rate Collaboration highest (4.6), showing strong team contribution</li>
              <li>• Manager rates Communication highly (4.5), indicating effective stakeholder engagement</li>
              <li>• Self-assessment shows realistic self-awareness across all competencies</li>
              <li>• Areas for growth: Leadership development opportunity identified</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PerformanceMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 9-box grid categories
  const boxCategories = [
    { performance: 3, potential: 3, label: 'Star / High Performer', color: 'bg-emerald-500' },
    { performance: 3, potential: 2, label: 'Core Player', color: 'bg-blue-500' },
    { performance: 3, potential: 1, label: 'Solid Contributor', color: 'bg-cyan-500' },
    { performance: 2, potential: 3, label: 'High Potential', color: 'bg-purple-500' },
    { performance: 2, potential: 2, label: 'Solid Performer', color: 'bg-indigo-500' },
    { performance: 2, potential: 1, label: 'Inconsistent', color: 'bg-yellow-500' },
    { performance: 1, potential: 3, label: 'Enigma', color: 'bg-orange-500' },
    { performance: 1, potential: 2, label: 'Improvement Needed', color: 'bg-amber-500' },
    { performance: 1, potential: 1, label: 'Low Performer', color: 'bg-red-500' },
  ];

  const filteredEmployees =
    selectedCategory === 'all'
      ? employees
      : employees.filter((emp) => emp.category === selectedCategory);

  const topPerformers = employees.filter(
    (emp) => emp.performance === 3 && emp.potential === 3
  );
  const improvementNeeded = employees.filter((emp) => emp.performance === 1);

  const getBox = (performance: number, potential: number) => {
    return boxCategories.find(
      (box) => box.performance === performance && box.potential === potential
    );
  };

  const getTrendIcon = (trend: Employee['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Performance Matrix & Calibration
          </h2>
          <p className="text-sm text-gray-500">
            9-box grid for talent assessment and succession planning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Performers</p>
              <p className="text-xl font-bold text-gray-900">{topPerformers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">High Potential</p>
              <p className="text-xl font-bold text-gray-900">
                {employees.filter((e) => e.potential === 3).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Needs Improvement</p>
              <p className="text-xl font-bold text-gray-900">{improvementNeeded.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Activity className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Performance</p>
              <p className="text-xl font-bold text-gray-900">
                {(
                  employees.reduce((sum, e) => sum + e.overallScore, 0) / employees.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 9-Box Grid */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Grid3x3 className="h-5 w-5 text-indigo-600" />
          9-Box Performance-Potential Matrix
        </h3>
        <div className="relative">
          {/* Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[3, 2, 1].map((potential) =>
              [1, 2, 3].map((performance) => {
                const box = getBox(performance, potential);
                const employeesInBox = employees.filter(
                  (emp) => emp.performance === performance && emp.potential === potential
                );

                return (
                  <div
                    key={`${performance}-${potential}`}
                    className={cn(
                      'relative h-32 rounded-lg border-2 p-3 flex flex-col',
                      box?.color,
                      'bg-opacity-10 border-opacity-30'
                    )}
                    style={{
                      borderColor: box?.color.replace('bg-', '').replace('-500', ''),
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-700 mb-2">
                      {box?.label}
                    </div>
                    <div className="flex-1 flex flex-wrap gap-1 content-start overflow-hidden">
                      {employeesInBox.map((emp) => (
                        <div
                          key={emp.id}
                          className="group relative"
                          title={`${emp.name} - ${emp.position}`}
                        >
                          <Avatar className="h-7 w-7 border-2 border-white cursor-pointer">
                            <AvatarFallback className="text-xs bg-white">
                              {emp.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 mt-1">
                      {employeesInBox.length} {employeesInBox.length === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Axis Labels */}
          <div className="flex items-center justify-between mt-2 mb-1">
            <div className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              Performance (Current Contribution)
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 flex items-center -ml-20">
            <div
              className="text-sm font-semibold text-gray-600 flex items-center gap-2"
              style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}
            >
              <ChevronRight className="h-4 w-4" style={{ transform: 'rotate(90deg)' }} />
              Potential (Future Growth)
            </div>
          </div>
        </div>
      </Card>

      {/* Top Performers List */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-emerald-600" />
          Top Performers (Star / High Performers)
        </h3>
        <div className="space-y-3">
          {topPerformers.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-emerald-600 text-white">
                    {emp.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                  <p className="text-sm text-gray-600">
                    {emp.position} · {emp.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-4 w-4',
                          star <= Math.round(emp.overallScore)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {emp.overallScore.toFixed(1)} Rating
                  </p>
                </div>
                {getTrendIcon(emp.trend)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Improvement Needed List */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          Improvement Needed
        </h3>
        <div className="space-y-3">
          {improvementNeeded.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-amber-600 text-white">
                    {emp.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                  <p className="text-sm text-gray-600">
                    {emp.position} · {emp.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                  {emp.category}
                </Badge>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-4 w-4',
                          star <= Math.round(emp.overallScore)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {emp.overallScore.toFixed(1)} Rating
                  </p>
                </div>
                {getTrendIcon(emp.trend)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Distribution Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-indigo-600" />
          Category Distribution
        </h3>
        <div className="space-y-3">
          {boxCategories.map((box, idx) => {
            const count = employees.filter((emp) => emp.category === box.label).length;
            const percentage = Math.round((count / employees.length) * 100);
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded', box.color)} />
                    <span className="font-medium text-gray-900">{box.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">
                      {count} {count === 1 ? 'person' : 'people'}
                    </Badge>
                    <span className="font-semibold text-gray-900 w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export function PerformanceReview() {
  const [activeTab, setActiveTab] = useState<'okr' | 'evaluation' | 'matrix'>('okr');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Performance Review & OKR Tracking
              </h1>
              <p className="text-sm text-gray-500">
                Comprehensive performance management and goal tracking
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="okr">
              <Target className="h-4 w-4 mr-2" />
              OKR Tracking
            </TabsTrigger>
            <TabsTrigger value="evaluation">
              <Users className="h-4 w-4 mr-2" />
              360° Evaluation
            </TabsTrigger>
            <TabsTrigger value="matrix">
              <Grid3x3 className="h-4 w-4 mr-2" />
              Performance Matrix
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'okr' && <OKRTracking />}
        {activeTab === 'evaluation' && <Degree360Evaluation />}
        {activeTab === 'matrix' && <PerformanceMatrix />}
      </div>
    </div>
  );
}
