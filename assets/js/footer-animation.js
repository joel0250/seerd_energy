/**
 * Footer Animation - Nuclear Particle Network
 * A canvas-based animation simulating atomic particles and connections.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('footer-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const config = {
        particleCount: 60,
        connectionDistance: 120,
        mouseDistance: 150,
        baseSpeed: 0.3,
        color: 'rgba(76, 161, 175, 0.5)', // Cyan-ish
        particleColor: 'rgba(242, 194, 48, 0.6)', // Gold/Yellow (Brand Primary)
        lineColor: 'rgba(76, 161, 175, 0.15)'
    };

    // Resize handler
    function resize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.baseSpeed;
            this.vy = (Math.random() - 0.5) * config.baseSpeed;
            this.size = Math.random() * 2 + 1;
            this.pulse = Math.random() * Math.PI;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Pulsating effect
            this.pulse += 0.05;
            this.currentSize = this.size + Math.sin(this.pulse) * 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0, this.currentSize), 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();

            // Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = config.particleColor;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        // Calculate particle count based on area to keep density consistent
        const area = width * height;
        const count = Math.floor(area / 15000); // 1 particle per 15000px^2

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);

                    // Fade out lines based on distance
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.strokeStyle = `rgba(76, 161, 175, ${opacity * 0.2})`;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('resize', resize);
    resize();
    animate();
});
