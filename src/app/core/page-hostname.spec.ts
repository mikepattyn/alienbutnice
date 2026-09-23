import { TestBed } from '@angular/core/testing';
import { PAGE_HOSTNAME, resolvePageHostname } from './page-hostname';

describe('resolvePageHostname', () => {
  it('treats an empty or local host as alienbutnice.nl', () => {
    expect(resolvePageHostname('')).toBe('alienbutnice.nl');
    expect(resolvePageHostname('localhost')).toBe('alienbutnice.nl');
    expect(resolvePageHostname('127.0.0.1')).toBe('alienbutnice.nl');
  });

  it('keeps preview and production hosts', () => {
    expect(resolvePageHostname('preview.alienbutnice.nl')).toBe('preview.alienbutnice.nl');
    expect(resolvePageHostname('alienbutnice.nl')).toBe('alienbutnice.nl');
  });

  it('provides PAGE_HOSTNAME from the current location', () => {
    TestBed.configureTestingModule({});
    expect(TestBed.inject(PAGE_HOSTNAME)).toBe(resolvePageHostname(location.hostname));
  });
});

