import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { ToastService } from '../../services/toast.service';
import { AppIcon } from '../ui/app-icon/app-icon';
import { ModalSheetComponent } from '../ui/modal-sheet.component';

type EntryCategory = 'combustible' | 'mantenimiento' | 'tramite' | 'odometro';

@Component({
  imports: [ModalSheetComponent, AppIcon],
  selector: 'app-quick-entry-modal',
  template: `
    <app-modal-sheet
      [isOpen]="isOpen()"
      title="Nuevo Registro en Bitácora"
      subtitle="Añade un gasto, servicio o combustible al instante"
      icon="plus"
      (close)="close.emit()"
    >
      <form (submit)="onSubmit($event)" class="space-y-4">
        <!-- Category Segmented Buttons -->
        <div class="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            (click)="setCategory('combustible')"
            class="py-2 text-[10px] font-bold rounded-lg flex flex-col items-center gap-1 transition-all"
            [class]="
              category() === 'combustible'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            "
          >
            <app-icon name="fuel" [size]="14" />
            <span>Carga</span>
          </button>
          <button
            type="button"
            (click)="setCategory('mantenimiento')"
            class="py-2 text-[10px] font-bold rounded-lg flex flex-col items-center gap-1 transition-all"
            [class]="
              category() === 'mantenimiento'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            "
          >
            <app-icon name="wrench" [size]="14" />
            <span>Taller</span>
          </button>
          <button
            type="button"
            (click)="setCategory('tramite')"
            class="py-2 text-[10px] font-bold rounded-lg flex flex-col items-center gap-1 transition-all"
            [class]="
              category() === 'tramite'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            "
          >
            <app-icon name="shield-check" [size]="14" />
            <span>Papeles</span>
          </button>
          <button
            type="button"
            (click)="setCategory('odometro')"
            class="py-2 text-[10px] font-bold rounded-lg flex flex-col items-center gap-1 transition-all"
            [class]="
              category() === 'odometro'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            "
          >
            <app-icon name="gauge" [size]="14" />
            <span>Tablero</span>
          </button>
        </div>

        <!-- Vehicle Context Tag -->
        <div
          class="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs"
        >
          <div class="flex items-center gap-2">
            <app-icon [name]="vehicle().type" [size]="14" class="text-indigo-400" />
            <span class="font-bold text-slate-200">{{ vehicle().alias }}</span>
          </div>
          <span class="font-mono text-slate-400">{{ vehicle().plate }}</span>
        </div>

        <!-- Odometer Reading Input -->
        <div class="space-y-1">
          <label class="text-xs text-slate-300 font-medium block">
            Lectura Odómetro ({{ vehicle().unit }})
          </label>
          <div class="relative">
            <input
              type="number"
              [value]="odoInput()"
              (input)="odoInput.set(+$any($event.target).value)"
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <span class="absolute right-3 top-2 text-xs font-mono text-slate-400 uppercase">
              {{ vehicle().unit }}
            </span>
          </div>
        </div>

        <!-- Category: Combustible -->
        @if (category() === 'combustible') {
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs text-slate-300 font-medium block">Volumen Carga</label>
                <div class="relative">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="12.5"
                    class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">gal</span>
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-xs text-slate-300 font-medium block">Costo Total</label>
                <div class="relative">
                  <input
                    type="number"
                    step="0.10"
                    placeholder="78.50"
                    class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">$</span>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800"
            >
              <div>
                <span class="text-xs text-slate-200 font-medium block"
                  >¿Tanque lleno completo?</span
                >
                <span class="text-[10px] text-slate-400">Permite calcular MPG / km-gal exacto</span>
              </div>
              <input
                type="checkbox"
                checked
                class="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-0"
              />
            </div>
          </div>
        }

        <!-- Category: Mantenimiento -->
        @if (category() === 'mantenimiento') {
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-300 font-medium block">Concepto / Servicio</label>
              <input
                type="text"
                placeholder="Ej. Cambio de Aceite 5W-30 + Pastillas"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs text-slate-300 font-medium block"
                  >Taller / Concesionario</label
                >
                <input
                  type="text"
                  placeholder="Taller Oficial"
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div class="space-y-1">
                <label class="text-xs text-slate-300 font-medium block">Costo ($)</label>
                <input
                  type="number"
                  placeholder="120.00"
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        }

        <!-- Category: Trámite -->
        @if (category() === 'tramite') {
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-300 font-medium block">Tipo de Documento</label>
              <select
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="soat">SOAT Digital</option>
                <option value="citv">Revisión Técnica Vehicular (CITV)</option>
                <option value="seguro">Póliza Todo Riesgo Particular</option>
                <option value="otro">Tarjeta de Circulación / Impuesto</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-300 font-medium block">Fecha de Vencimiento</label>
              <input
                type="date"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        }

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
        >
          <app-icon name="check" [size]="16" />
          <span>Guardar en AutoBitácora</span>
        </button>
      </form>
    </app-modal-sheet>
  `,
})
export class QuickEntryModalComponent {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  isOpen = input<boolean>(false);
  close = output<void>();

  protected vehicle = this.fleetService.activeVehicle;
  protected category = signal<EntryCategory>('combustible');
  protected odoInput = signal<number>(0);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.odoInput.set(this.vehicle().odometer);
      }
    });
  }

  protected setCategory(cat: EntryCategory): void {
    this.category.set(cat);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const newOdo = this.odoInput();
    if (newOdo && newOdo > this.vehicle().odometer) {
      this.fleetService.updateOdometer(this.vehicle().id, newOdo);
    }
    this.toastService.show('Registro guardado exitosamente en AutoBitácora', 'success');
    this.close.emit();
  }
}
