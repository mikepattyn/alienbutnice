import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: '<p appReveal>Echo</p>',
})
class RevealHost {}

describe('Reveal', () => {
  async function render(): Promise<HTMLElement> {
    TestBed.configureTestingModule({ imports: [RevealHost] });
    const fixture = TestBed.createComponent(RevealHost);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return fixture.nativeElement as HTMLElement;
  }

  it('marks the node in view through IntersectionObserver', async () => {
    const root = await render();
    expect(root.querySelector('.reveal')?.classList.contains('is-in')).toBe(true);
  });

  it('marks the node in view when motion is reduced', async () => {
    window.matchMedia = (query: string) =>
      ({
        matches: query.includes('prefers-reduced-motion: reduce'),
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
    const root = await render();
    expect(root.querySelector('.reveal')?.classList.contains('is-in')).toBe(true);
  });

  it('marks the node in view when IntersectionObserver is missing', async () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');
    const root = await render();
    expect(root.querySelector('.reveal')?.classList.contains('is-in')).toBe(true);
  });
});

