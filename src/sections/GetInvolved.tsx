import { motion } from 'framer-motion';
import { WaveDivider } from '../components/ui/WaveDivider';
import { ArrowRight, Waves, Heart, Globe, ClipboardCheck, Users, Pickaxe, MapPin, Award } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';

const journeySteps = [
  { icon: ClipboardCheck, title: 'Sign Up', desc: 'Join our global network of reef defenders.' },
  { icon: Users, title: 'Orientation', desc: 'Learn the science of coral restoration and safety.' },
  { icon: Pickaxe, title: 'Choose Project', desc: 'Select between local cleanups or direct coral planting.' },
  { icon: MapPin, title: 'Get Involved', desc: 'Deploy to the field or support remotely.' },
  { icon: Award, title: 'See Your Impact', desc: 'Receive your personalized restoration report.' }
];

export const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-32 bg-[var(--depth-5)] text-[var(--foam)] relative overflow-hidden">
      
      {/* Coral-branch background texture */}
      <div className="absolute inset-0 coral-branch-bg opacity-30 pointer-events-none filter invert mix-blend-screen" />

      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px]">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,0 L0,0 Z" fill="var(--deep-blue)" opacity="0.04" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
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
              className="text-xl md:text-2xl text-[var(--foam)]/80 font-light max-w-2xl mt-4"
            >
              Every action counts. Whether you're donating, volunteering, or partnering with us, you are making a tangible difference.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-auto mb-32">
          
          {/* Volunteer Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7 reef-card text-[var(--deep-blue)] p-10 md:p-16 flex flex-col justify-between relative group overflow-hidden bg-[rgba(127,179,213,0.15)]"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-0 group-hover:opacity-15 transition-all duration-1000 scale-105 group-hover:scale-100 z-0 water-mask" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full border border-[var(--surface-blue)]/50 bg-[var(--surface-blue)]/10 text-[var(--deep-blue)] text-sm font-medium tracking-wide">
                  Beginner-Friendly
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--surface-blue)]/50 bg-[var(--surface-blue)]/10 text-[var(--deep-blue)] text-sm font-medium tracking-wide">
                  1-Day / 1-Week
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--surface-blue)]/50 bg-[var(--surface-blue)]/10 text-[var(--deep-blue)] text-sm font-medium tracking-wide">
                  Advanced (Dive Cert Required)
                </span>
              </div>
              
              <div className="w-20 h-20 rounded-full bg-[var(--surface-blue)]/10 border border-[var(--surface-blue)]/30 flex items-center justify-center mb-10 group-hover:bg-[var(--surface-blue)]/20 transition-colors duration-500">
                <Waves size={32} className="text-[var(--surface-blue)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-5xl md:text-7xl font-heading mb-6 tracking-tight text-[var(--deep-blue)]">Volunteer</h3>
              <p className="text-[var(--ink)]/70 max-w-md text-xl font-normal mb-8 leading-relaxed">
                Join our global network of reef restorers. Get your hands wet and help us plant the next generation of corals.
              </p>
            </div>
            
            <Magnetic>
              <a href="#" className="relative z-10 inline-flex items-center gap-4 text-[var(--surface-blue)] font-semibold text-lg group-hover:gap-6 transition-all w-max link-flow pb-1">
                Apply Now <ArrowRight size={24} />
              </a>
            </Magnetic>
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Donate Card with Transparency Stat */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="bg-[var(--sunlight)] text-[var(--abyss)] rounded-[28px] p-10 flex-1 flex flex-col justify-between relative group overflow-hidden shadow-[0_8px_30px_rgba(255,184,107,0.25)]"
            >
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 z-0" />
              
              <div className="relative z-10">
                <Heart size={32} className="mb-6 text-[var(--abyss)]" strokeWidth={1.5} />
                <h3 className="text-4xl font-heading mb-4 text-[var(--abyss)]">Donate</h3>
                <p className="text-[var(--abyss)]/90 font-medium text-lg mb-8">
                  Fund a reef. $10 plants a coral fragment that can grow for centuries.
                </p>

                {/* Transparency Breakdown */}
                <div className="bg-white/20 rounded-xl p-4 mb-4 backdrop-blur-sm border border-white/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--abyss)] mb-3">Where Your Donation Goes</p>
                  
                  <div className="w-full flex h-2 rounded-full overflow-hidden mb-3 gap-0.5">
                    <div className="bg-[var(--abyss)] w-[70%]" title="70% Direct Restoration"></div>
                    <div className="bg-[var(--deep-blue)] w-[15%]" title="15% Research"></div>
                    <div className="bg-[var(--surface-blue)] w-[10%]" title="10% Education"></div>
                    <div className="bg-white w-[5%]" title="5% Operations"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[var(--abyss)]/80">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--abyss)]"></div> 70% Restoration</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--deep-blue)]"></div> 15% Research</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--surface-blue)]"></div> 10% Education</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white border border-[var(--abyss)]/20"></div> 5% Ops</span>
                  </div>
                </div>
              </div>
              
              <Magnetic>
                <a href="#" className="relative z-10 inline-flex items-center gap-2 mt-4 font-semibold group-hover:gap-4 transition-all w-max text-[var(--abyss)]">
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
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full border border-[var(--deep-blue)]/20 bg-[var(--deep-blue)]/5 text-[var(--deep-blue)] text-xs font-medium tracking-wide">
                    Corporate
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[var(--deep-blue)]/20 bg-[var(--deep-blue)]/5 text-[var(--deep-blue)] text-xs font-medium tracking-wide">
                    Sustaining
                  </span>
                </div>
                <Globe size={32} className="mb-4 text-[var(--deep-blue)]" strokeWidth={1.5} />
                <h3 className="text-4xl font-heading mb-4 text-[var(--deep-blue)]">Partner</h3>
                <p className="text-[var(--ink)]/70 font-normal text-lg">
                  Corporate responsibility meets tangible ocean impact.
                </p>
              </div>
              
              <Magnetic>
                <a href="#" className="relative z-10 inline-flex items-center gap-2 mt-8 font-semibold text-[var(--deep-blue)] group-hover:gap-4 transition-all w-max link-flow pb-1">
                  Let's Talk <ArrowRight size={20} />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Numbered Journey Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-heading mb-4">How You Can Help</h3>
            <p className="text-xl text-[var(--foam)]/70 max-w-2xl mx-auto">From signing up to seeing your personal impact on the ocean floor.</p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-[var(--foam)]/10" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative flex flex-row md:flex-col items-start gap-6 md:gap-4 z-10">
                    <div className="shrink-0 w-20 h-20 md:mx-auto rounded-full bg-[var(--deep-blue)] border border-[var(--foam)]/20 flex items-center justify-center shadow-lg relative">
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--sunlight)] text-[var(--abyss)] flex items-center justify-center text-sm font-bold shadow-md">
                        {i + 1}
                      </div>
                      <Icon size={32} className="text-[var(--foam)]" strokeWidth={1.5} />
                    </div>
                    
                    <div className="md:text-center mt-2 md:mt-4">
                      <h4 className="text-xl font-heading text-[var(--foam)] mb-2">{step.title}</h4>
                      <p className="text-[var(--foam)]/70 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Wave SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider topColor="transparent" bottomColor="var(--depth-6)" />
      </div>
    </section>
  );
};
