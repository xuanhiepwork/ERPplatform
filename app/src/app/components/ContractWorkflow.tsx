import { useState } from 'react';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Download,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  DollarSign,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type ContractStatus = 'draft' | 'legal-review' | 'finance-approval' | 'e-signature' | 'completed';

interface Contract {
  id: string;
  title: string;
  partner: string;
  type: string;
  value: number;
  status: ContractStatus;
  currentHolder: {
    name: string;
    role: string;
    avatar: string;
    initials: string;
    department: string;
  };
  holdingDuration: string;
  startDate: string;
  expirationDate: string;
  lastUpdated: string;
  timeline: {
    stage: ContractStatus;
    completedAt?: string;
    assignee?: {
      name: string;
      avatar: string;
    };
    duration?: string;
  }[];
}

const contracts: Contract[] = [
  {
    id: 'CNT-2026-001',
    title: 'Master Service Agreement - TechCorp Solutions',
    partner: 'TechCorp Solutions',
    type: 'MSA',
    value: 250000,
    status: 'legal-review',
    currentHolder: {
      name: 'Emily Rodriguez',
      role: 'Senior Legal Counsel',
      avatar: 'https://i.pravatar.cc/150?img=9',
      initials: 'ER',
      department: 'Legal'
    },
    holdingDuration: '2 days',
    startDate: 'Apr 10, 2026',
    expirationDate: 'Apr 10, 2027',
    lastUpdated: '2 hours ago',
    timeline: [
      {
        stage: 'draft',
        completedAt: 'Apr 8, 2026',
        assignee: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
        duration: '3 days'
      },
      {
        stage: 'legal-review',
        assignee: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9' },
        duration: '2 days'
      }
    ]
  },
  {
    id: 'CNT-2026-002',
    title: 'Partnership Agreement - CloudScale Systems',
    partner: 'CloudScale Systems',
    type: 'Partnership',
    value: 420000,
    status: 'finance-approval',
    currentHolder: {
      name: 'Olivia Brown',
      role: 'Finance Manager',
      avatar: 'https://i.pravatar.cc/150?img=24',
      initials: 'OB',
      department: 'Finance'
    },
    holdingDuration: '1 day',
    startDate: 'May 1, 2026',
    expirationDate: 'May 1, 2028',
    lastUpdated: '5 hours ago',
    timeline: [
      {
        stage: 'draft',
        completedAt: 'Apr 1, 2026',
        assignee: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12' },
        duration: '5 days'
      },
      {
        stage: 'legal-review',
        completedAt: 'Apr 7, 2026',
        assignee: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9' },
        duration: '4 days'
      },
      {
        stage: 'finance-approval',
        assignee: { name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=24' },
        duration: '1 day'
      }
    ]
  },
  {
    id: 'CNT-2026-003',
    title: 'NDA - FinanceHub Pro',
    partner: 'FinanceHub Pro',
    type: 'NDA',
    value: 0,
    status: 'e-signature',
    currentHolder: {
      name: 'James Wilson',
      role: 'Sales Director',
      avatar: 'https://i.pravatar.cc/150?img=15',
      initials: 'JW',
      department: 'Sales'
    },
    holdingDuration: '3 hours',
    startDate: 'Apr 12, 2026',
    expirationDate: 'Apr 12, 2027',
    lastUpdated: '1 hour ago',
    timeline: [
      {
        stage: 'draft',
        completedAt: 'Apr 10, 2026',
        assignee: { name: 'David Martinez', avatar: 'https://i.pravatar.cc/150?img=13' },
        duration: '1 day'
      },
      {
        stage: 'legal-review',
        completedAt: 'Apr 11, 2026',
        assignee: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9' },
        duration: '1 day'
      },
      {
        stage: 'finance-approval',
        completedAt: 'Apr 11, 2026',
        assignee: { name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=24' },
        duration: '2 hours'
      },
      {
        stage: 'e-signature',
        assignee: { name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=15' },
        duration: '3 hours'
      }
    ]
  },
  {
    id: 'CNT-2026-004',
    title: 'SLA - Retail Connect',
    partner: 'Retail Connect',
    type: 'SLA',
    value: 180000,
    status: 'draft',
    currentHolder: {
      name: 'Sarah Johnson',
      role: 'BD Manager',
      avatar: 'https://i.pravatar.cc/150?img=5',
      initials: 'SJ',
      department: 'Business Development'
    },
    holdingDuration: '1 day',
    startDate: 'May 15, 2026',
    expirationDate: 'May 15, 2027',
    lastUpdated: '1 day ago',
    timeline: [
      {
        stage: 'draft',
        assignee: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
        duration: '1 day'
      }
    ]
  },
  {
    id: 'CNT-2026-005',
    title: 'Data Processing Agreement - HealthTech Alliance',
    partner: 'HealthTech Alliance',
    type: 'DPA',
    value: 320000,
    status: 'completed',
    currentHolder: {
      name: 'System',
      role: 'Completed',
      avatar: '',
      initials: '✓',
      department: 'N/A'
    },
    holdingDuration: 'N/A',
    startDate: 'Apr 1, 2026',
    expirationDate: 'Apr 1, 2028',
    lastUpdated: '3 days ago',
    timeline: [
      {
        stage: 'draft',
        completedAt: 'Mar 20, 2026',
        assignee: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12' },
        duration: '4 days'
      },
      {
        stage: 'legal-review',
        completedAt: 'Mar 26, 2026',
        assignee: { name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=9' },
        duration: '5 days'
      },
      {
        stage: 'finance-approval',
        completedAt: 'Mar 28, 2026',
        assignee: { name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=24' },
        duration: '2 days'
      },
      {
        stage: 'e-signature',
        completedAt: 'Apr 1, 2026',
        assignee: { name: 'Jessica Wang', avatar: 'https://i.pravatar.cc/150?img=20' },
        duration: '4 days'
      },
      {
        stage: 'completed',
        completedAt: 'Apr 1, 2026'
      }
    ]
  }
];

// Contracts expiring within 30 days
const expiringContracts = [
  {
    id: 'CNT-2025-087',
    title: 'Master Service Agreement - Global Analytics Inc',
    partner: 'Global Analytics Inc',
    expirationDate: 'Apr 25, 2026',
    daysRemaining: 14,
    value: 450000,
    owner: 'Michael Chen'
  },
  {
    id: 'CNT-2025-112',
    title: 'Partnership Agreement - LogiChain Global',
    partner: 'LogiChain Global',
    expirationDate: 'May 8, 2026',
    daysRemaining: 27,
    value: 290000,
    owner: 'Sarah Johnson'
  },
  {
    id: 'CNT-2025-098',
    title: 'SLA - EduPlatform Systems',
    partner: 'EduPlatform Systems',
    expirationDate: 'Apr 30, 2026',
    daysRemaining: 19,
    value: 195000,
    owner: 'Amanda Foster'
  }
];

const statusConfig: Record<ContractStatus, { label: string; color: string; bgColor: string; icon: any }> = {
  'draft': {
    label: 'Draft',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    icon: FileText
  },
  'legal-review': {
    label: 'Legal Review',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    icon: Shield
  },
  'finance-approval': {
    label: 'Finance Approval',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: DollarSign
  },
  'e-signature': {
    label: 'E-Signature',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: FileText
  },
  'completed': {
    label: 'Completed',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: CheckCircle2
  }
};

const workflowStages: ContractStatus[] = ['draft', 'legal-review', 'finance-approval', 'e-signature', 'completed'];

export function ContractWorkflow() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const formatCurrency = (value: number) => {
    if (value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusIndex = (status: ContractStatus) => {
    return workflowStages.indexOf(status);
  };

  const handleViewTimeline = (contract: Contract) => {
    setSelectedContract(contract);
    setShowTimeline(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-2">Contract Approval Workflow</h1>
            <p className="text-muted-foreground">
              Track and manage contract approvals across departments
            </p>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            New Contract
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contracts by title, partner, or ID..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Expiration Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <AlertTriangle className="h-5 w-5" />
            Expiration Alerts
          </CardTitle>
          <p className="text-sm text-orange-700">
            {expiringContracts.length} contracts require renewal within 30 days
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expiringContracts.map((contract) => (
              <div
                key={contract.id}
                className="flex items-center justify-between p-4 bg-white border border-orange-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-sm">{contract.title}</h4>
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      {contract.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {contract.partner}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {contract.owner}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatCurrency(contract.value)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      contract.daysRemaining <= 14 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {contract.daysRemaining} days
                    </div>
                    <div className="text-xs text-muted-foreground">Expires {contract.expirationDate}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Renew
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Contracts</CardTitle>
          <p className="text-sm text-muted-foreground">
            {contracts.length} contracts in workflow
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current Holder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Holding Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {contracts.map((contract) => {
                  const StatusIcon = statusConfig[contract.status].icon;
                  return (
                    <tr key={contract.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm">{contract.title}</h4>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-mono">{contract.id}</span>
                            <span>•</span>
                            <span>{contract.type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig[contract.status].bgColor} ${statusConfig[contract.status].color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[contract.status].label}
                          </span>
                          {/* Progress Indicator */}
                          <div className="flex items-center gap-1">
                            {workflowStages.map((stage, index) => {
                              const currentIndex = getStatusIndex(contract.status);
                              const isCompleted = index < currentIndex;
                              const isCurrent = index === currentIndex;
                              const isPending = index > currentIndex;

                              return (
                                <div
                                  key={stage}
                                  className={`h-1 flex-1 rounded-full ${
                                    isCompleted ? 'bg-green-500' :
                                    isCurrent ? statusConfig[stage].bgColor.replace('100', '500') :
                                    'bg-gray-200'
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {contract.status !== 'completed' ? (
                            <>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contract.currentHolder.avatar} />
                                <AvatarFallback className="text-xs">
                                  {contract.currentHolder.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm">{contract.currentHolder.name}</div>
                                <div className="text-xs text-muted-foreground">{contract.currentHolder.role}</div>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle2 className="h-5 w-5" />
                              <span className="text-sm">Completed</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {contract.status !== 'completed' ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {contract.holdingDuration}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{formatCurrency(contract.value)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{contract.lastUpdated}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewTimeline(contract)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Timeline View Modal */}
      {showTimeline && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedContract.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contract Timeline - {selectedContract.id}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTimeline(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {selectedContract.timeline.map((stage, index) => {
                  const StageIcon = statusConfig[stage.stage].icon;
                  const isCompleted = !!stage.completedAt;
                  const isCurrent = !isCompleted && index === selectedContract.timeline.length - 1;

                  return (
                    <div key={index} className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0">
                      {/* Timeline Dot */}
                      <div className={`absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' :
                        isCurrent ? statusConfig[stage.stage].bgColor :
                        'bg-gray-200'
                      }`}>
                        <StageIcon className={`h-4 w-4 ${
                          isCompleted ? 'text-white' :
                          isCurrent ? statusConfig[stage.stage].color :
                          'text-gray-400'
                        }`} />
                      </div>

                      {/* Stage Content */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm mb-1">{statusConfig[stage.stage].label}</h4>
                            {stage.assignee && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={stage.assignee.avatar} />
                                </Avatar>
                                <span>{stage.assignee.name}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            {stage.completedAt && (
                              <div className="text-xs text-green-600 mb-1">
                                ✓ Completed
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {stage.completedAt || `In progress: ${stage.duration}`}
                            </div>
                          </div>
                        </div>
                        {stage.duration && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Duration: {stage.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
