const PRODUCTION_HOSTS = new Set([
  "alienbutnice.nl",
  "www.alienbutnice.nl",
  "alienbutnice.bot",
  "www.alienbutnice.bot",
  "echo.alienbutnice.bot",
]);

const SITES = {
  home: {
    production: "https://alienbutnice.nl",
    preview: "https://preview.alienbutnice.nl",
    sameOrigin: "#top",
  },
  fleet: {
    production: "https://alienbutnice.bot",
    preview: "https://preview.alienbutnice.bot",
    sameOrigin: "/",
  },
  echo: {
    production: "https://echo.alienbutnice.bot",
    preview: "https://preview-echo.alienbutnice.bot",
    sameOrigin: "#echo",
  },
};

function hostsMatch(hostname, destHost) {
  return hostname === destHost || hostname === `www.${destHost}`;
}

export function sitesForHostname(hostname) {
  const preview = !PRODUCTION_HOSTS.has(hostname);
  return {
    home: preview ? SITES.home.preview : SITES.home.production,
    fleet: preview ? SITES.fleet.preview : SITES.fleet.production,
    echo: preview ? SITES.echo.preview : SITES.echo.production,
  };
}

export function hrefForSite(kind, hostname) {
  const url = sitesForHostname(hostname)[kind];
  if (!url) return "";
  const destHost = new URL(url).hostname;
  if (hostsMatch(hostname, destHost)) return SITES[kind].sameOrigin;
  return url;
}

export function applySiteLinks(root = document, hostname = window.location.hostname) {
  root.querySelectorAll("[data-abn-site]").forEach((el) => {
    const kind = el.getAttribute("data-abn-site");
    if (kind !== "home" && kind !== "fleet" && kind !== "echo") return;
    el.setAttribute("href", hrefForSite(kind, hostname));
  });
}

if (typeof document !== "undefined") {
  applySiteLinks();
}
