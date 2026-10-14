import { Injectable, signal } from '@angular/core';

export type DistanceMode = 'auto' | 'forced';
export type DistanceUnit = 'km' | 'mi';
export type VolumeUnit = 'litros' | 'galones';
export type PerformanceFormula = 'kml' | 'l100' | 'mpg' | 'kmgal';
export type CurrencyCode = 'USD' | 'EUR' | 'PEN' | 'MXN' | 'COP';

export interface NotificationSettings {
  workshop: boolean;
  legal: boolean;
  email: boolean;
}

export interface AppSettings {
  distanceMode: DistanceMode;
  distanceUnit: DistanceUnit;
  volumeUnit: VolumeUnit;
  performanceFormula: PerformanceFormula;
  currency: CurrencyCode;
  currencySymbol: string;
  notifications: NotificationSettings;
}

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
  readonly settings = signal<AppSettings>(this.loadInitialSettings());

  setDistanceMode(mode: DistanceMode): void {
    this.settings.update((s) => ({ ...s, distanceMode: mode }));
    this.persist();
  }

  setDistanceUnit(unit: DistanceUnit): void {
    this.settings.update((s) => ({ ...s, distanceUnit: unit }));
    this.persist();
  }

  setVolumeUnit(unit: VolumeUnit): void {
    this.settings.update((s) => ({ ...s, volumeUnit: unit }));
    this.persist();
  }

  setPerformanceFormula(formula: PerformanceFormula): void {
    this.settings.update((s) => ({ ...s, performanceFormula: formula }));
    this.persist();
  }

  setCurrency(currency: CurrencyCode, symbol: string): void {
    this.settings.update((s) => ({ ...s, currency, currencySymbol: symbol }));
    this.persist();
  }

  toggleNotification(key: keyof NotificationSettings): void {
    this.settings.update((s) => ({
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings()));
    } catch {
      // LocalStorage quota or unavailable
    }
  }
}
