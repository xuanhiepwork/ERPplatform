import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '@/services/financeService';
import { FileText, DollarSign, Wrench, CheckCircle2, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/components/ui/utils';
import { Asset } from './types';
import { formatCurrency, getCategoryColor, getCategoryIcon, getConditionColor, getStatusColor } from './utils';
import { AssetLifecycleChart } from './AssetLifecycleChart';

interface AssetDetailsModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AssetDetailsModal({ asset, isOpen, onClose }: AssetDetailsModalProps) {
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: '', type: '', cost: 0, status: 'scheduled' });

  const { data: maintenance = [], isLoading: isMaintenanceLoading } = useQuery({
    queryKey: ['asset', 'maintenance', asset?.id],
    enabled: !!asset,
    queryFn: () => financeApi.getAssetMaintenance(asset!.id),
  });

  const addMutation = useMutation({
    mutationFn: (payload: any) => financeApi.addAssetMaintenance(asset!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asset', 'maintenance', asset!.id] });
      setShowAdd(false);
    }
  });

  if (!asset || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getCategoryColor(asset.category))}>
              {getCategoryIcon(asset.category)}
            </div>
            {asset.name}
          </DialogTitle>
          <DialogDescription>
            Asset Code: {asset.assetCode} · Serial: {asset.serialNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <AssetLifecycleChart asset={asset} />
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-5 border-l-4 border-l-blue-600">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Asset Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <Badge className={getCategoryColor(asset.category)}>{asset.category.replace('-', ' ').toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{asset.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned To:</span>
                  <span className="font-medium text-gray-900">{asset.assignedTo || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supplier:</span>
                  <span className="font-medium text-gray-900">{asset.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <Badge className={getConditionColor(asset.condition)}>{asset.condition.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(asset.status)}>{asset.status.replace('-', ' ').toUpperCase()}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-l-4 border-l-emerald-600">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" /> Financial Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-medium text-gray-900">{new Date(asset.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Value:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(asset.originalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Depreciation Rate:</span>
                  <span className="font-medium text-gray-900">{asset.depreciationRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Useful Life:</span>
                  <span className="font-medium text-gray-900">{asset.usefulLife} years</span>
                </div>
                {asset.warrantyExpiry && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warranty Expiry:</span>
                    <span className="font-medium text-gray-900">{new Date(asset.warrantyExpiry).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card className="p-5 border-l-4 border-l-amber-600">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-amber-600" /> Maintenance History
            </h4>
            {isMaintenanceLoading ? (
              <p className="text-gray-500 text-sm">Loading maintenance...</p>
            ) : (maintenance && maintenance.length > 0 ? (
              <div className="space-y-3">
                {maintenance.map((record: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-10 w-10 rounded-full flex items-center justify-center',
                        record.status === 'completed' ? 'bg-emerald-100' :
                          record.status === 'scheduled' ? 'bg-blue-100' : 'bg-red-100'
                      )}>
                        {record.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        {record.status === 'scheduled' && <Clock className="h-5 w-5 text-blue-600" />}
                        {record.status === 'overdue' && <AlertCircle className="h-5 w-5 text-red-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.type}</p>
                        <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(record.cost)}</p>
                      <Badge className={cn(
                        'mt-1',
                        record.status === 'completed' && 'bg-emerald-100 text-emerald-700 border-emerald-300',
                        record.status === 'scheduled' && 'bg-blue-100 text-blue-700 border-blue-300',
                        record.status === 'overdue' && 'bg-red-100 text-red-700 border-red-300'
                      )}>
                        {record.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No maintenance history recorded</p>
            ))}

            {showAdd ? (
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Type (e.g., Inspection)" />
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <Input type="number" value={String(form.cost)} onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} placeholder="Cost" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => addMutation.mutate(form)} className="bg-amber-600 hover:bg-amber-700">Add</Button>
                  <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <Button variant="outline" onClick={() => setShowAdd(true)} className="border-amber-600 text-amber-700 hover:bg-amber-50">
                  <Wrench className="h-4 w-4 mr-2" /> Schedule Maintenance
                </Button>
              </div>
            )}
          </Card>

          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" /> Generate Asset Report
            </Button>
            <Button variant="outline" className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50">
              <Wrench className="h-4 w-4 mr-2" /> Schedule Maintenance
            </Button>
            <Button variant="outline" className="flex-1 border-red-600 text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" /> Initiate Disposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}