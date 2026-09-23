export function shouldPlayHeroVideo(reduceMotion: boolean, desktop: boolean): boolean {
  return !reduceMotion && desktop;
}

export function startHeroVideo(
  video: HTMLVideoElement | null | undefined,
  reduceMotion: boolean,
  desktop: boolean,
): void {
  if (!video) return;
  playHeroVideo(video, reduceMotion, desktop);
}

export function playHeroVideo(
  video: HTMLVideoElement,
  reduceMotion: boolean,
  desktop: boolean,
): void {
  if (!shouldPlayHeroVideo(reduceMotion, desktop)) return;
  const play = () => {
    video.classList.add('is-on');
  };
  video.addEventListener('playing', play, { once: true });
  video.preload = 'metadata';
  video.play().catch(() => {});
}
