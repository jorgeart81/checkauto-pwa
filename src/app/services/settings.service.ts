import { Injectable, signal } from '@angular/core';

import {
  AppSettings,
  CurrencyCode,
  DistanceMode,
  DistanceUnit,
  NotificationSettings,
  PerformanceFormula,
  VolumeUnit,
} from '@/interfaces/app-settings.interface';

const STORAGE_KEY = 'checkauto_settings';

const DEFAULT_SETTINGS: AppSettings = {
  distanceMode: 'auto',
  distanceUnit: 'km',
  volumeUnit: 'litros',
  performanceFormula: 'mpg',
  currency: 'USD',
  currencySymbol: '$',
  notifications: {
    workshop: true,
    legal: true,
    email: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _settings = signal<AppSettings>(this.loadInitialSettings());
  readonly settings = this._settings.asReadonly();

  setDistanceMode(mode: DistanceMode): void {
    this._settings.update((s) => ({ ...s, distanceMode: mode }));
    this.persist();
  }

  setDistanceUnit(unit: DistanceUnit): void {
    this._settings.update((s) => ({ ...s, distanceUnit: unit }));
    this.persist();
  }

  setVolumeUnit(unit: VolumeUnit): void {
    this._settings.update((s) => ({ ...s, volumeUnit: unit }));
    this.persist();
  }

  setPerformanceFormula(formula: PerformanceFormula): void {
    this._settings.update((s) => ({ ...s, performanceFormula: formula }));
    this.persist();
  }

  setCurrency(currency: CurrencyCode, symbol: string): void {
    this._settings.update((s) => ({ ...s, currency, currencySymbol: symbol }));
    this.persist();
  }

  toggleNotification(key: keyof NotificationSettings): void {
    this._settings.update((s) => ({
      ...s,
      notifications: {
        ...s.notifications,
        [key]: !s.notifications[key],
      },
    }));
    this.persist();
  }

  saveAll(): void {
    this.persist();
  }

  private loadInitialSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_SETTINGS;
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._settings()));
    } catch {
      // LocalStorage quota or unavailable
    }
  }
}
