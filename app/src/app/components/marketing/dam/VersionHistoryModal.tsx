import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Download, Clock, CheckCircle2, Tag } from 'lucide-react';
import { Asset, assetTypeConfig } from '../../../../mocks/damMocks';
import { cn } from '../../ui/utils';

interface VersionHistoryModalProps {
    asset: Asset | null;
    isOpen: boolean;
    onClose: () => void;
}

export function VersionHistoryModal({ asset, isOpen, onClose }: VersionHistoryModalProps) {
    if (!asset) return null;
    const AssetIcon = assetTypeConfig[asset.type]?.icon;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 border-b border-border bg-slate-50/50">
                    <DialogTitle>Asset Details & Version History</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Left: Preview & Details */}
                    <div className="flex-1 flex flex-col p-6 overflow-y-auto min-w-0">
                        <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-6 border border-border shadow-inner">
                            <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate" title={asset.name}>{asset.name}</h3>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                        {AssetIcon && <AssetIcon className="h-4 w-4" />}
                                        <span className="uppercase font-medium">{asset.type}</span>
                                    </span>
                                    <span>{asset.size}</span>
                                    {asset.dimensions && <span>{asset.dimensions}</span>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {asset.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                                            <Tag className="h-3 w-3" /> {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Download</h4>
                                <div className="flex flex-wrap gap-2">
                                    {asset.formats.map((format) => (
                                        <Button key={format} variant="outline" size="sm" className="bg-white">
                                            <Download className="h-4 w-4 mr-2" /> Download {format}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Version History Sidebar */}
                    <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-border bg-slate-50/30 flex flex-col">
                        <div className="p-4 border-b border-border bg-white/50 backdrop-blur sticky top-0">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                Version History
                            </h4>
                        </div>

                        <div className="p-4 space-y-3 overflow-y-auto flex-1">
                            {asset.versions.map((version, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'p-4 rounded-xl border transition-all bg-white',
                                        index === 0 ? 'border-blue-200 shadow-sm ring-1 ring-blue-50' : 'border-gray-200 hover:border-blue-200'
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={index === 0 ? 'default' : 'secondary'} className={cn(index === 0 && 'bg-blue-600')}>
                                                {version.version}
                                            </Badge>
                                            {index === 0 && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                                        </div>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 -mr-2 -mt-2 text-gray-400 hover:text-blue-600">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 mb-1">{version.uploadedBy}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{version.date}</span>
                                        <span className="bg-slate-100 px-2 py-0.5 rounded">{version.size}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}