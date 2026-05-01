import { FileText, Search, Filter } from 'lucide-react';
import { Button } from '../ui/button';

export function ContractHeader({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (s: string) => void }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="mb-2">Contract Approval Workflow</h1>
                    <p className="text-muted-foreground">Track and manage contract approvals across departments</p>
                </div>
                <Button className="gap-2">
                    <FileText className="h-4 w-4" /> New Contract
                </Button>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search contracts by title, partner, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>
        </div>
    );
}