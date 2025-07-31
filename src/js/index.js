// LOADER
// Tempo da logo
const MIN_LOADING_TIME = 2000;
let pageLoaded = false;
let loadingTimer = null;

// Função para esconder o loading quando a página estiver pronta
function hideLoading() {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('mainContent');

    loading.classList.add('fade-out');

    setTimeout(() => {
        mainContent.classList.add('show');
        setTimeout(() => {
            loading.remove();
        }, 800); 
    }, 300); 
}

window.addEventListener('load', function () {
    pageLoaded = true;

    if (Date.now() - startTime >= MIN_LOADING_TIME) {
        hideLoading();
    }
    else {
        const remainingTime = MIN_LOADING_TIME - (Date.now() - startTime);
        loadingTimer = setTimeout(hideLoading, remainingTime);
    }
});

const startTime = Date.now();

loadingTimer = setTimeout(function () {
    if (pageLoaded) {
        hideLoading();
    }
}, MIN_LOADING_TIME);

// Animação do menu hamburguer

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open');

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
    rotationY += scrollDirection * 1.5;

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

        modelContainer.style.opacity = 0;
        modelContainer.style.transform = 'translateX(-100px)';

        setTimeout(() => {
            viewer.setAttribute('src', modelPath);
            section.classList.remove('bg-original', 'bg-tropical', 'bg-zero');
            section.classList.add(bgClass);

            modelContainer.style.transform = 'translateX(100px)';
            setTimeout(() => {
                modelContainer.style.opacity = 1;
                modelContainer.style.transform = 'translateX(0)';
            }, 50);
        }, 400);
    });
});

