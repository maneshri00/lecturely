export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount == null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

export const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const timeAgo = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const getDayName = (dayOfWeek: number): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[dayOfWeek] || 'Unknown';
};

export const calculateFeeDetails = (baseFee: number | undefined | null) => {
  const fee = Number(baseFee) || 5000;
  const platformFee = Math.round(fee * 0.10);
  const totalFee = fee + platformFee;
  return {
    baseFee: fee,
    platformFee,
    totalFee,
    displayText: `${formatCurrency(totalFee)} (incl. 10% platform fee)`,
    breakdownText: `${formatCurrency(fee)} base + ${formatCurrency(platformFee)} platform fee (10%) = ${formatCurrency(totalFee)} total`
  };
};

export const getServiceFee = (expert: any, serviceType?: string): number => {
  if (!expert) return 5000;
  const baseFee = Number(expert.sessionFee) || 5000;
  if (!serviceType) return baseFee;

  // 1. Check if expert configured custom pricing for this specific service
  if (expert.servicePricing && expert.servicePricing[serviceType] != null) {
    return Number(expert.servicePricing[serviceType]);
  }

  // 2. Default dynamic multi-tiered ratios relative to base session fee
  switch (serviceType) {
    case 'GUEST_LECTURE':
      return baseFee;
    case 'MENTORSHIP':
      return Math.round(baseFee * 0.3); // 1-on-1 Mentor
    case 'PERSONAL_TUTOR':
      return Math.round(baseFee * 0.4); // Personal Tutor
    case 'RESEARCH_ADVISOR':
      return Math.round(baseFee * 0.7); // Research Advisor
    case 'WORKSHOP_TRAINER':
      return Math.round(baseFee * 1.6); // Workshop Trainer
    default:
      return baseFee;
  }
};
