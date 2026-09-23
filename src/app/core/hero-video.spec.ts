import { playHeroVideo, shouldPlayHeroVideo, startHeroVideo } from './hero-video';

describe('shouldPlayHeroVideo', () => {
  it('is true only when motion is allowed and the viewport is at least 768px', () => {
    expect(shouldPlayHeroVideo(false, true)).toBe(true);
    expect(shouldPlayHeroVideo(true, true)).toBe(false);
    expect(shouldPlayHeroVideo(false, false)).toBe(false);
    expect(shouldPlayHeroVideo(true, false)).toBe(false);
  });
});

describe('startHeroVideo', () => {
  it('does nothing when the video is missing', () => {
    expect(() => startHeroVideo(undefined, false, true)).not.toThrow();
  });
});

describe('playHeroVideo', () => {
  it('does not start the video when the policy is false', () => {
    const video = document.createElement('video');
    const play = vi.spyOn(video, 'play').mockResolvedValue();
    playHeroVideo(video, true, true);
    expect(play).not.toHaveBeenCalled();
  });

  it('starts the video when the policy is true', () => {
    const video = document.createElement('video');
    const play = vi.spyOn(video, 'play').mockResolvedValue();
    playHeroVideo(video, false, true);
    expect(play).toHaveBeenCalledOnce();
    expect(video.preload).toBe('metadata');
    video.dispatchEvent(new Event('playing'));
    expect(video.classList.contains('is-on')).toBe(true);
  });

  it('swallows a rejected play()', () => {
    const video = document.createElement('video');
    vi.spyOn(video, 'play').mockRejectedValue(new Error('autoplay'));
    expect(() => playHeroVideo(video, false, true)).not.toThrow();
  });
});

