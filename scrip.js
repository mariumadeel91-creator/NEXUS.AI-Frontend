import React, { useEffect, useRef } from 'react';
import HowItWorks from './HowItWorks';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 1. Initialize Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 2. Initialize Particles
    let particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    let mouse = { x: null, y: null };

    // Mouse move event listener
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#06b6d4'; 

      particles.forEach((p) => {
        p.x += p.vx; 
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interaction logic
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist/200})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      requestAnimationFrame(animate);
    }
    
    animate();

    // Cleanup: Event listener remove karein jab component unmount ho
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10" 
      />

      {/* Main Content */}
      <HowItWorks />
    </div>
  );
}

export default App;

const particlesConfig = {
  particles: {
    number: {
      value: 40,
      density: { enable: true, value_area: 800 }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.05,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },
  // Is section ko 'false' kar dein ya hata dein
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false, // Yahan 'false' karne se mouse kaam nahi karega
        mode: "none"
      },
      onclick: {
        enable: false, // Click karne par bhi kuch nahi hoga
        mode: "none"
      }
    }
  },
  retina_detect: true
};