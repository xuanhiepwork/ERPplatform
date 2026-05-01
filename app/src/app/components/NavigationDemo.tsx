import { Sparkles, Layout, User, Layers, Settings, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

export function NavigationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Navigation System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intelligent workspace switching that adapts to your role, providing personalized navigation and streamlined access to relevant modules.
          </p>
          <Badge variant="outline" className="text-sm px-4 py-1.5">
            Enterprise Digital Workplace
          </Badge>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Layout className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3-Section Sidebar</h3>
            <p className="text-sm text-gray-600 mb-4">
              Organized into Common Suite, Role-Based Workspace, and Utility sections for optimal navigation flow.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ChevronRight className="h-3 w-3" />
                <span>Common Suite (Fixed)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ChevronRight className="h-3 w-3" />
                <span>Workspace (Adaptive)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ChevronRight className="h-3 w-3" />
                <span>Utility (Fixed)</span>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Role-Based Switching</h3>
            <p className="text-sm text-gray-600 mb-4">
              Navigation adapts dynamically based on user role - HR, Finance, Project Manager, Marketing, Sales, and more.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="text-xs">HR Manager</Badge>
              <Badge variant="outline" className="text-xs">Finance</Badge>
              <Badge variant="outline" className="text-xs">Project</Badge>
              <Badge variant="outline" className="text-xs">Marketing</Badge>
              <Badge variant="outline" className="text-xs">Sales</Badge>
              <Badge variant="outline" className="text-xs">Admin</Badge>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Global Search</h3>
            <p className="text-sm text-gray-600 mb-4">
              Search across all modules with real-time results categorized by department and module type.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <span>Cross-module search</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <span>Module categorization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <span>Real-time results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Workspace Examples */}
        <div className="bg-white rounded-xl border shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Role-Based Workspaces</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* HR Manager Workspace */}
            <div className="border rounded-lg p-5 bg-purple-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-purple-600 text-white">HR Manager</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Recruitment & ATS</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Core HR Management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Time & Attendance</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Payroll & Benefits</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Learning & Development</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-purple-600 rounded-full"></div>
                  <span>Offboarding & Performance</span>
                </div>
              </div>
            </div>

            {/* Finance Manager Workspace */}
            <div className="border rounded-lg p-5 bg-green-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-green-600 text-white">Finance Manager</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>Financial Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>Accounts Payable</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>Accounts Receivable</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>Budget Management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>Asset Register</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                  <span>BI Analytics</span>
                </div>
              </div>
            </div>

            {/* Project Manager Workspace */}
            <div className="border rounded-lg p-5 bg-blue-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-blue-600 text-white">Project Manager</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                  <span>Tasks & Projects Board</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                  <span>Strategy Board</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                  <span>OKRs & KPIs Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                  <span>Resource Planning</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                  <span>Performance Analytics</span>
                </div>
              </div>
            </div>

            {/* Marketing Manager Workspace */}
            <div className="border rounded-lg p-5 bg-orange-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-orange-600 text-white">Marketing Manager</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-orange-600 rounded-full"></div>
                  <span>Marketing AI Hub</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-orange-600 rounded-full"></div>
                  <span>Content Calendar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-orange-600 rounded-full"></div>
                  <span>Creative Board</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-orange-600 rounded-full"></div>
                  <span>Digital Asset Library</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 bg-orange-600 rounded-full"></div>
                  <span>Marketing Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Instructions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Try It Out</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">1</span>
              </div>
              <p className="text-white/90">
                <strong>Click the Role Badge</strong> in the top header to switch between different user roles and watch the sidebar workspace adapt dynamically.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">2</span>
              </div>
              <p className="text-white/90">
                <strong>Use the Global Search</strong> in the header to search across all modules and see categorized results in real-time.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">3</span>
              </div>
              <p className="text-white/90">
                <strong>Click the Notification Bell</strong> to view unified notifications with unread count badges and categorized alerts.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">4</span>
              </div>
              <p className="text-white/90">
                <strong>Collapse/Expand the Sidebar</strong> using the toggle button at the bottom to see the space-efficient collapsed view with icon-only navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
