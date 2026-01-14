import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;

    // Configuration
    const CONNECTION_DISTANCE = 140;
    const PARTICLE_SPEED = 0.4;
    const DENSITY_DIVISOR = 12000; 

    // Black-Gold Palette - Accent Color #FBC403 (RGB: 251, 196, 3)
    const PARTICLE_R = 251;
    const PARTICLE_G = 196;
    const PARTICLE_B = 3;

    const init = () => {
      // Handle High DPI displays
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);

      const particleCount = Math.floor((width * height) / DENSITY_DIVISOR);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    const render = () => {
      // Clear using logical dimensions
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Particle (Node)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_R}, ${PARTICLE_G}, ${PARTICLE_B}, 0.8)`; 
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            const alpha = 0.3 * (1 - dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(${PARTICLE_R}, ${PARTICLE_G}, ${PARTICLE_B}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

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
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }} 
    />
  );
};