import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ChevronDown } from 'lucide-react';
import { ParticleWaves } from '../components/canvas/ParticleWaves';

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[var(--sand)]"
    >
      {/* Ocean Particle Waves System */}
      <ParticleWaves />

      {/* Subtle looping SVG wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-[5]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[80px]">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="var(--sand)"
            opacity="0.6"
          />
          <path
            d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,50 1440,80 L1440,120 L0,120 Z"
            fill="var(--sand)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ===== CONTENT — LEFT-ALIGNED ===== */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 container mx-auto px-6 md:px-12 pt-32 pb-24 pointer-events-none"
      >
        <div className="max-w-3xl pointer-events-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="mb-6 flex flex-col items-start gap-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ocean-deep)]/5 border border-[var(--ocean-deep)]/10 text-xs font-semibold tracking-widest text-[var(--ocean-deep)] uppercase">
              In partnership with Global Ocean Trust
            </div>
            <div className="text-[var(--seafoam)] font-medium text-sm tracking-wide">
              Est. 2019 &middot; 40+ Reefs Restored
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
          >
            <h1 className="mb-6">
              Protect What <br />
              <span className="text-glow-seafoam">Sustains</span> Us.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            className="text-lg md:text-xl text-[var(--ink)]/80 max-w-xl mb-10 font-normal leading-relaxed"
          >
            Coral reefs support over 25% of all marine life despite covering less than 1% of the ocean floor. We are running out of time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start gap-5"
          >
            <Button size="lg" variant="primary">
              Become a Volunteer
            </Button>
            <Button size="lg" variant="outline">
              Donate
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--ocean-deep)]/40 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--seafoam)]"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};
