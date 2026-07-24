import { useRef, useEffect } from 'react';

// Configuration
const COLORS = {
  surfaceBlue: '#7FB3D5',
  ocean: '#1E6091',
  sunlight: '#FFB86B',
  foam: '#EAF4F8',
  abyss: '#041C32'
};

const NUM_PARTICLES = 3500;
const SHAPE_COUNT = 4;

interface GlobalParticle {
  x: number;
  y: number;
  targets: { x: number; y: number }[];
  size: number;
  speedOffset: number;
  color: string;
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

export const GlobalParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let particles: GlobalParticle[] = [];
    let bubbles: Bubble[] = [];
    
    let mouse = { x: -1000, y: -1000, radius: 150, active: false };
    
    // Scroll progress tracker
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init

    // Helper: Extract pixels from drawn shapes
    const getShapeTargets = (
      drawFn: (ctx: CanvasRenderingContext2D) => void, 
      width: number, 
      height: number, 
      sampleRate: number
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
          if (imgData[idx + 3] > 128) {
            targets.push({ x, y });
          }
        }
      }

      // Shuffle
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }

      return targets;
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const scale = Math.min(1, canvas.width / 1200);

      // --- Define the 4 Shapes ---
      const shapeSize = 600 * scale;
      
      // 1. Manta Ray (Hero)
      let mantaTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        const path = new Path2D(`
          M 50 10 C 55 10, 60 15, 65 25 C 80 30, 95 45, 95 60 C 85 60, 70 55, 55 65 
          C 55 80, 52 90, 50 95 C 48 90, 45 80, 45 65 C 30 55, 15 60, 5 60 
          C 5 45, 20 30, 35 25 C 40 15, 45 10, 50 10 Z
        `);
        oCtx.fillStyle = '#000';
        oCtx.fill(path);
      }, shapeSize, shapeSize, 3);

      // 2. Sea Turtle (Crisis/Mission)
      let turtleTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        oCtx.fillStyle = '#000';
        // Shell
        oCtx.beginPath(); oCtx.arc(50, 50, 22, 0, Math.PI*2); oCtx.fill();
        // Head
        oCtx.beginPath(); oCtx.arc(50, 18, 8, 0, Math.PI*2); oCtx.fill();
        // Right front flipper
        oCtx.beginPath(); oCtx.moveTo(68, 35); oCtx.lineTo(95, 50); oCtx.lineTo(75, 55); oCtx.fill();
        // Left front flipper
        oCtx.beginPath(); oCtx.moveTo(32, 35); oCtx.lineTo(5, 50); oCtx.lineTo(25, 55); oCtx.fill();
        // Right back flipper
        oCtx.beginPath(); oCtx.moveTo(60, 68); oCtx.lineTo(75, 85); oCtx.lineTo(55, 75); oCtx.fill();
        // Left back flipper
        oCtx.beginPath(); oCtx.moveTo(40, 68); oCtx.lineTo(25, 85); oCtx.lineTo(45, 75); oCtx.fill();
      }, shapeSize, shapeSize, 3);

      // 3. Globe (Global Map)
      let globeTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        oCtx.strokeStyle = '#000';
        oCtx.lineWidth = 4;
        oCtx.lineCap = 'round';
        oCtx.beginPath(); oCtx.arc(50, 50, 35, 0, Math.PI*2); oCtx.stroke(); // outer ring
        
        oCtx.lineWidth = 2;
        oCtx.beginPath(); oCtx.ellipse(50, 50, 15, 35, 0, 0, Math.PI*2); oCtx.stroke(); // meridian
        oCtx.beginPath(); oCtx.moveTo(15, 50); oCtx.lineTo(85, 50); oCtx.stroke(); // equator
        oCtx.beginPath(); oCtx.moveTo(25, 25); oCtx.lineTo(75, 25); oCtx.stroke();
        oCtx.beginPath(); oCtx.moveTo(25, 75); oCtx.lineTo(75, 75); oCtx.stroke();
      }, shapeSize, shapeSize, 2);

      // 4. Heart (Get Involved)
      let heartTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        const path = new Path2D(`
          M 50 30 C 50 30, 45 10, 25 10 C 5 10, 5 40, 5 40 C 5 60, 25 80, 50 95 
          C 75 80, 95 60, 95 40 C 95 40, 95 10, 75 10 C 55 10, 50 30, 50 30 Z
        `);
        oCtx.fillStyle = '#000';
        oCtx.fill(path);
      }, shapeSize, shapeSize, 3);

      // Ensure all arrays have enough targets by repeating
      const padTargets = (arr: any[]) => {
        const padded = [...arr];
        while (padded.length < NUM_PARTICLES) {
          padded.push(arr[Math.floor(Math.random() * arr.length)]);
        }
        return padded;
      };

      mantaTargets = padTargets(mantaTargets);
      turtleTargets = padTargets(turtleTargets);
      globeTargets = padTargets(globeTargets);
      heartTargets = padTargets(heartTargets);

      // --- Setup Placement Offsets per Shape ---
      // 1: Right aligned, top
      const offset1 = { x: canvas.width * 0.85 - shapeSize, y: canvas.height * 0.15 };
      // 2: Center aligned, middle
      const offset2 = { x: canvas.width / 2 - shapeSize / 2, y: canvas.height * 0.2 };
      // 3: Left aligned, middle
      const offset3 = { x: canvas.width * 0.15, y: canvas.height * 0.2 };
      // 4: Center aligned, bottom
      const offset4 = { x: canvas.width / 2 - shapeSize / 2, y: canvas.height * 0.15 };

      // Initialize Particles
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        // Build the target array for this specific particle across all 4 shapes
        const t1 = mantaTargets[i];
        const t2 = turtleTargets[i];
        const t3 = globeTargets[i];
        const t4 = heartTargets[i];

        const isSunlight = Math.random() > 0.85;

        particles.push({
          x: t1.x + offset1.x, // start at shape 1
          y: t1.y + offset1.y,
          targets: [
            { x: t1.x + offset1.x, y: t1.y + offset1.y },
            { x: t2.x + offset2.x, y: t2.y + offset2.y },
            { x: t3.x + offset3.x, y: t3.y + offset3.y },
            { x: t4.x + offset4.x, y: t4.y + offset4.y }
          ],
          color: isSunlight ? COLORS.sunlight : COLORS.surfaceBlue,
          size: Math.random() * 1.5 + 0.8,
          speedOffset: Math.random() * Math.PI * 2
        });
      }

      // Initialize Background Bubbles
      bubbles = [];
      for (let i = 0; i < 150; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 1.5 + 0.5,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    // The gradient handles color shifting

    const animate = () => {
      time += 0.02;
      
      // Smooth out scroll progress (spring physics)
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;
      
      // --- Dynamic Background Gradient ---
      // We simulate the ocean depth by interpolating between Foam and Abyss
      // We will draw a linear gradient from top to bottom
      // Top color gets darker as we scroll down
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Basic depth mapping (0 = top, 1 = bottom)
      // When scroll is 0: Top is Foam, Bottom is Ocean
      // When scroll is 1: Top is Abyss, Bottom is Abyss
      if (scrollProgress < 0.2) {
        gradient.addColorStop(0, COLORS.foam);
        gradient.addColorStop(1, '#BFE0F2');
      } else if (scrollProgress < 0.4) {
        gradient.addColorStop(0, '#BFE0F2');
        gradient.addColorStop(1, COLORS.surfaceBlue);
      } else if (scrollProgress < 0.7) {
        gradient.addColorStop(0, COLORS.surfaceBlue);
        gradient.addColorStop(1, '#334155');
      } else {
        gradient.addColorStop(0, '#334155');
        gradient.addColorStop(1, COLORS.abyss);
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Render Background Bubbles ---
      for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        b.y -= b.speed;
        b.swayOffset += b.swaySpeed;
        
        const currentX = b.x + Math.sin(b.swayOffset) * 20;
        
        if (b.y < -10) {
          b.y = canvas.height + 10;
          b.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.surfaceBlue;
        ctx.globalAlpha = b.opacity * 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // --- Morphing Logic ---
      // Which two shapes are we between?
      // scrollProgress ranges from 0.0 to 1.0
      // We have 4 shapes (indices 0, 1, 2, 3)
      const mappedScroll = scrollProgress * (SHAPE_COUNT - 1);
      const startIndex = Math.floor(mappedScroll);
      const endIndex = Math.min(startIndex + 1, SHAPE_COUNT - 1);
      const morphFactor = mappedScroll - startIndex;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Interpolate target
        const t1 = p.targets[startIndex];
        const t2 = p.targets[endIndex];
        
        // Easing for the morph (easeInOutQuad)
        const ease = morphFactor < 0.5 ? 2 * morphFactor * morphFactor : 1 - Math.pow(-2 * morphFactor + 2, 2) / 2;

        let baseTargetX = t1.x + (t2.x - t1.x) * ease;
        let baseTargetY = t1.y + (t2.y - t1.y) * ease;

        // Breathing/sway logic
        const swayX = Math.sin(time + p.speedOffset) * 5;
        const swayY = Math.cos(time * 0.8 + p.speedOffset) * 5;
        const globalDriftY = Math.sin(time * 0.5) * 20;

        let finalTargetX = baseTargetX + swayX;
        let finalTargetY = baseTargetY + swayY + globalDriftY;

        // Mouse Repulsion
        if (mouse.active) {
          const dx = mouse.x - finalTargetX;
          const dy = mouse.y - finalTargetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            const force = Math.pow((mouse.radius - dist) / mouse.radius, 2);
            finalTargetX -= (dx / dist) * force * 50;
            finalTargetY -= (dy / dist) * force * 50;
          }
        }

        // Spring physics to move current position to final target
        p.x += (finalTargetX - p.x) * 0.08;
        p.y += (finalTargetY - p.y) * 0.08;

        // Pulse size
        let currentSize = p.size;
        if (p.color === COLORS.sunlight) {
          currentSize = p.size * (1 + Math.sin(time * 2 + p.speedOffset) * 0.3);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
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
        handleScroll(); // re-calc max scroll
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};
