import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Thermometer, Droplets, Skull, Heart } from 'lucide-react';
import { WaveDivider } from '../components/ui/WaveDivider';

const stages = [
  {
    id: 'thriving',
    title: 'A Thriving Reef',
    description: 'Coral reefs are the rainforests of the sea. They cover just 1% of the ocean floor but support 25% of all marine life in a vibrant, balanced ecosystem.',
    icon: Leaf,
    textColor: 'var(--deep-blue)'
  },
  {
    id: 'warming',
    title: 'Rising Temperatures',
    description: 'Even a 1°C spike in ocean temperature causes acute stress. The delicate symbiotic relationship between the coral and its algae begins to fracture.',
    icon: Thermometer,
    textColor: 'var(--deep-blue)'
  },
  {
    id: 'bleaching',
    title: 'Bleaching Begins',
    description: 'Under severe stress, corals expel their colorful algae. They turn bone white, starving themselves of their primary food source. They are alive, but barely.',
    icon: Droplets,
    textColor: 'var(--foam)'
  },
  {
    id: 'collapse',
    title: 'Collapse',
    description: 'Without intervention, the coral starves. The vibrant ecosystem collapses into a desolate graveyard, devastating the marine life that relied on it.',
    icon: Skull,
    textColor: 'var(--foam)'
  },
  {
    id: 'restoration',
    title: 'Restoration',
    description: 'This is where we step in. Through active planting, we can accelerate coral growth by up to 50x and bring these vital ecosystems back to life.',
    icon: Heart,
    textColor: 'var(--deep-blue)'
  }
];

export const TheCrisis = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Interpolating exact hex codes so Framer Motion can calculate the transition smoothly
  // Depth-3 (approx): #BFE0F2
  // Surface Blue: #7FB3D5
  // Slate 400 (desaturated): #94A3B8
  // Slate 700 (dark): #334155
  // Foam: #EAF4F8
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#BFE0F2",
      "#7FB3D5",
      "#94A3B8",
      "#334155",
      "#EAF4F8"
    ]
  );

  return (
    <motion.section 
      id="crisis" 
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center py-20">
        
        {stages.map((stage) => {
          const StageIcon = stage.icon;
          
          return (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col justify-center items-center text-center w-full max-w-4xl min-h-[85vh]"
            >
              <div className="mb-8 p-6 rounded-full inline-flex bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                <StageIcon size={40} style={{ color: stage.textColor }} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 tracking-tight" style={{ color: stage.textColor }}>
                {stage.title}
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl max-w-2xl font-normal leading-relaxed opacity-80" style={{ color: stage.textColor }}>
                {stage.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      
      {/* Wave SVG divider at bottom to transition to Mission (--depth-4) */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider />
      </div>
    </motion.section>
  );
};
