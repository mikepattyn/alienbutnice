import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, viewChild } from '@angular/core';
import { startHeroVideo } from '../../../../core/hero-video';
import { PAGE_HOSTNAME } from '../../../../core/page-hostname';
import { hrefForSite } from '../../../../core/site-links';
import { Reveal } from '../../../../shared/ui/reveal/reveal';
import { SiteFooter } from '../../../../shared/ui/site-footer/site-footer';
import { SiteHeader } from '../../../../shared/ui/site-header/site-header';
import { SkipLink } from '../../../../shared/ui/skip-link/skip-link';

@Component({
  selector: 'app-home-page',
  imports: [SkipLink, SiteHeader, SiteFooter, Reveal],
  templateUrl: './home-page.html',
})
export class HomePage implements AfterViewInit {
  readonly fleetHref = hrefForSite('fleet', inject(PAGE_HOSTNAME));
  private readonly heroVideo = viewChild<ElementRef<HTMLVideoElement>>('heroVideo');

  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    startHeroVideo(
      this.heroVideo()?.nativeElement,
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      window.matchMedia('(min-width: 768px)').matches,
    );
  }
}
