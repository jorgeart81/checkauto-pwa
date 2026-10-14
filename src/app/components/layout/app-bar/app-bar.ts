import { Component, inject, signal } from '@angular/core';

import { AppIcon } from '@/components/ui/app-icon/app-icon';
import { UiBadgeComponent } from '@/components/ui/ui-badge.component';
import { FleetService } from '@/services/fleet.service';
import { ModalService } from '@/services/modal.service';
import { RouterLink } from '@angular/router';
import { AppBarContainer } from '../app-bar-container';

@Component({
  imports: [AppIcon, AppBarContainer, UiBadgeComponent, RouterLink],
  selector: 'app-bar',
  styles: ``,
  templateUrl: './app-bar.html',
})
export class AppBar {
  private fleetService = inject(FleetService);
  protected modalService = inject(ModalService);
  protected vehicle = this.fleetService.activeVehicle;

  protected currentTime = signal<string>('09:41');

  constructor() {
    this.updateClock();
    setInterval(() => this.updateClock(), 10000);
  }

  private updateClock(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime.set(`${hours}:${minutes}`);
  }

  protected get badgeVariant(): () => 'critical' | 'warning' | 'optimal' {
    return () => {
      const lvl = this.vehicle().statusLevel;
      if (lvl === 'critical') return 'critical';
      if (lvl === 'warning') return 'warning';
      return 'optimal';
    };
  }
}
