import { useState } from 'react';
import {
  Image,
  Video,
  FileText,
  Download,
  Search,
  Filter,
  Grid3x3,
  List,
  Upload,
  Star,
  Clock,
  Folder,
  ChevronRight,
  X,
  Tag,
  Eye,
  MoreVertical,
  Share2,
  Copy,
  Trash2,
  Edit3,
  CheckCircle2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from './ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  thumbnail: string;
  size: string;
  uploadDate: string;
  tags: string[];
  category: string;
  versions: {
    version: string;
    date: string;
    uploadedBy: string;
    size: string;
  }[];
  formats: string[];
  dimensions?: string;
}

const brandGuidelines = [
  {
    id: 'logo-primary',
    name: 'Primary Logo',
    thumbnail: 'https://images.unsplash.com/photo-1764383381195-5daa5902c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBsb2dvJTIwZGVzaWduJTIwYmx1ZXxlbnwxfHx8fDE3NzYyNDgzNTd8MA&ixlib=rb-4.1.0&q=80&w=400',
    formats: ['PNG', 'SVG', 'EPS'],
  },
  {
    id: 'logo-white',
    name: 'Logo (White)',
    thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc3NjE3NDI3OHww&ixlib=rb-4.1.0&q=80&w=400',
    formats: ['PNG', 'SVG'],
  },
  {
    id: 'logo-icon',
    name: 'Icon Only',
    thumbnail: 'https://images.unsplash.com/photo-1764383381195-5daa5902c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBsb2dvJTIwZGVzaWduJTIwYmx1ZXxlbnwxfHx8fDE3NzYyNDgzNTd8MA&ixlib=rb-4.1.0&q=80&w=400',
    formats: ['PNG', 'SVG'],
  },
  {
    id: 'fonts',
    name: 'Brand Fonts',
    thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc3NjE3NDI3OHww&ixlib=rb-4.1.0&q=80&w=400',
    formats: ['OTF', 'TTF', 'WOFF'],
  },
];

