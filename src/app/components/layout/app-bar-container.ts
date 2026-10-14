import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-bar-container',
  template: `<ng-content />`,
  host: {
    class:
      'block bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 z-30 sticky top-0',
  },
})
export class AppBarContainer {}
