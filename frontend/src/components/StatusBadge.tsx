import React from 'react';
import { Badge } from './Badge';

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getVariant = (s: string) => {
    switch (s.toUpperCase()) {
      case 'ACCEPTED': case 'CONFIRMED': case 'COMPLETED': return 'success';
      case 'PENDING': case 'PAYMENT_PENDING': return 'warning';
      case 'REJECTED': case 'CANCELLED': return 'danger';
      case 'COUNTER_OFFERED': return 'info';
      default: return 'secondary';
    }
  };
  return <Badge variant={getVariant(status)}>{status.replace('_', ' ')}</Badge>;
};
