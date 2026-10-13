import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/layout/bottom-nav.component';
import { HeaderComponent } from './components/layout/header.component';
import { QuickEntryModalComponent } from './components/modals/quick-entry-modal.component';
import { QuickOdometerModalComponent } from './components/modals/quick-odometer-modal.component';
import { VehiclePickerSheetComponent } from './components/modals/vehicle-picker-sheet.component';
import { ToastComponent } from './components/ui/toast.component';
import { ModalService } from './services/modal.service';

@Component({
  imports: [
    RouterOutlet,
    HeaderComponent,
    BottomNavComponent,
    VehiclePickerSheetComponent,
    QuickOdometerModalComponent,
    QuickEntryModalComponent,
    ToastComponent,
  ],
  selector: 'app-root',
  template: `
    <!-- Mobile-First Container with Native App Look on Desktop -->
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <div
        class="w-full max-w-md min-h-screen bg-slate-950 flex flex-col shadow-2xl relative border-x border-slate-900 overflow-x-hidden"
      >
        <!-- App Header with Active Vehicle & Clock -->
        <app-header />

        <!-- Main Routed Content Area (Scrollable) -->
        <main class="flex-1 overflow-y-auto pb-28">
          <router-outlet />
        </main>

        <!-- Bottom Fixed Navigation with Floating Center FAB -->
        <app-bottom-nav />

        <!-- Vehicle Picker Bottom Sheet -->
        <app-vehicle-picker-sheet
          [isOpen]="modalService.isVehiclePickerOpen()"
          (close)="modalService.closeVehiclePicker()"
        />

        <!-- Quick Odometer Update Modal -->
        <app-quick-odometer-modal
          [isOpen]="modalService.isOdometerModalOpen()"
          (close)="modalService.closeOdometerModal()"
        />

        <!-- Quick Log Entry Modal (Fuel, Service, Docs) -->
        <app-quick-entry-modal
          [isOpen]="modalService.isEntryModalOpen()"
          (close)="modalService.closeEntryModal()"
        />

        <!-- Floating Toast Notifications -->
        <app-toast />
      </div>
    </div>
  `,
})
export class App {
  protected modalService = inject(ModalService);
}
