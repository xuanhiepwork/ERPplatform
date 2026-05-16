import { useState } from 'react';
import { ExecutiveBIDashboard } from "./components/ExecutiveBIDashboard";
import { StrategicVisionOKR } from "./components/StrategicVisionOKR";
import { StrategicFinance } from "./components/StrategicFinance";
import { RiskComplianceHeatmap } from "./components/RiskComplianceHeatmap";
import { HumanCapitalPortfolio } from "./components/HumanCapitalPortfolio";
import { AIDecisionSupport } from "./components/AIDecisionSupport";
import { FounderSidebar } from "./components/FounderSidebar";
import { FounderHeader } from "./components/FounderHeader";

type FounderView = 'vital-signs' | 'vision-okr' | 'finance' | 'risk' | 'human-capital' | 'ai-decision';

export function FounderControlTower() {
  const [activeView, setActiveView] = useState<FounderView>('vital-signs');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'vital-signs':
        return <ExecutiveBIDashboard />;
      case 'vision-okr':
        return <StrategicVisionOKR />;
      case 'finance':
        return <StrategicFinance />;
      case 'risk':
        return <RiskComplianceHeatmap />;
      case 'human-capital':
        return <HumanCapitalPortfolio />;
      case 'ai-decision':
        return <AIDecisionSupport />;
      default:
        return <ExecutiveBIDashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-slate-950">
      {/* Founder Sidebar */}
      <FounderSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Founder Header */}
        <FounderHeader />

        {/* Strategic Content */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
