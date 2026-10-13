import { Injectable, computed, signal } from '@angular/core';
import { DocumentItem, Vehicle } from '../models/vehicle.model';

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
    fuelType: 'GNV / Gasolina',
    odometer: 28100,
    monthlyExpense: 'S/ 385.00 PEN',
    efficiency: '39.2',
    efficiencyUnit: 'km / gal',
    efficiencyAlt: '24.4 MPG',
    costPerDist: 'S/ 0.18',
    costUnit: '/ km',
    statusLevel: 'warning',
    statusBadge: '1 PRÓXIMO',
    statusText: 'Mantenimiento en 900 km',
    alerts: {
      legal: {
        title: 'Revisión Anual Cilindro GNV',
        desc: 'Vence el 15 May 2026 en taller autorizado.',
        badge: 'Al día (50 días)',
        critical: false,
      },
      service: {
        title: 'Mantenimiento 30,000 km (Concesionario)',
        condition: 'Faltan 900 km ó 20 días',
        target: '30,000 km',
        progress: 78,
        warn: true,
      },
    },
    plan: {
      title: 'Pauta Toyota Dual GNV/Gasolina',
      intervalText: 'Cada 5,000 km / 4m',
      nextService: 'Servicio 30,000 km',
      nextServiceMeta: 'En 1,900 km (Mayo 2026)',
      tasks: [
        'Cambio aceite sintético 0W-20',
        'Calibración de inyectores GNV',
        'Filtro de cabina y aire de motor',
      ],
    },
  },
  {
    id: 'yamaha-mt03',
    alias: 'Yamaha MT-03 2022',
    plate: '7829-2B',
    type: 'bike',
    origin: 'Local (Moto)',
    unit: 'km',
    secondaryUnit: 'mi',
    ratio: 0.621371,
    fuelType: 'Gasolina 95 Oct',
    odometer: 12450,
    monthlyExpense: 'S/ 140.00 PEN',
    efficiency: '72.5',
    efficiencyUnit: 'km / gal',
    efficiencyAlt: '45.1 MPG',
    costPerDist: 'S/ 0.12',
    costUnit: '/ km',
    statusLevel: 'optimal',
    statusBadge: 'AL DÍA',
    statusText: 'Óptimo sin pendientes',
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

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-soat-ford',
    vehicleId: 'ford-f150',
    vehicleAlias: 'Ford F-150 [BHY-892]',
    type: 'soat',
    title: 'SOAT Digital Pacífico',
    subtitle: 'Compañía de Seguros y Reaseguros',
    status: 'expiring',
    statusBadge: 'Vence en 8 días',
    expiryDate: '26 Mar 2026',
    details: [
      { label: 'Póliza N°', value: '7849-0029-SOAT' },
      { label: 'Uso', value: 'Particular / Carga Ligera' },
    ],
    primaryAction: { label: 'Renovar Online', icon: 'sparkles' },
  },
  {
    id: 'doc-citv-ford',
    vehicleId: 'ford-f150',
    vehicleAlias: 'Ford F-150 [BHY-892]',
    type: 'citv',
    title: 'Inspección Técnica Vehicular (CITV)',
    subtitle: 'Centro Lidercon / Farenet',
    status: 'valid',
    statusBadge: 'Vigente',
    expiryDate: '14 Oct 2026',
    details: [
      { label: 'Certificado', value: 'CITV-2025-884102' },
      { label: 'Resultado', value: 'Aprobado sin observaciones' },
    ],
  },
  {
    id: 'doc-ins-ford',
    vehicleId: 'ford-f150',
    vehicleAlias: 'Ford F-150 [BHY-892]',
    type: 'insurance',
    title: 'Seguro Todo Riesgo Rimac Flota',
    subtitle: 'Póliza Particular Premium',
    status: 'valid',
    statusBadge: 'Cobertura Activa',
    expiryDate: '30 Nov 2026',
    details: [
      { label: 'Deducible', value: '10% (mínimo $150)' },
      { label: 'Asistencia', value: 'Grúa 24/7 Ilimitada' },
    ],
    primaryAction: {
      label: 'Llamar Grúa / Auxilio',
      icon: 'phone-call',
      tel: '014111111',
    },
  },
  {
    id: 'doc-tiv-ford',
    vehicleId: 'ford-f150',
    vehicleAlias: 'Ford F-150 [BHY-892]',
    type: 'tiv',
    title: 'Tarjeta de Identificación Vehicular',
    subtitle: 'SUNARP / Registro Vehicular',
    status: 'valid',
    statusBadge: 'Registrado',
    details: [
      { label: 'VIN / Chasis', value: '1FTFW1ED4MFA19283' },
      { label: 'Motor', value: '3.5L V6 Turbo GTDI' },
    ],
  },
  {
    id: 'doc-soat-corolla',
    vehicleId: 'toyota-corolla',
    vehicleAlias: 'Toyota Corolla [AZF-104]',
    type: 'soat',
    title: 'SOAT Digital Rimac',
    subtitle: 'Póliza Obligatoria',
    status: 'valid',
    statusBadge: 'Vigente (50 días)',
    expiryDate: '15 May 2026',
    details: [
      { label: 'Póliza N°', value: 'RIM-9821-44' },
      { label: 'Uso', value: 'Particular' },
    ],
  },
  {
    id: 'doc-soat-yamaha',
    vehicleId: 'yamaha-mt03',
    vehicleAlias: 'Yamaha MT-03 [7829-2B]',
    type: 'soat',
    title: 'SOAT Digital La Positiva',
    subtitle: 'Póliza Obligatoria Motocicletas',
    status: 'valid',
    statusBadge: 'Vigente',
    expiryDate: '10 Dic 2026',
    details: [
      { label: 'Póliza N°', value: 'LP-MOTO-44910' },
      { label: 'Uso', value: 'Motocicleta Particular' },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class FleetService {
  readonly fleet = signal<Vehicle[]>(INITIAL_FLEET);
  readonly activeVehicleId = signal<string>('ford-f150');
  readonly documents = signal<DocumentItem[]>(INITIAL_DOCUMENTS);

  readonly activeVehicle = computed(() => {
    const id = this.activeVehicleId();
    return this.fleet().find((v) => v.id === id) || this.fleet()[0];
  });

  readonly altOdometer = computed(() => {
    const v = this.activeVehicle();
    if (!v) return { val: 0, unit: 'km' };
    const altVal =
      v.unit === 'mi' ? Math.round(v.odometer * 1.60934) : Math.round(v.odometer * 0.621371);
    return {
      val: altVal,
      unit: v.secondaryUnit,
    };
  });

  readonly fleetStats = computed(() => {
    const all = this.fleet();
    const optimal = all.filter((v) => v.statusLevel === 'optimal').length;
    const warning = all.filter((v) => v.statusLevel === 'warning').length;
    const critical = all.filter((v) => v.statusLevel === 'critical').length;
    return {
      total: all.length,
      optimal,
      warning,
      critical,
    };
  });

  selectVehicle(vehicleId: string): void {
    if (this.fleet().some((v) => v.id === vehicleId)) {
      this.activeVehicleId.set(vehicleId);
    }
  }

  updateOdometer(vehicleId: string, newOdometer: number): void {
    this.fleet.update((list) =>
      list.map((v) => (v.id === vehicleId ? { ...v, odometer: newOdometer } : v)),
    );
  }

  addLogEntry(vehicleId: string, entry: { type: string; odometer?: number; cost?: number }): void {
    if (entry.odometer) {
      const current = this.fleet().find((v) => v.id === vehicleId);
      if (current && entry.odometer > current.odometer) {
        this.updateOdometer(vehicleId, entry.odometer);
      }
    }
  }
}
