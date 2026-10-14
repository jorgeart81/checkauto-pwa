import { Component, inject } from '@angular/core';

import { AlertCardComponent } from '@/components/ui/alert-card.component';
import { MetricCardComponent } from '@/components/ui/metric-card.component';
import { FleetService } from '@/services/fleet.service';
import { ModalService } from '@/services/modal.service';
import { AppIcon } from '@/components/ui/app-icon/app-icon';

@Component({
  imports: [MetricCardComponent, AlertCardComponent, AppIcon],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class HomePage {
  private fleetService = inject(FleetService);
  protected modalService = inject(ModalService);
  protected vehicle = this.fleetService.activeVehicle;
  protected altOdo = this.fleetService.altOdometer;
}
