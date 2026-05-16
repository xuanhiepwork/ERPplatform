import React from 'react';
import { Truck, Monitor, Building2, Factory, Sofa, Package } from 'lucide-react';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'vehicle': return <Truck className="h-5 w-5" />;
    case 'it-equipment': return <Monitor className="h-5 w-5" />;
    case 'building': return <Building2 className="h-5 w-5" />;
    case 'machinery': return <Factory className="h-5 w-5" />;
    case 'furniture': return <Sofa className="h-5 w-5" />;
    default: return <Package className="h-5 w-5" />;
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'vehicle': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'it-equipment': return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'building': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'machinery': return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'furniture': return 'bg-green-100 text-green-700 border-green-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'excellent': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'good': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'fair': return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'poor': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'under-maintenance': return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'disposed': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'retired': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};