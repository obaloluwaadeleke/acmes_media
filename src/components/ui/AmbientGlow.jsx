import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from '@/lib/motion-tokens';

// ⚠️ Orb 2 color was #6366F1 (Indigo-500) — NOT in the brand palette.
// Replaced with #F2F2F2 (brand `ink` token) at very low opacity to create
// a cool-white moonlight contrast against the warm gold orbs.
const ORBS = [
  {
    size: 560, left: '50%',  top: '-20%',
    color: '#C8A96E', blur: 140, opacity: 0.18,
    dur: motionTokens.duration.glowDrift,
    delay: motionTokens.delay.glowStart,
    xPath: [0, 35, -25, 18, 0], yPath: [0, -30, 18, -12, 0],
  },
  {
    size: 420, left: '-5%',  top: '35%',
    color: '#F2F2F2', blur: 120, opacity: 0.04,
    dur: motionTokens.duration.glowDrift + 3,
    delay: 1.5,
    xPath: [0, -25, 30, -12, 0], yPath: [0, 22, -28, 14, 0],
  },
  {
    size: 300, left: '72%',  top: '50%',
    color: '#C8A96E', blur: 100, opacity: 0.09,
    dur: motionTokens.duration.glowDrift + 6,
    delay: 0.8,
    xPath: [0, -18, 22, -10, 0], yPath: [0, 18, -22, 10, 0],
  },
];

export default function AmbientGlow() {
  const shouldReduce = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            willChange: 'transform',
          }}
          initial={{ opacity: 0 }}
          animate={
            shouldReduce
              ? { opacity: orb.opacity }
              : { opacity: orb.opacity, x: orb.xPath, y: orb.yPath }
          }
          transition={
            shouldReduce
              ? { duration: 1.5 }
              : {
                  opacity: { duration: 2, delay: orb.delay, ease: motionTokens.ease.out },
                  x: { duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: motionTokens.ease.inOut },
                  y: { duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: motionTokens.ease.inOut },
                }
          }
        />
      ))}
    </div>
  );
}
