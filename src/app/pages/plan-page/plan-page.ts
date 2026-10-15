import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppRoute } from '@/app.routes';
import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { FleetService } from '@/services/fleet.service';

@Component({
  imports: [AppIcon, RouterLink],
  selector: 'app-plan-page',
  templateUrl: './plan-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class PlanPage {
  private fleetService = inject(FleetService);
  protected readonly routes = AppRoute;
  protected vehicle = this.fleetService.activeVehicle;
}
