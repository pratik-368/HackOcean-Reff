import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Anchor, GraduationCap, Microscope, Megaphone } from 'lucide-react';
import { WaveDivider } from '../components/ui/WaveDivider';

const missions = [
  {
    id: 1,
    title: 'Reef Restoration',
    description: 'Propagating resilient coral fragments in underwater nurseries and transplanting them to degraded reef sites globally.',
    icon: Anchor,
    colSpan: 'md:col-span-8',
    bgImg: 'url(https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800)'
  },
  {
    id: 2,
    title: 'Marine Research',
    description: 'Partnering with biologists to monitor reef health.',
    icon: Microscope,
    colSpan: 'md:col-span-4',
  },
  {
    id: 3,
    title: 'Community Education',
    description: 'Empowering coastal communities with the knowledge and tools to protect their local marine ecosystems sustainably.',
    icon: GraduationCap,
    colSpan: 'md:col-span-5',
  },
  {
    id: 4,
    title: 'Policy Advocacy',
    description: 'Working with governments to establish Marine Protected Areas and enforce strict anti-pollution laws worldwide.',
    icon: Megaphone,
    colSpan: 'md:col-span-7',
  },
];

export const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="mission" className="py-32 bg-transparent relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--sunlight)]/10 blur-[120px] rounded-full pointer-events-none animate-current-drift" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading mb-6 text-[var(--foam)] tracking-tight"
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[var(--foam)]/80 font-normal leading-relaxed"
          >
            We operate at the intersection of marine biology, community action, and scalable restoration tech to give coral reefs a fighting chance.
          </motion.p>
        </div>

        <div className="max-w-4xl">
          <div 
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 relative"
          >
          {missions.map((mission, index) => {
            const MissionIcon = mission.icon;
            return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden reef-card ${mission.colSpan}`}
            >
              {/* Background image for featured card with water-mask style */}
              {mission.bgImg && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-0 scale-105 group-hover:scale-100"
                  style={{ backgroundImage: mission.bgImg }}
                />
              )}

              <div className="relative z-10 flex flex-col h-full justify-between w-full p-10 md:p-12">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-[var(--surface-blue)]/30 flex items-center justify-center mb-10 group-hover:bg-[var(--sunlight)]/10 transition-all duration-500 group-hover:-translate-y-1">
                  <MissionIcon size={24} className="text-white group-hover:text-[var(--sunlight)] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-heading mb-4 text-white">
                    {mission.title}
                  </h3>
                  <p className="text-[var(--foam)]/80 leading-relaxed font-normal text-lg">
                    {mission.description}
                  </p>
                </div>
              </div>
            </motion.div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Wave SVG divider at bottom to transition to GetInvolved (--depth-5) */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider />
      </div>
    </section>
  );
};
