import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppRoute } from '../../app.routes';
import { ModalService } from '../../services/modal.service';
import { AppIcon } from '../ui/app-icon/app-icon';

@Component({
  imports: [RouterLink, RouterLinkActive, AppIcon],
  selector: 'app-bottom-nav',
  template: `
    <!-- Floating Action Button (Center FAB) -->
    <div class="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
      <button
        type="button"
        (click)="modalService.openEntryModal()"
        class="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 hover:from-indigo-600 hover:to-indigo-400 active:scale-95 text-white flex items-center justify-center shadow-2xl border-4 border-slate-950 transition-all duration-150"
        aria-label="Register Log Entry"
      >
        <app-icon name="plus" [size]="26" [strokeWidth]="2.5" />
      </button>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav
      class="fixed bottom-0 inset-x-0 mx-auto max-w-md bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 z-30 pb-safe"
      aria-label="Main Navigation"
    >
      <div class="grid grid-cols-5 items-center">
        <!-- Tab 1: Home -->
        <a
          [routerLink]="routes.Home"
          routerLinkActive="text-indigo-400 font-bold"
          class="flex flex-col items-center gap-1 transition-colors py-1 text-slate-400 hover:text-slate-200 font-medium"
        >
          <app-icon name="layout-dashboard" [size]="20" />
          <span class="text-[10px]">Inicio</span>
        </a>

        <!-- Tab 2: Plan -->
        <a
          [routerLink]="routes.Plan"
          routerLinkActive="text-indigo-400 font-bold"
          class="flex flex-col items-center gap-1 transition-colors py-1 text-slate-400 hover:text-slate-200 font-medium"
        >
          <app-icon name="wrench" [size]="20" />
          <span class="text-[10px]">Pauta</span>
        </a>

        <!-- Spacer for Center FAB -->
        <div
          class="flex flex-col items-center justify-end pointer-events-none opacity-0 py-1"
          aria-hidden="true"
        >
          <span class="text-[10px]">Add</span>
        </div>

        <!-- Tab 3: Procedures -->
        <a
          [routerLink]="routes.Procedures"
          routerLinkActive="text-indigo-400 font-bold"
          class="flex flex-col items-center gap-1 transition-colors py-1 text-slate-400 hover:text-slate-200 font-medium"
        >
          <app-icon name="shield-check" [size]="20" />
          <span class="text-[10px]">Trámites</span>
        </a>

        <!-- Tab 4: Garage -->
        <a
          [routerLink]="routes.Garage"
          routerLinkActive="text-indigo-400 font-bold"
          class="flex flex-col items-center gap-1 transition-colors py-1 text-slate-400 hover:text-slate-200 font-medium"
        >
          <app-icon name="car" [size]="20" />
          <span class="text-[10px]">Garaje</span>
        </a>
      </div>
    </nav>
  `,
})
export class BottomNavComponent {
  protected modalService = inject(ModalService);
  protected readonly routes = AppRoute;
}
