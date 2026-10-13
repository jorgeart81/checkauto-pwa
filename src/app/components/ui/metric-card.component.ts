import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  template: `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-1.5 shadow-sm">
      <div class="flex items-center justify-between text-slate-400 text-xs">
        <span class="font-medium text-slate-300">{{ label() }}</span>
        @if (tag()) {
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
            {{ tag() }}
          </span>
        }
      </div>

      <div class="flex items-baseline gap-1">
        <span class="text-2xl font-extrabold text-white font-mono tracking-tight">{{
          value()
        }}</span>
        @if (unit()) {
          <span class="text-xs font-bold text-indigo-400 font-mono">{{ unit() }}</span>
        }
      </div>

      @if (subtext()) {
        <span class="text-[10px] block font-mono" [class]="subtextClass()">
          {{ subtext() }}
        </span>
      }
    </div>
  `,
})
export class MetricCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  unit = input<string>('');
  tag = input<string>('');
  subtext = input<string>('');
  subtextClass = input<string>('text-slate-500');
}
