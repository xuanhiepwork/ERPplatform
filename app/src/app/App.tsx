// import { useState } from 'react';
// import { Sidebar } from './components/Sidebar';
// import { Header } from './components/Header';
// import { DashboardContent } from './components/DashboardContent';
// import { RequestsManagement } from './components/RequestsManagement';
// import { MyProfile } from './components/MyProfile';
// import { KanbanBoard } from './components/KanbanBoard';
// import { OKRTracker } from './components/OKRTracker';
// import { CompanyNewsfeed } from './components/CompanyNewsfeed';
// import { CompanyDirectory } from './components/CompanyDirectory';
// import { TeamCalendar } from './components/TeamCalendar';
// import { KnowledgeBase } from './components/KnowledgeBase';
// import { PartnerPipeline } from './components/PartnerPipeline';
// import { BIDashboard } from './components/BIDashboard';
// import { StrategyBoard } from './components/StrategyBoard';
// import { ContractWorkflow } from './components/ContractWorkflow';
// import { SalesKit } from './components/SalesKit';
// import { MarketingCalendar } from './components/MarketingCalendar';
// import { CreativeBoard } from './components/CreativeBoard';
// import { DAMPortal } from './components/DAMPortal';
// import { MarketingAIHub } from './components/MarketingAIHub';
// import { ATSDashboard } from './components/ATSDashboard';
// import { CoreHR } from './components/CoreHR';
// import { TimeAttendance } from './components/TimeAttendance';
// import { PayrollBenefits } from './components/PayrollBenefits';
// import { LearningDevelopment } from './components/LearningDevelopment';
// import { OffboardingWorkflow } from './components/OffboardingWorkflow';
// import { PerformanceReview } from './components/PerformanceReview';
// import { FinancialDashboard } from './components/FinancialDashboard';
// import { AccountsPayable } from './components/AccountsPayable';
// import { AccountsReceivable } from './components/AccountsReceivable';
// import { BudgetManagement } from './components/BudgetManagement';
// import { AssetRegister } from './components/AssetRegister';
// import { NavigationDemo } from './components/NavigationDemo';
// import { SuperAdminDashboard } from './components/SuperAdminDashboard';
// import { EmployeeDashboard } from './components/EmployeeDashboard';
// import { ProjectManagerDashboard } from './components/ProjectManagerDashboard';
// import { FinanceDashboard } from './components/FinanceDashboard';
// import { HRAdminDashboard } from './components/HRAdminDashboard';
// import { MarketingLeadDashboard } from './components/MarketingLeadDashboard';
// import { RoleBasedOverview } from './components/RoleBasedOverview';
// import { FounderControlTower } from './components/FounderControlTower';

// export type UserRole = 'Employee' | 'HR Admin' | 'Finance & Accounting' | 'Project Manager' | 'Marketing Lead' | 'Super Admin' | 'Founder';

// export default function App() {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [activePage, setActivePage] = useState('overview');
//   const [userRole, setUserRole] = useState<UserRole>('Founder');

//   const handleRoleChange = (newRole: UserRole) => {
//     setUserRole(newRole);
//     if (newRole === 'Founder') {
//       setActivePage('founder');
//     } else {
//       setActivePage('dashboard');
//     }
//   };

//   const renderContent = () => {
//     // Founder Control Tower - Full screen takeover
//     if (userRole === 'Founder' || activePage === 'founder') {
//       return <FounderControlTower />;
//     }

//     switch (activePage) {
//       case 'overview':
//         return <RoleBasedOverview onRoleChange={handleRoleChange} />;
//       case 'dashboard':
//         // Render role-specific dashboard
//         switch (userRole) {
//           case 'Super Admin':
//             return <SuperAdminDashboard onNavigate={setActivePage} />;
//           case 'Employee':
//             return <EmployeeDashboard />;
//           case 'Project Manager':
//             return <ProjectManagerDashboard />;
//           case 'Finance & Accounting':
//             return <FinanceDashboard />;
//           case 'HR Admin':
//             return <HRAdminDashboard />;
//           case 'Marketing Lead':
//             return <MarketingLeadDashboard />;
//           default:
//             return <NavigationDemo />;
//         }
//       case 'requests':
//         return <RequestsManagement />;
//       case 'profile':
//         return <MyProfile />;
//       case 'tasks':
//         return <KanbanBoard />;
//       case 'performance':
//         return <OKRTracker />;
//       case 'news':
//         return <CompanyNewsfeed />;
//       case 'directory':
//         return <CompanyDirectory />;
//       case 'calendar':
//         return <TeamCalendar />;
//       case 'knowledge':
//         return <KnowledgeBase />;
//       case 'partners':
//         return <PartnerPipeline />;
//       case 'bi-analytics':
//         return <BIDashboard />;
//       case 'strategy':
//         return <StrategyBoard />;
//       case 'contracts':
//         return <ContractWorkflow />;
//       case 'sales-kit':
//         return <SalesKit />;
//       case 'marketing-calendar':
//         return <MarketingCalendar />;
//       case 'creative-board':
//         return <CreativeBoard />;
//       case 'dam-portal':
//         return <DAMPortal />;
//       case 'marketing-ai':
//         return <MarketingAIHub />;
//       case 'ats-dashboard':
//         return <ATSDashboard />;
//       case 'core-hr':
//         return <CoreHR />;
//       case 'time-attendance':
//         return <TimeAttendance />;
//       case 'payroll':
//         return <PayrollBenefits />;
//       case 'learning':
//         return <LearningDevelopment />;
//       case 'offboarding':
//         return <OffboardingWorkflow />;
//       case 'performance-review':
//         return <PerformanceReview />;
//       case 'financial':
//         return <FinancialDashboard />;
//       case 'accounts-payable':
//         return <AccountsPayable />;
//       case 'accounts-receivable':
//         return <AccountsReceivable />;
//       case 'budget-management':
//         return <BudgetManagement />;
//       case 'asset-register':
//         return <AssetRegister />;
//       default:
//         return <DashboardContent />;
//     }
//   };

