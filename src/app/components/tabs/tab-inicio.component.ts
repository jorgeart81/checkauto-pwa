import { Component, inject } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { ModalService } from '../../services/modal.service';
import { AlertCardComponent } from '../ui/alert-card.component';
import { AppIcon } from '../ui/app-icon/app-icon';
import { MetricCardComponent } from '../ui/metric-card.component';

@Component({
  imports: [AppIcon, MetricCardComponent, AlertCardComponent],
  selector: 'app-tab-inicio',
  template: `
    <div class="px-4 space-y-4 pt-2">
      <!-- 1. Hero Odometer Card -->
      <div
        class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20"
            >
              <app-icon name="gauge" [size]="16" />
            </div>
            <div>
              <span
                class="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block"
              >
                Odómetro Activo
              </span>
              <span class="text-[10px] text-slate-400">Actualizado recientemente</span>
            </div>
          </div>

          <button
            type="button"
            (click)="modalService.openOdometerModal()"
            class="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <app-icon name="plus" [size]="12" />
            <span>Actualizar</span>
          </button>
        </div>

        <div class="mt-4 flex items-baseline">
          <span class="text-4xl font-extrabold text-white tracking-tight font-mono">
            {{ vehicle().odometer.toLocaleString() }}
          </span>
          <span class="text-base font-bold text-indigo-400 ml-1.5 uppercase font-mono">
            {{ vehicle().unit }}
          </span>
        </div>

        <!-- Secondary unit badge (conversion) -->
        <div class="mt-2 flex items-center justify-between pt-3 border-t border-slate-850 text-xs">
          <span class="text-slate-400">Conversión de tablero:</span>
          <div class="bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800">
            <strong class="font-mono text-slate-300 font-semibold">
              {{ altOdo().val.toLocaleString() }} {{ altOdo().unit }}
            </strong>
          </div>
        </div>
      </div>

      <!-- 2. Smart Alerts Section -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Atención Inmediata
          </h3>
          <span class="text-[10px] text-indigo-400 font-mono font-medium"
            >Alertas del Vehículo</span
          >
        </div>

        <!-- Alerta Legal -->
        <app-alert-card
          [title]="vehicle().alerts.legal.title"
          [desc]="vehicle().alerts.legal.desc"
          [badge]="vehicle().alerts.legal.badge"
          [isCritical]="vehicle().alerts.legal.critical"
          [isWarning]="!vehicle().alerts.legal.critical"
          iconName="alert-circle"
        />

        <!-- Alerta Servicio / Preventivo -->
        <app-alert-card
          [title]="vehicle().alerts.service.title"
          [badge]="vehicle().alerts.service.warn ? 'Próximo' : 'Al Día'"
          [condition]="vehicle().alerts.service.condition"
          [progress]="vehicle().alerts.service.progress"
          [isWarning]="vehicle().alerts.service.warn"
          iconName="wrench"
        />
      </div>

      <!-- 3. Key Metrics Grid -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Rendimiento & Costos
          </h3>
          <span class="text-[10px] text-slate-400 font-mono">{{ vehicle().origin }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <!-- Rendimiento -->
          <app-metric-card
            label="Eficiencia"
            [value]="vehicle().efficiency"
            [unit]="vehicle().efficiencyUnit"
            [tag]="vehicle().fuelType"
            [subtext]="'≈ ' + vehicle().efficiencyAlt"
          />

          <!-- Costo por Distancia -->
          <app-metric-card
            label="Costo / Unidad"
            [value]="vehicle().costPerDist"
            [unit]="vehicle().costUnit"
            subtext="-4% vs mes anterior"
            subtextClass="text-emerald-400"
          />
        </div>

        <!-- Gasto Mensual Card -->
        <div
          class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
        >
          <div>
            <span class="text-xs text-slate-400 block font-medium"
              >Gasto Total Acumulado (Mes)</span
            >
            <span class="text-xl font-extrabold text-white font-mono mt-0.5 block">
              {{ vehicle().monthlyExpense }}
            </span>
          </div>
          <button
            type="button"
            (click)="modalService.openEntryModal()"
            class="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 rounded-xl border border-slate-700 flex items-center gap-1.5"
          >
            <app-icon name="plus" [size]="14" />
            <span>Gasto</span>
          </button>
        </div>
      </div>

      <!-- 4. Next Maintenance Summary Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
              PRÓXIMO MANTENIMIENTO
            </span>
            <h4 class="text-sm font-bold text-white mt-0.5">{{ vehicle().plan.nextService }}</h4>
          </div>
          <span
            class="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
          >
            {{ vehicle().plan.intervalText }}
          </span>
        </div>

        <div class="text-xs text-slate-400">
          <p>{{ vehicle().plan.nextServiceMeta }}</p>
        </div>

        <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-850 space-y-1.5">
          <span class="text-[10px] font-bold text-slate-400 uppercase font-mono block">
            Tareas programadas:
          </span>
          @for (task of vehicle().plan.tasks; track task) {
            <div class="flex items-center gap-2 text-xs text-slate-300">
              <app-icon name="check" [size]="12" class="text-emerald-400 flex-shrink-0" />
              <span class="truncate">{{ task }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TabInicioComponent {
  private fleetService = inject(FleetService);
  protected modalService = inject(ModalService);
  protected vehicle = this.fleetService.activeVehicle;
  protected altOdo = this.fleetService.altOdometer;
}
