import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [motionDisabled, setMotionDisabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cartoniq_reduce_motion') === 'true';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMotion = () => {
    setMotionDisabled(prev => {
      const next = !prev;
      localStorage.setItem('cartoniq_reduce_motion', String(next));
      return next;
    });
  };

  return {
    reducedMotion: prefersReduced || motionDisabled,
    motionDisabled,
    toggleMotion
  };
}
