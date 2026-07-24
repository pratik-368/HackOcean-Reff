import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, AlertTriangle, Trash2, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: 'healthy',
    num: '01',
    title: 'A Vibrant World',
    description: 'Coral reefs are the rainforests of the sea, teeming with life and brilliant colors.',
    color: '#2EC4B6', // Seafoam
    icon: Leaf,
  },
  {
    id: 'bleaching',
    num: '02',
    title: 'The Silent Loss',
    description: 'Rising ocean temperatures cause corals to expel the algae living in their tissues, turning them completely white.',
    color: '#FAF7F0', // Sand
    icon: AlertTriangle,
  },
  {
    id: 'plastic',
    num: '03',
    title: 'Choked by Pollution',
    description: 'Millions of tons of plastic enter our oceans annually, entangling marine life and blocking sunlight.',
    color: '#FF6B5B', // Coral
    icon: Trash2,
  },
  {
    id: 'hope',
    num: '04',
    title: 'The Return of Hope',
    description: 'Through conservation, restoration, and your help, reefs can recover and thrive once more.',
    color: '#FF9F80', // Coral Light
    icon: Heart,
  }
];

export const TheCrisis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgTextRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const bgs = bgTextRef.current;
      
      // Pin the section and animate background color / elements
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already visible
        
        // Setup fade in for content
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(i - 0.4) * window.innerHeight} top`,
              end: `top+=${(i - 0.1) * window.innerHeight} top`,
              scrub: 1,
            }
          }
        );
        
        // Setup fade out for previous content
        gsap.to(cards[i - 1], {
          opacity: 0,
          y: -30,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(i - 0.9) * window.innerHeight} top`,
            end: `top+=${(i - 0.6) * window.innerHeight} top`,
            scrub: 1,
          }
        });

        // Background typography transitions
        gsap.fromTo(bgs[i],
          { opacity: 0, y: 100 },
          {
            opacity: 0.05,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(i - 0.6) * window.innerHeight} top`,
              end: `top+=${(i - 0.1) * window.innerHeight} top`,
              scrub: 1,
            }
          }
        );

        gsap.to(bgs[i - 1], {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(i - 0.6) * window.innerHeight} top`,
            end: `top+=${(i - 0.1) * window.innerHeight} top`,
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="the-crisis" className="relative h-screen w-full overflow-hidden bg-[var(--ocean-deep)] flex items-center justify-center">
      
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        {stages.map((stage, index) => (
          <div 
            key={`bg-${stage.id}`}
            ref={el => { bgTextRef.current[index] = el; }}
            className="absolute text-[30vw] font-heading font-bold text-[var(--sand)] leading-none whitespace-nowrap"
            style={{ opacity: index === 0 ? 0.05 : 0 }}
          >
            {stage.num}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div ref={textRef} className="relative w-full max-w-4xl h-[60vh]">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            return (
            <div 
              key={stage.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div className="mb-10 p-5 rounded-full inline-flex glass-dark shadow-2xl" style={{ borderColor: `${stage.color}40` }}>
                <StageIcon size={36} color={stage.color} strokeWidth={1} />
              </div>
              <h2 className="text-5xl md:text-8xl font-heading mb-6 tracking-tight" style={{ color: stage.color }}>
                {stage.title}
              </h2>
              <p className="text-xl md:text-3xl text-[var(--sand)]/70 max-w-2xl font-light leading-relaxed">
                {stage.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
