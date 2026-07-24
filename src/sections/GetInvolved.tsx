import { motion } from 'framer-motion';
import { ArrowRight, Waves, Heart, Globe } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';

export const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-32 bg-[var(--sand)] text-[var(--ink)] relative overflow-hidden">
      
      {/* Coral-branch background texture */}
      <div className="absolute inset-0 coral-branch-bg opacity-30 pointer-events-none" />

      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px]">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,0 L0,0 Z" fill="var(--ocean-deep)" opacity="0.04" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              The Ocean Needs You.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--ink)]/60 font-light max-w-2xl mt-4"
            >
              Every action counts. Whether you're donating, volunteering, or partnering with us, you are making a tangible difference.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
          
          {/* Volunteer Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7 reef-card-dark text-[var(--sand)] p-10 md:p-16 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-0 group-hover:opacity-25 transition-all duration-1000 scale-105 group-hover:scale-100 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-deep)] to-transparent z-0 opacity-80" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-[var(--sand)]/5 border border-[var(--seafoam)]/20 flex items-center justify-center mb-10 group-hover:bg-[var(--seafoam)]/20 transition-colors duration-500">
                <Waves size={32} className="text-[var(--seafoam)]" strokeWidth={1} />
              </div>
              <h3 className="text-5xl md:text-7xl font-heading mb-6 tracking-tight text-[var(--sand)]">Volunteer</h3>
              <p className="text-[var(--sand)]/70 max-w-md text-xl font-light mb-8">
                Join our global network of reef restorers. Get your hands wet and help us plant the next generation of corals.
              </p>
            </div>
            
            <Magnetic>
              <a href="#" className="relative z-10 inline-flex items-center gap-4 text-[var(--seafoam)] font-medium text-lg group-hover:gap-6 transition-all w-max">
                Apply Now <ArrowRight size={24} />
              </a>
            </Magnetic>
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Donate Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="bg-[var(--coral)] text-white rounded-[28px] p-10 flex-1 flex flex-col justify-between relative group overflow-hidden shadow-[0_8px_30px_rgba(255,107,91,0.25)]"
            >
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 z-0" />
              
              <div className="relative z-10">
                <Heart size={32} className="mb-6 text-white" strokeWidth={1.5} />
                <h3 className="text-4xl font-heading mb-4">Donate</h3>
                <p className="text-white/90 font-light text-lg">
                  Fund a reef. $10 plants a coral fragment that can grow for centuries.
                </p>
              </div>
              
              <Magnetic>
                <a href="#" className="relative z-10 inline-flex items-center gap-2 mt-8 font-medium group-hover:gap-4 transition-all w-max">
                  Give Today <ArrowRight size={20} />
                </a>
              </Magnetic>
            </motion.div>

            {/* Partner Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
              className="reef-card text-[var(--ink)] p-10 flex-1 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="relative z-10">
                <Globe size={32} className="mb-6 text-[var(--ocean-deep)]" strokeWidth={1.5} />
                <h3 className="text-4xl font-heading mb-4">Partner</h3>
                <p className="text-[var(--ink)]/60 font-light text-lg">
                  Corporate responsibility meets tangible ocean impact.
                </p>
              </div>
              
              <Magnetic>
                <a href="#" className="relative z-10 inline-flex items-center gap-2 mt-8 font-medium text-[var(--ocean-deep)] group-hover:gap-4 transition-all w-max">
                  Let's Talk <ArrowRight size={20} />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
