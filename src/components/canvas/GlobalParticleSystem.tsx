import { useRef, useEffect } from 'react';
import { WORLD_PATH } from './worldPath';

// Configuration
const COLORS = {
  surfaceBlue: '#7FB3D5',
  ocean: '#1E6091',
  sunlight: '#FFB86B',
  foam: '#EAF4F8',
  abyss: '#041C32'
};

const NUM_PARTICLES = 5000;
const SHAPE_COUNT = 4;

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface GlobalParticle {
  x: number;
  y: number;
  z: number;
  targets: Vector3[];
  backgroundTarget: Vector3; // The random spot to disperse to during transitions
  size: number;
  speedOffset: number;
  color: string;
}

interface Bubble {
  x: number;
  y: number;
  z: number;
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
    
    let mouse = { x: -1000, y: -1000, radius: 200, active: false };
    
    // Scroll progress tracker
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init

    // Helper: Extract pixels from drawn shapes and return 3D coordinates centered at 0,0,0
    const getShapeTargets = (
      drawFn: (ctx: CanvasRenderingContext2D) => void, 
      width: number, 
      height: number, 
      sampleRate: number,
      transform3DFn: (nx: number, ny: number, width: number, height: number) => Vector3
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
            const nx = (x - width / 2) / (width / 2);
            const ny = (y - height / 2) / (height / 2);
            
            targets.push(transform3DFn(nx, ny, width, height));
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

    let shapeOffsets: Vector3[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const scale = Math.min(1, canvas.width / 1200);
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
      }, shapeSize, shapeSize, 3, (nx, ny, w, h) => {
        const thickness = Math.exp(-(nx * nx * 5 + ny * ny * 2)) * 60 + 5;
        return { x: nx * w/2, y: ny * h/2, z: (Math.random() - 0.5) * thickness };
      });

