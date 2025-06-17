// LOADER
// Tempo mínimo que a logo ficará visível (2 segundos)
const MIN_LOADING_TIME = 2000;
let pageLoaded = false;
let loadingTimer = null;

// Função para esconder o loading quando a página estiver pronta
function hideLoading() {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('mainContent');

    // Adiciona classe para esmaecer o loading
    loading.classList.add('fade-out');

    // Mostra o conteúdo principal
    setTimeout(() => {
        mainContent.classList.add('show');

        // Remove o loading do DOM após a transição
        setTimeout(() => {
            loading.remove();
        }, 800); // Tempo igual à duração da transição
    }, 300); // Pequeno atraso para sincronizar as animações
}

// Verifica quando a página termina de carregar
window.addEventListener('load', function () {
    pageLoaded = true;

    // Se o tempo mínimo já passou, esconde imediatamente
    if (Date.now() - startTime >= MIN_LOADING_TIME) {
        hideLoading();
    }
    // Caso contrário, espera o tempo restante
    else {
        const remainingTime = MIN_LOADING_TIME - (Date.now() - startTime);
        loadingTimer = setTimeout(hideLoading, remainingTime);
    }
});

// Garante que o loading ficará pelo menos 2 segundos na tela
const startTime = Date.now();

// Se a página carregar muito rápido, ainda mantemos o loading por 2 segundos
loadingTimer = setTimeout(function () {
    if (pageLoaded) {
        hideLoading();
    }
    // Se a página ainda não carregou, o evento 'load' cuidará de esconder
}, MIN_LOADING_TIME);

// Animação do menu hamburguer

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        // Alternar classes para menu e ícone
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open');

        // Fechar o menu ao clicar em um link (opcional)
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('open');
            });
        });
    });
});


// efeito da lata - section 2

const model = document.getElementById('lata3d');
let rotationY = 0;
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? 1 : -1;

    // Define a velocidade da rotação
    rotationY += scrollDirection * 1.5;

    // Atualiza o atributo camera-orbit com rotação Y
    model.setAttribute('camera-orbit', `${rotationY}deg 75deg 2.5m`);

    lastScroll = currentScroll;
});



// efeito 3d das latas da ultima section

const viewer = document.getElementById('lataViewer');
const modelContainer = document.querySelector('.model-container');
const buttons = document.querySelectorAll('.sabor-options button');
const section = document.getElementById('sabor-section');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modelPath = btn.getAttribute('data-model');
        const bgClass = btn.getAttribute('data-bg');

        // Animação de saída
        modelContainer.style.opacity = 0;
        modelContainer.style.transform = 'translateX(-100px)';

        setTimeout(() => {
            viewer.setAttribute('src', modelPath);

            // Troca o fundo da section
            section.classList.remove('bg-original', 'bg-tropical', 'bg-zero');
            section.classList.add(bgClass);

            // Volta com nova lata
            modelContainer.style.transform = 'translateX(100px)';
            setTimeout(() => {
                modelContainer.style.opacity = 1;
                modelContainer.style.transform = 'translateX(0)';
            }, 50);
        }, 400);
    });
});

