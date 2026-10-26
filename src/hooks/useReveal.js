import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '../motion-policy';
gsap.registerPlugin(ScrollTrigger);
export default function useReveal(root, reduced) {
  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.from('[data-line]', {
        y: 24,
        opacity: 0,
        duration: motion.title,
        stagger: 0.08,
        ease: motion.ease,
      });
      gsap.from('[data-hero-support]', {
        y: 12,
        opacity: 0,
        duration: motion.support,
        delay: 0.18,
        ease: motion.ease,
      });
      gsap.from('[data-hero-visual]', {
        y: 20,
        duration: motion.visual,
        ease: motion.ease,
      });
      gsap.fromTo(
        '.hero-preview',
        { clipPath: 'inset(0 0 100% 0 round 28px)' },
        {
          clipPath: 'inset(0 0 0% 0 round 28px)',
          duration: motion.visual,
          ease: motion.ease,
          clearProps: 'clipPath',
        },
      );
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 18,
          opacity: 0,
          duration: motion.reveal,
          ease: motion.ease,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    }, root);
    const focus = (event) => {
      const group = event.target.closest(
        '[data-reveal], [data-hero-support], [data-hero-visual]',
      );
      if (group) {
        gsap.killTweensOf(group);
        gsap.set(group, { clearProps: 'transform,opacity,visibility' });
      }
    };
    const element = root.current;
    element.addEventListener('focusin', focus);
    return () => {
      element.removeEventListener('focusin', focus);
      context.revert();
    };
  }, [root, reduced]);
}
