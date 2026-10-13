import { Component, inject, input, output } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { ToastService } from '../../services/toast.service';
import { ModalSheetComponent } from '../ui/modal-sheet.component';
import { VehicleCardComponent } from '../ui/vehicle-card.component';

@Component({
  imports: [ModalSheetComponent, VehicleCardComponent],
  selector: 'app-vehicle-picker-sheet',
  template: `
    <app-modal-sheet
      [isOpen]="isOpen()"
      title="Cambiar de Vehículo"
      subtitle="Toda la interfaz conmuta a la unidad activa"
      (close)="close.emit()"
    >
      <div class="space-y-2.5">
        @for (v of fleet(); track v.id) {
          <app-vehicle-card
            [vehicle]="v"
            [isSelected]="v.id === activeId()"
            (select)="chooseVehicle($event)"
          />
        }
      </div>
    </app-modal-sheet>
  `,
})
export class VehiclePickerSheetComponent {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  isOpen = input<boolean>(false);
  close = output<void>();

  protected fleet = this.fleetService.fleet;
  protected activeId = this.fleetService.activeVehicleId;

  protected chooseVehicle(id: string): void {
    this.fleetService.selectVehicle(id);
    const chosen = this.fleet().find((v) => v.id === id);
    if (chosen) {
      this.toastService.show(`Vehículo activo: ${chosen.alias}`, 'success');
    }
    this.close.emit();
  }
}
