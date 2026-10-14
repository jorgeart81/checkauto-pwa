import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { FleetService } from '@/services/fleet.service';
import {
  CurrencyCode,
  DistanceMode,
  DistanceUnit,
  NotificationSettings,
  PerformanceFormula,
  SettingsService,
  VolumeUnit,
} from '@/services/settings.service';
import { ToastService } from '@/services/toast.service';

@Component({
  imports: [RouterLink, AppIcon],
  selector: 'app-settings-page',
  templateUrl: './settings-page.html',
  host: { class: 'flex flex-col flex-1 pb-4' },
})
export class SettingsPage {
  private settingsService = inject(SettingsService);
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  protected settings = this.settingsService.settings;
  protected vehicle = this.fleetService.activeVehicle;

  // Real-time conversion preview calculation
  protected conversionPreview = computed(() => {
    const odo = this.vehicle().odometer;
    const km = Math.round(odo * 1.60934);
    return `${odo.toLocaleString()} mi ≈ ${km.toLocaleString()} km`;
  });

  // Real-time cost preview sample
  protected costPreview = computed(() => {
    const symbol = this.settings().currencySymbol;
    return `${symbol}0.21 / km • ${symbol}342.50 / mes`;
  });

  protected setDistanceMode(mode: DistanceMode): void {
    this.settingsService.setDistanceMode(mode);
    const msg =
      mode === 'auto' ? 'Detección por vehículo activada' : 'Modo de distancia global forzado';
    this.toastService.show(msg, 'info');
  }

  protected selectDistanceUnit(unit: DistanceUnit): void {
    this.settingsService.setDistanceUnit(unit);
    this.toastService.show(
      `Unidad establecida: ${unit === 'km' ? 'Kilómetros (km)' : 'Millas (mi)'}`,
      'success',
    );
  }

  protected selectVolumeUnit(unit: VolumeUnit): void {
    this.settingsService.setVolumeUnit(unit);
    this.toastService.show(
      `Volumen establecido: ${unit === 'litros' ? 'Litros (L)' : 'Galones US (gal)'}`,
      'success',
    );
  }

  protected selectPerformanceFormula(formula: PerformanceFormula): void {
    this.settingsService.setPerformanceFormula(formula);
    const names: Record<PerformanceFormula, string> = {
      kml: 'km / Litro',
      l100: 'L / 100 km',
      mpg: 'MPG (mi/gal)',
      kmgal: 'km / Galón',
    };
    this.toastService.show(`Fórmula: ${names[formula]}`, 'success');
  }

  protected selectCurrency(currency: CurrencyCode, symbol: string): void {
    this.settingsService.setCurrency(currency, symbol);
    this.toastService.show(`Moneda: ${currency} (${symbol})`, 'success');
  }

  protected toggleNotification(key: keyof NotificationSettings, label: string): void {
    this.settingsService.toggleNotification(key);
    const active = this.settings().notifications[key];
    this.toastService.show(
      `${label}: ${active ? 'Activado' : 'Desactivado'}`,
      active ? 'success' : 'info',
    );
  }

  protected exportData(): void {
    this.toastService.show('Exportando bitácora completa en CSV / Excel...', 'info');
  }

  protected generatePdf(): void {
    this.toastService.show('Generando Reporte Certificado PDF para venta...', 'info');
  }

  protected syncCache(): void {
    this.toastService.show('Caché PWA sincronizado con éxito', 'success');
  }

  protected saveAllPreferences(): void {
    this.settingsService.saveAll();
    this.toastService.show('Preferencias globales guardadas exitosamente', 'success');
  }
}
