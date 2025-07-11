document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Futuristic resume loaded successfully!');

    // Add a subtle animation to the card on load
    const card = document.querySelector('.futuristic-card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
});