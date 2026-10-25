export function canAnimate({ reducedMotion, paused }) {
  return !reducedMotion && !paused;
}

export function useHorizontalShowcase({
  animated,
  width,
  finePointer,
  height,
}) {
  return animated && finePointer && width >= 1024 && height >= 650;
}

export function showcaseScrollPosition(start, end, index, count) {
  const progress =
    count > 1 ? Math.min(1, Math.max(0, index / (count - 1))) : 0;
  return start + (end - start) * progress;
}
