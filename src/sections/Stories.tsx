import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WaveDivider } from '../components/ui/WaveDivider';

const stories = [
  {
    id: 1,
    author: "Elena Rodriguez",
    role: "Marine Biologist, Costa Rica",
    quote: "When we saw the first polyps attaching to the restored frames, it wasn't just a scientific success—it was a deeply emotional moment. The ocean was accepting our apology.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    author: "Dr. James Chen",
    role: "Climate Researcher, Taiwan",
    quote: "We spent years documenting the decline. Now, we are documenting the recovery. Every new species that returns to the reef is a victory for the planet.",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    author: "Sarah Jenkins",
    role: "Local Volunteer, Florida",
    quote: "I used to think the ocean was too vast to fail. Now I know it's fragile, but it's also incredibly resilient if we just give it a chance to breathe.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  }
];

export const Stories = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section id="stories" className="py-32 bg-[var(--depth-7)] text-[var(--foam)] overflow-hidden cursor-grab active:cursor-grabbing border-none relative">
      <div className="container mx-auto px-6 md:px-12 mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="mb-6 text-[var(--foam)]">Stories of Resilience</h2>
          <p className="text-xl text-[var(--foam)]/80 font-normal max-w-2xl leading-relaxed">
            Meet the people on the frontlines of ocean conservation, dedicating their lives to protecting what sustains us.
          </p>
        </motion.div>
      </div>

      <motion.div ref={carousel} className="px-6 md:px-12 relative z-10 pb-20">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-8"
        >
          {stories.map((story) => (
            <motion.div 
              key={story.id}
              className="min-w-[85vw] md:min-w-[650px] h-[550px] rounded-[28px] overflow-hidden relative group shadow-[0_8px_30px_rgba(127,179,213,0.15)] border border-[var(--surface-blue)]/20 water-mask"
            >
              <motion.img 
                src={story.image} 
                alt={story.author} 
                className="absolute inset-0 w-[110%] h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none origin-left"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-blue)] via-[var(--deep-blue)]/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14 pointer-events-none">
                <div className="relative">
                  <span className="absolute -left-6 md:-left-8 top-[-10px] text-5xl md:text-7xl font-heading text-[var(--sunlight)] opacity-80 leading-none">"</span>
                  <p className="text-2xl md:text-4xl text-[var(--foam)] font-heading font-light mb-10 leading-[1.3]">
                    {story.quote}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-[var(--foam)] mb-1 tracking-wide">{story.author}</h4>
                  <p className="text-[var(--surface-blue)] text-sm tracking-widest uppercase font-semibold">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wave SVG divider at bottom to transition to Final CTA (--depth-8) */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider topColor="transparent" bottomColor="var(--depth-8)" />
      </div>
    </section>
  );
};
