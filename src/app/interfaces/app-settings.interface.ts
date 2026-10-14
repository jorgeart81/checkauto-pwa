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
