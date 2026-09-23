import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.classList.add('is-in');
        return;
      }
      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-in');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(node);
    });
  }
}
