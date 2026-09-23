import { TestBed } from '@angular/core/testing';
import { AlienMark } from './alien-mark';

describe('AlienMark', () => {
  it('hides the decorative mark from assistive tech', () => {
    TestBed.configureTestingModule({ imports: [AlienMark] });
    const fixture = TestBed.createComponent(AlienMark);
    fixture.componentRef.setInput('large', true);
    fixture.detectChanges();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.classList.contains('alien-mark--lg')).toBe(true);
  });
});
