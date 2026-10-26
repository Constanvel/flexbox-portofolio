import { useEffect, useState } from 'react';
export default function useNavbarScroll() {
  const [state, setState] = useState({ compact: false, hidden: false });
  useEffect(() => {
    let frame;
    let anchor = window.scrollY;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        let nextHidden;
        if (y < 400) {
          nextHidden = false;
          anchor = y;
        } else if (Math.abs(y - anchor) > 10) {
          nextHidden = y > anchor;
          anchor = y;
        }
        setState((previous) => ({
          compact: y > 120,
          hidden: nextHidden ?? previous.hidden,
        }));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);
  return state;
}
