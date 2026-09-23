import { InjectionToken } from '@angular/core';

export function resolvePageHostname(
  hostname = typeof location === 'undefined' ? '' : location.hostname,
): string {
  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'alienbutnice.nl';
  }
  return hostname;
}

export const PAGE_HOSTNAME = new InjectionToken<string>('PAGE_HOSTNAME', {
  factory: () => resolvePageHostname(),
});
