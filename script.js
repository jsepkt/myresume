document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Subtle Tilt Effect ---
    // Targeted interactions only, no global physics
    const tiltElements = document.querySelectorAll("[data-tilt], .tech-logo, .skill-icon-wrap");
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(tiltElements, {
            max: 10, speed: 400, glare: true,
            "max-glare": 0.3, scale: 1.02,
            perspective: 1000
        });

        // Also init the main cards for the full Bento effect
        const cardElements = document.querySelectorAll(".job-entry, .sidebar, .cert-card, .edu-item, .tech-toolkit-section, .profile-pic");
        VanillaTilt.init(cardElements, {
            max: 0, /* Disable rotation/tilt */
            speed: 400, /* Snappy return */
            glare: true,
            "max-glare": 0.2,
            scale: 1.03 /* Noticeable "enlarge" pop */
        });
    }

    // --- 2. Constellation Background (Blue System) ---
    const canvas = document.getElementById('stardust-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Config
        const particleCount = 60;
        const connectionDist = 120;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(37, 99, 235, 0.4)'; // Blue
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            const linkColor = 'rgba(37, 99, 235, '; // Blue

            for (let i = 0; i < particles.length; i++) {
                let p1 = particles[i];
                p1.update();
                p1.draw();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p1.x - p2.x;
                    let dy = p1.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        ctx.strokeStyle = linkColor + (1 - dist / connectionDist) * 0.2 + ')';
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
});