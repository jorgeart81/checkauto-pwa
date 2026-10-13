import { Component, input } from '@angular/core';
import { IconName } from './icon-name.type';

@Component({
  imports: [],
  selector: 'app-icon',
  templateUrl: './app-icon.html',
})
export class AppIcon {
  name = input.required<IconName>();
  size = input<number>(16);
  strokeWidth = input<number>(2);
  class = input<string>('');
}
