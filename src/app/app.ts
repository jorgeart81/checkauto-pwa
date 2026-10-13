import { Component, signal } from '@angular/core';
import { BottomNavComponent, TabId } from './components/layout/bottom-nav.component';
import { HeaderComponent } from './components/layout/header.component';
import { QuickEntryModalComponent } from './components/modals/quick-entry-modal.component';
import { QuickOdometerModalComponent } from './components/modals/quick-odometer-modal.component';
import { VehiclePickerSheetComponent } from './components/modals/vehicle-picker-sheet.component';
import { TabGarajeComponent } from './components/tabs/tab-garaje.component';
import { TabInicioComponent } from './components/tabs/tab-inicio.component';
import { TabPlanComponent } from './components/tabs/tab-plan.component';
import { TabTramitesComponent } from './components/tabs/tab-tramites.component';
import { ToastComponent } from './components/ui/toast.component';

@Component({
  imports: [
    HeaderComponent,
    BottomNavComponent,
    TabInicioComponent,
    TabPlanComponent,
    TabTramitesComponent,
    TabGarajeComponent,
    VehiclePickerSheetComponent,
    QuickOdometerModalComponent,
    QuickEntryModalComponent,
    ToastComponent,
  ],
  selector: 'app-root',
  template: `
    <!-- Mobile-First Container with Native App Look on Desktop -->
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <div class="w-full max-w-md min-h-screen bg-slate-950 flex flex-col shadow-2xl relative border-x border-slate-900 overflow-x-hidden">
        
        <!-- App Header with Active Vehicle & Clock -->
        <app-header (openVehiclePicker)="isVehiclePickerOpen.set(true)" />

        <!-- Main Tab Content Area (Scrollable) -->
        <main class="flex-1 overflow-y-auto pb-28">
          @switch (currentTab()) {
            @case ('inicio') {
              <app-tab-inicio
                (openQuickOdometer)="isOdoModalOpen.set(true)"
                (openQuickEntry)="isEntryModalOpen.set(true)"
              />
            }
            @case ('plan') {
              <app-tab-plan />
            }
            @case ('tramites') {
              <app-tab-tramites />
            }
            @case ('garaje') {
              <app-tab-garaje />
            }
          }
        </main>

        <!-- Bottom Fixed Navigation with Floating Center FAB -->
        <app-bottom-nav
          [activeTab]="currentTab()"
          (tabChange)="onTabChange($event)"
          (openQuickEntry)="isEntryModalOpen.set(true)"
        />

        <!-- Vehicle Picker Bottom Sheet -->
        <app-vehicle-picker-sheet
          [isOpen]="isVehiclePickerOpen()"
          (close)="isVehiclePickerOpen.set(false)"
        />

        <!-- Quick Odometer Update Modal -->
        <app-quick-odometer-modal
          [isOpen]="isOdoModalOpen()"
          (close)="isOdoModalOpen.set(false)"
        />

        <!-- Quick Log Entry Modal (Fuel, Service, Docs) -->
        <app-quick-entry-modal
          [isOpen]="isEntryModalOpen()"
          (close)="isEntryModalOpen.set(false)"
        />

        <!-- Floating Toast Notifications -->
        <app-toast />

      </div>
    </div>
  `,
})
export class App {
  protected currentTab = signal<TabId>('inicio');
  protected isVehiclePickerOpen = signal<boolean>(false);
  protected isOdoModalOpen = signal<boolean>(false);
  protected isEntryModalOpen = signal<boolean>(false);

  protected onTabChange(tab: TabId): void {
    this.currentTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
