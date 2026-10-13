import { Component, inject, output, signal } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { AppIconComponent } from '../ui/app-icon.component';
import { UiBadgeComponent } from '../ui/ui-badge.component';

@Component({
  imports: [AppIconComponent, UiBadgeComponent],
  selector: 'app-header',
  template: `
    <header class="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 z-30 sticky top-0">
      <div class="flex items-center justify-between">
        <!-- Vehicle Picker Trigger Button -->
        <button
          type="button"
          (click)="openVehiclePicker.emit()"
          class="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-750 active:scale-95 transition-all text-left px-3 py-1.5 rounded-full border border-slate-700/80 shadow-sm max-w-[290px]"
        >
          <div
            class="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-500/20"
          >
            <app-icon [name]="vehicle().type" [size]="14" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-slate-100 text-xs truncate max-w-[140px]">
                {{ vehicle().alias }}
              </span>
              <app-ui-badge [variant]="badgeVariant()" customClass="text-[9px] px-1 py-0">
                {{ vehicle().statusBadge }}
              </app-ui-badge>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <span class="text-slate-300 font-medium">{{ vehicle().plate }}</span>
              <span>•</span>
              <span class="truncate">{{ vehicle().fuelType }}</span>
            </div>
          </div>

          <app-icon name="chevron-down" [size]="14" class="text-slate-400 ml-auto flex-shrink-0" />
        </button>

        <!-- Status / Clock and PWA Indicators -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{{ currentTime() }}</span>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private fleetService = inject(FleetService);
  protected vehicle = this.fleetService.activeVehicle;
  openVehiclePicker = output<void>();

  protected currentTime = signal<string>('09:41');

  constructor() {
    this.updateClock();
    setInterval(() => this.updateClock(), 10000);
  }

  private updateClock(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime.set(`${hours}:${minutes}`);
  }

  protected get badgeVariant(): () => 'critical' | 'warning' | 'optimal' {
    return () => {
      const lvl = this.vehicle().statusLevel;
      if (lvl === 'critical') return 'critical';
      if (lvl === 'warning') return 'warning';
      return 'optimal';
    };
  }
}
