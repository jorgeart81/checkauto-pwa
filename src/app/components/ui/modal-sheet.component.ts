import { Component, input, output } from '@angular/core';
import { AppIconComponent } from './app-icon.component';

@Component({
  imports: [AppIconComponent],
  selector: 'app-modal-sheet',
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div
        (click)="close.emit()"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
      ></div>

      <!-- Sheet Panel -->
      <div
        class="fixed bottom-0 inset-x-0 mx-auto max-w-md bg-slate-900 border-t border-slate-750 rounded-t-[28px] p-5 z-50 max-h-[90%] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        <!-- Pull bar indicator -->
        <div class="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3"></div>

        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              @if (icon()) {
                <app-icon [name]="icon()!" [size]="16" class="text-indigo-400" />
              }
              {{ title() }}
            </h3>
            @if (subtitle()) {
              <p class="text-xs text-slate-400 mt-0.5">{{ subtitle() }}</p>
            }
          </div>
          <button
            type="button"
            (click)="close.emit()"
            class="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <app-icon name="x" [size]="16" />
          </button>
        </div>

        <ng-content />
      </div>
    }
  `,
})
export class ModalSheetComponent {
  isOpen = input<boolean>(false);
  title = input.required<string>();
  subtitle = input<string>('');
  icon = input<any>(null);
  close = output<void>();
}
