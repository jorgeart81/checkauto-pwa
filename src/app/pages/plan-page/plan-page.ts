import { Component, inject } from '@angular/core';

import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { FleetService } from '@/services/fleet.service';

@Component({
  imports: [AppIcon],
  selector: 'app-plan-page',
  templateUrl: './plan-page.html',
  host: { class: 'block px-4 space-y-4 pt-2' },
})
export class PlanPage {
  private fleetService = inject(FleetService);
  protected vehicle = this.fleetService.activeVehicle;
}
