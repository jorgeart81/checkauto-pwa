export type VehicleType = 'truck' | 'sedan' | 'bike';
export type VehicleStatusLevel = 'optimal' | 'warning' | 'critical';

export interface AlertLegal {
  title: string;
  desc: string;
  badge: string;
  critical: boolean;
}

export interface AlertService {
  title: string;
  condition: string;
  target: string;
  progress: number;
  warn: boolean;
}

export interface MaintenancePlan {
  title: string;
  intervalText: string;
  nextService: string;
  nextServiceMeta: string;
  tasks: string[];
}

export interface Vehicle {
  id: string;
  alias: string;
  plate: string;
  type: VehicleType;
  origin: string;
  unit: 'mi' | 'km';
  secondaryUnit: 'mi' | 'km';
  ratio: number;
  fuelType: string;
  odometer: number;
  monthlyExpense: string;
  efficiency: string;
  efficiencyUnit: string;
  efficiencyAlt: string;
  costPerDist: string;
  costUnit: string;
  statusLevel: VehicleStatusLevel;
  statusBadge: string;
  statusText: string;
  alerts: {
    legal: AlertLegal;
    service: AlertService;
  };
  plan: MaintenancePlan;
}

export interface DocumentItem {
  id: string;
  vehicleId: string;
  vehicleAlias: string;
  type: 'soat' | 'citv' | 'insurance' | 'tiv';
  title: string;
  subtitle: string;
  status: 'valid' | 'expiring' | 'expired';
  statusBadge: string;
  expiryDate?: string;
  details: { label: string; value: string }[];
  primaryAction?: { label: string; icon: string; tel?: string; action?: string };
}
