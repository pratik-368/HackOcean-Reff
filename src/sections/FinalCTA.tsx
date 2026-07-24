import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { WaveDivider } from '../components/ui/WaveDivider';

export const FinalCTA = () => {
  return (
    <section id="final-cta" className="relative pt-32 pb-40 bg-[var(--depth-8)] overflow-hidden">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none water-mask" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--depth-8)] via-[var(--depth-8)]/80 to-transparent pointer-events-none" />

      {/* Coral-branch background */}
      <div className="absolute inset-0 coral-branch-bg opacity-30 pointer-events-none animate-current-drift" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading mb-8 text-[var(--foam)] tracking-tight font-bold">
            Dive In.
          </h2>
          <p className="text-xl md:text-3xl text-[var(--foam)]/80 font-normal mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the community of thousands who have pledged to protect our oceans. The reef remembers.
          </p>
          
          <form className="max-w-md mx-auto relative group mb-8">
            <input 
              type="email" 
              placeholder="Your email address..." 
              className="w-full bg-white/50 backdrop-blur-md border border-[var(--foam)]/10 rounded-full px-6 py-4 text-[var(--foam)] text-lg focus:outline-none focus:border-[var(--surface-blue)] transition-colors placeholder:text-[var(--foam)]/40 shadow-sm"
              required
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--abyss)] bg-[var(--sunlight)] rounded-full font-medium tracking-wide text-sm hover:opacity-90 transition-opacity px-6 py-2 shadow-sm"
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

      {/* Wave SVG divider at bottom to transition to Footer (--abyss) */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider />
      </div>
    </section>
  );
};
