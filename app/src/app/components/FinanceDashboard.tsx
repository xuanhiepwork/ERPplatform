import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function FinanceDashboard() {
  const pendingApprovals = [
    { id: 'INV-2401', vendor: 'Tech Solutions Inc.', amount: 45000, type: 'Invoice', due: 'May 1', priority: 'high' },
    { id: 'EXP-1829', vendor: 'Marketing Agency', amount: 12500, type: 'Expense', due: 'May 3', priority: 'medium' },
    { id: 'INV-2402', vendor: 'Cloud Services Ltd.', amount: 8900, type: 'Invoice', due: 'May 5', priority: 'low' },
  ];

  const cashflowData = [
    { month: 'Oct', revenue: 420000, expense: 380000 },
    { month: 'Nov', revenue: 450000, expense: 390000 },
    { month: 'Dec', revenue: 480000, expense: 420000 },
    { month: 'Jan', revenue: 510000, expense: 440000 },
    { month: 'Feb', revenue: 490000, expense: 430000 },
    { month: 'Mar', revenue: 530000, expense: 450000 },
  ];

  const maxValue = Math.max(...cashflowData.flatMap(d => [d.revenue, d.expense]));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance & Accounting</h1>
          <p className="text-gray-600">Real-time financial overview and pending approvals</p>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Cash Balance</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$2.4M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% vs last month
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Revenue (MTD)</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$530K</div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% vs target
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Expenses (MTD)</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">$450K</div>
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <TrendingDown className="h-3 w-3" />
              -5% vs last month
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Pending Approvals</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-600 mt-1">Total: $245K</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Revenue vs Expense Chart */}
          <div className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Cashflow Trend (6 Months)</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded" />
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-red-500 rounded" />
                  <span className="text-gray-600">Expense</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {cashflowData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                    <div className="flex-1 flex gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-6 bg-green-500 rounded-full"
                              style={{ width: `${(data.revenue / maxValue) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                            ${(data.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-6 bg-red-500 rounded-full"
                              style={{ width: `${(data.expense / maxValue) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                            ${(data.expense / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Net Profit (Mar)</div>
                  <div className="text-2xl font-bold text-green-600">$80K</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Profit Margin</div>
                  <div className="text-2xl font-bold text-gray-900">15.1%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">YoY Growth</div>
                  <div className="text-2xl font-bold text-blue-600">+18.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Deadlines & Quick Actions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-6 text-white">
              <DollarSign className="h-8 w-8 mb-3" />
              <div className="text-2xl font-bold mb-2">$2.4M</div>
              <div className="text-sm opacity-90 mb-4">Available Cash</div>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Details
              </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Tax Deadlines</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <div className="font-medium text-gray-900">Q1 VAT Return</div>
                    <div className="text-xs text-gray-500">May 15, 2026</div>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    19 days
                  </Badge>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <div className="font-medium text-gray-900">Corporate Tax</div>
                    <div className="text-xs text-gray-500">June 30, 2026</div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    65 days
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Annual Report</div>
                    <div className="text-xs text-gray-500">Dec 31, 2026</div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    249 days
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals Table */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Vendor/Payee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">{item.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{item.vendor}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ${item.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{item.due}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        )}
                      >
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
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
