import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { Vehicle, VehicleType } from '@/models/vehicle.model';
import { FleetService } from '@/services/fleet.service';
import { ToastService } from '@/services/toast.service';

export type BodyType = 'truck' | 'sedan' | 'bike';
export type VehicleOrigin = 'local' | 'import';
export type DistanceUnitOption = 'mi' | 'km';

@Component({
  imports: [RouterLink, AppIcon],
  selector: 'app-add-vehicle-page',
  templateUrl: './add-vehicle-page.html',
  host: { class: 'flex flex-col flex-1 pb-6' },
})
export class AddVehiclePage {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Form State Signals
  protected selectedType = signal<BodyType>('truck');
  protected selectedColor = signal<string>('#6366f1');
  protected origin = signal<VehicleOrigin>('import');
  protected unit = signal<DistanceUnitOption>('mi');
  protected alias = signal<string>('');
  protected model = signal<string>('');
  protected year = signal<number>(2022);
  protected plate = signal<string>('');
  protected vin = signal<string>('');
  protected odometer = signal<number | null>(54200);
  protected fuelType = signal<string>('Gasolina Premium');
  protected tankCapacity = signal<number | null>(23.5);
  protected estEfficiency = signal<number | null>(22.0);
  protected soatExpiry = signal<string>('');
  protected lastOilService = signal<number | null>(50000);

  // Computed Values
  protected selectedTypeLabel = computed(() => {
    switch (this.selectedType()) {
      case 'bike':
        return 'Moto / Scooter';
      case 'sedan':
        return 'Sedán Familiar';
      case 'truck':
        return 'Camioneta / Pickup';
    }
  });

  protected secondaryUnit = computed<'mi' | 'km'>(() => {
    return this.unit() === 'mi' ? 'km' : 'mi';
  });

  protected mirrorOdometerPreview = computed(() => {
    const val = this.odometer();
    if (val === null || isNaN(val) || val <= 0) {
      return `≈ 0 ${this.secondaryUnit()} calculados`;
    }
    const converted = this.unit() === 'mi' ? Math.round(val * 1.60934) : Math.round(val * 0.621371);
    return `≈ ${converted.toLocaleString()} ${this.secondaryUnit()} calculados`;
  });

  protected selectType(type: BodyType): void {
    this.selectedType.set(type);
  }

  protected selectColor(color: string): void {
    this.selectedColor.set(color);
  }

  protected setOrigin(origin: VehicleOrigin): void {
    this.origin.set(origin);
    if (origin === 'local') {
      this.unit.set('km');
    } else {
      this.unit.set('mi');
    }
  }

  protected setUnit(unit: DistanceUnitOption): void {
    this.unit.set(unit);
  }

  protected onOdometerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.valueAsNumber;
    this.odometer.set(isNaN(val) ? null : val);
  }

  protected onYearChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.valueAsNumber;
    this.year.set(isNaN(val) ? 2022 : val);
  }

  protected onAliasChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.alias.set(input.value);
  }

  protected onModelChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.model.set(input.value);
  }

  protected onPlateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.plate.set(input.value.toUpperCase());
  }

  protected onVinChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.vin.set(input.value.toUpperCase());
  }

  protected onFuelTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.fuelType.set(select.value);
  }

  protected onTankCapacityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.valueAsNumber;
    this.tankCapacity.set(isNaN(val) ? null : val);
  }

  protected onEstEfficiencyChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.valueAsNumber;
    this.estEfficiency.set(isNaN(val) ? null : val);
  }

  protected onSoatExpiryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.soatExpiry.set(input.value);
  }

  protected onLastOilChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.valueAsNumber;
    this.lastOilService.set(isNaN(val) ? null : val);
  }

  protected mockScanVin(): void {
    const mockVin = '1FTFW1E84NFA98124';
    this.vin.set(mockVin);
    this.toastService.show(`VIN escaneado: ${mockVin}`, 'info');
  }

  protected handleSaveVehicle(event: Event): void {
    event.preventDefault();

    const aliasVal = this.alias().trim();
    const plateVal = this.plate().trim();
    const odoVal = this.odometer();

    if (!aliasVal) {
      this.toastService.show('Introduce un alias o nombre para el vehículo', 'error');
      return;
    }

    if (!plateVal) {
      this.toastService.show('Introduce la matrícula o placa', 'error');
      return;
    }

    if (odoVal === null || odoVal < 0) {
      this.toastService.show('Introduce una lectura de odómetro válida', 'error');
      return;
    }

    // Generate unique ID
    const idSlug = (aliasVal + '-' + plateVal)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const unitVal = this.unit();
    const secUnitVal = this.secondaryUnit();
    const ratioVal = unitVal === 'mi' ? 1.60934 : 0.621371;
    const efficiencyVal = this.estEfficiency() || (unitVal === 'mi' ? 22.4 : 45.0);
    const effUnit = unitVal === 'mi' ? 'MPG' : 'km/L';
    const effAlt = unitVal === 'mi' ? '36.1 km/gal' : '28.1 MPG';

    const newVehicle: Vehicle = {
      id: idSlug,
      alias: aliasVal,
      plate: plateVal,
      type: this.selectedType(),
      origin: this.origin() === 'local' ? 'Nacional / Local' : 'USA Import',
      unit: unitVal,
      secondaryUnit: secUnitVal,
      ratio: ratioVal,
      fuelType: this.fuelType(),
      odometer: odoVal,
      monthlyExpense: '$0.00 USD',
      efficiency: efficiencyVal.toFixed(1),
      efficiencyUnit: effUnit,
      efficiencyAlt: effAlt,
      costPerDist: unitVal === 'mi' ? '$0.21' : '$0.14',
      costUnit: unitVal === 'mi' ? '/ mi' : '/ km',
      statusLevel: 'optimal',
      statusBadge: 'AL DÍA',
      statusText: 'Sin alertas pendientes',
      alerts: {
        legal: {
          title: 'SOAT Obligatorio',
          desc: this.soatExpiry() ? `Vence el ${this.soatExpiry()}.` : 'Póliza vigente y al día.',
          badge: 'Vigente',
          critical: false,
        },
        service: {
          title: 'Próximo Servicio Preventivo',
          condition: `A los ${(odoVal + (unitVal === 'mi' ? 5000 : 8000)).toLocaleString()} ${unitVal}`,
          target: `${(odoVal + (unitVal === 'mi' ? 5000 : 8000)).toLocaleString()} ${unitVal}`,
          progress: 0,
          warn: false,
        },
      },
      plan: {
        title: `Pauta Oficial ${this.model() || aliasVal}`,
        intervalText: unitVal === 'mi' ? 'Cada 5,000 mi / 6m' : 'Cada 8,000 km / 6m',
        nextService: `Servicio ${(odoVal + (unitVal === 'mi' ? 5000 : 8000)).toLocaleString()} ${unitVal}`,
        nextServiceMeta: 'Servicio programado inicial',
        tasks: [
          'Cambio de Aceite de Motor y Filtro',
          'Inspección de frenos y niveles de fluidos',
          'Alineación y rotación de neumáticos',
        ],
      },
    };

    this.fleetService.addVehicle(newVehicle);
    this.toastService.show(`Vehículo "${aliasVal}" guardado en el Garaje`, 'success');
    this.router.navigate(['/garage']);
  }
}
