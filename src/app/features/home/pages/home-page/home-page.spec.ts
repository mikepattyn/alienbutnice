import { TestBed } from '@angular/core/testing';
import { PAGE_HOSTNAME } from '../../../../core/page-hostname';
import { expectNoAxeViolations } from '../../../../testing/axe';
import { HomePage } from './home-page';

function stubMatchMedia(reduceMotion: boolean): void {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes('prefers-reduced-motion: reduce') ? reduceMotion : false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }) as MediaQueryList;
}

describe('HomePage', () => {
  beforeEach(() => {
    stubMatchMedia(true);
  });

  it('exposes one h1, skip link, primary nav, production site links, and the trust line', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: PAGE_HOSTNAME, useValue: 'alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('h1')?.textContent).toContain('Echo & the others');
    expect(root.querySelector('.skip-link')?.getAttribute('href')).toBe('#main');
    expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe('Primary');
    expect(root.querySelector('[data-abn-site="echo"]')?.getAttribute('href')).toBe(
      'https://echo.alienbutnice.bot',
    );
    expect(root.querySelector('[data-abn-site="fleet"]')?.getAttribute('href')).toBe(
      'https://alienbutnice.bot',
    );
    expect(root.textContent).toContain(
      'This page stores nothing and does not send the visit anywhere else.',
    );
    expect(play).not.toHaveBeenCalled();
    await expectNoAxeViolations(root);
  });

  it('starts the hero video when motion is allowed on a desktop viewport', async () => {
    stubMatchMedia(false);
    window.matchMedia = (query: string) =>
      ({
        matches: query.includes('min-width: 768px'),
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      }) as MediaQueryList;
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: PAGE_HOSTNAME, useValue: 'alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(play).toHaveBeenCalled();
  });

  it('rewrites Echo and Fleet to preview hosts', () => {
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: PAGE_HOSTNAME, useValue: 'preview.alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[data-abn-site="echo"]')?.getAttribute('href')).toBe(
      'https://preview-echo.alienbutnice.bot',
    );
    expect(root.querySelector('[data-abn-site="fleet"]')?.getAttribute('href')).toBe(
      'https://preview.alienbutnice.bot',
    );
  });
});
