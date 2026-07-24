import { useRef, useEffect } from 'react';

// Configuration
const COLORS = {
  surfaceBlue: '#7FB3D5',
  ocean: '#1E6091',
  sunlight: '#FFB86B'
};

interface ShapeParticle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  speedOffset: number; // for breathing/sway
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

export const ParticleWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let startTime = Date.now();
    
    let mantaParticles: ShapeParticle[] = [];
    let coralParticles: ShapeParticle[] = [];
    let bubbles: Bubble[] = [];
    
    let mouse = { x: -1000, y: -1000, radius: 150, active: false };

    // Function to extract pixels from drawn shapes
    const getShapeTargets = (
      drawFn: (ctx: CanvasRenderingContext2D) => void, 
      width: number, 
      height: number, 
      sampleRate: number,
      targetCount: number
    ) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!oCtx) return [];

      oCtx.clearRect(0, 0, width, height);
      drawFn(oCtx);

      const imgData = oCtx.getImageData(0, 0, width, height).data;
      const targets = [];
      
      for (let y = 0; y < height; y += sampleRate) {
        for (let x = 0; x < width; x += sampleRate) {
          const idx = (y * width + x) * 4;
          if (imgData[idx + 3] > 128) { // if alpha > 50%
            targets.push({ x, y });
          }
        }
      }

      // Shuffle and slice to targetCount
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }

      return targets.slice(0, targetCount);
    };

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      startTime = Date.now();

      const scaleFactor = Math.min(1, canvas.width / 1200);

      // --- 1. Generate Manta Ray Targets ---
      const mantaWidth = 600 * scaleFactor;
      const mantaHeight = 600 * scaleFactor;
      const mantaTargets = getShapeTargets((oCtx) => {
        oCtx.scale(mantaWidth / 100, mantaHeight / 100);
        const path = new Path2D(`
          M 50 10 
          C 55 10, 60 15, 65 25 
          C 80 30, 95 45, 95 60 
          C 85 60, 70 55, 55 65 
          C 55 80, 52 90, 50 95 
          C 48 90, 45 80, 45 65 
          C 30 55, 15 60, 5 60 
          C 5 45, 20 30, 35 25 
          C 40 15, 45 10, 50 10 Z
        `);
        oCtx.fillStyle = '#000';
        oCtx.fill(path);
      }, mantaWidth, mantaHeight, 3, 3000);

      // Position Manta on the right side
      const mantaOffsetX = canvas.width * 0.9 - mantaWidth;
      const mantaOffsetY = canvas.height * 0.15;

      mantaParticles = mantaTargets.map(t => {
        const isSunlight = Math.random() > 0.85;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          startX: Math.random() * canvas.width,
          startY: Math.random() * canvas.height + 500, // come from below
          targetX: t.x + mantaOffsetX,
          targetY: t.y + mantaOffsetY,
          color: isSunlight ? COLORS.sunlight : COLORS.surfaceBlue,
          size: Math.random() * 1.5 + 0.5,
          speedOffset: Math.random() * Math.PI * 2
        };
      });

      // --- 2. Generate Coral Targets ---
      const coralWidth = 400 * scaleFactor;
      const coralHeight = 400 * scaleFactor;
      const coralTargets = getShapeTargets((oCtx) => {
        oCtx.scale(coralWidth / 100, coralHeight / 100);
        oCtx.lineCap = 'round';
        oCtx.lineJoin = 'round';
        oCtx.lineWidth = 6;
        oCtx.strokeStyle = '#000';
        
        oCtx.beginPath();
        oCtx.moveTo(50, 100); // base
        oCtx.lineTo(50, 70);
        oCtx.lineTo(30, 40);
        oCtx.moveTo(50, 70);
        oCtx.lineTo(70, 45);
        oCtx.lineTo(85, 20);
        oCtx.moveTo(70, 45);
        oCtx.lineTo(55, 25);
        oCtx.moveTo(50, 85);
        oCtx.lineTo(25, 75);
        oCtx.moveTo(50, 60);
        oCtx.lineTo(60, 60);
        oCtx.lineTo(75, 75);
        oCtx.stroke();
      }, coralWidth, coralHeight, 3, 1200);

      // Position Coral on the bottom left
      const coralOffsetX = canvas.width * 0.1;
      const coralOffsetY = canvas.height - coralHeight * 0.8;

      coralParticles = coralTargets.map(t => {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          startX: Math.random() * canvas.width - 200, // come from sides
          startY: Math.random() * canvas.height + 200,
          targetX: t.x + coralOffsetX,
          targetY: t.y + coralOffsetY,
          color: COLORS.ocean,
          size: Math.random() * 1.5 + 0.8,
          speedOffset: Math.random() * Math.PI * 2
        };
      });

      // --- 3. Initialize Background Bubbles ---
      bubbles = [];
      for (let i = 0; i < 150; i++) {
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
    };

    // Easing function for assembly (easeOutExpo)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      time += 0.02;
      
      const elapsed = Date.now() - startTime;
      const assembleProgress = Math.min(1, elapsed / 2500); // 2.5 second assembly
      const ease = easeOutCubic(assembleProgress);
      
      // Clear background (using solid foam color)
      ctx.fillStyle = '#EAF4F8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- 1. Draw Background Bubbles ---
      for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        b.y -= b.speed;
        b.swayOffset += b.swaySpeed;
        
        const currentX = b.x + Math.sin(b.swayOffset) * 20;
        const fadeRatio = Math.min(1, Math.max(0, b.y / (canvas.height * 0.3)));
        
        if (b.y < -10) {
          b.y = canvas.height + Math.random() * 100;
          b.x = Math.random() * canvas.width;
          b.speed = Math.random() * 1.5 + 0.5;
        }

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.surfaceBlue;
        ctx.globalAlpha = b.opacity * fadeRatio * 0.5;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Function to render shape particles
      const renderShape = (particles: ShapeParticle[], isManta: boolean) => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          // Breathing/sway logic
          const swayX = isManta ? Math.sin(time + p.speedOffset) * 8 : Math.sin(time * 0.5 + p.speedOffset) * 3;
          const swayY = isManta ? Math.cos(time * 0.8 + p.speedOffset) * 12 : 0;
          
          // Manta whole body drift
          const globalDriftY = isManta ? Math.sin(time * 0.5) * 30 : 0;

          // Target coordinate with sway
          let tX = p.targetX + swayX;
          let tY = p.targetY + swayY + globalDriftY;

          // Mouse Repulsion
          if (mouse.active && assembleProgress > 0.8) {
            const dx = mouse.x - tX;
            const dy = mouse.y - tY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              tX -= (dx / dist) * force * 40;
              tY -= (dy / dist) * force * 40;
            }
          }

          // Interpolate current position based on assembly progress
          p.x = p.startX + (tX - p.startX) * ease;
          p.y = p.startY + (tY - p.startY) * ease;

          // Subtle pulsing size for sunlight particles
          let currentSize = p.size;
          if (isManta && p.color === COLORS.sunlight) {
            currentSize = p.size * (1 + Math.sin(time * 2 + p.speedOffset) * 0.3);
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      };

      // --- 2. Render Coral ---
      renderShape(coralParticles, false);

      // --- 3. Render Manta Ray ---
      renderShape(mantaParticles, true);

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
