import { Component, inject } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { ToastService } from '../../services/toast.service';
import { AppIconComponent } from '../ui/app-icon.component';
import { VehicleCardComponent } from '../ui/vehicle-card.component';

@Component({
  imports: [AppIconComponent, VehicleCardComponent],
  selector: 'app-tab-garaje',
  template: `
    <div class="px-4 space-y-4 pt-2">
      <!-- Fleet Summary Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl p-4 border border-slate-800">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
              MI GARAJE FAMILIAR
            </span>
            <h2 class="text-lg font-extrabold text-white">
              {{ stats().total }} Unidades Registradas
            </h2>
          </div>
          <button
            type="button"
            (click)="onAddVehicle()"
            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <app-icon name="plus" [size]="14" />
            <span>Añadir</span>
          </button>
        </div>

        <!-- 3 Status Mini Badges -->
        <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
          <div class="bg-slate-950/60 p-2 rounded-xl border border-slate-850">
            <span class="text-[10px] text-slate-400 block font-medium">Al Día</span>
            <span class="text-sm font-bold text-emerald-400 font-mono">{{ stats().optimal }}</span>
          </div>
          <div class="bg-slate-950/60 p-2 rounded-xl border border-slate-850">
            <span class="text-[10px] text-slate-400 block font-medium">Próximos</span>
            <span class="text-sm font-bold text-amber-400 font-mono">{{ stats().warning }}</span>
          </div>
          <div class="bg-slate-950/60 p-2 rounded-xl border border-slate-850">
            <span class="text-[10px] text-slate-400 block font-medium">Críticos</span>
            <span class="text-sm font-bold text-red-400 font-mono">{{ stats().critical }}</span>
          </div>
        </div>
      </div>

      <!-- Vehicle Cards List -->
      <div class="space-y-3">
        @for (v of fleet(); track v.id) {
          <app-vehicle-card
            [vehicle]="v"
            [isSelected]="v.id === activeId()"
            (select)="onSelectVehicle($event)"
          />
        }
      </div>
    </div>
  `,
})
export class TabGarajeComponent {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  protected fleet = this.fleetService.fleet;
  protected activeId = this.fleetService.activeVehicleId;
  protected stats = this.fleetService.fleetStats;

  protected onSelectVehicle(id: string): void {
    this.fleetService.selectVehicle(id);
    const chosen = this.fleet().find((v) => v.id === id);
    if (chosen) {
      this.toastService.show(`Vehículo cambiado a: ${chosen.alias}`, 'success');
    }
  }

  protected onAddVehicle(): void {
    this.toastService.show(
      'Asistente de nueva unidad: introduce VIN o escanea código QR',
      'info'
    );
  }
}
