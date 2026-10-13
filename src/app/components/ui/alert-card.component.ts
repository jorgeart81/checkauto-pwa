import { Component, input } from '@angular/core';
import { AppIcon } from './app-icon/app-icon';
import { IconName } from './app-icon/icon-name.type';
import { UiBadgeComponent } from './ui-badge.component';

@Component({
  imports: [AppIcon, UiBadgeComponent],
  selector: 'app-alert-card',
  template: `
    <div
      class="p-3.5 rounded-2xl border flex items-start gap-3 transition-colors"
      [class]="containerClass()"
    >
      <div
        class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border"
        [class]="iconBoxClass()"
      >
        <app-icon [name]="iconName()" [size]="16" />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <h4 class="text-xs font-bold truncate" [class]="titleClass()">{{ title() }}</h4>
          @if (badge()) {
            <app-ui-badge
              [variant]="isCritical() ? 'critical' : isWarning() ? 'warning' : 'neutral'"
              customClass="text-[9px] px-1.5 py-0.2"
            >
              {{ badge() }}
            </app-ui-badge>
          }
        </div>

        @if (desc()) {
          <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">{{ desc() }}</p>
        }

        @if (condition()) {
          <div class="mt-2 flex items-center justify-between text-[11px]">
            <span class="text-slate-400">Condición:</span>
            <span class="font-mono font-medium" [class]="conditionClass()">{{ condition() }}</span>
          </div>
        }

        @if (progress() !== undefined) {
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              class="h-full rounded-full transition-all duration-500"
              [class]="progressBarClass()"
              [style.width.%]="progress()"
            ></div>
          </div>
        }
      </div>
    </div>
  `,
})
export class AlertCardComponent {
  title = input.required<string>();
  desc = input<string>('');
  badge = input<string>('');
  condition = input<string>('');
  progress = input<number | undefined>(undefined);
  isCritical = input<boolean>(false);
  isWarning = input<boolean>(false);
  iconName = input<IconName>('alert-triangle');

  protected get containerClass(): () => string {
    return () => {
      if (this.isCritical()) {
        return 'bg-red-950/20 border-red-800/40';
      }
      if (this.isWarning()) {
        return 'bg-slate-900 border-amber-500/30';
      }
      return 'bg-slate-900 border-slate-800';
    };
  }

  protected get iconBoxClass(): () => string {
    return () => {
      if (this.isCritical()) {
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      }
      if (this.isWarning()) {
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      }
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    };
  }

  protected get titleClass(): () => string {
    return () => {
      if (this.isCritical()) return 'text-red-200';
      if (this.isWarning()) return 'text-amber-200';
      return 'text-slate-200';
    };
  }

  protected get conditionClass(): () => string {
    return () => {
      if (this.isCritical()) return 'text-red-300';
      if (this.isWarning()) return 'text-amber-300';
      return 'text-indigo-300';
    };
  }

  protected get progressBarClass(): () => string {
    return () => {
      if (this.isCritical()) return 'bg-red-500';
      if (this.isWarning()) return 'bg-amber-500';
      return 'bg-indigo-500';
    };
  }
}
