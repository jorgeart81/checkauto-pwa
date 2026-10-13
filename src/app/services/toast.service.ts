import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'info' | 'error';
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toast = signal<ToastMessage>({
    text: '',
    type: 'success',
    visible: false,
  });

  private timer: ReturnType<typeof setTimeout> | null = null;

  show(text: string, type: 'success' | 'info' | 'error' = 'success', duration = 3000): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.toast.set({
      text,
      type,
      visible: true,
    });

    this.timer = setTimeout(() => {
      this.toast.update((curr) => ({ ...curr, visible: false }));
    }, duration);
  }
}
