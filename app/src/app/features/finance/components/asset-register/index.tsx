import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/services/financeService';
import { Package, Search, Filter, Download, Plus, Eye, Trash2, Wrench, Calendar, DollarSign, BarChart3, TrendingDown, CheckCircle2, AlertCircle, Clock, Cpu } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { cn } from '@/app/components/ui/utils';

import { Asset } from './types';
import { formatCurrency, getCategoryColor, getCategoryIcon, getConditionColor } from './utils';
import { AssetDetailsModal } from './AssetDetailsModal';

export function AssetRegister() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { data: assetsData } = useQuery({
    queryKey: ['finance', 'assets'],
    queryFn: () => financeApi.getAssets(),
  });

  const assets: Asset[] = useMemo(() => {
    return (assetsData ?? []).map((a: any) => ({
      id: a.asset_id || a.id || `ast-${a.asset_code || Math.random().toString(36).slice(2, 8)}`,
      assetCode: a.asset_code || a.assetCode || '',
      name: a.name || 'Unknown Asset',
      category: a.category || 'other',
      purchaseDate: a.purchase_date || a.purchaseDate || '',
      originalValue: Number(a.original_value || a.originalValue || 0),
      depreciationMethod: a.depreciation_method || a.depreciationMethod || 'straight-line',
      depreciationRate: Number(a.depreciation_rate || a.depreciationRate || 0),
      usefulLife: Number(a.useful_life || a.usefulLife || 5),
      currentBookValue: Number(a.current_book_value || a.currentBookValue || 0),
      accumulatedDepreciation: Number(a.accumulated_depreciation || a.accumulatedDepreciation || 0),
      location: a.location || '',
      condition: a.condition || 'good',
      nextMaintenance: a.next_maintenance || a.nextMaintenance || '',
      lastMaintenance: a.last_maintenance || a.lastMaintenance || '',
      maintenanceHistory: a.maintenanceHistory || a.maintenance_history || [],
      status: a.status || 'active',
      assignedTo: a.assigned_to || a.assignedTo || '',
      serialNumber: a.serial_number || a.serialNumber || '',
      supplier: a.supplier || '',
      warrantyExpiry: a.warranty_expiry || a.warrantyExpiry || '',
    }));
  }, [assetsData]);

  const { totalAssetValue, totalBookValue, totalDepreciation, activeAssets, maintenanceDue } = useMemo(() => {
    const totalAssetValue = assets.reduce((sum, a) => sum + a.originalValue, 0);
    const totalBookValue = assets.reduce((sum, a) => sum + a.currentBookValue, 0);
    const totalDepreciation = assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
    const activeAssets = assets.filter((a) => a.status === 'active').length;

    const maintenanceDue = assets.filter((a) => {
      if (!a.nextMaintenance) return false;
      const daysUntil = Math.floor((new Date(a.nextMaintenance).getTime() - new Date('2026-04-20').getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 30 && daysUntil >= 0;
    });

    return { totalAssetValue, totalBookValue, totalDepreciation, activeAssets, maintenanceDue };
  }, [assets]);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) || asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [assets, searchTerm, filterCategory, filterStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-700 flex items-center justify-center">
              <Package className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fixed Asset & Depreciation Register</h1>
              <p className="text-sm text-gray-600">Comprehensive asset tracking, depreciation management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-300"><Download className="h-4 w-4 mr-2" /> Export</Button>
            <Button className="bg-slate-700 hover:bg-slate-800"><Plus className="h-4 w-4 mr-2" /> Add Asset</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-5 border-l-4 border-l-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center"><Package className="h-6 w-6 text-slate-700" /></div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Assets</p>
                <p className="text-xl font-bold text-gray-900">{assets.length}</p>
                <p className="text-xs text-slate-600 font-semibold mt-1">{activeAssets} Active</p>
              </div>
            </div>
          </Card>
          {/* ... (Các thẻ Book Value, Depreciation ... sao chép tương tự) */}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-64 bg-white"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vehicle">Vehicles</SelectItem>
              <SelectItem value="it-equipment">IT Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Asset Table */}
      <Card className="border-2 border-gray-200 shadow-lg mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 border-b-2 border-slate-800">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">Asset Details</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">Purchase Date</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">Original Value</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">Current Book Value</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getCategoryColor(asset.category))}>
                        {getCategoryIcon(asset.category)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">{asset.assetCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">{new Date(asset.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4"><p className="text-sm font-bold text-gray-900">{formatCurrency(asset.originalValue)}</p></td>
                  <td className="px-4 py-4"><p className="text-sm font-bold text-emerald-600">{formatCurrency(asset.currentBookValue)}</p></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-600" onClick={() => setSelectedAsset(asset)}><Eye className="h-4 w-4 mr-1" />View</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AssetDetailsModal asset={selectedAsset} isOpen={!!selectedAsset} onClose={() => setSelectedAsset(null)} />
    </div>
  );
}