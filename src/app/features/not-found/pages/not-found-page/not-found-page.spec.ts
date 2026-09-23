import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { PAGE_HOSTNAME } from '../../../../core/page-hostname';
import { expectNoAxeViolations } from '../../../../testing/axe';
import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('is a noindex page with one h1 and a home link', async () => {
    TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [{ provide: PAGE_HOSTNAME, useValue: 'alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('This page isn’t here.');
    expect(TestBed.inject(Title).getTitle()).toBe('Page not found — AlienButNice');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
    expect(root.querySelector('a.not-found__cta')?.getAttribute('href')).toBe('/');
    await expectNoAxeViolations(root);
  });
});
