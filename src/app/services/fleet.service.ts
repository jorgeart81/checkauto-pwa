import { Injectable, computed, inject, signal } from '@angular/core';
import { FleetRepository } from '@/core/repositories/fleet.repository';
import { DocumentItem, Vehicle } from '../models/vehicle.model';

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
  private repository = inject(FleetRepository);

  readonly fleet = signal<Vehicle[]>([]);
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

  constructor() {
    this.initFleet();
  }

  selectVehicle(vehicleId: string): void {
    if (this.fleet().some((v) => v.id === vehicleId)) {
      this.activeVehicleId.set(vehicleId);
      this.repository.setActiveVehicleId(vehicleId);
    }
  }

  addVehicle(vehicle: Vehicle): void {
    this.fleet.update((list) => [vehicle, ...list]);
    this.activeVehicleId.set(vehicle.id);
    this.repository.saveVehicle(vehicle);
    this.repository.setActiveVehicleId(vehicle.id);
  }

  updateOdometer(vehicleId: string, newOdometer: number): void {
    this.fleet.update((list) =>
      list.map((v) => (v.id === vehicleId ? { ...v, odometer: newOdometer } : v)),
    );
    this.repository.updateOdometer(vehicleId, newOdometer);
  }

  addLogEntry(vehicleId: string, entry: { type: string; odometer?: number; cost?: number }): void {
    if (entry.odometer) {
      const current = this.fleet().find((v) => v.id === vehicleId);
      if (current && entry.odometer > current.odometer) {
        this.updateOdometer(vehicleId, entry.odometer);
      }
    }
  }

  private async initFleet(): Promise<void> {
    const [vehicles, activeId] = await Promise.all([
      this.repository.getVehicles(),
      this.repository.getActiveVehicleId(),
    ]);
    this.fleet.set(vehicles);
    if (vehicles.some((v) => v.id === activeId)) {
      this.activeVehicleId.set(activeId);
    } else if (vehicles.length > 0) {
      this.activeVehicleId.set(vehicles[0].id);
    }
  }
}
