import { TestBed } from '@angular/core/testing';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('states that the page stores nothing', () => {
    TestBed.configureTestingModule({ imports: [SiteFooter] });
    const fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'This page stores nothing and does not send the visit anywhere else.',
    );
  });
});
