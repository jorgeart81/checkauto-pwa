import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { RouteData } from './app.routes';
import { AppBar } from './components/layout/app-bar/app-bar';
import { BottomNavComponent } from './components/layout/bottom-nav.component';
import { QuickEntryModalComponent } from './components/modals/quick-entry-modal.component';
import { QuickOdometerModalComponent } from './components/modals/quick-odometer-modal.component';
import { VehiclePickerSheetComponent } from './components/modals/vehicle-picker-sheet.component';
import { ToastComponent } from './components/ui/toast.component';
import { ModalService } from './services/modal.service';

@Component({
  imports: [
    AppBar,
    BottomNavComponent,
    QuickEntryModalComponent,
    QuickOdometerModalComponent,
    RouterOutlet,
    ToastComponent,
    VehiclePickerSheetComponent,
  ],
  selector: 'app-root',
  host: { class: 'min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center' },
  templateUrl: './app.html',
})
export class App {
  private router = inject(Router);
  protected modalService = inject(ModalService);

  protected isFullscreenPage = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.readFullscreenFlag()),
    ),
    { initialValue: this.readFullscreenFlag() },
  );

  private readFullscreenFlag(): boolean {
    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return (route.data as RouteData)?.isFullscreen ?? false;
  }
}
