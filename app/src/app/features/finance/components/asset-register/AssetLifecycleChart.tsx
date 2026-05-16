import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/app/components/ui/badge';
import { TooltipProps } from '@/app/types/charts';
import { Asset } from './types';
import { formatCurrency } from './utils';

export function AssetLifecycleChart({ asset }: { asset: Asset }) {
  const purchaseYear = new Date(asset.purchaseDate).getFullYear();
  const currentYear = 2026;
  const yearsOwned = currentYear - purchaseYear;

  const lifecycleData = [];
  for (let i = 0; i <= Math.min(yearsOwned + 3, asset.usefulLife); i++) {
    let bookValue;

    if (asset.depreciationMethod === 'straight-line') {
      const annualDepreciation = asset.originalValue / asset.usefulLife;
      bookValue = Math.max(0, asset.originalValue - (annualDepreciation * i));
    } else if (asset.depreciationMethod === 'declining-balance') {
      const rate = asset.depreciationRate / 100;
      bookValue = asset.originalValue * Math.pow(1 - rate, i);
    } else {
      const annualDepreciation = asset.originalValue / asset.usefulLife;
      bookValue = Math.max(0, asset.originalValue - (annualDepreciation * i));
    }

    lifecycleData.push({
      year: purchaseYear + i,
      value: Math.round(bookValue),
      isCurrent: i === yearsOwned,
    });
  }

  const CustomTooltip = ({ active, payload }: TooltipProps<{ year: number; isCurrent: boolean }>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-600">
          <p className="font-semibold text-gray-900">Year {payload[0].payload.year}</p>
          <p className="text-sm text-blue-600 font-bold">
            Book Value: {formatCurrency(Number(payload[0].value ?? 0))}
          </p>
          {payload[0].payload.isCurrent && (
            <Badge className="mt-1 bg-blue-100 text-blue-700 border-blue-300">Current</Badge>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Asset Lifecycle - Book Value Over Time</h4>
        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
          {asset.depreciationMethod === 'straight-line' ? 'Straight-Line Method' :
            asset.depreciationMethod === 'declining-balance' ? 'Declining Balance Method' :
              'Units of Production'}
        </Badge>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lifecycleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#9ca3af' }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#9ca3af' }} tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
            <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 pt-4 border-t">
        <div>
          <p className="text-xs text-gray-600">Original Value</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(asset.originalValue)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Current Book Value</p>
          <p className="text-lg font-bold text-blue-600">{formatCurrency(asset.currentBookValue)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Accumulated Depreciation</p>
          <p className="text-lg font-bold text-red-600">{formatCurrency(asset.accumulatedDepreciation)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Useful Life Remaining</p>
          <p className="text-lg font-bold text-emerald-600">
            {Math.max(0, asset.usefulLife - yearsOwned)} years
          </p>
        </div>
      </div>
    </div>
  );
}