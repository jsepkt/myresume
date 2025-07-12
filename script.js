document.addEventListener('DOMContentLoaded', function() {

    // --- Stardust Canvas Animation ---
    const canvas = document.getElementById('stardust-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let numStars = 200;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 246, 255, ${this.opacity})`;
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        function init() {
            resizeCanvas();
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        
        init();
        animate();
        window.addEventListener('resize', init);
    }

    // --- Interactive Spotlight Cursor Effect ---
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice()) {
        const page = document.querySelector('.page-container');
        page.addEventListener('mousemove', e => {
            page.style.setProperty('--mouse-x', `${e.clientX}px`);
            page.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

    // --- PDF Download Function ---
    document.getElementById('download-btn').addEventListener('click', function() {
        const element = document.getElementById('resume-to-download');
        const opt = {
            margin: 0,
            filename: 'Josekutty_Cheriyan_Profile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#010413' },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    });

    // --- 3D Tilt Effect ---
    VanillaTilt.init(document.querySelectorAll(".cert-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.1
    });
});