const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Q1_Campaign_Hero_Image.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hcmtldGluZyUyMGNhbXBhaWdufGVufDF8fHx8MTc3NjI0ODM1OHww&ixlib=rb-4.1.0&q=80&w=800',
    size: '2.4 MB',
    uploadDate: 'Apr 10, 2026',
    tags: ['Campaign2024', 'Hero', 'Marketing'],
    category: 'Marketing',
    dimensions: '1920x1080',
    versions: [
      { version: 'Final', date: 'Apr 10, 2026', uploadedBy: 'Sarah Chen', size: '2.4 MB' },
      { version: 'V2', date: 'Apr 8, 2026', uploadedBy: 'Sarah Chen', size: '2.3 MB' },
      { version: 'V1', date: 'Apr 5, 2026', uploadedBy: 'Sarah Chen', size: '2.1 MB' },
    ],
    formats: ['JPG', 'PNG', 'WEBP'],
  },
  {
    id: 'asset-2',
    name: 'Product_Launch_Video_2026.mp4',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1641471159312-6e09825bc10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc2MjAzOTgzfDA&ixlib=rb-4.1.0&q=80&w=800',
    size: '45.8 MB',
    uploadDate: 'Apr 12, 2026',
    tags: ['ProductLaunch', 'Video', 'Campaign2024'],
    category: 'Video',
    dimensions: '3840x2160',
    versions: [
      { version: 'Final', date: 'Apr 12, 2026', uploadedBy: 'Mike Rodriguez', size: '45.8 MB' },
      { version: 'V3', date: 'Apr 11, 2026', uploadedBy: 'Mike Rodriguez', size: '44.2 MB' },
      { version: 'V2', date: 'Apr 9, 2026', uploadedBy: 'Mike Rodriguez', size: '43.5 MB' },
      { version: 'V1', date: 'Apr 7, 2026', uploadedBy: 'Mike Rodriguez', size: '42.1 MB' },
    ],
    formats: ['MP4', 'MOV', 'WEBM'],
  },
  {
    id: 'asset-3',
    name: 'Team_Collaboration_Photo.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzYxNjUxMjB8MA&ixlib=rb-4.1.0&q=80&w=800',
    size: '3.2 MB',
    uploadDate: 'Apr 9, 2026',
    tags: ['Team', 'Office', 'Culture'],
    category: 'Photography',
    dimensions: '2400x1600',
    versions: [
      { version: 'Final', date: 'Apr 9, 2026', uploadedBy: 'Jessica Park', size: '3.2 MB' },
      { version: 'V1', date: 'Apr 8, 2026', uploadedBy: 'Jessica Park', size: '3.0 MB' },
    ],
    formats: ['JPG', 'PNG', 'TIFF'],
  },
  {
    id: 'asset-4',
    name: 'Modern_Workspace_Design.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc2MTk2MDM3fDA&ixlib=rb-4.1.0&q=80&w=800',
    size: '1.8 MB',
    uploadDate: 'Apr 8, 2026',
    tags: ['Office', 'Design', 'Interior'],
    category: 'Photography',
    dimensions: '1920x1280',
    versions: [
      { version: 'Final', date: 'Apr 8, 2026', uploadedBy: 'David Kim', size: '1.8 MB' },
      { version: 'V2', date: 'Apr 7, 2026', uploadedBy: 'David Kim', size: '1.7 MB' },
      { version: 'V1', date: 'Apr 6, 2026', uploadedBy: 'David Kim', size: '1.6 MB' },
    ],
    formats: ['JPG', 'PNG'],
  },
  {
    id: 'asset-5',
    name: 'Social_Media_Content.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbnxlbnwxfHx8fDE3NzYyMTg2NDJ8MA&ixlib=rb-4.1.0&q=80&w=800',
    size: '1.2 MB',
    uploadDate: 'Apr 11, 2026',
    tags: ['SocialMedia', 'Campaign2024', 'Content'],
    category: 'Social',
    dimensions: '1080x1080',
    versions: [
      { version: 'Final', date: 'Apr 11, 2026', uploadedBy: 'Emma Watson', size: '1.2 MB' },
      { version: 'V1', date: 'Apr 10, 2026', uploadedBy: 'Emma Watson', size: '1.1 MB' },
    ],
    formats: ['JPG', 'PNG'],
  },
  {
    id: 'asset-6',
    name: 'Brand_Identity_Guidelines.pdf',
    type: 'document',
    thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc3NjE3NDI3OHww&ixlib=rb-4.1.0&q=80&w=800',
    size: '5.6 MB',
    uploadDate: 'Apr 5, 2026',
    tags: ['BrandGuidelines', 'Logo', 'Identity'],
    category: 'Documents',
    versions: [
      { version: 'Final', date: 'Apr 5, 2026', uploadedBy: 'Alex Johnson', size: '5.6 MB' },
      { version: 'V3', date: 'Apr 3, 2026', uploadedBy: 'Alex Johnson', size: '5.4 MB' },
      { version: 'V2', date: 'Mar 30, 2026', uploadedBy: 'Alex Johnson', size: '5.2 MB' },
      { version: 'V1', date: 'Mar 28, 2026', uploadedBy: 'Alex Johnson', size: '5.0 MB' },
    ],
    formats: ['PDF'],
  },
  {
    id: 'asset-7',
    name: 'Marketing_Graphics_Set.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZ3JhcGhpY3N8ZW58MXx8fHwxNzc2MjQ4MzYxfDA&ixlib=rb-4.1.0&q=80&w=800',
    size: '2.9 MB',
    uploadDate: 'Apr 13, 2026',
    tags: ['Marketing', 'Graphics', 'Campaign2024'],
    category: 'Marketing',
    dimensions: '2560x1440',
    versions: [
      { version: 'Final', date: 'Apr 13, 2026', uploadedBy: 'Lisa Chang', size: '2.9 MB' },
      { version: 'V2', date: 'Apr 12, 2026', uploadedBy: 'Lisa Chang', size: '2.7 MB' },
      { version: 'V1', date: 'Apr 11, 2026', uploadedBy: 'Lisa Chang', size: '2.5 MB' },
    ],
    formats: ['JPG', 'PNG', 'SVG'],
  },
  {
    id: 'asset-8',
    name: 'Product_Photography_Studio.jpg',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1641471159312-6e09825bc10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc2MjAzOTgzfDA&ixlib=rb-4.1.0&q=80&w=800',
    size: '4.1 MB',
    uploadDate: 'Apr 7, 2026',
    tags: ['Product', 'Photography', 'Studio'],
    category: 'Photography',
    dimensions: '3000x2000',
    versions: [
      { version: 'Final', date: 'Apr 7, 2026', uploadedBy: 'Tom Anderson', size: '4.1 MB' },
      { version: 'V1', date: 'Apr 6, 2026', uploadedBy: 'Tom Anderson', size: '3.9 MB' },
    ],
    formats: ['JPG', 'PNG', 'TIFF'],
  },
];

