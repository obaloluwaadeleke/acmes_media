import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { motionTokens } from '@/lib/motion-tokens';

function useDebouncedMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouse({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return mouse;
}

export default function ParallaxGrid({ className = '' }) {
  const shouldReduce = useReducedMotion();
  const mouse = useDebouncedMouse();

  if (shouldReduce) {
    return (
      <div
        className={`grid-bg absolute inset-0 opacity-40 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className={`grid-bg absolute inset-0 opacity-40 pointer-events-none ${className}`}
      animate={{ x: mouse.x * -15, y: mouse.y * -15 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
        duration: motionTokens.duration.parallaxLag,
      }}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
