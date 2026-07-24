import { useRef, useEffect } from 'react';

interface Plankton {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  spin: number;
  opacity: number;
}

export const PlanktonBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Plankton[] = [];
    let animationFrameId: number;

    const colors = ['#FF6B5B', '#2EC4B6']; // coral, seafoam

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.5 + 0.1,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Drift upwards slowly
        p.y -= p.speed;
        
        // Sway side to side
        p.angle += p.spin;
        p.x += Math.sin(p.angle) * 0.5;
        
        // Wrap around screen
        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 z-0 pointer-events-none"
    />
  );
};
