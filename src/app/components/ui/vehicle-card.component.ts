import { Component, input, output } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { AppIconComponent } from './app-icon.component';
import { UiBadgeComponent } from './ui-badge.component';

@Component({
  imports: [AppIconComponent, UiBadgeComponent],
  selector: 'app-vehicle-card',
  template: `
    <div
      class="p-4 rounded-2xl border transition-all duration-200"
      [class]="isSelected() ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md' : 'bg-slate-900 border-slate-800 hover:border-slate-700'"
    >
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center border"
            [class]="isSelected() ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'"
          >
            <app-icon [name]="vehicle().type" [size]="20" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-white leading-tight">{{ vehicle().alias }}</h3>
            <div class="flex items-center gap-2 mt-0.5 text-xs text-slate-400 font-mono">
              <span class="text-slate-200 font-semibold">{{ vehicle().plate }}</span>
              <span>•</span>
              <span>{{ vehicle().fuelType }}</span>
            </div>
          </div>
        </div>

        <app-ui-badge [variant]="badgeVariant()">
          {{ vehicle().statusBadge }}
        </app-ui-badge>
      </div>

      <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
        <div>
          <span class="text-slate-500 text-[10px] block uppercase font-mono">Odómetro</span>
          <span class="font-mono font-bold text-slate-200">
            {{ vehicle().odometer.toLocaleString() }} {{ vehicle().unit }}
          </span>
        </div>
        <div>
          <span class="text-slate-500 text-[10px] block uppercase font-mono">Gasto Mensual</span>
          <span class="font-mono font-semibold text-slate-300">
            {{ vehicle().monthlyExpense }}
          </span>
        </div>
      </div>

      <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60">
        <span class="text-[11px] text-slate-400 truncate max-w-[200px]">
          {{ vehicle().statusText }}
        </span>

        @if (!isSelected()) {
          <button
            type="button"
            (click)="select.emit(vehicle().id)"
            class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-all"
          >
            <span>Seleccionar</span>
            <app-icon name="arrow-right" [size]="12" />
          </button>
        } @else {
          <span class="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
            <app-icon name="check" [size]="12" /> Activo
          </span>
        }
      </div>
    </div>
  `,
})
export class VehicleCardComponent {
  vehicle = input.required<Vehicle>();
  isSelected = input<boolean>(false);
  select = output<string>();

  protected get badgeVariant(): () => 'critical' | 'warning' | 'optimal' {
    return () => {
      const level = this.vehicle().statusLevel;
      if (level === 'critical') return 'critical';
      if (level === 'warning') return 'warning';
      return 'optimal';
    };
  }
}
