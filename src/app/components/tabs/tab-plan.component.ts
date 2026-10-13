import { Component, inject } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { AppIcon } from '../ui/app-icon/app-icon';

@Component({
  imports: [AppIcon],
  selector: 'app-tab-plan',
  template: `
    <div class="px-4 space-y-4 pt-2">
      <!-- Plan Header -->
      <div
        class="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 rounded-2xl p-4 border border-slate-800"
      >
        <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
          PAUTA DE MANTENIMIENTO DEL FABRICANTE
        </span>
        <h2 class="text-base font-bold text-white mt-0.5">{{ vehicle().plan.title }}</h2>
        <div class="flex items-center gap-3 mt-2 text-xs text-slate-400">
          <div class="flex items-center gap-1 font-mono">
            <app-icon name="gauge" [size]="14" class="text-indigo-400" />
            <span>Actual:</span>
            <strong class="text-white"
              >{{ vehicle().odometer.toLocaleString() }} {{ vehicle().unit }}</strong
            >
          </div>
          <div class="flex items-center gap-1 font-mono">
            <app-icon name="clock" [size]="14" class="text-indigo-400" />
            <span>{{ vehicle().plan.intervalText }}</span>
          </div>
        </div>
      </div>

      <!-- Current / Next Service Highlight -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20"
            >
              <app-icon name="wrench" [size]="16" />
            </div>
            <div>
              <span class="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                PRÓXIMA INTERVENCIÓN
              </span>
              <h3 class="text-sm font-bold text-white">{{ vehicle().plan.nextService }}</h3>
            </div>
          </div>
          <span
            class="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
          >
            Pendiente
          </span>
        </div>

        <p class="text-xs text-slate-400">{{ vehicle().plan.nextServiceMeta }}</p>

        <!-- Checklist of tasks -->
        <div class="space-y-2 pt-2 border-t border-slate-800/80">
          @for (task of vehicle().plan.tasks; track task) {
            <div
              class="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-xs"
            >
              <input
                type="checkbox"
                class="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
              />
              <span class="text-slate-300 flex-1 leading-snug">{{ task }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Completed Services History -->
      <div class="space-y-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
          Historial de Mantenimientos Previos
        </h3>

        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20"
              >
                <app-icon name="check" [size]="14" />
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-200">
                  Servicio 50,000 {{ vehicle().unit }} (Preventivo)
                </h4>
                <span class="text-[10px] text-slate-500 font-mono"
                  >Realizado hace 4,230 {{ vehicle().unit }}</span
                >
              </div>
            </div>
            <span
              class="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20"
            >
              Completado
            </span>
          </div>
          <div
            class="bg-slate-950 p-2 rounded-xl text-[11px] text-slate-400 flex items-center justify-between font-mono"
          >
            <span>Taller: QuickLane Autorizado</span>
            <span class="text-slate-300 font-bold">$180.00</span>
          </div>
        </div>

        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20"
              >
                <app-icon name="check" [size]="14" />
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-200">
                  Servicio 45,000 {{ vehicle().unit }}
                </h4>
                <span class="text-[10px] text-slate-500 font-mono"
                  >Filtro de aire, bujías y fluidos</span
                >
              </div>
            </div>
            <span
              class="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20"
            >
              Completado
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabPlanComponent {
  private fleetService = inject(FleetService);
  protected vehicle = this.fleetService.activeVehicle;
}
