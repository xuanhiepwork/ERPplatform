import { ReactNode } from 'react';

export interface ChartPayload<TPayload = Record<string, unknown>> {
    color?: string;
    fill?: string;
    name?: string;
    value?: number;
    payload: TPayload;
}

export interface TooltipProps<TPayload = Record<string, unknown>> {
    active?: boolean;
    payload?: ChartPayload<TPayload>[];
    label?: ReactNode;
}
