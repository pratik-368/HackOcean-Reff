import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Anchor, GraduationCap, Microscope, Megaphone } from 'lucide-react';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="mission" className="py-32 relative bg-[var(--ocean-deep)] overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-[var(--seafoam)]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--coral)]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Coral-branch background */}
      <div className="absolute inset-0 coral-branch-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading mb-6 tracking-tight text-[var(--sand)]"
          >
            The Strategy.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[var(--sand)]/70 font-light"
          >
            We deploy a multi-faceted approach to ocean conservation. True impact requires action on all fronts—from the ocean floor to the halls of government.
          </motion.p>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 relative"
        >
          {/* Interactive Mouse Glow */}
          <div 
            className="absolute pointer-events-none rounded-full blur-[80px] bg-[var(--coral-light)]/10 w-96 h-96 -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300"
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px`,
              opacity: mousePos.x === 0 ? 0 : 1
            }}
          />

          {missions.map((mission, index) => {
            const MissionIcon = mission.icon;
            return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden reef-card-dark ${mission.colSpan}`}
            >
              {/* Background image for featured card */}
              {mission.bgImg && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0 scale-105 group-hover:scale-100"
                  style={{ backgroundImage: mission.bgImg }}
                />
              )}

              <div className="relative z-10 flex flex-col h-full justify-between w-full p-10 md:p-12">
                <div className="w-14 h-14 rounded-2xl bg-[var(--sand)]/5 border border-[var(--seafoam)]/20 flex items-center justify-center mb-10 group-hover:bg-[var(--coral)]/20 transition-all duration-500 group-hover:-translate-y-1">
                  <MissionIcon size={24} className="text-[var(--sand)] group-hover:text-[var(--coral)] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-heading mb-4 text-[var(--sand)]">
                    {mission.title}
                  </h3>
                  <p className="text-[var(--sand)]/60 leading-relaxed font-light text-lg">
                    {mission.description}
                  </p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
