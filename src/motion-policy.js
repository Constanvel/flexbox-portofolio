export function canAnimate({ reducedMotion, paused = false }) {
  return !reducedMotion && !paused;
}
export const motion = {
  title: 0.7,
  support: 0.45,
  visual: 0.8,
  reveal: 0.5,
  dialog: 0.28,
  close: 0.18,
  ease: 'power3.out',
};
