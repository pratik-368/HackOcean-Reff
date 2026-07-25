import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Droplet, Users, Shield, MapPin } from 'lucide-react';
import { WaveDivider } from '../components/ui/WaveDivider';

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
    <section id="impact" className="py-24 relative bg-transparent z-10">
      
      {/* Wave Ambience */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-left mb-16"
        >
          <h2 className="mb-4">Our Impact in Numbers</h2>
          <p className="text-[var(--foam)]/80 max-w-lg">
            Every number represents real reef restored, real lives changed, and real ocean protected.
          </p>
        </motion.div>

        {/* Stats Grid — reef-cards with organic blob behind each icon */}
        <div className="max-w-5xl">
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
                className="reef-card p-8 flex flex-col items-start text-left relative overflow-hidden group"
              >
                {/* Organic blob shape behind the icon */}
                <div className="absolute top-4 left-6 w-24 h-24 opacity-[0.08] pointer-events-none">
                <div
                  className="w-full h-full blob-shape"
                  style={{
                    background: i % 2 === 0 ? 'var(--surface-blue)' : 'var(--sunlight)',
                    animationDelay: `${i * 2}s`,
                  }}
                />
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--surface-blue)]/10 group-hover:bg-[var(--sunlight)]/20 transition-colors duration-400">
                <IconComponent
                  size={26}
                  strokeWidth={1.5}
                  className="text-[var(--foam)] group-hover:text-[var(--sunlight)] transition-colors duration-400"
                />
              </div>

              {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-500 origin-left">
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
                <span className="text-3xl text-[var(--sunlight)] ml-1 font-semibold">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-[var(--foam)]/60 uppercase tracking-[0.15em] text-xs font-semibold group-hover:text-white transition-colors duration-300">
                {stat.title}
              </p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wave SVG divider at bottom to transition to TheCrisis (--depth-3) */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider />
      </div>
    </section>
  );
};
