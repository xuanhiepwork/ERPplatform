import { MoreVertical, Share2, Copy, Trash2, Edit3, Eye, Download, CheckCircle, Clock, Folder } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Asset, assetTypeConfig } from '../../../../mocks/damMocks';

interface AssetGridProps {
    assets: Asset[];
    onSelect: (asset: Asset) => void;
    viewMode: 'grid' | 'list';
}

export function AssetGrid({ assets, onSelect, viewMode }: AssetGridProps) {
    if (assets.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-1">No assets found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
        );
    }

    if (viewMode === 'list') {
        return (
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {assets.map((asset) => {
                            const AssetIcon = assetTypeConfig[asset.type]?.icon || File;
                            return (
                                <div key={asset.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => onSelect(asset)}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 ${assetTypeConfig[asset.type]?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <AssetIcon className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium">{asset.name}</h3>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                                <span>{asset.size}</span>
                                                <span>•</span>
                                                <span>Updated {asset.uploadDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assets.map((asset) => {
                const typeConfig = assetTypeConfig[asset.type];
                const AssetIcon = typeConfig?.icon;

                return (
                    <Card key={asset.id} className="group cursor-pointer hover:shadow-lg transition-all border-gray-200 hover:border-blue-300 overflow-hidden" onClick={() => onSelect(asset)}>
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                            <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="sm" variant="secondary" className="h-7 w-7 p-0 bg-white/90 hover:bg-white" onClick={(e) => e.stopPropagation()}>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Eye className="h-4 w-4 mr-2" /> Preview</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Share2 className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Copy className="h-4 w-4 mr-2" /> Copy Link</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="bg-white/90 shadow-sm border-0">
                                    {AssetIcon && <AssetIcon className="h-3 w-3" />}
                                    <span className="ml-1 uppercase text-[10px]">{asset.type}</span>
                                </Badge>
                            </div>

                            {asset.versions.length > 1 && (
                                <div className="absolute bottom-2 left-2">
                                    <Badge variant="secondary" className="bg-blue-600 text-white text-[10px] shadow-sm border-0 hover:bg-blue-700">
                                        {asset.versions.length} versions
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-medium text-sm text-gray-900 truncate mb-1" title={asset.name}>{asset.name}</h3>
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <span>{asset.size}</span>
                                {asset.dimensions && <span>{asset.dimensions}</span>}
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {asset.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-50">#{tag}</Badge>
                                ))}
                                {asset.tags.length > 2 && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-50">+{asset.tags.length - 2}</Badge>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {asset.formats.slice(0, 3).map((format) => (
                                    <Button key={format} size="sm" variant="outline" className="h-7 text-[10px] px-2 flex-1" onClick={(e) => { e.stopPropagation(); }}>
                                        <Download className="h-3 w-3 mr-1" /> {format}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}