      // 2. Sea Turtle (Crisis/Mission)
      let turtleTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        oCtx.fillStyle = '#000';
        oCtx.beginPath(); oCtx.arc(50, 50, 22, 0, Math.PI*2); oCtx.fill();
        oCtx.beginPath(); oCtx.arc(50, 18, 8, 0, Math.PI*2); oCtx.fill();
        oCtx.beginPath(); oCtx.moveTo(68, 35); oCtx.lineTo(95, 50); oCtx.lineTo(75, 55); oCtx.fill();
        oCtx.beginPath(); oCtx.moveTo(32, 35); oCtx.lineTo(5, 50); oCtx.lineTo(25, 55); oCtx.fill();
        oCtx.beginPath(); oCtx.moveTo(60, 68); oCtx.lineTo(75, 85); oCtx.lineTo(55, 75); oCtx.fill();
        oCtx.beginPath(); oCtx.moveTo(40, 68); oCtx.lineTo(25, 85); oCtx.lineTo(45, 75); oCtx.fill();
      }, shapeSize, shapeSize, 3, (nx, ny, w, h) => {
        const r2 = nx * nx + ny * ny;
        const thickness = r2 < 0.2 ? Math.sqrt(0.2 - r2) * 150 + 10 : 15;
        return { x: nx * w/2, y: ny * h/2, z: (Math.random() - 0.5) * thickness };
      });

      // 3. Globe (Real World Map)
      let globeTargets = getShapeTargets((oCtx) => {
        // The wikipedia map viewBox is 950x620. We want to center it in shapeSize x shapeSize.
        const scale = shapeSize / 950;
        const offsetY = (shapeSize - 620 * scale) / 2;
        oCtx.translate(0, offsetY);
        oCtx.scale(scale, scale);
        
        const path = new Path2D(WORLD_PATH);
        oCtx.fillStyle = '#000';
        oCtx.fill(path);
      }, shapeSize, shapeSize, 3, (nx, ny, w) => {
        // Equirectangular mapping to 3D Sphere
        // nx is Longitude (-PI to PI), ny is Latitude (-PI/2 to PI/2)
        const lon = nx * Math.PI;
        // The SVG world map has Antarctica at the bottom. ny goes from -1 to 1.
        const lat = ny * (Math.PI / 2);
        
        const R = w * 0.42; // Sphere radius
        
        // Spherical to Cartesian
        const x = R * Math.cos(lat) * Math.sin(lon);
        const y = R * Math.sin(lat); 
        const z = R * Math.cos(lat) * Math.cos(lon);
        
        // Add minimal noise so it feels like a point cloud
        const noise = 3;
        return { 
          x: x + (Math.random() - 0.5) * noise, 
          y: y + (Math.random() - 0.5) * noise, 
          z: z + (Math.random() - 0.5) * noise 
        };
      });

      // 4. Heart (Get Involved)
      let heartTargets = getShapeTargets((oCtx) => {
        oCtx.scale(shapeSize / 100, shapeSize / 100);
        const path = new Path2D(`
          M 50 30 C 50 30, 45 10, 25 10 C 5 10, 5 40, 5 40 C 5 60, 25 80, 50 95 
          C 75 80, 95 60, 95 40 C 95 40, 95 10, 75 10 C 55 10, 50 30, 50 30 Z
        `);
        oCtx.fillStyle = '#000';
        oCtx.fill(path);
      }, shapeSize, shapeSize, 3, (nx, ny, w, h) => {
        const thickness = Math.max(0, 1 - Math.sqrt(nx * nx + ny * ny)) * 70;
        return { x: nx * w/2, y: ny * h/2, z: (Math.random() - 0.5) * thickness };
      });

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

      // Centers for each shape
      shapeOffsets = [
        { x: canvas.width * 0.75, y: canvas.height * 0.4, z: 0 }, // Manta
        { x: canvas.width * 0.5, y: canvas.height * 0.45, z: 0 }, // Turtle
        { x: canvas.width * 0.35, y: canvas.height * 0.5, z: 0 }, // Globe
        { x: canvas.width * 0.5, y: canvas.height * 0.45, z: 0 }  // Heart
      ];

      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const t1 = mantaTargets[i];
        const t2 = turtleTargets[i];
        const t3 = globeTargets[i];
        const t4 = heartTargets[i];

        const isSunlight = Math.random() > 0.85;

        // Initialize particles at their starting local pos + offset1
        particles.push({
          x: t1.x + shapeOffsets[0].x,
          y: t1.y + shapeOffsets[0].y,
          z: t1.z,
          targets: [t1, t2, t3, t4],
          backgroundTarget: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: (Math.random() - 0.5) * 800
          },
          color: isSunlight ? COLORS.sunlight : COLORS.surfaceBlue,
          size: Math.random() * 1.5 + 1.0, // Slightly larger base size for 3D
          speedOffset: Math.random() * Math.PI * 2
        });
      }

      bubbles = [];
      for (let i = 0; i < 800; i++) { // Increased background density significantly
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: (Math.random() - 0.5) * 600, // Background bubbles have deep Z
          size: Math.random() * 2.5 + 1,
          speed: Math.random() * 2.5 + 1.0,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.03 + 0.015,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      time += 0.035; 
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.12;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
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

      const fov = 600; // Camera focal length
      const renderList = [];

      // Render Bubbles (Pseudo 3D)
      for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        b.y -= b.speed;
        b.swayOffset += b.swaySpeed;
        
        const currentX = b.x + Math.sin(b.swayOffset) * 20;
        
        if (b.y < -100) {
          b.y = canvas.height + 100;
          b.x = Math.random() * canvas.width;
        }

        const scale = fov / (fov + b.z);
        const projX = canvas.width/2 + (currentX - canvas.width/2) * scale;
        const projY = canvas.height/2 + (b.y - canvas.height/2) * scale;
        
        renderList.push({
          x: projX, y: projY, z: b.z,
          size: b.size * scale,
          color: COLORS.surfaceBlue,
          alpha: b.opacity * 0.3 * Math.min(1, scale)
        });
      }

      // Morphing Math
      const mappedScroll = scrollProgress * (SHAPE_COUNT - 1);
      const startIndex = Math.floor(mappedScroll);
      const endIndex = Math.min(startIndex + 1, SHAPE_COUNT - 1);
      
      const rawMorph = mappedScroll - startIndex;
      // Widen transition window to 50% for a smooth, natural swarm effect
      let compressedMorph = (rawMorph - 0.25) / 0.5; 
      compressedMorph = Math.max(0, Math.min(1, compressedMorph));

      const ease = compressedMorph < 0.5 
        ? 2 * compressedMorph * compressedMorph 
        : 1 - Math.pow(-2 * compressedMorph + 2, 2) / 2;

      // Dispersion multiplier: creates a parabolic curve (0 -> 1 -> 0) during the transition
      const dispersionPower = Math.sin(compressedMorph * Math.PI);

      // Calculate global rotation based on time and mouse
      const mouseXNorm = mouse.active ? (mouse.x / canvas.width - 0.5) * 2 : 0;
      const mouseYNorm = mouse.active ? (mouse.y / canvas.height - 0.5) * 2 : 0;
      
      const rotYAngle = time * 0.2 + mouseXNorm * Math.PI * 0.3;
      const rotXAngle = mouseYNorm * Math.PI * 0.2;

      const cosY = Math.cos(rotYAngle);
      const sinY = Math.sin(rotYAngle);
      const cosX = Math.cos(rotXAngle);
      const sinX = Math.sin(rotXAngle);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 1. Interpolate local 3D target coordinates
        const t1 = p.targets[startIndex];
        const t2 = p.targets[endIndex];
        
        let localX = t1.x + (t2.x - t1.x) * ease;
        let localY = t1.y + (t2.y - t1.y) * ease;
        let localZ = t1.z + (t2.z - t1.z) * ease;

        // 2. Add organic breathing to local coords
        localX += Math.sin(time + p.speedOffset) * 6;
        localY += Math.cos(time * 0.8 + p.speedOffset) * 6;
        localZ += Math.sin(time * 1.2 + p.speedOffset) * 6;

        // 3. Apply 3D Rotation (Y-axis then X-axis)
        let rotX = localX * cosY - localZ * sinY;
        let rotZ = localX * sinY + localZ * cosY;
        let rotY = localY * cosX - rotZ * sinX;
        rotZ = localY * sinX + rotZ * cosX;

        // 4. Interpolate Global Placement Offset
        const o1 = shapeOffsets[startIndex];
        const o2 = shapeOffsets[endIndex];
        let currOffsetX = o1.x + (o2.x - o1.x) * ease;
        let currOffsetY = o1.y + (o2.y - o1.y) * ease;
        let currOffsetZ = o1.z + (o2.z - o1.z) * ease;

        // Add drifting to offset
        currOffsetY += Math.sin(time * 0.6) * 25;

        // 5. Final 3D Target
        let finalTargetX = rotX + currOffsetX;
        let finalTargetY = rotY + currOffsetY;
        let finalTargetZ = rotZ + currOffsetZ;

        // --- Dispersion: Blend shape into background density ---
        if (dispersionPower > 0) {
          finalTargetX += (p.backgroundTarget.x - finalTargetX) * dispersionPower;
          finalTargetY += (p.backgroundTarget.y - finalTargetY) * dispersionPower;
          finalTargetZ += (p.backgroundTarget.z - finalTargetZ) * dispersionPower;
        }

        // 6. Spring Physics to move current to target
        // Reduced spring factor makes the particles lag behind slightly, 
        // enhancing the feeling of a floating swarm during transitions.
        p.x += (finalTargetX - p.x) * 0.08;
        p.y += (finalTargetY - p.y) * 0.08;
        p.z += (finalTargetZ - p.z) * 0.08;

        // 7. Mouse Repulsion in 2D Screen Space (Approximate)
        // We project the point to see if mouse is near it
        const scale = fov / (fov + p.z);
        const projX = canvas.width/2 + (p.x - canvas.width/2) * scale;
        const projY = canvas.height/2 + (p.y - canvas.height/2) * scale;

        if (mouse.active) {
          const dx = mouse.x - projX;
          const dy = mouse.y - projY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            const force = Math.pow((mouse.radius - dist) / mouse.radius, 2);
            // Push the particle backwards in Z as well as X/Y for a 3D scatter effect!
            p.x -= (dx / dist) * force * 40;
            p.y -= (dy / dist) * force * 40;
            p.z += force * 100; // Pushes them deep into the screen
          }
        }

        let currentSize = p.size;
        if (p.color === COLORS.sunlight) {
          currentSize = p.size * (1 + Math.sin(time * 2 + p.speedOffset) * 0.3);
        }

        renderList.push({
          x: projX, 
          y: projY, 
          z: p.z,
          size: currentSize * scale,
          color: p.color,
          alpha: Math.min(1, scale + 0.2) // fade slightly if far away
        });
      }

      // Sort by Z descending (furthest away drawn first)
      renderList.sort((a, b) => b.z - a.z);

      // Draw everything
      for (let i = 0; i < renderList.length; i++) {
        const item = renderList[i];
        if (item.alpha <= 0 || item.size <= 0) continue;
        
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
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
        handleScroll();
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
