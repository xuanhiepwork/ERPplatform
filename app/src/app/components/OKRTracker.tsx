import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Calendar,
  Users,
} from 'lucide-react';
import { cn } from './ui/utils';

type Status = 'On Track' | 'At Risk' | 'Behind';

interface KeyResult {
  id: string;
  description: string;
  progress: number;
  target: string;
  current: string;
  status: Status;
  lastUpdated: string;
}

interface Objective {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  status: Status;
  keyResults: KeyResult[];
  owner: string;
  dueDate: string;
}

interface KPI {
  id: string;
  name: string;
  category: string;
  actual: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  status: Status;
  icon: React.ReactNode;
}

export function OKRTracker() {
  const [selectedQuarter] = useState('Q2 2026');

  // Mock OKRs data
  const objectives: Objective[] = [
    {
      id: 'OBJ-1',
      title: 'Improve Customer Satisfaction and Retention',
      description: 'Enhance overall customer experience and reduce churn rate',
      category: 'Customer Success',
      progress: 72,
      status: 'On Track',
      owner: 'Jane Anderson',
      dueDate: '2026-06-30',
      keyResults: [
        {
          id: 'KR-1-1',
          description: 'Increase NPS score from 45 to 65',
          progress: 75,
          target: '65',
          current: '60',
          status: 'On Track',
          lastUpdated: '2026-04-08',
        },
        {
          id: 'KR-1-2',
          description: 'Reduce customer churn rate to below 5%',
          progress: 80,
          target: '5%',
          current: '6%',
          status: 'On Track',
          lastUpdated: '2026-04-09',
        },
        {
          id: 'KR-1-3',
          description: 'Achieve 90% customer support satisfaction rate',
          progress: 65,
          target: '90%',
          current: '83%',
          status: 'At Risk',
          lastUpdated: '2026-04-07',
        },
      ],
    },
    {
      id: 'OBJ-2',
      title: 'Drive Product Innovation and Market Leadership',
      description: 'Launch new features and increase market share',
      category: 'Product',
      progress: 58,
      status: 'At Risk',
      owner: 'Jane Anderson',
      dueDate: '2026-06-30',
      keyResults: [
        {
          id: 'KR-2-1',
          description: 'Launch 3 major product features',
          progress: 66,
          target: '3',
          current: '2',
          status: 'On Track',
          lastUpdated: '2026-04-09',
        },
        {
          id: 'KR-2-2',
          description: 'Increase active user base by 25%',
          progress: 48,
          target: '125,000',
          current: '112,000',
          status: 'At Risk',
          lastUpdated: '2026-04-08',
        },
        {
          id: 'KR-2-3',
          description: 'Achieve 95% feature adoption rate among power users',
          progress: 60,
          target: '95%',
          current: '87%',
          status: 'At Risk',
          lastUpdated: '2026-04-06',
        },
      ],
    },
    {
      id: 'OBJ-3',
      title: 'Strengthen Team Performance and Culture',
      description: 'Build high-performing teams and improve employee engagement',
      category: 'People & Culture',
      progress: 45,
      status: 'Behind',
      owner: 'Jane Anderson',
      dueDate: '2026-06-30',
      keyResults: [
        {
          id: 'KR-3-1',
          description: 'Increase employee engagement score to 85',
          progress: 50,
          target: '85',
          current: '78',
          status: 'Behind',
          lastUpdated: '2026-04-05',
        },
        {
          id: 'KR-3-2',
          description: 'Complete leadership training for 100% of managers',
          progress: 70,
          target: '100%',
          current: '70%',
          status: 'On Track',
          lastUpdated: '2026-04-09',
        },
        {
          id: 'KR-3-3',
          description: 'Reduce employee turnover to below 8%',
          progress: 15,
          target: '8%',
          current: '12%',
          status: 'Behind',
          lastUpdated: '2026-04-08',
        },
      ],
    },
  ];

  // Mock KPIs data
  const kpis: KPI[] = [
    {
      id: 'KPI-1',
      name: 'Revenue Growth',
      category: 'Financial',
      actual: 1850000,
      target: 2000000,
      unit: '$',
      trend: 'up',
      status: 'On Track',
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: 'KPI-2',
      name: 'Customer Acquisition',
      category: 'Sales',
      actual: 287,
      target: 350,
      unit: 'customers',
      trend: 'up',
      status: 'At Risk',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 'KPI-3',
      name: 'Project Completion Rate',
      category: 'Operations',
      actual: 92,
      target: 95,
      unit: '%',
      trend: 'neutral',
      status: 'On Track',
      icon: <Target className="h-5 w-5" />,
    },
    {
      id: 'KPI-4',
      name: 'Team Productivity',
      category: 'Performance',
      actual: 78,
      target: 90,
      unit: '%',
      trend: 'down',
      status: 'Behind',
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ];

  const getStatusConfig = (status: Status) => {
    const configs = {
      'On Track': {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        progressColor: 'bg-green-500',
      },
      'At Risk': {
        color: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
        progressColor: 'bg-orange-500',
      },
      'Behind': {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: <Clock className="h-3.5 w-3.5" />,
        progressColor: 'bg-red-500',
      },
    };
    return configs[status];
  };

  const formatNumber = (num: number, unit: string) => {
    if (unit === '$') {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    if (unit === '%') {
      return `${num}%`;
    }
    return num.toLocaleString();
  };

  const calculatePercentage = (actual: number, target: number) => {
    return Math.round((actual / target) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">OKRs & KPIs Dashboard</h1>
          <p className="text-muted-foreground">
            Track your objectives, key results, and performance indicators for {selectedQuarter}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1">
            {selectedQuarter}
          </Badge>
          <Button variant="outline">Update Progress</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total OKRs</span>
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="mb-1">{objectives.length}</h3>
            <p className="text-xs text-muted-foreground">Active objectives</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">On Track</span>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="mb-1 text-green-600">
              {objectives.filter(o => o.status === 'On Track').length}
            </h3>
            <p className="text-xs text-muted-foreground">
              {Math.round((objectives.filter(o => o.status === 'On Track').length / objectives.length) * 100)}% of objectives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">At Risk</span>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <h3 className="mb-1 text-orange-600">
              {objectives.filter(o => o.status === 'At Risk').length}
            </h3>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Average Progress</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="mb-1">
              {Math.round(objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length)}%
            </h3>
            <p className="text-xs text-muted-foreground">Across all OKRs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OKRs Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Objectives & Key Results</CardTitle>
              <CardDescription>Your quarterly goals and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="OBJ-1">
                {objectives.map((objective) => {
                  const statusConfig = getStatusConfig(objective.status);
                  return (
                    <AccordionItem key={objective.id} value={objective.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-start gap-3 flex-1 text-left">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4>{objective.title}</h4>
                              <Badge variant="outline" className={cn('gap-1.5', statusConfig.color)}>
                                {statusConfig.icon}
                                {objective.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {objective.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {objective.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Due: {new Date(objective.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Overall Progress</span>
                                <span className="font-semibold">{objective.progress}%</span>
                              </div>
                              <Progress value={objective.progress} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {objective.keyResults.map((kr) => {
                            const krStatusConfig = getStatusConfig(kr.status);
                            return (
                              <div
                                key={kr.id}
                                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                      <span className="font-medium text-sm">{kr.description}</span>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className={cn('gap-1.5', krStatusConfig.color)}>
                                    {krStatusConfig.icon}
                                    {kr.status}
                                  </Badge>
                                </div>

                                <div className="ml-6 space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex gap-4">
                                      <span className="text-muted-foreground">
                                        Current: <strong className="text-foreground">{kr.current}</strong>
                                      </span>
                                      <span className="text-muted-foreground">
                                        Target: <strong className="text-foreground">{kr.target}</strong>
                                      </span>
                                    </div>
                                    <span className="font-semibold">{kr.progress}%</span>
                                  </div>
                                  <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className={cn('h-2 rounded-full transition-all', krStatusConfig.progressColor)}
                                        style={{ width: `${kr.progress}%` }}
                                      />
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Last updated: {new Date(kr.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal KPIs</CardTitle>
              <CardDescription>Q2 2026 Performance Targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {kpis.map((kpi) => {
                const percentage = calculatePercentage(kpi.actual, kpi.target);
                const statusConfig = getStatusConfig(kpi.status);

                return (
                  <div key={kpi.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {kpi.icon}
                        </div>
                        <div>
                          <h4 className="text-sm">{kpi.name}</h4>
                          <p className="text-xs text-muted-foreground">{kpi.category}</p>
                        </div>
                      </div>
                      {kpi.trend === 'up' && (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      )}
                      {kpi.trend === 'down' && (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Actual</p>
                          <p className="text-xl font-semibold">
                            {formatNumber(kpi.actual, kpi.unit)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Target</p>
                          <p className="text-xl font-semibold text-muted-foreground">
                            {formatNumber(kpi.target, kpi.unit)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn('h-2 rounded-full transition-all', statusConfig.progressColor)}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>

                      <Badge variant="outline" className={cn('w-full justify-center gap-1.5', statusConfig.color)}>
                        {statusConfig.icon}
                        {kpi.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Target className="h-4 w-4" />
                Add New OKR
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp className="h-4 w-4" />
                Update KPI
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
