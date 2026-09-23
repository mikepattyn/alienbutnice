const PRODUCTION_HOSTS = new Set([
  'alienbutnice.nl',
  'www.alienbutnice.nl',
  'alienbutnice.bot',
  'www.alienbutnice.bot',
  'echo.alienbutnice.bot',
]);

const SITES = {
  home: {
    production: 'https://alienbutnice.nl',
    preview: 'https://preview.alienbutnice.nl',
    sameOrigin: '#top',
  },
  fleet: {
    production: 'https://alienbutnice.bot',
    preview: 'https://preview.alienbutnice.bot',
    sameOrigin: '/',
  },
  echo: {
    production: 'https://echo.alienbutnice.bot',
    preview: 'https://preview-echo.alienbutnice.bot',
    sameOrigin: '#echo',
  },
} as const;

export type SiteKind = keyof typeof SITES;

function hostsMatch(hostname: string, destHost: string): boolean {
  return hostname === destHost || hostname === `www.${destHost}`;
}

export function sitesForHostname(hostname: string) {
  const preview = !PRODUCTION_HOSTS.has(hostname);
  return {
    home: preview ? SITES.home.preview : SITES.home.production,
    fleet: preview ? SITES.fleet.preview : SITES.fleet.production,
    echo: preview ? SITES.echo.preview : SITES.echo.production,
  };
}

export function hrefForSite(kind: string, hostname: string): string {
  if (kind !== 'home' && kind !== 'fleet' && kind !== 'echo') return '';
  const url = sitesForHostname(hostname)[kind];
  const destHost = new URL(url).hostname;
  if (hostsMatch(hostname, destHost)) return SITES[kind].sameOrigin;
  return url;
}
