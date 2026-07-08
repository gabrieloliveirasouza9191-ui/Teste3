document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const initialScreen = document.getElementById('initialScreen');
    const contentScreen = document.getElementById('contentScreen');
    const bgMusic = document.getElementById('bg-music');

    if (openBtn && initialScreen && contentScreen) {
        openBtn.addEventListener('click', (e) => {
            // Pega as coordenadas exatas do clique do dedo ou mouse
            const clickX = e.clientX;
            const clickY = e.clientY;

            // Dispara a explosão de corações pixelados naquelas coordenadas
            createBurst(clickX, clickY);

            // Aguarda um pequeno delay (400ms) para ela ver a animação antes do card sumir
            setTimeout(() => {
                initialScreen.classList.add('hidden');
                contentScreen.classList.remove('hidden');

                if (bgMusic) {
                    bgMusic.play().catch(err => console.log("Áudio contido:", err));
                }

                startCarousel();
            }, 400);
        });
    }
});

function createBurst(x, y) {
    const container = document.getElementById('burst-container');
    if (!container) return;

    // Número de corações que vão voar
    const particleCount = 35; 
    
    // Lista de itens que podem explodir (Se preferir Hello Kitty, mude para ['🐱', '🎀'])
    const pool = ['❤️', '💖', '💝', '💘', '🌸'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Sorteia um item da lista
        particle.innerText = pool[Math.floor(Math.random() * pool.length)];
        
        // Posiciona no local exato do clique
        particle.style.top = `${y}px`;
        particle.style.left = `${x}px`;

        // Define direções e distâncias aleatórias para a dispersão (CSS Variables)
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 180; // Distância do espalhamento
        const mx = Math.cos(angle) * velocity;
        const my = Math.sin(angle) * velocity;

        particle.style.setProperty('--mx', `${mx}px`);
        particle.style.setProperty('--my', `${my}px`);

        container.appendChild(particle);

        // Remove do HTML após o término da animação para não sobrecarregar
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}

function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    // Configurado para rodar em loop passando pelas 7 fotos automaticamente
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].className = 'carousel-img active';
    }, 3200);
}