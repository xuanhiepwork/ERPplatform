import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { cn } from '../../../../components/ui/utils';

export interface RatioCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    theme: 'emerald' | 'blue' | 'purple';
}

export function RatioCard({ title, value, description, icon: Icon, theme }: RatioCardProps) {
    // Khai báo sẵn các map màu tĩnh để Tailwind CSS có thể biên dịch (purge) chính xác
    const themeStyles = {
        emerald: {
            card: 'from-emerald-50 border-emerald-200',
            iconWrapper: 'bg-emerald-100',
            text: 'text-emerald-600'
        },
        blue: {
            card: 'from-blue-50 border-blue-200',
            iconWrapper: 'bg-blue-100',
            text: 'text-blue-600'
        },
        purple: {
            card: 'from-purple-50 border-purple-200',
            iconWrapper: 'bg-purple-100',
            text: 'text-purple-600'
        }
    };

    const currentTheme = themeStyles[theme];

    return (
        <Card className={cn("p-5 bg-gradient-to-br to-white", currentTheme.card)}>
            <div className="flex items-center gap-3 mb-3">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", currentTheme.iconWrapper)}>
                    <Icon className={cn("h-5 w-5", currentTheme.text)} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={cn("text-2xl font-bold", currentTheme.text)}>
                        {value}
                    </p>
                </div>
            </div>
            <p className="text-xs text-gray-500">{description}</p>
        </Card>
    );
}