import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

export default function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  delay = 0,
}) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(shouldReduce ? value : 0);

  useEffect(() => {
    if (!isInView || shouldReduce) return;

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [isInView, shouldReduce, value, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
