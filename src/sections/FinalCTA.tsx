import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const FinalCTA = () => {
  return (
    <section id="final-cta" className="relative pt-32 pb-40 bg-[var(--ocean-deep)] overflow-hidden">
      
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,0 L0,0 Z" fill="var(--sand)" />
        </svg>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-deep)] via-[var(--ocean-deep)]/80 to-transparent pointer-events-none" />

      {/* Coral-branch background */}
      <div className="absolute inset-0 coral-branch-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading mb-8 text-[var(--sand)] tracking-tight font-bold">
            Dive In.
          </h2>
          <p className="text-xl md:text-3xl text-[var(--sand)]/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the community of thousands who have pledged to protect our oceans. The reef remembers.
          </p>
          
          <form className="max-w-md mx-auto relative group mb-8">
            <input 
              type="email" 
              placeholder="Your email address..." 
              className="w-full bg-transparent border-b border-[var(--sand)]/20 px-4 py-4 text-[var(--sand)] text-lg focus:outline-none focus:border-[var(--coral)] transition-colors placeholder:text-[var(--sand)]/30"
              required
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--coral)] font-medium tracking-wide uppercase text-sm hover:text-[var(--sand)] transition-colors px-4 py-2"
            >
              Subscribe
            </button>
          </form>
          
          <div className="flex justify-center mt-12">
            <Button size="lg" variant="primary" showArrow>
              Make a Donation
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0,60 C240,0 480,100 720,60 C960,20 1200,80 1440,60 L1440,120 L0,120 Z" fill="var(--ocean-deep)" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
};