export function DAMPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const categories = ['all', 'Marketing', 'Video', 'Photography', 'Social', 'Documents'];

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Digital Asset Library</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and organize all your marketing assets
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
        </div>

        {/* Brand Guidelines Section */}
        <Card className="p-5 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Brand Guidelines</h2>
                <p className="text-xs text-gray-600">Quick access to official logos and fonts</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {brandGuidelines.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="aspect-square rounded-md bg-gray-100 mb-3 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-medium text-gray-900 mb-2 truncate">{item.name}</p>
                <div className="flex gap-1">
                  {item.formats.map((format) => (
                    <Button
                      key={format}
                      size="sm"
                      variant="outline"
                      className="h-6 text-[10px] px-2"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or tags (e.g., #Campaign2024, #Logo)..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-r-none',
                viewMode === 'grid' && 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded-l-none border-l',
                viewMode === 'list' && 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Assets Grid/List */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredAssets.map((asset) => (
              <Card
                key={asset.id}
                className="group cursor-pointer hover:shadow-lg transition-all border-gray-200 hover:border-blue-300 overflow-hidden"
                onClick={() => {
                  setSelectedAsset(asset);
                  setShowVersionHistory(true);
                }}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {getAssetIcon(asset.type)}
                      <span className="ml-1 uppercase text-[10px]">{asset.type}</span>
                    </Badge>
                  </div>
                  {asset.versions.length > 1 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-blue-600 text-white text-[10px]">
                        {asset.versions.length} versions
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 truncate mb-1">
                    {asset.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{asset.size}</span>
                    {asset.dimensions && <span>{asset.dimensions}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {asset.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                        #{tag}
                      </Badge>
                    ))}
                    {asset.tags.length > 2 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        +{asset.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {asset.formats.slice(0, 3).map((format) => (
                      <Button
                        key={format}
                        size="sm"
                        variant="outline"
                        className="h-7 text-[10px] px-2 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAssets.map((asset) => (
              <Card
                key={asset.id}
                className="p-4 hover:shadow-md transition-all cursor-pointer border-gray-200 hover:border-blue-300"
                onClick={() => {
                  setSelectedAsset(asset);
                  setShowVersionHistory(true);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                      <Badge variant="secondary" className="flex-shrink-0">
                        {getAssetIcon(asset.type)}
                        <span className="ml-1 uppercase text-xs">{asset.type}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span>{asset.size}</span>
                      {asset.dimensions && <span>{asset.dimensions}</span>}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {asset.uploadDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Folder className="h-3 w-3" />
                        {asset.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {asset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {asset.formats.map((format) => (
                      <Button
                        key={format}
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {format}
                      </Button>
                    ))}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No assets found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Version History Dialog */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Asset Details & Version History</DialogTitle>
          </DialogHeader>

          {selectedAsset && (
            <div className="flex gap-6 flex-1 overflow-hidden">
              {/* Preview */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedAsset.thumbnail}
                    alt={selectedAsset.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{selectedAsset.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        {getAssetIcon(selectedAsset.type)}
                        <span className="uppercase">{selectedAsset.type}</span>
                      </span>
                      <span>{selectedAsset.size}</span>
                      {selectedAsset.dimensions && <span>{selectedAsset.dimensions}</span>}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAsset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />#{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Download</h4>
                    <div className="flex gap-2">
                      {selectedAsset.formats.map((format) => (
                        <Button key={format} variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Version History Sidebar */}
              <div className="w-80 border-l pl-6 flex flex-col">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Version History
                </h4>
                <div className="space-y-3 overflow-y-auto flex-1">
                  {selectedAsset.versions.map((version, index) => (
                    <Card
                      key={index}
                      className={cn(
                        'p-3 cursor-pointer hover:shadow-md transition-all',
                        index === 0 && 'border-blue-500 bg-blue-50'
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={index === 0 ? 'default' : 'secondary'}
                            className={cn(
                              'text-xs',
                              index === 0 && 'bg-blue-600 hover:bg-blue-700'
                            )}
                          >
                            {version.version}
                          </Badge>
                          {index === 0 && (
                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <Button size="sm" variant="ghost" className="h-7 px-2">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-900 font-medium mb-1">
                        {version.uploadedBy}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{version.date}</span>
                        <span>{version.size}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
