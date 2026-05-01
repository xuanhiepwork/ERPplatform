import { Star, Download, ChevronRight } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { BrandGuideline } from '../../../../mocks/damMocks';

interface BrandGuidelinesProps {
    guidelines: BrandGuideline[];
}

export function BrandGuidelines({ guidelines }: BrandGuidelinesProps) {
    return (
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
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {guidelines.map((item) => (
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
                        <div className="flex flex-wrap gap-1">
                            {item.formats.map((format) => (
                                <Button key={format} size="sm" variant="outline" className="h-6 text-[10px] px-2">
                                    <Download className="h-3 w-3 mr-1" /> {format}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}