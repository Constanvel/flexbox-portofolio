import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import useMedia from './useMedia';
gsap.registerPlugin(ScrollTrigger);
export default function useSmoothScroll(locked) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const desktop = useMedia('(hover: hover) and (pointer: fine)');
  const instance = useRef(null);
  useEffect(() => {
    if (reduced || !desktop) return;
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      syncTouch: false,
    });
    instance.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      instance.current = null;
    };
  }, [reduced, desktop]);
  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    if (locked) {
      instance.current?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else instance.current?.start();
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [locked, reduced, desktop]);
  const scrollTo = useCallback(
    (target = 0) => {
      const element =
        typeof target === 'string' ? document.querySelector(target) : null;
      const y = element
        ? Math.max(
            0,
            element.getBoundingClientRect().top + window.scrollY - 110,
          )
        : typeof target === 'number'
          ? target
          : 0;
      if (instance.current && !reduced) instance.current.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'instant' });
    },
    [reduced],
  );
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => scrollTo(window.location.hash));
    return () => cancelAnimationFrame(frame);
  }, [scrollTo]);
  return { reduced, scrollTo };
}
