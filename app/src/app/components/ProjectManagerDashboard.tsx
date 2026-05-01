import { Target, AlertTriangle, TrendingUp, Users, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function ProjectManagerDashboard() {
  const projects = [
    { name: 'ERP System Migration', health: 'on-track', budget: 85, blocked: 2, deadline: 'May 30', team: 12 },
    { name: 'Mobile App Redesign', health: 'at-risk', budget: 120, blocked: 5, deadline: 'June 15', team: 8 },
    { name: 'Cloud Infrastructure', health: 'on-track', budget: 65, blocked: 0, deadline: 'July 10', team: 6 },
    { name: 'Customer Portal v2', health: 'at-risk', budget: 145, blocked: 3, deadline: 'May 20', team: 10 },
  ];

  const resourceAllocation = [
    { name: 'Development Team', allocated: 85, capacity: 100 },
    { name: 'Design Team', allocated: 95, capacity: 100 },
    { name: 'QA Team', allocated: 70, capacity: 100 },
    { name: 'DevOps Team', allocated: 60, capacity: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Portfolio</h1>
          <p className="text-gray-600">High-level project health and resource metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">On Track</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-xs text-green-600 mt-1">+2 from last week</div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">At Risk</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">6</div>
            <div className="text-xs text-red-600 mt-1">Requires attention</div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Blocked Tasks</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">18</div>
            <div className="text-xs text-orange-600 mt-1">Across 4 projects</div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">Budget Burn</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">68%</div>
            <div className="text-xs text-blue-600 mt-1">Average across portfolio</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Project Health Dashboard */}
          <div className="md:col-span-2 bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Project Health Dashboard</h2>
              <Button variant="outline" size="sm">View All Projects</Button>
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due {project.deadline}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={project.health === 'on-track' ? 'default' : 'secondary'}
                      className={cn(
                        project.health === 'on-track' ?
                        'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      )}
                    >
                      {project.health === 'on-track' ? '✓ On Track' : '⚠ At Risk'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Budget Burn</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              'h-2 rounded-full',
                              project.budget > 100 ? 'bg-red-500' : 'bg-green-500'
                            )}
                            style={{ width: `${Math.min(project.budget, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">{project.budget}%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Blocked Tasks</div>
                      <div className="text-lg font-bold text-gray-900">{project.blocked}</div>
                    </div>

                    <div className="flex items-end justify-end">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Allocation Heat Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resource Allocation</h3>
              <div className="space-y-4">
                {resourceAllocation.map((resource, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{resource.name}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {resource.allocated}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={cn(
                          'h-3 rounded-full transition-all',
                          resource.allocated >= 90 ? 'bg-red-500' :
                          resource.allocated >= 70 ? 'bg-yellow-500' :
                          'bg-green-500'
                        )}
                        style={{ width: `${resource.allocated}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {resource.allocated >= 90 ? 'Overallocated' :
                       resource.allocated >= 70 ? 'Near capacity' :
                       'Available capacity'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
              <Target className="h-8 w-8 mb-3" />
              <div className="text-2xl font-bold mb-2">87%</div>
              <div className="text-sm opacity-90">Overall Portfolio Health</div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-xs opacity-75 mb-1">This Quarter</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">+5.2% improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Path & Dependencies */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Critical Path Analysis</h2>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">Projects with Dependencies</div>
              <div className="text-3xl font-bold text-gray-900">8/18</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">High Priority Tasks</div>
              <div className="text-3xl font-bold text-gray-900">24</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">Upcoming Deadlines (7 days)</div>
              <div className="text-3xl font-bold text-orange-600">5</div>
            </div>
            <div className="flex-1 flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                View Gantt Chart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
