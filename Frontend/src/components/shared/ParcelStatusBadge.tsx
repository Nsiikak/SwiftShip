import React from 'react';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';

interface ParcelStatusBadgeProps {
  status: string;
  className?: string;
}

const ParcelStatusBadge: React.FC<ParcelStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', className: 'bg-gray-100 text-gray-800 hover:bg-gray-200' };
      case 'picked_up':
        return { label: 'Picked Up', className: 'bg-blue-100 text-blue-800 hover:bg-blue-200' };
      case 'in_transit':
        return { label: 'In Transit', className: 'bg-amber-100 text-amber-800 hover:bg-amber-200' };
      case 'out_for_delivery':
        return { label: 'Out for Delivery', className: 'bg-purple-100 text-purple-800 hover:bg-purple-200' };
      case 'delivered':
        return { label: 'Delivered', className: 'bg-green-100 text-green-800 hover:bg-green-200' };
      case 'failed':
        return { label: 'Failed Delivery', className: 'bg-red-100 text-red-800 hover:bg-red-200' };
      default:
        return { label: status.replace('_', ' '), className: 'bg-gray-100 text-gray-800 hover:bg-gray-200' };
    }
  };

  const { label, className: statusClassName } = getStatusConfig();

  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium', statusClassName, className)}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Badge>
  );
};

export default ParcelStatusBadge;
