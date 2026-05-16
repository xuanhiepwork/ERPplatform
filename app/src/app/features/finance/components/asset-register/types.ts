export interface MaintenanceRecord {
  date: string;
  type: string;
  cost: number;
  status: 'completed' | 'scheduled' | 'overdue';
}

export interface Asset {
  id: string;
  assetCode: string;
  name: string;
  category: 'vehicle' | 'it-equipment' | 'building' | 'machinery' | 'furniture' | 'other';
  purchaseDate: string;
  originalValue: number;
  depreciationMethod: 'straight-line' | 'declining-balance' | 'units-of-production';
  depreciationRate: number;
  usefulLife: number;
  currentBookValue: number;
  accumulatedDepreciation: number;
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  nextMaintenance: string;
  lastMaintenance?: string;
  maintenanceHistory: MaintenanceRecord[];
  status: 'active' | 'under-maintenance' | 'disposed' | 'retired';
  assignedTo?: string;
  serialNumber: string;
  supplier: string;
  warrantyExpiry?: string;
}