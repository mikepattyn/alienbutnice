import { hrefForSite, sitesForHostname } from './site-links';

const production = {
  home: 'https://alienbutnice.nl',
  fleet: 'https://alienbutnice.bot',
  echo: 'https://echo.alienbutnice.bot',
};

const preview = {
  home: 'https://preview.alienbutnice.nl',
  fleet: 'https://preview.alienbutnice.bot',
  echo: 'https://preview-echo.alienbutnice.bot',
};

describe('sitesForHostname', () => {
  it.each([
    'alienbutnice.nl',
    'www.alienbutnice.nl',
    'alienbutnice.bot',
    'www.alienbutnice.bot',
    'echo.alienbutnice.bot',
  ])('returns production URLs on %s', (hostname) => {
    expect(sitesForHostname(hostname)).toEqual(production);
  });

  it('returns preview URLs on any other host', () => {
    expect(sitesForHostname('preview.alienbutnice.nl')).toEqual(preview);
    expect(sitesForHostname('localhost')).toEqual(preview);
  });
});

describe('hrefForSite', () => {
  it('returns the same-origin hash or path when already on that host', () => {
    expect(hrefForSite('home', 'alienbutnice.nl')).toBe('#top');
    expect(hrefForSite('home', 'www.alienbutnice.nl')).toBe('#top');
    expect(hrefForSite('fleet', 'alienbutnice.bot')).toBe('/');
    expect(hrefForSite('fleet', 'www.alienbutnice.bot')).toBe('/');
    expect(hrefForSite('echo', 'echo.alienbutnice.bot')).toBe('#echo');
  });

  it('returns the absolute production URL from another production host', () => {
    expect(hrefForSite('echo', 'alienbutnice.nl')).toBe('https://echo.alienbutnice.bot');
    expect(hrefForSite('fleet', 'alienbutnice.nl')).toBe('https://alienbutnice.bot');
  });

  it('returns the absolute preview URL from a preview host', () => {
    expect(hrefForSite('echo', 'preview.alienbutnice.nl')).toBe(
      'https://preview-echo.alienbutnice.bot',
    );
    expect(hrefForSite('fleet', 'preview.alienbutnice.nl')).toBe('https://preview.alienbutnice.bot');
  });

  it('returns an empty string for an unknown kind', () => {
    expect(hrefForSite('nope', 'alienbutnice.nl')).toBe('');
  });
});
