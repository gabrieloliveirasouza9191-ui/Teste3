// Aguarda o DOM estar completamente carregado para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const initialScreen = document.getElementById('initialScreen');
    const contentScreen = document.getElementById('contentScreen');
    const bgMusic = document.getElementById('bg-music');

    // Verifica se os elementos principais da tela existem antes de aplicar os eventos
    if (openBtn && initialScreen && contentScreen) {
        openBtn.addEventListener('click', () => {
            // Troca de tela: esconde a inicial e mostra a carta/carrossel
            initialScreen.classList.add('hidden');
            contentScreen.classList.remove('hidden');

            // Toca a música (o clique do usuário limpa o bloqueio de autoplay do navegador)
            if (bgMusic) {
                bgMusic.play().catch((error) => {
                    console.log("O navegador barrou a execução automática de áudio:", error);
                });
            }

            // Dispara a função do carrossel automático de fotos
            startCarousel();
        });
    }
});

/**
 * Função responsável por alternar as fotos da Laninha a cada 3 segundos
 */
function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    // Cria um loop infinito para alternar a classe 'active' entre as imagens
    setInterval(() => {
        // Remove o estado ativo da imagem atual (ela começa a sumir via fade no CSS)
        images[currentIndex].classList.remove('active');
        
        // Calcula o próximo índice (se chegar na última foto, volta para a primeira)
        currentIndex = (currentIndex + 1) % images.length;
        
        // Adiciona o estado ativo na próxima imagem (ela aparece via fade no CSS)
        images[currentIndex].className = 'carousel-img active';
    }, 3000);
}