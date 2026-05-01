import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Share2,
  FileText,
  Presentation,
  DollarSign,
  FileCheck,
  CheckCircle,
  Eye,
  MoreVertical,
  Grid3x3,
  List,
  SlidersHorizontal,
  Star,
  Clock
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

type AssetType = 'company-profile' | 'pitch-deck' | 'pricing' | 'nda' | 'case-study' | 'datasheet';
type Industry = 'Technology' | 'Healthcare' | 'Finance' | 'Retail' | 'Manufacturing' | 'General';
type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Japanese';

interface Asset {
  id: string;
  title: string;
  type: AssetType;
  description: string;
  version: string;
  verifiedByMarketing: boolean;
  industry: Industry;
  language: Language;
  lastUpdated: string;
  fileSize: string;
  downloads: number;
  thumbnail: string;
  tags: string[];
}

const assets: Asset[] = [
  {
    id: 'doc-001',
    title: 'Enterprise Company Profile 2026',
    type: 'company-profile',
    description: 'Comprehensive overview of our company, mission, and product portfolio',
    version: 'v3.2',
    verifiedByMarketing: true,
    industry: 'General',
    language: 'English',
    lastUpdated: 'Apr 5, 2026',
    fileSize: '2.4 MB',
    downloads: 342,
    thumbnail: 'company-profile',
    tags: ['Overview', 'Corporate', 'Latest']
  },
  {
    id: 'doc-002',
    title: 'Series B Investor Pitch Deck',
    type: 'pitch-deck',
    description: 'Investor presentation with financials, market opportunity, and growth strategy',
    version: 'v2.8',
    verifiedByMarketing: true,
    industry: 'Technology',
    language: 'English',
    lastUpdated: 'Apr 8, 2026',
    fileSize: '8.6 MB',
    downloads: 156,
    thumbnail: 'pitch-deck',
    tags: ['Investment', 'Fundraising', 'Executive']
  },
  {
    id: 'doc-003',
    title: 'Standard Pricing Table - Enterprise',
    type: 'pricing',
    description: 'Tiered pricing structure for enterprise customers with volume discounts',
    version: 'v4.1',
    verifiedByMarketing: true,
    industry: 'General',
    language: 'English',
    lastUpdated: 'Apr 10, 2026',
    fileSize: '1.2 MB',
    downloads: 524,
    thumbnail: 'pricing',
    tags: ['Pricing', 'Enterprise', 'Sales']
  },
  {
    id: 'doc-004',
    title: 'Mutual NDA Template (Standard)',
    type: 'nda',
    description: 'Legal template for mutual non-disclosure agreements',
    version: 'v1.5',
    verifiedByMarketing: true,
    industry: 'General',
    language: 'English',
    lastUpdated: 'Mar 15, 2026',
    fileSize: '0.8 MB',
    downloads: 789,
    thumbnail: 'nda',
    tags: ['Legal', 'Standard', 'Template']
  },
  {
    id: 'doc-005',
    title: 'Healthcare Industry Pitch Deck',
    type: 'pitch-deck',
    description: 'Customized pitch deck for healthcare sector prospects',
    version: 'v1.3',
    verifiedByMarketing: true,
    industry: 'Healthcare',
    language: 'English',
    lastUpdated: 'Apr 2, 2026',
    fileSize: '7.2 MB',
    downloads: 87,
    thumbnail: 'pitch-deck',
    tags: ['Healthcare', 'Industry-Specific', 'Vertical']
  },
  {
    id: 'doc-006',
    title: 'Product Datasheet - AI Platform',
    type: 'datasheet',
    description: 'Technical specifications and features of our AI platform',
    version: 'v2.4',
    verifiedByMarketing: true,
    industry: 'Technology',
    language: 'English',
    lastUpdated: 'Apr 12, 2026',
    fileSize: '3.1 MB',
    downloads: 412,
    thumbnail: 'datasheet',
    tags: ['Product', 'Technical', 'AI']
  },
  {
    id: 'doc-007',
    title: 'Retail Success Case Study',
    type: 'case-study',
    description: 'Customer success story featuring major retail chain implementation',
    version: 'v1.0',
    verifiedByMarketing: true,
    industry: 'Retail',
    language: 'English',
    lastUpdated: 'Mar 28, 2026',
    fileSize: '4.5 MB',
    downloads: 234,
    thumbnail: 'case-study',
    tags: ['Case Study', 'Customer', 'Retail']
  },
  {
    id: 'doc-008',
    title: 'International Pricing - EMEA',
    type: 'pricing',
    description: 'Regional pricing for Europe, Middle East, and Africa markets',
    version: 'v3.0',
    verifiedByMarketing: true,
    industry: 'General',
    language: 'English',
    lastUpdated: 'Apr 1, 2026',
    fileSize: '1.5 MB',
    downloads: 198,
    thumbnail: 'pricing',
    tags: ['EMEA', 'International', 'Regional']
  },
  {
    id: 'doc-009',
    title: 'One-Way NDA Template',
    type: 'nda',
    description: 'Legal template for unilateral non-disclosure agreements',
    version: 'v1.2',
    verifiedByMarketing: false,
    industry: 'General',
    language: 'English',
    lastUpdated: 'Feb 20, 2026',
    fileSize: '0.6 MB',
    downloads: 456,
    thumbnail: 'nda',
    tags: ['Legal', 'One-Way', 'Template']
  },
  {
    id: 'doc-010',
    title: 'Financial Services Case Study',
    type: 'case-study',
    description: 'Banking sector implementation and ROI analysis',
    version: 'v2.1',
    verifiedByMarketing: true,
    industry: 'Finance',
    language: 'English',
    lastUpdated: 'Apr 6, 2026',
    fileSize: '5.2 MB',
    downloads: 167,
    thumbnail: 'case-study',
    tags: ['Finance', 'Banking', 'ROI']
  },
  {
    id: 'doc-011',
    title: 'Company Profile - Spanish',
    type: 'company-profile',
    description: 'Spanish language company overview for Latin American markets',
    version: 'v2.0',
    verifiedByMarketing: true,
    industry: 'General',
    language: 'Spanish',
    lastUpdated: 'Mar 10, 2026',
    fileSize: '2.6 MB',
    downloads: 89,
    thumbnail: 'company-profile',
    tags: ['Spanish', 'LATAM', 'Overview']
  },
  {
    id: 'doc-012',
    title: 'Q2 Product Roadmap Presentation',
    type: 'pitch-deck',
    description: 'Product development roadmap and feature timeline for Q2 2026',
    version: 'v1.0',
    verifiedByMarketing: false,
    industry: 'Technology',
    language: 'English',
    lastUpdated: 'Apr 13, 2026',
    fileSize: '6.8 MB',
    downloads: 45,
    thumbnail: 'pitch-deck',
    tags: ['Roadmap', 'Product', 'Q2']
  }
];

