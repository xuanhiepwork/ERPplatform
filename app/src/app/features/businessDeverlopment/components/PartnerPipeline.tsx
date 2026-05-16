import { useState } from 'react';
import {
  Building2,
  DollarSign,
  Clock,
  ChevronRight,
  X,
  Mail,
  FileText,
  Calendar,
  User,
  Phone,
  Paperclip,
  MessageSquare,
  Globe,
  MapPin,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { bdApi } from '../../../../services/bdService';

type PipelineStage = 'outreach' | 'pitching' | 'negotiation' | 'legal' | 'onboarding';

interface Partner {
  id: string;
  companyName: string;
  logo?: string;
  dealValue: number;
  stage: PipelineStage;
  leadOwner: {
    name: string;
    avatar: string;
    initials: string;
  };
  lastActivity: string;
  industry: string;
  location: string;
  website: string;
  partnerType: string;
}

interface Activity {
  id: string;
  type: 'meeting' | 'email' | 'note' | 'document' | 'call';
  title: string;
  description: string;
  timestamp: string;
  author: {
    name: string;
    avatar: string;
  };
  attachments?: string[];
}

const pipelineStages = [
  { id: 'outreach', label: 'Outreach', color: 'bg-gray-100 border-gray-300' },
  { id: 'pitching', label: 'Pitching', color: 'bg-blue-50 border-blue-300' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-yellow-50 border-yellow-300' },
  { id: 'legal', label: 'Legal/Contracting', color: 'bg-orange-50 border-orange-300' },
  { id: 'onboarding', label: 'Onboarding', color: 'bg-green-50 border-green-300' }
];

// partners will be fetched within the component using react-query

const activityHistory: Record<string, Activity[]> = {
  'p5': [
    {
      id: 'a1',
      type: 'meeting',
      title: 'Executive Alignment Call',
      description: 'Met with CFO and CTO to discuss partnership terms, integration timeline, and mutual success metrics. Both parties aligned on Q3 launch target. Action items: Legal to draft MSA, Tech teams to schedule integration kickoff.',
      timestamp: '1 hour ago',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    },
    {
      id: 'a2',
      type: 'document',
      title: 'Partnership Proposal v3 Shared',
      description: 'Updated proposal with revised revenue share model (70/30 split) and extended contract terms to 3 years. Includes SLA commitments and performance guarantees.',
      timestamp: '2 days ago',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      attachments: ['Partnership_Proposal_v3.pdf', 'Revenue_Model.xlsx']
    },
    {
      id: 'a3',
      type: 'email',
      title: 'Response to Pricing Questions',
      description: 'Addressed concerns about implementation costs. Clarified that integration support is included in Year 1 at no additional charge. Confirmed annual support contract pricing.',
      timestamp: '4 days ago',
      author: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12'
      }
    },
    {
      id: 'a4',
      type: 'call',
      title: 'Technical Discovery Call',
      description: 'Deep dive on API architecture, data security requirements, and compliance needs. Their team confirmed our platform meets all SOC2 and GDPR requirements. Next step: Technical proof of concept.',
      timestamp: '1 week ago',
      author: {
        name: 'Christopher Lee',
        avatar: 'https://i.pravatar.cc/150?img=52'
      }
    },
    {
      id: 'a5',
      type: 'meeting',
      title: 'Initial Partnership Discussion',
      description: 'Introductory meeting to explore partnership opportunities. Discussed mutual value proposition and identified 3 key integration points. Both parties enthusiastic about potential collaboration.',
      timestamp: '3 weeks ago',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    }
  ]
};

export function PartnerPipeline() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const { data: partnersRaw = [] } = useQuery({ queryKey: ['bd-partners'], queryFn: bdApi.getPartners, staleTime: 1000 * 60 * 5 });

  // Map backend partner shape to UI Partner type
  const partners: Partner[] = (partnersRaw || []).map((p: any) => {
    const contact = p.contact_person || p.contactPerson || 'Unknown';
    const initials = contact.split(' ').map((s: string) => s[0]).join('').slice(0, 2).toUpperCase();
    return {
      id: String(p.id || p.partner_id || p.partnerId || Math.random()),
      companyName: p.name || p.companyName || 'Unknown',
      dealValue: Number(p.deal_value || p.dealValue || 0),
      stage: (p.stage || 'outreach') as PipelineStage,
      leadOwner: {
        name: contact,
        avatar: p.contact_avatar || `https://i.pravatar.cc/150?img=${p.id % 70}`,
        initials
      },
      lastActivity: p.updated_at || p.last_activity || 'N/A',
      industry: p.industry || 'General',
      location: p.location || '',
      website: p.website || p.domain || '',
      partnerType: p.type || 'Partner'
    };
  });

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowPanel(true);
  };

  const getPartnersByStage = (stage: PipelineStage) => {
    return partners.filter(p => p.stage === stage);
  };

  const getTotalDealValue = (stage: PipelineStage) => {
    return getPartnersByStage(stage).reduce((sum, p) => sum + p.dealValue, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'note':
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Partner Pipeline</h1>
            <p className="text-muted-foreground">
              Manage B2B partnerships through deal stages
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          {pipelineStages.map((stage) => {
            const count = getPartnersByStage(stage.id as PipelineStage).length;
            const totalValue = getTotalDealValue(stage.id as PipelineStage);
            return (
              <Card key={stage.id}>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{stage.label}</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl">{count}</div>
                    <div className="text-sm text-muted-foreground">
                      {count === 1 ? 'deal' : 'deals'}
                    </div>
                  </div>
                  <div className="text-sm text-primary mt-1">{formatCurrency(totalValue)}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Pipeline Stages */}
        <div className={`flex-1 flex gap-4 overflow-x-auto pb-4 ${showPanel ? 'mr-0' : ''}`}>
          {pipelineStages.map((stage) => {
            const stagePartners = getPartnersByStage(stage.id as PipelineStage);
            return (
              <div key={stage.id} className="flex-shrink-0 w-72 flex flex-col">
                {/* Stage Header */}
                <div className="mb-3">
                  <h3 className="mb-1">{stage.label}</h3>
                  <div className="text-sm text-muted-foreground">
                    {stagePartners.length} {stagePartners.length === 1 ? 'partner' : 'partners'}
                  </div>
                </div>

                {/* Partner Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {stagePartners.map((partner) => (
                    <Card
                      key={partner.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${selectedPartner?.id === partner.id ? 'ring-2 ring-primary' : ''
                        }`}
                      onClick={() => handlePartnerClick(partner)}
                    >
                      <CardContent className="p-4">
                        {/* Company Name */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                              {partner.companyName.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm truncate">{partner.companyName}</h4>
                              <div className="text-xs text-muted-foreground">{partner.industry}</div>
                            </div>
                          </div>
                        </div>

                        {/* Deal Value */}
                        <div className="flex items-center gap-2 mb-3 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{formatCurrency(partner.dealValue)}</span>
                        </div>

                        {/* Partner Type */}
                        <div className="mb-3">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {partner.partnerType}
                          </span>
                        </div>

                        {/* Lead Owner & Last Activity */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={partner.leadOwner.avatar} />
                              <AvatarFallback className="text-xs">
                                {partner.leadOwner.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {partner.leadOwner.name.split(' ')[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {partner.lastActivity}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {stagePartners.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No partners in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Relationship Profile Side Panel */}
        {showPanel && selectedPartner && (
          <div className="w-96 flex-shrink-0 border-l border-border bg-card">
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                      {selectedPartner.companyName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg mb-1">{selectedPartner.companyName}</h2>
                      <div className="text-sm text-muted-foreground">
                        {selectedPartner.industry}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Key Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deal Value:</span>
                    <span className="font-medium">{formatCurrency(selectedPartner.dealValue)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span>{selectedPartner.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Website:</span>
                    <a href={`https://${selectedPartner.website}`} className="text-primary hover:underline">
                      {selectedPartner.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Lead Owner:</span>
                    <span>{selectedPartner.leadOwner.name}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="flex-1 overflow-y-auto p-6">
                <h3 className="mb-4">Relationship History</h3>

                <div className="space-y-6">
                  {(activityHistory[selectedPartner.id] || []).map((activity) => (
                    <div key={activity.id} className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-card border-2 border-border rounded-full flex items-center justify-center">
                        <div className="text-primary">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>

                      {/* Activity Content */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm mb-1">{activity.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={activity.author.avatar} />
                              </Avatar>
                              <span>{activity.author.name}</span>
                              <span>•</span>
                              <span>{activity.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {activity.description}
                        </p>

                        {/* Attachments */}
                        {activity.attachments && activity.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {activity.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-secondary rounded text-xs hover:bg-secondary/80 cursor-pointer"
                              >
                                <Paperclip className="h-3 w-3 text-muted-foreground" />
                                <span className="flex-1 truncate">{attachment}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {(!activityHistory[selectedPartner.id] || activityHistory[selectedPartner.id].length === 0) && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No activity history available
                    </div>
                  )}
                </div>
              </div>

              {/* Add Activity */}
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Add Activity
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
