import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ChevronDown, ChevronRight, Shield, Sliders } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export function StrategicFinance() {
  const [expandedPL, setExpandedPL] = useState(false);
  const [marketingSpend, setMarketingSpend] = useState(0);
  const [salesRevenue, setSalesRevenue] = useState(0);

  const plSummary = {
    revenue: 12400000,
    cogs: 4960000,
    grossProfit: 7440000,
    operating: 5580000,
    netProfit: 1860000,
  };

  const plDetails = [
    { category: 'Revenue', items: [
      { name: 'Enterprise Sales', amount: 8200000 },
      { name: 'SMB Sales', amount: 3100000 },
      { name: 'Professional Services', amount: 1100000 },
    ]},
    { category: 'Cost of Goods Sold', items: [
      { name: 'Cloud Infrastructure', amount: 2800000 },
      { name: 'Support & Maintenance', amount: 1400000 },
      { name: 'Third-party Licenses', amount: 760000 },
    ]},
    { category: 'Operating Expenses', items: [
      { name: 'Salaries & Benefits', amount: 3800000 },
      { name: 'Marketing & Sales', amount: 1200000 },
      { name: 'R&D', amount: 450000 },
      { name: 'General & Admin', amount: 130000 },
    ]},
  ];

  const cashflowForecast = [
    { month: 'Apr', cashflow: 2400, cumulative: 2400 },
    { month: 'May', cashflow: 2600, cumulative: 5000 },
    { month: 'Jun', cashflow: 2800, cumulative: 7800 },
    { month: 'Jul', cashflow: 3100, cumulative: 10900 },
    { month: 'Aug', cashflow: 3300, cumulative: 14200 },
    { month: 'Sep', cashflow: 3500, cumulative: 17700 },
  ];

  const maxCashflow = Math.max(...cashflowForecast.map(d => d.cashflow));

  const majorExpenses = [
    { id: 'EXP-5421', vendor: 'AWS Cloud Services', amount: 125000, category: 'Infrastructure', due: 'May 1, 2026', priority: 'high' },
    { id: 'EXP-5422', vendor: 'Marketing Agency - Q2 Campaign', amount: 250000, category: 'Marketing', due: 'May 5, 2026', priority: 'medium' },
    { id: 'EXP-5423', vendor: 'Executive Search Firm', amount: 75000, category: 'HR', due: 'May 10, 2026', priority: 'low' },
  ];

  // Calculate what-if impact
  const adjustedRevenue = plSummary.revenue * (1 + salesRevenue / 100);
  const adjustedMarketing = plSummary.operating + (plSummary.revenue * marketingSpend / 100);
  const adjustedProfit = adjustedRevenue - plSummary.cogs - adjustedMarketing;

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Strategic Finance & Forecasting</h1>
          <p className="text-slate-400 text-lg">Financial health, projections, and scenario planning</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Section A: P&L Summary */}
          <div className="col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Profit & Loss Statement</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedPL(!expandedPL)}
                  className="text-amber-400 hover:text-amber-300 hover:bg-slate-800"
                >
                  {expandedPL ? 'Collapse' : 'Expand'}
                  <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', expandedPL && 'rotate-180')} />
                </Button>
              </div>

              {/* Summary View */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <span className="font-semibold text-slate-200">Total Revenue</span>
                  <span className="text-2xl font-bold text-green-400">
                    ${(plSummary.revenue / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <span className="font-semibold text-slate-200">Cost of Goods Sold</span>
                  <span className="text-2xl font-bold text-red-400">
                    -${(plSummary.cogs / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                  <span className="font-semibold text-amber-400">Gross Profit</span>
                  <span className="text-2xl font-bold text-amber-400">
                    ${(plSummary.grossProfit / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <span className="font-semibold text-slate-200">Operating Expenses</span>
                  <span className="text-2xl font-bold text-red-400">
                    -${(plSummary.operating / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div>
                    <span className="font-bold text-green-400 text-lg">Net Profit</span>
                    <div className="text-xs text-slate-400 mt-1">Margin: {((plSummary.netProfit / plSummary.revenue) * 100).toFixed(1)}%</div>
                  </div>
                  <span className="text-3xl font-bold text-green-400">
                    ${(plSummary.netProfit / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedPL && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                  {plDetails.map((section, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-slate-300 mb-3">{section.category}</h3>
                      <div className="space-y-2 ml-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">{item.name}</span>
                            <span className="font-semibold text-slate-200">
                              ${(item.amount / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section B: 6-month Cashflow Forecast */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">6-Month Cashflow Projection</h2>

              <div className="space-y-4">
                {cashflowForecast.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-300 w-16">{data.month}</span>
                      <div className="flex-1 flex items-center gap-4">
                        <div className="flex-1 bg-slate-800 rounded-full h-10 relative overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-4"
                            style={{ width: `${(data.cashflow / maxCashflow) * 100}%` }}
                          >
                            <span className="text-xs font-bold text-white">${data.cashflow}K</span>
                          </div>
                        </div>
                        <div className="w-32 text-right">
                          <div className="text-xs text-slate-400">Cumulative</div>
                          <div className="text-sm font-bold text-blue-400">${data.cumulative}K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Total Projected</div>
                  <div className="text-2xl font-bold text-blue-400">$17.7M</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Monthly Avg</div>
                  <div className="text-2xl font-bold text-slate-200">$2.95M</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Growth Rate</div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <div className="text-2xl font-bold text-green-400">+8.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: What-if Simulation */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-amber-500/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                  <Sliders className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100">What-If Simulation</h3>
                  <p className="text-xs text-slate-400">Scenario planning</p>
                </div>
              </div>

              {/* Marketing Spend Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-300">Marketing Spend</label>
                  <span className={cn(
                    'text-lg font-bold',
                    marketingSpend > 0 ? 'text-red-400' : marketingSpend < 0 ? 'text-green-400' : 'text-slate-400'
                  )}>
                    {marketingSpend > 0 ? '+' : ''}{marketingSpend}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={marketingSpend}
                  onChange={(e) => setMarketingSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>-20%</span>
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>

              {/* Sales Revenue Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-300">Sales Revenue</label>
                  <span className={cn(
                    'text-lg font-bold',
                    salesRevenue > 0 ? 'text-green-400' : salesRevenue < 0 ? 'text-red-400' : 'text-slate-400'
                  )}>
                    {salesRevenue > 0 ? '+' : ''}{salesRevenue}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={salesRevenue}
                  onChange={(e) => setSalesRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>-20%</span>
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>

              {/* Impact Results */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Adjusted Revenue</span>
                  <span className="font-bold text-slate-200">
                    ${(adjustedRevenue / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Adjusted OpEx</span>
                  <span className="font-bold text-slate-200">
                    ${(adjustedMarketing / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Net Profit Impact</span>
                  <span className={cn(
                    'text-2xl font-bold',
                    adjustedProfit > plSummary.netProfit ? 'text-green-400' :
                    adjustedProfit < plSummary.netProfit ? 'text-red-400' : 'text-slate-400'
                  )}>
                    ${(adjustedProfit / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="text-xs text-center text-slate-500">
                  {((adjustedProfit - plSummary.netProfit) / plSummary.netProfit * 100).toFixed(1)}% change from baseline
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => {
                setMarketingSpend(0);
                setSalesRevenue(0);
              }}
            >
              Reset Simulation
            </Button>
          </div>
        </div>

        {/* Major Expense Approvals */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Major Expense Approval (>$10K)</h2>
            <Badge variant="outline" className="text-amber-400 border-amber-500/30">
              {majorExpenses.length} Pending
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Vendor/Purpose</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {majorExpenses.map((expense, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-900/50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-slate-400">{expense.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-200">{expense.vendor}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-slate-300 border-slate-700">
                        {expense.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-amber-400">
                        ${expense.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-400">{expense.due}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          expense.priority === 'high' ? 'text-red-400 border-red-500/30' :
                          expense.priority === 'medium' ? 'text-amber-400 border-amber-500/30' :
                          'text-slate-400 border-slate-700'
                        )}
                      >
                        {expense.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Shield className="h-4 w-4 mr-1" />
                          Sign
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
                          Details
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