const assetTypeConfig = {
  'company-profile': { icon: FileText, label: 'Company Profile', color: 'bg-blue-500' },
  'pitch-deck': { icon: Presentation, label: 'Pitch Deck', color: 'bg-purple-500' },
  'pricing': { icon: DollarSign, label: 'Pricing Table', color: 'bg-green-500' },
  'nda': { icon: FileCheck, label: 'NDA Template', color: 'bg-orange-500' },
  'case-study': { icon: Star, label: 'Case Study', color: 'bg-pink-500' },
  'datasheet': { icon: FileText, label: 'Datasheet', color: 'bg-cyan-500' }
};

const documentTypes = ['All Types', 'Company Profile', 'Pitch Deck', 'Pricing Table', 'NDA Template', 'Case Study', 'Datasheet'];
const industries = ['All Industries', 'General', 'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
const languages = ['All Languages', 'English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'];

export function SalesKit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      selectedType === 'All Types' ||
      assetTypeConfig[asset.type].label === selectedType;

    const matchesIndustry =
      selectedIndustry === 'All Industries' ||
      asset.industry === selectedIndustry;

    const matchesLanguage =
      selectedLanguage === 'All Languages' ||
      asset.language === selectedLanguage;

    return matchesSearch && matchesType && matchesIndustry && matchesLanguage;
  });

  const handleDownload = (asset: Asset) => {
    console.log('Downloading:', asset.title);
  };

  const handleShare = (asset: Asset) => {
    console.log('Sharing:', asset.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">BD Sales Kit</h1>
        <p className="text-muted-foreground">
          Access verified marketing materials and sales collateral
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search assets by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            {showFilters && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <label className="block text-sm mb-2">Document Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {languages.map((language) => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
              <span>
                {filteredAssets.length} {filteredAssets.length === 1 ? 'asset' : 'assets'} found
              </span>
              {(searchQuery || selectedType !== 'All Types' || selectedIndustry !== 'All Industries' || selectedLanguage !== 'All Languages') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All Types');
                    setSelectedIndustry('All Industries');
                    setSelectedLanguage('All Languages');
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const AssetIcon = assetTypeConfig[asset.type].icon;
            return (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className={`h-48 ${assetTypeConfig[asset.type].color} bg-gradient-to-br from-current to-transparent flex items-center justify-center relative`}>
                    <AssetIcon className="h-20 w-20 text-white opacity-90" />
                    {asset.verifiedByMarketing && (
                      <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Type & Version */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                        {assetTypeConfig[asset.type].label}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {asset.version}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                      {asset.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {asset.description}
                    </p>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      {asset.verifiedByMarketing && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                      {asset.language !== 'English' && (
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                          {asset.language}
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {asset.lastUpdated}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {asset.downloads}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => handleDownload(asset)}
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(asset)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredAssets.map((asset) => {
                const AssetIcon = assetTypeConfig[asset.type].icon;
                return (
                  <div key={asset.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-16 h-16 ${assetTypeConfig[asset.type].color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <AssetIcon className="h-8 w-8 text-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-1">
                          <h3 className="text-sm">{asset.title}</h3>
                          {asset.verifiedByMarketing && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                          {asset.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{assetTypeConfig[asset.type].label}</span>
                          <span>•</span>
                          <span>{asset.version}</span>
                          <span>•</span>
                          <span>{asset.industry}</span>
                          <span>•</span>
                          <span>{asset.fileSize}</span>
                          <span>•</span>
                          <span>Updated {asset.lastUpdated}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => handleDownload(asset)}
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare(asset)}
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="mb-2">No assets found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
