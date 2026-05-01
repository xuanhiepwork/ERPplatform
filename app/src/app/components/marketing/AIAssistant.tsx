import { Brain, Wand2, Copy, Sparkles, MessageSquare, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AIAssistantProps {
    contentPrompt: string;
    setContentPrompt: (val: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    aiResponse: string;
}

export function AIAssistant({ contentPrompt, setContentPrompt, onGenerate, isGenerating, aiResponse }: AIAssistantProps) {
    return (
        <Card className="bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 border-purple-500/20 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
                    <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">AI Marketing Assistant</h3>
                    <p className="text-sm text-gray-400">Generate content and analyze keywords</p>
                </div>
            </div>

            <Tabs defaultValue="content">
                <TabsList className="bg-slate-800 border-slate-700">
                    <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
                        <MessageSquare className="h-4 w-4 mr-2" /> Drafting
                    </TabsTrigger>
                    <TabsTrigger value="keywords" className="data-[state=active]:bg-purple-600">
                        <Search className="h-4 w-4 mr-2" /> Keywords
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4 mt-4">
                    <Textarea
                        placeholder="e.g., Write a LinkedIn post about our new AI features..."
                        className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                        value={contentPrompt}
                        onChange={(e) => setContentPrompt(e.target.value)}
                    />
                    <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                        onClick={onGenerate}
                        disabled={isGenerating || !contentPrompt}
                    >
                        {isGenerating ? <><Wand2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Wand2 className="h-4 w-4 mr-2" /> Generate with AI</>}
                    </Button>
                </TabsContent>
            </Tabs>

            {aiResponse && (
                <div className="mt-4 p-4 bg-slate-800/50 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-purple-400 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> AI Result
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(aiResponse)}>
                            <Copy className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                    </div>
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {aiResponse}
                    </pre>
                </div>
            )}
        </Card>
    );
}