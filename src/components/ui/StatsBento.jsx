import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { stats } from '@/data/stats';

// Zigzag bento (horizontal, 6-col): row 1 = 3+2+1, row 2 = 1+2+3 — mirrors the "What we do" bento
const SPANS = [
  'md:col-span-3',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-3',
];
const SLIM = [false, false, true, true, false, false];
const ENTRY_DELAYS = [0, 0.10, 0.20, 0.06, 0.16, 0.26];

// Stacked bento (vertical, 2-col): big / half+half / big / half+half — bento feel in a narrow column
const STACKED_SPANS = ['col-span-2', 'col-span-1', 'col-span-1', 'col-span-2', 'col-span-1', 'col-span-1'];
const STACKED_SLIM = [false, true, true, false, true, true];
const STACKED_DELAYS = [0, 0.08, 0.16, 0.24, 0.32, 0.40];

// Hover tilt direction — alternates L/R by column position for depth realism
const HOVER_TILT_Y = [3, -2, -4, 4, -3, 2];

function StatCard({ stat, span, index, slim, compact, delay, shouldReduce }) {
  const isHero = index === 0;

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl ${span}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.32)',
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      initial={shouldReduce ? {} : { opacity: 0, y: 40, scale: 0.88, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      whileHover={shouldReduce ? {} : {
        y: -5,
        scale: 1.02,
        rotateX: -3,
        rotateY: HOVER_TILT_Y[index] ?? 0,
        transition: { duration: 0.32, ease: 'easeOut' },
      }}
    >
      {/* Glass inner highlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)' }}
        aria-hidden="true"
      />

      {isHero && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 12% 22%, rgba(200,169,110,0.1), transparent 65%)' }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 30% 50%, rgba(200,169,110,0.08), transparent 70%)' }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.22)' }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex flex-col justify-center h-full ${compact ? 'p-4' : slim ? 'p-5' : 'p-6'} ${slim ? 'gap-1' : 'gap-1.5'}`}
      >
        <p
          className={`font-serif text-accent leading-none ${
            compact
              ? (isHero ? 'text-2xl md:text-3xl' : slim ? 'text-xl' : 'text-2xl')
              : (isHero ? 'text-4xl md:text-5xl' : slim ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl')
          }`}
        >
          <AnimatedCounter
            value={stat.value}
            decimals={stat.decimals ?? 0}
            prefix={stat.prefix ?? ''}
            suffix={stat.suffix ?? ''}
            delay={delay + 0.3}
          />
        </p>
        <p className={`text-ink font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
          {stat.label}
        </p>
        {!slim && !compact && (
          <p className="text-ink-muted text-xs leading-relaxed">{stat.sub}</p>
        )}
        {stat.bar && (
          <div className="w-full h-1 rounded-full bg-white/8 overflow-hidden mt-1.5" aria-hidden="true">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={shouldReduce ? { width: `${Math.min(stat.value, 100)}%` } : { width: 0 }}
              whileInView={{ width: `${Math.min(stat.value, 100)}%` }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + 0.35,
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// layout: 'zigzag' (default, horizontal 6-col) | 'vertical' (uniform single column) | 'stacked' (vertical 2-col bento)
export default function StatsBento({ compact = false, layout = 'zigzag', className = '' }) {
  const shouldReduce = useReducedMotion();
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  const gridClass =
    layout === 'vertical'
      ? 'grid grid-cols-1 gap-2.5'
      : layout === 'stacked'
      ? 'grid grid-cols-2 gap-2.5 auto-rows-[minmax(110px,auto)]'
      : `grid grid-cols-1 md:grid-cols-6 gap-2.5 ${
          compact ? 'md:auto-rows-[minmax(76px,auto)]' : 'md:auto-rows-[minmax(120px,auto)]'
        }`;

  return (
    <div ref={gridRef} className={`relative ${className}`}>
      <div className={gridClass}>
        {stats.map((stat, i) => {
          const span =
            layout === 'vertical' ? '' : layout === 'stacked' ? STACKED_SPANS[i] : (SPANS[i] ?? 'md:col-span-2');
          const slim =
            layout === 'vertical' ? false : layout === 'stacked' ? STACKED_SLIM[i] : (SLIM[i] ?? false);
          const delay =
            layout === 'stacked' ? (STACKED_DELAYS[i] ?? i * 0.08) : (ENTRY_DELAYS[i] ?? i * 0.08);

          return (
            <StatCard
              key={stat.id}
              stat={stat}
              span={span}
              index={i}
              slim={slim}
              compact={compact}
              delay={delay}
              shouldReduce={shouldReduce}
            />
          );
        })}
      </div>

      {/* Gold shimmer sweep — fires after cards have entered */}
      {!shouldReduce && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-y-0 w-[38%]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.07) 25%, rgba(255,220,100,0.18) 50%, rgba(200,169,110,0.07) 75%, transparent 100%)',
              filter: 'blur(6px)',
            }}
            initial={{ x: '-55%' }}
            animate={gridInView ? { x: '320%' } : { x: '-55%' }}
            transition={{
              duration: 1.55,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.65,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
