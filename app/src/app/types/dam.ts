import { LucideIcon } from 'lucide-react';

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

export interface AssetTypeConfig {
    icon: LucideIcon;
    label: string;
    color: string;
    textColor?: string;
    lightBg?: string;
    borderColor?: string;
}
