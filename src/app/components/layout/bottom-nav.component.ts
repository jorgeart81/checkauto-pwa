import { Component, input, output } from '@angular/core';
import { AppIcon } from '../ui/app-icon/app-icon';
import { IconName } from '../ui/app-icon/icon-name.type';

export type TabId = 'inicio' | 'plan' | 'tramites' | 'garaje';

interface NavItem {
  id: TabId;
  label: string;
  icon: IconName;
}

@Component({
  imports: [AppIcon],
  selector: 'app-bottom-nav',
  template: `
    <!-- Floating Action Button (Center FAB) -->
    <div class="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
      <button
        type="button"
        (click)="openQuickEntry.emit()"
        class="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 hover:from-indigo-600 hover:to-indigo-400 active:scale-95 text-white flex items-center justify-center shadow-2xl border-4 border-slate-950 transition-all duration-150"
        aria-label="Registrar Bitácora"
      >
        <app-icon name="plus" [size]="26" [strokeWidth]="2.5" />
      </button>
    </div>

    <!-- Bottom Navigation Bar -->
    <nav
      class="fixed bottom-0 inset-x-0 mx-auto max-w-md bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 z-30 pb-safe"
    >
      <div class="grid grid-cols-5 items-center">
        <!-- Tab 1: Inicio -->
        <button
          type="button"
          (click)="tabChange.emit('inicio')"
          class="flex flex-col items-center gap-1 transition-colors py-1"
          [class]="
            activeTab() === 'inicio'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          "
        >
          <app-icon name="layout-dashboard" [size]="20" />
          <span class="text-[10px]">Inicio</span>
        </button>

        <!-- Tab 2: Pauta -->
        <button
          type="button"
          (click)="tabChange.emit('plan')"
          class="flex flex-col items-center gap-1 transition-colors py-1"
          [class]="
            activeTab() === 'plan'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          "
        >
          <app-icon name="wrench" [size]="20" />
          <span class="text-[10px]">Pauta</span>
        </button>

        <!-- Spacer for Center FAB -->
        <div class="flex flex-col items-center justify-end pointer-events-none opacity-0 py-1">
          <span class="text-[10px]">Add</span>
        </div>

        <!-- Tab 3: Trámites -->
        <button
          type="button"
          (click)="tabChange.emit('tramites')"
          class="flex flex-col items-center gap-1 transition-colors py-1"
          [class]="
            activeTab() === 'tramites'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          "
        >
          <app-icon name="shield-check" [size]="20" />
          <span class="text-[10px]">Trámites</span>
        </button>

        <!-- Tab 4: Garaje -->
        <button
          type="button"
          (click)="tabChange.emit('garaje')"
          class="flex flex-col items-center gap-1 transition-colors py-1"
          [class]="
            activeTab() === 'garaje'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          "
        >
          <app-icon name="car" [size]="20" />
          <span class="text-[10px]">Garaje</span>
        </button>
      </div>
    </nav>
  `,
})
export class BottomNavComponent {
  activeTab = input.required<TabId>();
  tabChange = output<TabId>();
  openQuickEntry = output<void>();
}
