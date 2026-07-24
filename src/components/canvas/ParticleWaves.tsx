import { useRef, useEffect } from 'react';

// Configuration
const COLORS = {
  seafoam: '#2EC4B6',
  coral: '#FF6B5B'
};

interface WaveDot {
  x: number;
  y: number;
  baseX: number;
  baseYOffset: number; // offset within the band
  vx: number;
  vy: number;
  waveIndex: number;
  color: string;
  size: number;
  opacity: number;
}

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  swayOffset: number;
  swaySpeed: number;
  opacity: number;
}

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const ParticleWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Arrays
    let waveDots: WaveDot[] = [];
    let bubbles: Bubble[] = [];
    let boids: Boid[] = [];
    
    let mouse = { x: -1000, y: -1000, radius: 200, active: false };

    // Boids Settings
    const numBoids = 12;
    const maxSpeed = 1.5;
    const maxForce = 0.03;
    const perceptionRadius = 100;

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      waveDots = [];
      bubbles = [];
      boids = [];

      // 1. Initialize Wave Dots (3 bands)
      // Band settings: [amplitude, frequency, speed, color, baseHeight, rows]
      const bands = [
        { amp: 40, freq: 0.003, speed: 0.015, color: COLORS.seafoam, height: canvas.height * 0.4, rows: 8, opacity: 0.3, size: 1.5 },
        { amp: 70, freq: 0.002, speed: 0.02, color: COLORS.seafoam, height: canvas.height * 0.55, rows: 6, opacity: 0.5, size: 2 },
        { amp: 100, freq: 0.0015, speed: 0.025, color: COLORS.coral, height: canvas.height * 0.75, rows: 5, opacity: 0.8, size: 2.5 }
      ];

      const xSpacing = 15;
      const ySpacing = 12;

      bands.forEach((band, bIndex) => {
        for (let x = -50; x < canvas.width + 50; x += xSpacing) {
          for (let row = 0; row < band.rows; row++) {
            waveDots.push({
              x: x,
              y: band.height + (row * ySpacing),
              baseX: x,
              baseYOffset: (row - band.rows/2) * ySpacing,
              vx: 0,
              vy: 0,
              waveIndex: bIndex,
              color: band.color,
              size: band.size * (0.8 + Math.random() * 0.4),
              opacity: band.opacity * (1 - (row / band.rows) * 0.5) // fade out lower rows slightly
            });
          }
        }
      });

      // 2. Initialize Bubbles
      for (let i = 0; i < 40; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 500,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 1.5 + 0.5,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.5 + 0.1
        });
      }

      // 3. Initialize Boids (Fish)
      for (let i = 0; i < numBoids; i++) {
        boids.push({
          x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
          y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: (Math.random() - 0.5) * maxSpeed
        });
      }
    };

    // Helper: Boids Math
    const limit = (vector: {vx: number, vy: number}, max: number) => {
      const magSq = vector.vx * vector.vx + vector.vy * vector.vy;
      if (magSq > max * max) {
        const mag = Math.sqrt(magSq);
        vector.vx = (vector.vx / mag) * max;
        vector.vy = (vector.vy / mag) * max;
      }
    };

    const animate = () => {
      time += 1;
      
      // Clear background (using solid sand color)
      ctx.fillStyle = '#FAF7F0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bands = [
        { amp: 40, freq: 0.003, speed: 0.015, height: canvas.height * 0.4 },
        { amp: 70, freq: 0.002, speed: 0.02, height: canvas.height * 0.55 },
        { amp: 100, freq: 0.0015, speed: 0.025, height: canvas.height * 0.75 }
      ];

      // --- 1. Draw Wave Dots ---
      for (let i = 0; i < waveDots.length; i++) {
        let p = waveDots[i];
        let band = bands[p.waveIndex];
        
        // Calculate baseline Y based on sine wave
        const waveOffset = Math.sin(p.baseX * band.freq + time * band.speed) * band.amp;
        const targetY = band.height + p.baseYOffset + waveOffset;
        const targetX = p.baseX;

        // Mouse displacement
        let dx = 0;
        let dy = 0;
        if (mouse.active) {
          const distX = mouse.x - p.x;
          const distY = mouse.y - p.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < mouse.radius) {
            const force = Math.pow((mouse.radius - distance) / mouse.radius, 2);
            dx = -(distX / distance) * force * 30; // Repel outward
            dy = -(distY / distance) * force * 30;
          }
        }

        // Spring physics towards target
        p.vx += (targetX + dx - p.x) * 0.05;
        p.vy += (targetY + dy - p.y) * 0.05;
        
        // Damping
        p.vx *= 0.85;
        p.vy *= 0.85;
        
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      // --- 2. Draw Bubbles ---
      for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        b.y -= b.speed;
        b.speed += 0.005; // slight acceleration
        b.swayOffset += b.swaySpeed;
        
        const currentX = b.x + Math.sin(b.swayOffset) * 20;
        
        // Fade out near top
        const fadeRatio = Math.min(1, Math.max(0, b.y / (canvas.height * 0.3)));
        
        if (b.y < -10) {
          // Reset at bottom
          b.y = canvas.height + Math.random() * 100;
          b.x = Math.random() * canvas.width;
          b.speed = Math.random() * 1.5 + 0.5;
        }

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.seafoam;
        ctx.globalAlpha = b.opacity * fadeRatio;
        ctx.fill();
      }

      // --- 3. Draw Boids (Fish) ---
      for (let i = 0; i < boids.length; i++) {
        let boid = boids[i];
        
        let alignX = 0, alignY = 0;
        let cohesionX = 0, cohesionY = 0;
        let sepX = 0, sepY = 0;
        let total = 0;

        // Flocking behavior
        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          let other = boids[j];
          let d = Math.sqrt((boid.x - other.x)**2 + (boid.y - other.y)**2);
          
          if (d < perceptionRadius) {
            alignX += other.vx;
            alignY += other.vy;
            cohesionX += other.x;
            cohesionY += other.y;
            
            let diffX = boid.x - other.x;
            let diffY = boid.y - other.y;
            diffX /= d;
            diffY /= d;
            sepX += diffX;
            sepY += diffY;
            
            total++;
          }
        }

        if (total > 0) {
          alignX /= total; alignY /= total;
          let steerAlign = { vx: alignX - boid.vx, vy: alignY - boid.vy };
          limit(steerAlign, maxForce);
          
          cohesionX /= total; cohesionY /= total;
          let targetX = cohesionX - boid.x;
          let targetY = cohesionY - boid.y;
          let steerCohesion = { vx: targetX - boid.vx, vy: targetY - boid.vy };
          limit(steerCohesion, maxForce);
          
          sepX /= total; sepY /= total;
          let steerSep = { vx: sepX - boid.vx, vy: sepY - boid.vy };
          limit(steerSep, maxForce * 1.5); // separation is stronger
          
          boid.vx += steerAlign.vx + steerCohesion.vx + steerSep.vx;
          boid.vy += steerAlign.vy + steerCohesion.vy + steerSep.vy;
        }

        // Avoid walls
        const margin = 150;
        const turnFactor = 0.05;
        if (boid.x < margin) boid.vx += turnFactor;
        if (boid.x > canvas.width - margin) boid.vx -= turnFactor;
        if (boid.y < margin) boid.vy += turnFactor;
        if (boid.y > canvas.height - margin) boid.vy -= turnFactor;

        // Avoid Mouse
        if (mouse.active) {
          const d = Math.sqrt((boid.x - mouse.x)**2 + (boid.y - mouse.y)**2);
          if (d < 150) {
            boid.vx += ((boid.x - mouse.x) / d) * 0.2;
            boid.vy += ((boid.y - mouse.y) / d) * 0.2;
          }
        }

        limit(boid, maxSpeed);
        boid.x += boid.vx;
        boid.y += boid.vy;

        // Draw Teardrop Fish (5 dots)
        const angle = Math.atan2(boid.vy, boid.vx);
        const drawFishDot = (offsetX: number, offsetY: number, size: number) => {
          // Rotate offsets
          const rx = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
          const ry = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
          ctx.beginPath();
          ctx.arc(boid.x + rx, boid.y + ry, size, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.coral;
          ctx.globalAlpha = 0.7;
          ctx.fill();
        };

        // Head
        drawFishDot(6, 0, 2);
        // Body
        drawFishDot(0, 3, 1.5);
        drawFishDot(0, -3, 1.5);
        // Tail
        drawFishDot(-6, 2, 1);
        drawFishDot(-6, -2, 1);
        drawFishDot(-10, 0, 1);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
      }, 200);
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
      className="w-full h-full absolute inset-0 z-0 pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
