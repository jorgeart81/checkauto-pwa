import { Injectable } from '@angular/core';
import { FleetRepository } from '@/core/repositories/fleet.repository';
import { Vehicle } from '@/models/vehicle.model';

const STORAGE_KEY_FLEET = 'checkauto_fleet';
const STORAGE_KEY_ACTIVE = 'checkauto_active_vehicle';

const INITIAL_FLEET: Vehicle[] = [
  {
    id: 'ford-f150',
    alias: 'Ford F-150 2021 [USA]',
    plate: 'BHY-892',
    type: 'truck',
    origin: 'USA Import',
    unit: 'mi',
    secondaryUnit: 'km',
    ratio: 1.60934,
    fuelType: 'Gasolina Regular',
    odometer: 54230,
    monthlyExpense: '$342.50 USD',
    efficiency: '22.4',
    efficiencyUnit: 'MPG',
    efficiencyAlt: '36.1 km/gal',
    costPerDist: '$0.21',
    costUnit: '/ mi',
    statusLevel: 'critical',
    statusBadge: '1 ALERTA',
    statusText: 'SOAT vence en 8 días',
    alerts: {
      legal: {
        title: 'SOAT Obligatorio Pacífico',
        desc: 'Vence el 26 Mar 2026. Requiere renovación inmediata para evitar sanción.',
        badge: 'Vence en 8 días',
        critical: true,
      },
      service: {
        title: 'Cambio de Aceite 5W-30 & Filtro',
        condition: 'Faltan 450 mi ó 15 días',
        target: '55,000 mi',
        progress: 89,
        warn: true,
      },
    },
    plan: {
      title: 'Pauta Ford F-150 EcoBoost',
      intervalText: 'Cada 5,000 mi / 6m',
      nextService: 'Servicio 55,000 mi (88,000 km)',
      nextServiceMeta: 'En 770 mi ó 25 días (Abril 2026)',
      tasks: [
        'Aceite motor Motorcraft 5W-30 (6 qts)',
        'Inspección pastillas de freno delanteras/traseras',
        'Comprobación de líquido refrigerante',
      ],
    },
  },
  {
    id: 'toyota-corolla',
    alias: 'Toyota Corolla 2023',
    plate: 'AZF-104',
    type: 'sedan',
    origin: 'Local (Perú)',
    unit: 'km',
    secondaryUnit: 'mi',
    ratio: 0.621371,
    fuelType: 'Gasolina Premium',
    odometer: 28450,
    monthlyExpense: '$185.00 USD',
    efficiency: '14.2',
    efficiencyUnit: 'km/L',
    efficiencyAlt: '33.4 MPG',
    costPerDist: '$0.14',
    costUnit: '/ km',
    statusLevel: 'optimal',
    statusBadge: 'AL DÍA',
    statusText: 'Todo en regla',
    alerts: {
      legal: {
        title: 'Inspección Técnica Vehicular (CITV)',
        desc: 'Vigente hasta Octubre 2026.',
        badge: 'Vigente',
        critical: false,
      },
      service: {
        title: 'Mantenimiento Preventivo 30,000 km',
        condition: 'Faltan 1,550 km ó 45 días',
        target: '30,000 km',
        progress: 94,
        warn: false,
      },
    },
    plan: {
      title: 'Pauta Toyota Oficial',
      intervalText: 'Cada 10,000 km / 12m',
      nextService: 'Servicio 30,000 km',
      nextServiceMeta: 'En 1,550 km (Mayo 2026)',
      tasks: [
        'Aceite sintético 0W-20',
        'Filtro de aire de cabina y motor',
        'Rotación e inspección de neumáticos',
      ],
    },
  },
  {
    id: 'yamaha-mt07',
    alias: 'Yamaha MT-07 2022',
    plate: '7821-4B',
    type: 'bike',
    origin: 'Local (Perú)',
    unit: 'km',
    secondaryUnit: 'mi',
    ratio: 0.621371,
    fuelType: 'Gasolina Premium',
    odometer: 12450,
    monthlyExpense: '$92.00 USD',
    efficiency: '21.5',
    efficiencyUnit: 'km/L',
    efficiencyAlt: '50.6 MPG',
    costPerDist: '$0.09',
    costUnit: '/ km',
    statusLevel: 'warning',
    statusBadge: 'PRÓXIMO',
    statusText: 'Mantenimiento en 550 km',
    alerts: {
      legal: {
        title: 'SOAT Digital La Positiva',
        desc: 'Póliza vigente hasta Diciembre 2026.',
        badge: 'Vigente',
        critical: false,
      },
      service: {
        title: 'Lubricación & Tensión de Cadena',
        condition: 'Faltan 550 km ó 1 mes',
        target: '13,000 km',
        progress: 45,
        warn: false,
      },
    },
    plan: {
      title: 'Pauta Yamaha MT Oficial',
      intervalText: 'Cada 3,000 km / 3m',
      nextService: 'Servicio 15,000 km',
      nextServiceMeta: 'En 2,550 km',
      tasks: [
        'Aceite Yamalube 4T 10W-40',
        'Reglaje de holgura de válvulas',
        'Comprobación de pastillas de freno',
      ],
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class LocalStorageFleetRepository extends FleetRepository {
  async getVehicles(): Promise<Vehicle[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FLEET);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback to default initial fleet
    }
    return INITIAL_FLEET;
  }

  async getActiveVehicleId(): Promise<string> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (stored) {
        return stored;
      }
    } catch {
      // Fallback
    }
    return 'ford-f150';
  }

  async saveVehicle(vehicle: Vehicle): Promise<void> {
    const list = await this.getVehicles();
    const updated = [vehicle, ...list];
    this.persist(STORAGE_KEY_FLEET, updated);
  }

  async updateOdometer(vehicleId: string, newOdometer: number): Promise<void> {
    const list = await this.getVehicles();
    const updated = list.map((v) => (v.id === vehicleId ? { ...v, odometer: newOdometer } : v));
    this.persist(STORAGE_KEY_FLEET, updated);
  }

  async setActiveVehicleId(vehicleId: string): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, vehicleId);
    } catch {
      // Ignore quota
    }
  }

  private persist<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or private browsing
    }
  }
}
