document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const initialScreen = document.getElementById('initialScreen');
    const contentScreen = document.getElementById('contentScreen');
    const bgMusic = document.getElementById('bg-music');

    if (openBtn && initialScreen && contentScreen) {
        openBtn.addEventListener('click', (e) => {
            // Executa a explosão em massa vinda do centro e das laterais
            triggerMegaExplosion();

            // Retarda um pouquinho a troca de tela (600ms) para criar suspense em meio aos confetes
            setTimeout(() => {
                initialScreen.classList.add('hidden');
                contentScreen.classList.remove('hidden');

                if (bgMusic) {
                    bgMusic.play().catch(err => console.log("Áudio bloqueado:", err));
                }

                startCarousel();
            }, 600);
        });
    }
});

/**
 * Dispara uma tempestade de confetes e itens Sanrio de forma espalhafatosa
 */
function triggerMegaExplosion() {
    const container = document.getElementById('mega-explosion-container');
    if (!container) return;

    // Elementos premium misturados na explosão
    const items = ['❤️', '💖', '💝', '✨', '🌸', '🎀', '🐱', '😈', '🍬'];
    const totalParticles = 90; // Aumentado drasticamente para encher a tela

    for (let i = 0; i < totalParticles; i++) {
        const p = document.createElement('div');
        p.className = 'ext-particle';
        p.innerText = items[Math.floor(Math.random() * items.length)];

        // Origem randômica centrada ao redor da área do botão original
        const startX = window.innerWidth / 2 + (Math.random() * 120 - 60);
        const startY = window.innerHeight / 2 + (Math.random() * 60 - 30);
        
        p.style.left = `${startX}px`;
        p.style.top = `${startY}px`;

        // Atributos de dispersão hiper dinâmicos (ângulos e rotações selvagens)
        const angle = Math.random() * Math.PI * 2;
        const radius = 180 + Math.random() * 320; // Distância de projeção gigante
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius - (Math.random() * 150); // Força para cima
        const rot = `${Math.random() * 720 - 360}deg`;
        const scl = 0.4 + Math.random() * 1.2;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.setProperty('--rot', rot);
        p.style.setProperty('--scl', scl);

        container.appendChild(p);

        // Limpa a memória tirando a partícula após sumir
        setTimeout(() => p.remove(), 1500);
    }
}

function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].className = 'carousel-img active';
    }, 3200);
                            }
