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
  host: { class: 'min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center' },
  templateUrl: './app.html',
})
export class App {
  protected modalService = inject(ModalService);
}
