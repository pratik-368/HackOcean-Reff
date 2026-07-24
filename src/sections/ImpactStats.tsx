import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Droplet, Users, Shield, MapPin } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Reefs Restored',
    value: 124,
    suffix: '+',
    icon: Droplet,
  },
  {
    id: 2,
    title: 'Volunteers',
    value: 45000,
    suffix: '+',
    icon: Users,
  },
  {
    id: 3,
    title: 'Species Protected',
    value: 850,
    suffix: '',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Acres Conserved',
    value: 2.5,
    suffix: 'M',
    decimals: 1,
    icon: MapPin,
  },
];

export const ImpactStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-[var(--sand)] overflow-hidden">
      {/* Wave SVG divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px]">
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,20 1440,40 L1440,0 L0,0 Z"
            fill="var(--ocean-deep)"
            opacity="0.05"
          />
        </svg>
      </div>

      {/* Coral-branch background texture */}
      <div className="absolute inset-0 coral-branch-bg opacity-40 pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Our Impact in Numbers</h2>
          <p className="text-[var(--ink)]/60 max-w-lg mx-auto">
            Every number represents real reef restored, real lives changed, and real ocean protected.
          </p>
        </motion.div>

        {/* Stats Grid — reef-cards with organic blob behind each icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="reef-card p-8 flex flex-col items-center text-center relative overflow-hidden group"
            >
              {/* Organic blob shape behind the icon */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 opacity-[0.08] pointer-events-none">
                <div
                  className="w-full h-full blob-shape"
                  style={{
                    background: i % 2 === 0 ? 'var(--seafoam)' : 'var(--coral)',
                    animationDelay: `${i * 2}s`,
                  }}
                />
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--ocean-deep)]/5 group-hover:bg-[var(--coral)]/10 transition-colors duration-400">
                <IconComponent
                  size={26}
                  strokeWidth={1.5}
                  className="text-[var(--ocean-deep)] group-hover:text-[var(--coral)] transition-colors duration-400"
                />
              </div>

              {/* Number */}
              <div className="text-5xl md:text-6xl font-heading font-bold text-[var(--ocean-deep)] mb-3 tracking-tight flex items-baseline">
                {isInView ? (
                  // @ts-ignore - Handle Vite CJS/ESM interop differences where CountUp might be an object
                  (CountUp.default || CountUp) && (
                    typeof CountUp === 'function' ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={3}
                        decimals={stat.decimals || 0}
                        separator=","
                        useEasing={true}
                      />
                    ) : (
                      // @ts-ignore
                      <CountUp.default
                        start={0}
                        end={stat.value}
                        duration={3}
                        decimals={stat.decimals || 0}
                        separator=","
                        useEasing={true}
                      />
                    )
                  )
                ) : (
                  "0"
                )}
                <span className="text-3xl text-[var(--coral)] ml-1 font-semibold">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-[var(--ink)]/50 uppercase tracking-[0.15em] text-xs font-semibold group-hover:text-[var(--ink)]/80 transition-colors duration-300">
                {stat.title}
              </p>
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* Wave SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px]">
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
            fill="var(--ocean-deep)"
            opacity="0.05"
          />
        </svg>
      </div>
    </section>
  );
};
