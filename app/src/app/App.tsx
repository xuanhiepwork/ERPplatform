import { Suspense, lazy, useEffect } from 'react'; // Đã sửa: Thêm useEffect
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'sonner'; // Đã sửa: Thêm toast

// 1. Shared Components
import { Sidebar } from './components/shared/Sidebar';
import { Header } from './components/shared/Header';
import { FounderControlTower } from './features/founder/FounderControlTower';

// 2. Lazy Loaded Features
const RoleBasedOverview = lazy(() => import('./features/founder').then(m => ({ default: m.RoleBasedOverview })));
const SuperAdminDashboard = lazy(() => import('./features/founder').then(m => ({ default: m.SuperAdminDashboard })));
const ExecutiveBIDashboard = lazy(() => import('./features/founder').then(m => ({ default: m.ExecutiveBIDashboard })));
const Login = lazy(() => import('./features/auth/Login').then(m => ({ default: m.Login })));
const DashboardContent = lazy(() => import('./features/ess').then(m => ({ default: m.DashboardContent })));
const EmployeeDashboard = lazy(() => import('./features/ess').then(m => ({ default: m.EmployeeDashboard })));
const HRDashboard = lazy(() => import('./features/humanResource').then(m => ({ default: m.HRDashboard })));
const CoreHR = lazy(() => import('./features/humanResource').then(m => ({ default: m.CoreHR })));
const ATSDashboard = lazy(() => import('./features/humanResource').then(m => ({ default: m.ATSDashboard })));
const ContractDashboard = lazy(() => import('./features/humanResource').then(m => ({ default: m.ContractDashboard })));
const FinancialDashboard = lazy(() => import('./features/finance').then(m => ({ default: m.FinancialDashboard })));
const MarketingLeadDashboard = lazy(() => import('./features/marketing').then(m => ({ default: m.MarketingLeadDashboard })));
const MarketingAIHub = lazy(() => import('./features/marketing').then(m => ({ default: m.MarketingAIHub })));
const DAMPortal = lazy(() => import('./features/marketing').then(m => ({ default: m.DAMPortal })));
const BIDashboard = lazy(() => import('./features/businessDeverlopment').then(m => ({ default: m.BIDashboard })));
const PartnerPipeline = lazy(() => import('./features/businessDeverlopment').then(m => ({ default: m.PartnerPipeline })));
const ProjectManagerDashboard = lazy(() => import('./features/projectManagement').then(m => ({ default: m.ProjectManagerDashboard })));
const StrategyBoard = lazy(() => import('./features/projectManagement').then(m => ({ default: m.StrategyBoard })));

const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading Module...</p>
    </div>
  </div>
);

// Component lắng nghe sự kiện Logout ngầm toàn cục từ Axios Client
function AuthListener() {
  const navigate = useNavigate();
  const setUserRole = useAppStore(state => state.setUserRole);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUserRole('Employee');
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, [navigate, setUserRole]);

  return null;
}

const AppLayout = () => {
  const { userRole, isSidebarCollapsed, toggleSidebar, setUserRole } = useAppStore();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === 'Founder') {
    return <FounderControlTower />;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} onRoleChange={setUserRole} />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthListener />
      <Routes>
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Suspense fallback={<PageLoader />}><RoleBasedOverview onRoleChange={(role) => console.log('Role changed:', role)} /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><DashboardContent /></Suspense>} />
          <Route path="/employee" element={<Suspense fallback={<PageLoader />}><EmployeeDashboard /></Suspense>} />
          <Route path="/hr" element={<Suspense fallback={<PageLoader />}><HRDashboard /></Suspense>} />
          <Route path="/hr/core" element={<Suspense fallback={<PageLoader />}><CoreHR /></Suspense>} />
          <Route path="/hr/recruitment" element={<Suspense fallback={<PageLoader />}><ATSDashboard /></Suspense>} />
          <Route path="/hr/contracts" element={<Suspense fallback={<PageLoader />}><ContractDashboard /></Suspense>} />
          <Route path="/finance" element={<Suspense fallback={<PageLoader />}><FinancialDashboard /></Suspense>} />
          <Route path="/marketing" element={<Suspense fallback={<PageLoader />}><MarketingLeadDashboard /></Suspense>} />
          <Route path="/marketing/ai-hub" element={<Suspense fallback={<PageLoader />}><MarketingAIHub /></Suspense>} />
          <Route path="/marketing/dam" element={<Suspense fallback={<PageLoader />}><DAMPortal /></Suspense>} />
          <Route path="/bd" element={<Suspense fallback={<PageLoader />}><BIDashboard /></Suspense>} />
          <Route path="/bd/pipeline" element={<Suspense fallback={<PageLoader />}><PartnerPipeline /></Suspense>} />
          <Route path="/pm" element={<Suspense fallback={<PageLoader />}><ProjectManagerDashboard /></Suspense>} />
          <Route path="/pm/strategy" element={<Suspense fallback={<PageLoader />}><StrategyBoard /></Suspense>} />
          <Route path="/executive" element={<Suspense fallback={<PageLoader />}><SuperAdminDashboard onNavigate={() => { }} /></Suspense>} />
          <Route path="/executive/bi" element={<Suspense fallback={<PageLoader />}><ExecutiveBIDashboard /></Suspense>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}