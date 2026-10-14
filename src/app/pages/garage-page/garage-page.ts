import { Component, inject } from '@angular/core';

import { FleetService } from '@/services/fleet.service';
import { ToastService } from '@/services/toast.service';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { VehicleCardComponent } from '@/components/ui/vehicle-card.component';

@Component({
  imports: [AppIcon, VehicleCardComponent],
  selector: 'app-garage-page',
  templateUrl: './garage-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class GaragePage {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  protected fleet = this.fleetService.fleet;
  protected activeId = this.fleetService.activeVehicleId;
  protected stats = this.fleetService.fleetStats;

  protected onSelectVehicle(id: string): void {
    this.fleetService.selectVehicle(id);
    const chosen = this.fleet().find((v) => v.id === id);
    if (chosen) {
      this.toastService.show(`Vehículo cambiado a: ${chosen.alias}`, 'success');
    }
  }

  protected onAddVehicle(): void {
    this.toastService.show('Asistente de nueva unidad: introduce VIN o escanea código QR', 'info');
  }
}
