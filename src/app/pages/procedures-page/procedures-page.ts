import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppRoute } from '@/app.routes';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { UiBadgeComponent } from '@/components/ui/ui-badge.component';
import { FleetService } from '@/services/fleet.service';
import { ToastService } from '@/services/toast.service';

@Component({
  imports: [AppIcon, UiBadgeComponent, RouterLink],
  selector: 'app-procedures-page',
  templateUrl: './procedures-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class ProceduresPage {
  private fleetService = inject(FleetService);
  private toastService = inject(ToastService);

  protected readonly routes = AppRoute;
  protected hasVehicles = this.fleetService.hasVehicles;

  protected filterMode = signal<'active' | 'all'>('active');

  protected filteredDocs = computed(() => {
    const mode = this.filterMode();
    const activeId = this.fleetService.activeVehicleId();
    const docs = this.fleetService.documents();
    if (mode === 'active') {
      return docs.filter((d) => d.vehicleId === activeId);
    }
    return docs;
  });

  protected setFilter(mode: 'active' | 'all'): void {
    this.filterMode.set(mode);
    this.toastService.show(
      mode === 'active'
        ? 'Mostrando documentos de la unidad activa'
        : 'Mostrando documentos de toda la flota',
      'info',
    );
  }

  protected triggerDocAction(title: string): void {
    this.toastService.show(`Iniciando trámite de renovación: ${title}`, 'success');
  }

  protected viewDocumentModal(title: string): void {
    this.toastService.show(`Copia digital de ${title} disponible`, 'info');
  }
}
