import { useRef, useEffect } from 'react';

// Sea Turtle SVG Path
const turtleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <path d="M250 80C260 70 280 65 300 70C315 75 330 90 335 110C340 130 335 150 325 170C360 175 400 190 420 220C435 245 430 270 410 285C390 300 365 300 340 290C345 320 345 350 335 380C325 410 300 430 275 435C265 437 255 435 250 430C245 435 235 437 225 435C200 430 175 410 165 380C155 350 155 320 160 290C135 300 110 300 90 285C70 270 65 245 80 220C100 190 140 175 175 170C165 150 160 130 165 110C170 90 185 75 200 70C220 65 240 70 250 80Z" fill="black" />
</svg>
`;

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
}

export const ParticleShape = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, radius: 100 };

    const colors = ['#FF6B5B', '#2EC4B6', '#FF9F80']; // coral, seafoam, light coral

    const init = () => {
      // Setup main canvas resolution
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;

      // Draw SVG to offscreen canvas to get pixel data
      const img = new Image();
      const svg = new Blob([turtleSVG], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svg);
      
      img.onload = () => {
        const offscreen = document.createElement('canvas');
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
        if (!offCtx) return;

        // Size the drawing to fit nicely in the container
        const size = Math.min(width, height) * 0.9;
        offscreen.width = size;
        offscreen.height = size;

        // Draw image centered
        offCtx.drawImage(img, 0, 0, size, size);

        // Read pixels
        const imageData = offCtx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        particles = [];
        
        // Offset to center the shape in the main canvas
        const offsetX = (width - size) / 2;
        const offsetY = (height - size) / 2;

        // Sample pixels to create particles
        // Step determines particle density
        const step = Math.max(Math.floor(size / 80), 4);
        
        for (let y = 0; y < size; y += step) {
          for (let x = 0; x < size; x += step) {
            const index = (y * size + x) * 4;
            const alpha = data[index + 3];
            
            if (alpha > 128) {
              const randomOffset = () => (Math.random() - 0.5) * step;
              particles.push({
                x: x + offsetX + randomOffset(),
                y: y + offsetY + randomOffset(),
                baseX: x + offsetX,
                baseY: y + offsetY,
                size: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: 0,
                vy: 0,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
              });
            }
          }
        }
        
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Mouse Repel Physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * -5;
          const directionY = forceDirectionY * force * -5;
          
          p.vx += directionX;
          p.vy += directionY;
        }

        // Return to base (Spring)
        p.vx += (p.baseX - p.x) * 0.05;
        p.vy += (p.baseY - p.y) * 0.05;
        
        // Friction
        p.vx *= 0.85;
        p.vy *= 0.85;
        
        // Ambient breathing (sine wave based on angle)
        p.angle += p.speed;
        const breatheX = Math.cos(p.angle) * 1.5;
        const breatheY = Math.sin(p.angle) * 1.5;

        p.x += p.vx + breatheX;
        p.y += p.vy + breatheY;
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add a slight glow effect based on distance from base
        const distFromBase = Math.sqrt((p.baseX - p.x) ** 2 + (p.baseY - p.y) ** 2);
        ctx.globalAlpha = Math.max(0.2, 1 - (distFromBase / 50));
        
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 z-10 pointer-events-auto cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
};
