import { afterNextRender, Component, HostListener, inject, input, signal } from '@angular/core';
import { PAGE_HOSTNAME } from '../../../core/page-hostname';
import { hrefForSite } from '../../../core/site-links';
import { AlienMark } from '../alien-mark/alien-mark';

@Component({
  selector: 'app-site-header',
  imports: [AlienMark],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  readonly variant = input<'home' | 'solid'>('home');
  readonly scrolled = signal(false);
  readonly echoHref = hrefForSite('echo', inject(PAGE_HOSTNAME));

  constructor() {
    afterNextRender(() => this.onScroll());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
