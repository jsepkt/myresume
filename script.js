document.addEventListener('DOMContentLoaded', function() {

    // --- PDF Download Function ---
    document.getElementById('download-btn').addEventListener('click', function() {
        const element = document.getElementById('resume-to-download');
        const opt = {
            margin:       0,
            filename:     'Josekutty_Cheriyan_Executive_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#121212' },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Temporarily add a class to the body for print styling adjustments
        document.body.classList.add('generating-pdf');
        
        html2pdf().from(element).set(opt).save().then(() => {
             document.body.classList.remove('generating-pdf'); // Remove class after PDF is saved
        });
    });

    // --- 3D Tilt Effect for Certificate Cards ---
    VanillaTilt.init(document.querySelectorAll(".cert-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });

    // --- Animate Sections on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach(section => {
        observer.observe(section);
    });
});