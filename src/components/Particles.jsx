import  { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position viewport coordinates and active status
    const mouse = { x: null, y: null, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Subtle particle setup (dust/reflections)
    const particleCount = 500;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.6 + 0.6, // Tiny dots (0.6px to 1.2px) - very small size variation
        opacity: Math.random() * 0.12 + 0.4, // Low opacity (4% to 16% opacity)
        vx: (Math.random() - 0.5) * 0.1, // Slow initial drift
        vy: (Math.random() - 0.5) * 0.1 - 0.04, // Slow upward drift
        targetR: Math.random() * 70 + 80, // Target radius between 80px and 150px around cursor
        orbitSpeed: Math.random() * 0.012 + 0.004, // Orbit speed
        orbitDirection: Math.random() < 0.5 ? -1 : 1, // Orbit direction
        angle: Math.random() * Math.PI * 2, // Random initial phase angle
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let mx = null;
      let my = null;
      let mouseActive = false;

      // Check if mouse is active and within the bounds of the hero canvas
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const rect = canvas.getBoundingClientRect();
        if (
          mouse.x >= rect.left &&
          mouse.x <= rect.right &&
          mouse.y >= rect.top &&
          mouse.y <= rect.bottom
        ) {
          mx = mouse.x - rect.left;
          my = mouse.y - rect.top;
          mouseActive = true;
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Draw particle (monochrome, no glow, low opacity, tiny dot)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Update particle physics
        if (mouseActive) {
          // Increment the orbit angle to slowly circulate the target position
          p.angle += p.orbitSpeed * p.orbitDirection;

          // Target position relative to the cursor
          const tx = mx + Math.cos(p.angle) * p.targetR;
          const ty = my + Math.sin(p.angle) * p.targetR;

          // Distance from particle to cursor
          const dxToCursor = p.x - mx;
          const dyToCursor = p.y - my;
          const distToCursor = Math.sqrt(dxToCursor * dxToCursor + dyToCursor * dyToCursor) || 0.001;

          // Calculate cursor influence based on distance
          const maxInfluence = 400; // 400px capture range
          const influence = Math.max(0, 1 - distToCursor / maxInfluence);
          const easeInfluence = influence * influence; // smooth dropoff

          // Vector pointing to the orbiting target position
          const dxToTarget = tx - p.x;
          const dyToTarget = ty - p.y;

          // Apply steering force towards target (gentle and eased by distance influence)
          p.vx += dxToTarget * 0.008 * easeInfluence;
          p.vy += dyToTarget * 0.008 * easeInfluence;

          // Dynamic damping to prevent orbiting too wildly near the cursor
          const activeDamping = 0.94;
          const normalDamping = 0.985;
          const damping = normalDamping - (normalDamping - activeDamping) * easeInfluence;
          p.vx *= damping;
          p.vy *= damping;

          // Add minor natural random drift/noise
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01 - 0.002;

          // Wrap around logic: only wrap if the particle is not captured
          if (distToCursor > 350) {
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
          }
        } else {
          // Standard natural slow drift when mouse is not active in the hero
          p.vx += (Math.random() - 0.5) * 0.005;
          p.vy += (Math.random() - 0.5) * 0.005 - 0.002; // slight upward drift

          // Low resistance damping
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Apply standard wrap around
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        // Clamp speed to ensure motion remains slow, fluid and natural
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = mouseActive ? 1.5 : 0.6;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Apply velocities to coordinates
        p.x += p.vx;
        p.y += p.vy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Particles;
