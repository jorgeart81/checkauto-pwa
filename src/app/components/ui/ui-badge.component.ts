import { Component, input } from '@angular/core';

export type BadgeVariant = 'optimal' | 'warning' | 'critical' | 'neutral' | 'brand';

@Component({
  selector: 'app-ui-badge',
  template: `
    <span
      class="inline-flex items-center font-bold rounded-full border px-2 py-0.5 text-[10px] tracking-wide uppercase transition-colors"
      [class]="badgeClass()"
    >
      <ng-content />
    </span>
  `,
})
export class UiBadgeComponent {
  variant = input<BadgeVariant>('neutral');
  customClass = input<string>('');

  protected get badgeClass(): () => string {
    return () => {
      let base = '';
      switch (this.variant()) {
        case 'critical':
          base = 'bg-red-500/20 text-red-300 border-red-500/30';
          break;
        case 'warning':
          base = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          break;
        case 'optimal':
          base = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
          break;
        case 'brand':
          base = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
          break;
        default:
          base = 'bg-slate-800 text-slate-300 border-slate-700';
          break;
      }
      return `${base} ${this.customClass()}`;
    };
  }
}
