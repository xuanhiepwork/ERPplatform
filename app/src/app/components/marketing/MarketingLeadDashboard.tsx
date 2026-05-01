import { TrendingUp, Eye, MousePointer, DollarSign, Sparkles, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function MarketingLeadDashboard() {
  const campaigns = [
    { name: 'Spring Product Launch', status: 'active', ctr: 4.2, cpc: 1.85, conversions: 342, budget: 85 },
    { name: 'Brand Awareness Q2', status: 'active', ctr: 3.8, cpc: 2.10, conversions: 128, budget: 65 },
    { name: 'Retargeting Campaign', status: 'paused', ctr: 5.1, cpc: 1.45, conversions: 89, budget: 45 },
  ];

  const creativePipeline = [
    { stage: 'To-Do', count: 24, color: 'bg-gray-500' },
    { stage: 'In Progress', count: 18, color: 'bg-blue-500' },
    { stage: 'Review', count: 12, color: 'bg-yellow-500' },
    { stage: 'Done', count: 48, color: 'bg-green-500' },
  ];

  const contentRequests = [
    { id: 'CR-124', type: 'Social Media Post', requester: 'Sales Team', priority: 'high', due: 'Apr 28' },
    { id: 'CR-125', type: 'Email Campaign', requester: 'Product Marketing', priority: 'medium', due: 'May 2' },
    { id: 'CR-126', type: 'Landing Page', requester: 'Growth Team', priority: 'high', due: 'Apr 30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Command Center</h1>
          <p className="text-gray-600">Campaign performance, creative pipeline, and content management</p>
        </div>

        {/* Marketing KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Impressions</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">2.4M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +24% vs last week
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MousePointer className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">CTR</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">4.2%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.8% improvement
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Conversion Rate</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">18.5%</div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
              Above industry avg
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">ROI</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">342%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18% vs target
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Active Campaigns */}
          <div className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Campaign Performance</h2>
              <Button variant="outline" size="sm">View All Campaigns</Button>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                      <Badge
                        variant={campaign.status === 'active' ? 'default' : 'secondary'}
                        className={cn(
                          campaign.status === 'active' ?
                          'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        )}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">CTR</div>
                      <div className="text-lg font-bold text-gray-900">{campaign.ctr}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">CPC</div>
                      <div className="text-lg font-bold text-gray-900">${campaign.cpc}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Conversions</div>
                      <div className="text-lg font-bold text-gray-900">{campaign.conversions}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Budget Used</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              'h-2 rounded-full',
                              campaign.budget > 80 ? 'bg-red-500' : 'bg-green-500'
                            )}
                            style={{ width: `${campaign.budget}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">{campaign.budget}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Lead Cost</div>
                <div className="text-2xl font-bold text-gray-900">$12.50</div>
                <div className="text-xs text-green-600">-8% vs last month</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Leads</div>
                <div className="text-2xl font-bold text-gray-900">2,842</div>
                <div className="text-xs text-blue-600">This month</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">MQL Rate</div>
                <div className="text-2xl font-bold text-gray-900">62%</div>
                <div className="text-xs text-green-600">+5% improvement</div>
              </div>
            </div>
          </div>

          {/* Creative Pipeline */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-lg p-6 text-white">
              <Sparkles className="h-8 w-8 mb-3" />
              <div className="text-2xl font-bold mb-2">342%</div>
              <div className="text-sm opacity-90 mb-4">Marketing ROI</div>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Analytics
              </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Creative Production Pipeline</h3>
              <div className="space-y-3">
                {creativePipeline.map((stage, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', stage.color)} />
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{stage.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={cn('h-2 rounded-full', stage.color)}
                        style={{ width: `${(stage.count / 102) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Request Inbox */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Creative Request Inbox</h2>
            <Button variant="outline" size="sm">View All Requests</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Requester</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {contentRequests.map((request, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">{request.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{request.type}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{request.requester}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{request.due}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          request.priority === 'high' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {request.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {request.priority === 'high' ? (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-blue-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">In Queue</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-orange-50">
            <Sparkles className="h-5 w-5 text-orange-600" />
            <span className="font-semibold">AI Content Hub</span>
          </Button>
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-purple-50">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">Content Calendar</span>
          </Button>
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-blue-50">
            <Eye className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Asset Library</span>
          </Button>
          <Button variant="outline" className="h-16 flex items-center justify-center gap-2 hover:bg-green-50">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-semibold">Analytics Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
