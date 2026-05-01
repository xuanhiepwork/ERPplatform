import { Image, Video, FileText, Star, FileCheck, Presentation, DollarSign } from 'lucide-react';

export interface AssetVersion {
    version: string;
    date: string;
    uploadedBy: string;
    size: string;
}

export interface Asset {
    id: string;
    name: string;
    type: 'image' | 'video' | 'document';
    thumbnail: string;
    size: string;
    uploadDate: string;
    tags: string[];
    category: string;
    versions: AssetVersion[];
    formats: string[];
    dimensions?: string;
    verifiedByMarketing?: boolean;
    industry?: string;
    language?: string;
    downloads?: number;
}

export interface BrandGuideline {
    id: string;
    name: string;
    thumbnail: string;
    formats: string[];
}

export const assetTypeConfig: Record<string, { icon: any; label: string; color: string; textColor?: string; lightBg?: string; borderColor?: string }> = {
    image: { icon: Image, label: 'Image', color: 'bg-blue-500', textColor: 'text-blue-700', lightBg: 'bg-blue-50', borderColor: 'border-blue-200' },
    video: { icon: Video, label: 'Video', color: 'bg-purple-500', textColor: 'text-purple-700', lightBg: 'bg-purple-50', borderColor: 'border-purple-200' },
    document: { icon: FileText, label: 'Document', color: 'bg-green-500', textColor: 'text-green-700', lightBg: 'bg-green-50', borderColor: 'border-green-200' },
    'company-profile': { icon: FileText, label: 'Company Profile', color: 'bg-blue-500' },
    'pitch-deck': { icon: Presentation, label: 'Pitch Deck', color: 'bg-purple-500' },
    'pricing': { icon: DollarSign, label: 'Pricing Table', color: 'bg-green-500' },
    'nda': { icon: FileCheck, label: 'NDA Template', color: 'bg-orange-500' },
    'case-study': { icon: Star, label: 'Case Study', color: 'bg-pink-500' },
    'datasheet': { icon: FileText, label: 'Datasheet', color: 'bg-cyan-500' }
};

export const mockBrandGuidelines: BrandGuideline[] = [
    {
        id: 'logo-primary',
        name: 'Primary Logo',
        thumbnail: 'https://images.unsplash.com/photo-1764383381195-5daa5902c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        formats: ['PNG', 'SVG', 'EPS'],
    },
    {
        id: 'logo-white',
        name: 'Logo (White)',
        thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        formats: ['PNG', 'SVG'],
    },
    {
        id: 'logo-icon',
        name: 'Icon Only',
        thumbnail: 'https://images.unsplash.com/photo-1764383381195-5daa5902c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        formats: ['PNG', 'SVG'],
    },
    {
        id: 'fonts',
        name: 'Brand Fonts',
        thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        formats: ['OTF', 'TTF', 'WOFF'],
    },
];

export const mockAssets: Asset[] = [
    {
        id: 'asset-1',
        name: 'Q1_Campaign_Hero_Image.jpg',
        type: 'image',
        thumbnail: 'https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
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
        verifiedByMarketing: true,
        downloads: 145,
    },
    {
        id: 'asset-2',
        name: 'Product_Launch_Video_2026.mp4',
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1641471159312-6e09825bc10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        size: '45.8 MB',
        uploadDate: 'Apr 12, 2026',
        tags: ['ProductLaunch', 'Video', 'Campaign2024'],
        category: 'Video',
        dimensions: '3840x2160',
        versions: [
            { version: 'Final', date: 'Apr 12, 2026', uploadedBy: 'Mike Rodriguez', size: '45.8 MB' },
            { version: 'V1', date: 'Apr 7, 2026', uploadedBy: 'Mike Rodriguez', size: '42.1 MB' },
        ],
        formats: ['MP4', 'MOV', 'WEBM'],
        verifiedByMarketing: true,
        downloads: 89,
    },
    {
        id: 'asset-6',
        name: 'Brand_Identity_Guidelines.pdf',
        type: 'document',
        thumbnail: 'https://images.unsplash.com/photo-1775737599962-fa2f0db12e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        size: '5.6 MB',
        uploadDate: 'Apr 5, 2026',
        tags: ['BrandGuidelines', 'Logo', 'Identity'],
        category: 'Documents',
        versions: [
            { version: 'Final', date: 'Apr 5, 2026', uploadedBy: 'Alex Johnson', size: '5.6 MB' },
        ],
        formats: ['PDF'],
        verifiedByMarketing: true,
        downloads: 512,
    },
];