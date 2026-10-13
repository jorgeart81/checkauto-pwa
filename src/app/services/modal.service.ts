import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly isVehiclePickerOpen = signal<boolean>(false);
  readonly isOdometerModalOpen = signal<boolean>(false);
  readonly isEntryModalOpen = signal<boolean>(false);

  openVehiclePicker(): void {
    this.isVehiclePickerOpen.set(true);
  }

  closeVehiclePicker(): void {
    this.isVehiclePickerOpen.set(false);
  }

  openOdometerModal(): void {
    this.isOdometerModalOpen.set(true);
  }

  closeOdometerModal(): void {
    this.isOdometerModalOpen.set(false);
  }

  openEntryModal(): void {
    this.isEntryModalOpen.set(true);
  }

  closeEntryModal(): void {
    this.isEntryModalOpen.set(false);
  }
}
