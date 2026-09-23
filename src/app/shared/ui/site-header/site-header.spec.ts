import { TestBed } from '@angular/core/testing';
import { PAGE_HOSTNAME } from '../../../core/page-hostname';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('marks the nav scrolled after 24px', () => {
    TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [{ provide: PAGE_HOSTNAME, useValue: 'alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 });
    fixture.componentInstance.onScroll();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('.site-nav')?.classList.contains('is-scrolled')).toBe(
      true,
    );
  });
});
