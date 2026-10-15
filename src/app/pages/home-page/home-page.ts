import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppRoute } from '@/app.routes';
import { AlertCardComponent } from '@/components/ui/alert-card.component';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { MetricCardComponent } from '@/components/ui/metric-card.component';
import { FleetService } from '@/services/fleet.service';
import { ModalService } from '@/services/modal.service';

@Component({
  imports: [MetricCardComponent, AlertCardComponent, AppIcon, RouterLink],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class HomePage {
  private fleetService = inject(FleetService);
  protected modalService = inject(ModalService);
  protected readonly routes = AppRoute;
  protected vehicle = this.fleetService.activeVehicle;
  protected hasVehicles = this.fleetService.hasVehicles;
  protected altOdo = this.fleetService.altOdometer;
}
