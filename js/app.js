import "./sites.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktop = window.matchMedia("(min-width: 768px)").matches;

const nav = document.querySelector("[data-nav]");
const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const video = document.querySelector("[data-hero-video]");
if (video instanceof HTMLVideoElement && !reduceMotion && desktop) {
  const play = () => {
    video.classList.add("is-on");
  };
  video.addEventListener("playing", play, { once: true });
  video.preload = "metadata";
  video.play().catch(() => {});
}

const reveals = document.querySelectorAll(".reveal:not(.is-in)");
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

const FLEET_URL = "https://alienbutnice.bot";
const fleet = document.querySelector("[data-fleet]");
if (fleet instanceof HTMLElement) {
  const cards = Array.from(fleet.querySelectorAll("[data-fleet-card]"));
  const track = fleet.querySelector("[data-fleet-track]");
  const dotsWrap = fleet.querySelector("[data-fleet-dots]");
  const echoIndex = Math.max(
    0,
    cards.findIndex((card) => card.getAttribute("data-status") === "online"),
  );
  let focused = echoIndex;
  const drag = { x: 0, active: false, moved: false };
  let wheelLock = false;

  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "fleet-dot";
    dot.setAttribute("role", "tab");
    dotsWrap?.append(dot);
    dot.addEventListener("click", () => goTo(index));
  });
  const dots = Array.from(fleet.querySelectorAll(".fleet-dot"));

  function goTo(index) {
    const next = ((index % cards.length) + cards.length) % cards.length;
    if (next === focused) return;
    focused = next;
    paint();
  }

  function paint() {
    cards.forEach((card, index) => {
      const shift = index - focused;
      const center = index === focused;
      const online = card.getAttribute("data-status") === "online";
      const name = card.getAttribute("data-name") || "Echo";
      card.style.setProperty("--shift", String(shift));
      card.style.zIndex = String(center ? 10 : 8 - Math.abs(shift));
      card.classList.toggle("is-center", center);
      card.setAttribute("aria-current", center ? "true" : "false");
      card.setAttribute(
        "aria-label",
        online
          ? `${name}, online. ${center ? "Centered." : "Bring to center."}`
          : `Open seat. ${center ? "Open the fleet." : "Bring to center."}`,
      );
    });
    dots.forEach((dot, index) => {
      const center = index === focused;
      const online = cards[index]?.getAttribute("data-status") === "online";
      dot.classList.toggle("is-active", center);
      dot.setAttribute("aria-selected", center ? "true" : "false");
      dot.setAttribute("aria-label", online ? "Show Echo" : `Show open seat ${index + 1}`);
    });
  }

  fleet.querySelector("[data-fleet-prev]")?.addEventListener("click", () => goTo(focused - 1));
  fleet.querySelector("[data-fleet-next]")?.addEventListener("click", () => goTo(focused + 1));

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (drag.moved) return;
      if (index !== focused) {
        goTo(index);
        return;
      }
      if (card.getAttribute("data-status") === "open") window.location.assign(FLEET_URL);
    });
  });

  if (track instanceof HTMLElement) {
    track.addEventListener("pointerdown", (event) => {
      drag.x = event.clientX;
      drag.active = true;
      drag.moved = false;
    });
    track.addEventListener("pointermove", (event) => {
      if (!drag.active) return;
      if (Math.abs(event.clientX - drag.x) > 12) drag.moved = true;
    });
    const endDrag = (event) => {
      if (!drag.active) return;
      const delta = event.clientX - drag.x;
      const moved = drag.moved;
      drag.active = false;
      if (!moved) return;
      if (delta > 40) goTo(focused - 1);
      else if (delta < -40) goTo(focused + 1);
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(focused - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(focused + 1);
      }
    });
    track.addEventListener(
      "wheel",
      (event) => {
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        if (Math.abs(delta) < 6) return;
        event.preventDefault();
        if (wheelLock) return;
        wheelLock = true;
        goTo(focused + (delta > 0 ? 1 : -1));
        window.setTimeout(() => {
          wheelLock = false;
        }, 320);
      },
      { passive: false },
    );
  }

  paint();
}
