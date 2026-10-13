import { Component, inject } from '@angular/core';

import { ToastService } from '@/services/toast.service';
import { AppIcon } from './app-icon/app-icon';

@Component({
  imports: [AppIcon],
  selector: 'app-toast',
  template: `
    @if (toastState().visible) {
      <div
        class="fixed top-14 inset-x-4 max-w-sm mx-auto px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold z-50 animate-in slide-in-from-top-4 duration-200"
        [class]="toastClass()"
      >
        <app-icon
          [name]="toastState().type === 'error' ? 'alert-circle' : 'check-circle'"
          [size]="16"
          class="flex-shrink-0"
        />
        <span>{{ toastState().text }}</span>
      </div>
    }
  `,
})
export class ToastComponent {
  private toastService = inject(ToastService);
  protected toastState = this.toastService.toast;

  protected get toastClass(): () => string {
    return () => {
      switch (this.toastState().type) {
        case 'error':
          return 'bg-red-600 text-white';
        case 'info':
          return 'bg-indigo-600 text-white';
        default:
          return 'bg-emerald-600 text-white';
      }
    };
  }
}
