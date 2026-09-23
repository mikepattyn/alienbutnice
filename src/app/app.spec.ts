import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { PAGE_HOSTNAME } from './core/page-hostname';

describe('App', () => {
  it('renders the home headline on / and the not-found headline on /404', async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), { provide: PAGE_HOSTNAME, useValue: 'alienbutnice.nl' }],
    });
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Echo & the others',
    );
    await router.navigateByUrl('/404');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'This page isn’t here.',
    );
  });
});
