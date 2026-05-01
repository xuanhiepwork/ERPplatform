import { Search, Filter, Grid3x3, List } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { cn } from '../../ui/utils';

interface AssetFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    categories: string[];
}

export function AssetFilters({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    categories,
}: AssetFiltersProps) {
    return (
        <div className="space-y-4 mb-4">
            <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by name or tags (e.g., #Campaign2024, #Logo)..."
                        className="pl-10 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="bg-white">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <div className="flex border rounded-lg bg-white">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={cn('rounded-r-none', viewMode === 'grid' && 'bg-blue-600 hover:bg-blue-700')}
                    >
                        <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={cn('rounded-l-none border-l', viewMode === 'list' && 'bg-blue-600 hover:bg-blue-700')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-slate-100">
                    {categories.map((category) => (
                        <TabsTrigger key={category} value={category} className="capitalize data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}