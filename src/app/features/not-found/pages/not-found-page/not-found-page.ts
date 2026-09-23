import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteHeader } from '../../../../shared/ui/site-header/site-header';
import { SkipLink } from '../../../../shared/ui/skip-link/skip-link';

@Component({
  selector: 'app-not-found-page',
  imports: [SkipLink, SiteHeader],
  templateUrl: './not-found-page.html',
  host: { class: 'not-found-page' },
})
export class NotFoundPage {
  constructor() {
    inject(Title).setTitle('Page not found — AlienButNice');
    const meta = inject(Meta);
    meta.updateTag({
      name: 'description',
      content: 'This page is not on Alienbutnice. Echo found no space here.',
    });
    meta.updateTag({ name: 'robots', content: 'noindex' });
    inject(DOCUMENT).querySelector('link[rel="canonical"]')?.remove();
  }
}
