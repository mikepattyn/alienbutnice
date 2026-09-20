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