//   // Founder mode - full screen takeover
//   if (userRole === 'Founder') {
//     return renderContent();
//   }

//   return (
//     <div className="h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         isCollapsed={isSidebarCollapsed}
//         onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         activePage={activePage}
//         onNavigate={setActivePage}
//         userRole={userRole}
//       />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <Header
//           userRole={userRole}
//           onRoleChange={handleRoleChange}
//         />

//         {/* Page Content */}
//         <main className={`flex-1 overflow-y-auto ${
//           activePage === 'overview' ||
//           activePage === 'dashboard' ||
//           activePage === 'marketing-ai' ||
//           activePage === 'financial' ||
//           activePage === 'accounts-payable' ||
//           activePage === 'accounts-receivable' ||
//           activePage === 'budget-management'
//           ? '' : 'p-6'
//         }`}>
//           {activePage === 'overview' ||
//            activePage === 'dashboard' ||
//            activePage === 'tasks' ||
//            activePage === 'calendar' ||
//            activePage === 'knowledge' ||
//            activePage === 'partners' ||
//            activePage === 'strategy' ||
//            activePage === 'marketing-calendar' ||
//            activePage === 'creative-board' ||
//            activePage === 'dam-portal' ||
//            activePage === 'marketing-ai' ||
//            activePage === 'ats-dashboard' ||
//            activePage === 'core-hr' ||
//            activePage === 'time-attendance' ||
//            activePage === 'payroll' ||
//            activePage === 'learning' ||
//            activePage === 'offboarding' ||
//            activePage === 'performance-review' ||
//            activePage === 'financial' ||
//            activePage === 'accounts-payable' ||
//            activePage === 'accounts-receivable' ||
//            activePage === 'budget-management' ||
//            activePage === 'asset-register' ? (
//             <div className="h-full">
//               {renderContent()}
//             </div>
//           ) : (
//             <div className="max-w-7xl mx-auto">
//               {renderContent()}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { useAppStore } from '../store/useAppStore';

// Import Layout Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Import Page Components
import { DashboardContent } from './components/DashboardContent';
import { RoleBasedOverview } from './components/RoleBasedOverview';
import { FounderControlTower } from './components/FounderControlTower';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { HRAdminDashboard } from './components/HRAdminDashboard';
import { FinanceDashboard } from './components/FinanceDashboard';
import { FinancialDashboard } from './components/finance/FinancialDashboard';
import { ProjectManagerDashboard } from './components/ProjectManagerDashboard';
import { MarketingLeadDashboard } from './components/MarketingLeadDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
// (Import các component còn lại của bạn ở đây...)

// 1. Component Layout chính (Bao bọc Sidebar & Header)
const AppLayout = () => {
  const { userRole, isSidebarCollapsed, toggleSidebar, setUserRole } = useAppStore();

  // Founder Mode chiếm toàn màn hình
  if (userRole === 'Founder') {
    return <FounderControlTower />;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        activePage={window.location.pathname.split('/')[1] || 'overview'} // Lấy path hiện tại
        onNavigate={(path) => window.location.href = `/${path}`} // Tạm thời dùng href, sẽ mượt hơn khi dùng <Link> trong Sidebar
        userRole={userRole}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} onRoleChange={setUserRole} />

        {/* Nơi nội dung các route con sẽ được render */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// 2. Component Dashboard tự động chuyển hướng theo Role
const RoleBasedDashboard = () => {
  const { userRole } = useAppStore();

  switch (userRole) {
    case 'Super Admin': return <SuperAdminDashboard onNavigate={() => { }} />;
    case 'HR Admin': return <HRAdminDashboard />;
    case 'Finance & Accounting': return <FinanceDashboard />;
    case 'Project Manager': return <ProjectManagerDashboard />;
    case 'Marketing Lead': return <MarketingLeadDashboard />;
    case 'Employee': return <EmployeeDashboard />;
    default: return <DashboardContent />;
  }
};

// 3. Router App
export default function App() {
  const { setUserRole } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/overview" replace />} />

          {/* Các trang chính */}
          <Route path="/overview" element={<RoleBasedOverview onRoleChange={setUserRole} />} />
          <Route path="/dashboard" element={<RoleBasedDashboard />} />
          <Route path="/financial" element={<FinancialDashboard />} />

          {/* Thêm các Route khác ở đây, ví dụ: */}
          {/* <Route path="/tasks" element={<KanbanBoard />} /> */}
          {/* <Route path="/core-hr" element={<CoreHR />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}