import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { ToastService } from '../../services/toast.service';
import { AppIconComponent } from '../ui/app-icon.component';
import { ModalSheetComponent } from '../ui/modal-sheet.component';

@Component({
  imports: [ModalSheetComponent, AppIconComponent],
  selector: 'app-quick-odometer-modal',
  template: `
    <app-modal-sheet
      [isOpen]="isOpen()"
      title="Actualizar Odómetro"
      subtitle="Ingresa la lectura actual del tablero"
      icon="gauge"
      (close)="close.emit()"
    >
      <div class="space-y-4">
        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <span class="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">
            Lectura Previa
          </span>
          <span class="text-xl font-mono font-bold text-slate-300">
            {{ vehicle().odometer.toLocaleString() }} {{ vehicle().unit }}
          </span>
        </div>

        <div class="relative">
          <input
            type="number"
            [value]="inputValue()"
            (input)="onInputChange($event)"
            class="w-full bg-slate-950 border-2 border-indigo-500/70 rounded-2xl px-4 py-3 text-2xl text-white font-mono text-center font-bold focus:outline-none focus:border-indigo-400"
            placeholder="54500"
          />
          <span class="absolute right-4 top-4 text-xs font-mono font-bold text-indigo-400 uppercase">
            {{ vehicle().unit }}
          </span>
        </div>

        <!-- Increment Buttons -->
        <div class="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <button
            type="button"
            (click)="bump(50)"
            class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl transition-all"
          >
            +50
          </button>
          <button
            type="button"
            (click)="bump(100)"
            class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl transition-all"
          >
            +100
          </button>
          <button
            type="button"
            (click)="bump(250)"
            class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl transition-all"
          >
            +250
          </button>
        </div>

        <button
          type="button"
          (click)="save()"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <app-icon name="check" [size]="16" />
          <span>Actualizar Odómetro Ahora</span>
        </button>
      </div>
    </app-modal-sheet>
  `,
})
export class QuickOdometerModalComponent {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  isOpen = input<boolean>(false);
  close = output<void>();

  protected vehicle = this.fleetService.activeVehicle;
  protected inputValue = signal<number>(0);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.inputValue.set(this.vehicle().odometer + 50);
      }
    });
  }

  protected onInputChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    if (!isNaN(val)) {
      this.inputValue.set(val);
    }
  }

  protected bump(amt: number): void {
    this.inputValue.update((v) => v + amt);
  }

  protected save(): void {
    const val = this.inputValue();
    if (val && val > 0) {
      this.fleetService.updateOdometer(this.vehicle().id, val);
      this.toastService.show(
        `Odómetro actualizado a ${val.toLocaleString()} ${this.vehicle().unit}`,
        'success'
      );
      this.close.emit();
    }
  }
}
