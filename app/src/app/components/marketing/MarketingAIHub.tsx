import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Download, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Import Presentational Components
import { MarketingStats } from './MarketingStats';
import { AIAssistant } from './AIAssistant';

// Import Mock Data (Later replace with API)
import { mockRoiData, mockWorkflows } from '../../../mocks/marketingMocks';

export function MarketingAIHub() {
    const [contentPrompt, setContentPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Fetch dữ liệu bằng React Query
    const { data: roiData, isLoading } = useQuery({
        queryKey: ['marketing-performance'],
        queryFn: () => Promise.resolve(mockRoiData), // Tạm thời dùng mock, sau này nối API
    });

    const handleGenerate = () => {
        setIsGenerating(true);
        // Giả lập gọi API AI
        setTimeout(() => {
            setAiResponse(`📝 Draft: "Revolutionize your workflow with our AI-powered ERP. Efficiency redefined."\n\nSEO Score: 94/100`);
            setIsGenerating(false);
        }, 2000);
    };

    if (isLoading) return <div className="p-10 text-white">Loading AI Hub...</div>;

    return (
        <div className="h-full overflow-auto bg-slate-950 p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Marketing AI Hub</h1>
                    <p className="text-sm text-gray-400">Autonomous campaign management & insights</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <Activity className="h-3 w-3 mr-1" /> Live Performance
                    </Badge>
                    <Button variant="outline" className="bg-slate-800 border-slate-700 text-white">
                        <Download className="h-4 w-4 mr-2" /> Export Insights
                    </Button>
                </div>
            </div>

            {/* KPI Stats Section */}
            <MarketingStats />

            {/* Main Tools Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Assistant chiếm 2 cột */}
                <div className="lg:col-span-2">
                    <AIAssistant
                        contentPrompt={contentPrompt}
                        setContentPrompt={setContentPrompt}
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                        aiResponse={aiResponse}
                    />
                </div>

                {/* AI Recommendations Sidebar */}
                <Card className="bg-slate-900/50 border-slate-800 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <h3 className="font-semibold text-white">AI Strategy Tips</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            'Increase LinkedIn budget by 12% for IT audiences.',
                            'A/B test "Efficiency" vs "Growth" keywords in email headers.',
                            'Automate retargeting for high-value leads in California.',
                        ].map((tip, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                <Zap className="h-4 w-4 text-amber-400 flex-shrink-0" />
                                <p className="text-xs text-gray-300 leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}