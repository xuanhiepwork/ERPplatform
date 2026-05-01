import { useState } from 'react';
import {
  Package,
  TrendingDown,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Trash2,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  Monitor,
  Building2,
  Cpu,
  Sofa,
  Factory,
  FileText,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { cn } from './ui/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface MaintenanceRecord {
  date: string;
  type: string;
  cost: number;
  status: 'completed' | 'scheduled' | 'overdue';
}

interface Asset {
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

const assets: Asset[] = [
  {
    id: 'ast-001',
    assetCode: 'VEH-2024-001',
    name: 'Ford Transit Delivery Van',
    category: 'vehicle',
    purchaseDate: '2024-01-15',
    originalValue: 45000,
    depreciationMethod: 'declining-balance',
    depreciationRate: 20,
    usefulLife: 8,
    currentBookValue: 36000,
    accumulatedDepreciation: 9000,
    location: 'Fleet Garage',
    condition: 'excellent',
    nextMaintenance: '2026-05-15',
    lastMaintenance: '2026-03-15',
    status: 'active',
    assignedTo: 'Logistics Department',
    serialNumber: '1FTBW3XM7PKA12345',
    supplier: 'Ford Commercial Vehicles',
    warrantyExpiry: '2027-01-15',
    maintenanceHistory: [
      { date: '2026-03-15', type: 'Oil Change & Inspection', cost: 250, status: 'completed' },
      { date: '2025-11-15', type: 'Tire Replacement', cost: 800, status: 'completed' },
    ],
  },
  {
    id: 'ast-002',
    assetCode: 'IT-2023-045',
    name: 'Dell PowerEdge R740 Server',
    category: 'it-equipment',
    purchaseDate: '2023-06-10',
    originalValue: 8500,
    depreciationMethod: 'straight-line',
    depreciationRate: 25,
    usefulLife: 4,
    currentBookValue: 4462,
    accumulatedDepreciation: 4038,
    location: 'Data Center - Rack A3',
    condition: 'good',
    nextMaintenance: '2026-06-10',
    lastMaintenance: '2025-12-10',
    status: 'active',
    assignedTo: 'IT Infrastructure',
    serialNumber: 'SRV-DL-R740-8945',
    supplier: 'Dell Technologies',
    warrantyExpiry: '2026-06-10',
    maintenanceHistory: [
      { date: '2025-12-10', type: 'Hardware Inspection', cost: 150, status: 'completed' },
      { date: '2025-06-10', type: 'Cooling System Maintenance', cost: 300, status: 'completed' },
    ],
  },
  {
    id: 'ast-003',
    assetCode: 'BLD-2020-001',
    name: 'Corporate Office Building',
    category: 'building',
    purchaseDate: '2020-03-01',
    originalValue: 2500000,
    depreciationMethod: 'straight-line',
    depreciationRate: 2.5,
    usefulLife: 40,
    currentBookValue: 2343750,
    accumulatedDepreciation: 156250,
    location: '123 Business Park Drive',
    condition: 'excellent',
    nextMaintenance: '2026-07-01',
    lastMaintenance: '2026-01-15',
    status: 'active',
    assignedTo: 'Facilities Management',
    serialNumber: 'BLD-HQ-2020',
    supplier: 'Premier Construction Inc.',
    maintenanceHistory: [
      { date: '2026-01-15', type: 'HVAC System Inspection', cost: 2500, status: 'completed' },
      { date: '2025-09-20', type: 'Roof Inspection', cost: 1200, status: 'completed' },
    ],
  },
  {
    id: 'ast-004',
    assetCode: 'MCH-2022-012',
    name: 'CNC Milling Machine',
    category: 'machinery',
    purchaseDate: '2022-08-20',
    originalValue: 125000,
    depreciationMethod: 'units-of-production',
    depreciationRate: 15,
    usefulLife: 10,
    currentBookValue: 81250,
    accumulatedDepreciation: 43750,
    location: 'Manufacturing Floor - Bay 3',
    condition: 'good',
    nextMaintenance: '2026-04-25',
    lastMaintenance: '2026-02-10',
    status: 'under-maintenance',
    assignedTo: 'Production Department',
    serialNumber: 'CNC-HAA5-2022-M',
    supplier: 'Haas Automation',
    warrantyExpiry: '2025-08-20',
    maintenanceHistory: [
      { date: '2026-04-25', type: 'Scheduled Calibration', cost: 1500, status: 'scheduled' },
      { date: '2026-02-10', type: 'Spindle Replacement', cost: 3200, status: 'completed' },
    ],
  },
  {
    id: 'ast-005',
    assetCode: 'FUR-2023-089',
    name: 'Executive Conference Table',
    category: 'furniture',
    purchaseDate: '2023-11-05',
    originalValue: 3500,
    depreciationMethod: 'straight-line',
    depreciationRate: 10,
    usefulLife: 10,
    currentBookValue: 2975,
    accumulatedDepreciation: 525,
    location: 'Executive Board Room - 5th Floor',
    condition: 'excellent',
    nextMaintenance: '2026-11-05',
    status: 'active',
    assignedTo: 'Executive Office',
    serialNumber: 'TBL-EXE-2023-89',
    supplier: 'Corporate Furniture Solutions',
    warrantyExpiry: '2028-11-05',
    maintenanceHistory: [
      { date: '2025-11-05', type: 'Polish & Inspection', cost: 100, status: 'completed' },
    ],
  },
  {
    id: 'ast-006',
    assetCode: 'VEH-2021-008',
    name: 'Toyota Forklift 8FGU25',
    category: 'vehicle',
    purchaseDate: '2021-04-10',
    originalValue: 28000,
    depreciationMethod: 'declining-balance',
    depreciationRate: 18,
    usefulLife: 10,
    currentBookValue: 15848,
    accumulatedDepreciation: 12152,
    location: 'Warehouse - Loading Bay',
    condition: 'fair',
    nextMaintenance: '2026-04-22',
    lastMaintenance: '2026-01-22',
    status: 'active',
    assignedTo: 'Warehouse Operations',
    serialNumber: 'FRK-TYT-8FGU-2021',
    supplier: 'Toyota Material Handling',
    warrantyExpiry: '2024-04-10',
    maintenanceHistory: [
      { date: '2026-04-22', type: 'Battery Check & Service', cost: 450, status: 'overdue' },
      { date: '2026-01-22', type: 'Hydraulic System Service', cost: 650, status: 'completed' },
    ],
  },
  {
    id: 'ast-007',
    assetCode: 'IT-2025-112',
    name: 'MacBook Pro 16" (M3 Max)',
    category: 'it-equipment',
    purchaseDate: '2025-09-15',
    originalValue: 3499,
    depreciationMethod: 'straight-line',
    depreciationRate: 33.33,
    usefulLife: 3,
    currentBookValue: 2916,
    accumulatedDepreciation: 583,
    location: 'Design Department',
    condition: 'excellent',
    nextMaintenance: '2026-09-15',
    status: 'active',
    assignedTo: 'Sarah Chen - Senior Designer',
    serialNumber: 'MBP-M3-2025-112',
    supplier: 'Apple Inc.',
    warrantyExpiry: '2028-09-15',
    maintenanceHistory: [],
  },
  {
    id: 'ast-008',
    assetCode: 'MCH-2019-003',
    name: 'Industrial Air Compressor',
    category: 'machinery',
    purchaseDate: '2019-05-20',
    originalValue: 15000,
    depreciationMethod: 'straight-line',
    depreciationRate: 10,
    usefulLife: 10,
    currentBookValue: 4500,
    accumulatedDepreciation: 10500,
    location: 'Maintenance Shop',
    condition: 'poor',
    nextMaintenance: '2026-05-01',
    lastMaintenance: '2025-11-15',
    status: 'active',
    assignedTo: 'Maintenance Team',
    serialNumber: 'COMP-IND-2019-03',
    supplier: 'Atlas Copco',
    maintenanceHistory: [
      { date: '2026-05-01', type: 'Annual Inspection', cost: 500, status: 'scheduled' },
      { date: '2025-11-15', type: 'Pressure Valve Replacement', cost: 850, status: 'completed' },
    ],
  },
  {
    id: 'ast-009',
    assetCode: 'FUR-2024-034',
    name: 'Herman Miller Aeron Chairs (Set of 25)',
    category: 'furniture',
    purchaseDate: '2024-03-12',
    originalValue: 25000,
    depreciationMethod: 'straight-line',
    depreciationRate: 10,
    usefulLife: 10,
    currentBookValue: 22500,
    accumulatedDepreciation: 2500,
    location: 'Open Office - 3rd Floor',
    condition: 'excellent',
    nextMaintenance: '2027-03-12',
    status: 'active',
    assignedTo: 'General Office',
    serialNumber: 'CHR-HM-AERON-2024',
    supplier: 'Herman Miller',
    warrantyExpiry: '2036-03-12',
    maintenanceHistory: [],
  },
  {
    id: 'ast-010',
    assetCode: 'VEH-2018-002',
    name: 'Mercedes Sprinter Cargo Van',
    category: 'vehicle',
    purchaseDate: '2018-07-08',
    originalValue: 52000,
    depreciationMethod: 'declining-balance',
    depreciationRate: 20,
    usefulLife: 8,
    currentBookValue: 13824,
    accumulatedDepreciation: 38176,
    location: 'Fleet Garage',
    condition: 'fair',
    nextMaintenance: '2026-04-30',
    lastMaintenance: '2026-02-15',
    status: 'active',
    assignedTo: 'Field Service Team',
    serialNumber: 'MB-SPR-2018-002',
    supplier: 'Mercedes-Benz Commercial',
    maintenanceHistory: [
      { date: '2026-02-15', type: 'Transmission Service', cost: 1200, status: 'completed' },
      { date: '2025-10-30', type: 'Brake Pad Replacement', cost: 650, status: 'completed' },
    ],
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'vehicle':
      return <Truck className="h-5 w-5" />;
    case 'it-equipment':
      return <Monitor className="h-5 w-5" />;
    case 'building':
      return <Building2 className="h-5 w-5" />;
    case 'machinery':
      return <Factory className="h-5 w-5" />;
    case 'furniture':
      return <Sofa className="h-5 w-5" />;
    default:
      return <Package className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'vehicle':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'it-equipment':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'building':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'machinery':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'furniture':
      return 'bg-green-100 text-green-700 border-green-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'excellent':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'good':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'fair':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'poor':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'under-maintenance':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'disposed':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'retired':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

function AssetLifecycleChart({ asset }: { asset: Asset }) {
  const purchaseYear = new Date(asset.purchaseDate).getFullYear();
  const currentYear = 2026;
  const yearsOwned = currentYear - purchaseYear;
  
  // Generate lifecycle data
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
      // Units of production - simplified
      const annualDepreciation = asset.originalValue / asset.usefulLife;
      bookValue = Math.max(0, asset.originalValue - (annualDepreciation * i));
    }
    
    lifecycleData.push({
      year: purchaseYear + i,
      value: Math.round(bookValue),
      isCurrent: i === yearsOwned,
    });
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-600">
          <p className="font-semibold text-gray-900">Year {payload[0].payload.year}</p>
          <p className="text-sm text-blue-600 font-bold">
            Book Value: {formatCurrency(payload[0].value)}
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
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#9ca3af' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3}
              fill="url(#colorValue)" 
            />
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

function AssetDetailsModal({ asset, isOpen, onClose }: { asset: Asset | null; isOpen: boolean; onClose: () => void }) {
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
          {/* Asset Lifecycle Chart */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <AssetLifecycleChart asset={asset} />
          </Card>

          {/* Asset Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-5 border-l-4 border-l-blue-600">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Asset Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <Badge className={getCategoryColor(asset.category)}>
                    {asset.category.replace('-', ' ').toUpperCase()}
                  </Badge>
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
                  <Badge className={getConditionColor(asset.condition)}>
                    {asset.condition.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(asset.status)}>
                    {asset.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-l-4 border-l-emerald-600">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Financial Details
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
                  <span className="text-gray-600">Depreciation Method:</span>
                  <span className="font-medium text-blue-600">
                    {asset.depreciationMethod === 'straight-line' ? 'Straight-Line' : 
                     asset.depreciationMethod === 'declining-balance' ? 'Declining Balance' : 
                     'Units of Production'}
                  </span>
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

          {/* Maintenance History */}
          <Card className="p-5 border-l-4 border-l-amber-600">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-amber-600" />
              Maintenance History
            </h4>
            {asset.maintenanceHistory.length > 0 ? (
              <div className="space-y-3">
                {asset.maintenanceHistory.map((record, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-10 w-10 rounded-full flex items-center justify-center',
                        record.status === 'completed' ? 'bg-emerald-100' :
                        record.status === 'scheduled' ? 'bg-blue-100' :
                        'bg-red-100'
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
            )}
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Asset Report
            </Button>
            <Button variant="outline" className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50">
              <Wrench className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="flex-1 border-red-600 text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Initiate Disposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AssetRegister() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Calculate metrics
  const totalAssetValue = assets.reduce((sum, a) => sum + a.originalValue, 0);
  const totalBookValue = assets.reduce((sum, a) => sum + a.currentBookValue, 0);
  const totalDepreciation = assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
  const activeAssets = assets.filter(a => a.status === 'active').length;

  const maintenanceDue = assets.filter(a => {
    const nextDate = new Date(a.nextMaintenance);
    const today = new Date('2026-04-20');
    const daysUntil = Math.floor((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil >= 0;
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">
                Fixed Asset & Depreciation Register
              </h1>
              <p className="text-sm text-gray-600">
                Comprehensive asset tracking, depreciation management, and lifecycle monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export Register
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Add New Asset
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-5 border-l-4 border-l-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Assets</p>
                <p className="text-xl font-bold text-gray-900">{assets.length}</p>
                <p className="text-xs text-slate-600 font-semibold mt-1">{activeAssets} Active</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Asset Value</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalAssetValue)}</p>
                <p className="text-xs text-gray-500 mt-1">Original purchase value</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Current Book Value</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalBookValue)}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Net asset value</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-red-600">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total Depreciation</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalDepreciation)}</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Accumulated</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Maintenance Alert */}
        {maintenanceDue.length > 0 && (
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-500 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900">Upcoming Maintenance Alert</h3>
                <p className="text-sm text-amber-700">
                  {maintenanceDue.length} asset{maintenanceDue.length > 1 ? 's require' : ' requires'} maintenance within 30 days
                </p>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by asset name, code, or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-64">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vehicle">Vehicles</SelectItem>
              <SelectItem value="it-equipment">IT Equipment</SelectItem>
              <SelectItem value="building">Buildings</SelectItem>
              <SelectItem value="machinery">Machinery</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-64">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
              <SelectItem value="disposed">Disposed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Asset Table */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 border-b-2 border-slate-800">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Original Value
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Depreciation Method
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Current Book Value
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => {
                const nextDate = new Date(asset.nextMaintenance);
                const today = new Date('2026-04-20');
                const daysUntil = Math.floor((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isMaintenanceDue = daysUntil <= 30 && daysUntil >= 0;
                const isOverdue = daysUntil < 0;

                return (
                  <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getCategoryColor(asset.category))}>
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{asset.name}</p>
                          <p className="text-xs text-gray-500">{asset.assetCode}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={cn('text-xs', getCategoryColor(asset.category))}>
                              {asset.category.replace('-', ' ')}
                            </Badge>
                            <Badge className={cn('text-xs', getConditionColor(asset.condition))}>
                              {asset.condition}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(asset.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.floor((new Date('2026-04-20').getTime() - new Date(asset.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years ago
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(asset.originalValue)}</p>
                      <p className="text-xs text-gray-500">Purchase price</p>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300 mb-1">
                          {asset.depreciationMethod === 'straight-line' ? 'Straight-Line' : 
                           asset.depreciationMethod === 'declining-balance' ? 'Declining Balance' : 
                           'Units of Production'}
                        </Badge>
                        <p className="text-xs text-gray-600">{asset.depreciationRate}% annual rate</p>
                        <p className="text-xs text-gray-500">{asset.usefulLife} year useful life</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-bold text-emerald-600">{formatCurrency(asset.currentBookValue)}</p>
                        <p className="text-xs text-gray-500">
                          Depreciation: {formatCurrency(asset.accumulatedDepreciation)}
                        </p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                            style={{ width: `${(asset.currentBookValue / asset.originalValue) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-2">
                        <div className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0',
                          isOverdue ? 'bg-red-100' : isMaintenanceDue ? 'bg-amber-100' : 'bg-emerald-100'
                        )}>
                          {isOverdue ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                           isMaintenanceDue ? <Clock className="h-4 w-4 text-amber-600" /> :
                           <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        </div>
                        <div>
                          <p className={cn(
                            'text-sm font-medium',
                            isOverdue ? 'text-red-700' : isMaintenanceDue ? 'text-amber-700' : 'text-gray-900'
                          )}>
                            {new Date(asset.nextMaintenance).toLocaleDateString()}
                          </p>
                          <p className={cn(
                            'text-xs',
                            isOverdue ? 'text-red-600 font-semibold' : 
                            isMaintenanceDue ? 'text-amber-600 font-semibold' : 
                            'text-gray-500'
                          )}>
                            {isOverdue ? `${Math.abs(daysUntil)} days overdue` :
                             isMaintenanceDue ? `Due in ${daysUntil} days` :
                             `In ${daysUntil} days`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Summary */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <Card className="p-5 border-l-4 border-l-purple-600">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-600" />
            Assets by Category
          </h3>
          <div className="space-y-3">
            {['vehicle', 'it-equipment', 'building', 'machinery', 'furniture'].map((category) => {
              const categoryAssets = assets.filter(a => a.category === category);
              const categoryValue = categoryAssets.reduce((sum, a) => sum + a.currentBookValue, 0);
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center', getCategoryColor(category))}>
                      {getCategoryIcon(category)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {category.replace('-', ' ').charAt(0).toUpperCase() + category.replace('-', ' ').slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{categoryAssets.length} assets</p>
                    <p className="text-xs text-gray-600">{formatCurrency(categoryValue)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-600">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-amber-600" />
            Maintenance Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">Overdue</span>
              </div>
              <span className="text-lg font-bold text-red-900">
                {assets.filter(a => {
                  const days = Math.floor((new Date(a.nextMaintenance).getTime() - new Date('2026-04-20').getTime()) / (1000 * 60 * 60 * 24));
                  return days < 0;
                }).length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Due Soon (30 days)</span>
              </div>
              <span className="text-lg font-bold text-amber-900">{maintenanceDue.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Up to Date</span>
              </div>
              <span className="text-lg font-bold text-emerald-900">
                {assets.filter(a => {
                  const days = Math.floor((new Date(a.nextMaintenance).getTime() - new Date('2026-04-20').getTime()) / (1000 * 60 * 60 * 24));
                  return days > 30;
                }).length}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Asset Details Modal */}
      <AssetDetailsModal
        asset={selectedAsset}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}
