document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initLanguage();
    initMobileMenu();
});

/* --- Mobile Menu --- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.mobile-menu-sidebar');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-menu-btn');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !sidebar || !overlay) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* --- Linguagem --- */
function initLanguage() {
    // Desktop Buttons
    const ptBtn = document.getElementById('ptBtn');
    const enBtn = document.getElementById('enBtn');
    // Mobile Buttons
    const ptBtnMobile = document.getElementById('ptBtnMobile');
    const enBtnMobile = document.getElementById('enBtnMobile');

    const setLang = (lang) => {
        if (localStorage.getItem('lang') === lang) return;

        showPreloader();

        setTimeout(() => {
            localStorage.setItem('lang', lang);
            applyLang(lang);
            hidePreloader();
        }, 800);
    };

    // Event Listeners for both Desktop and Mobile
    ptBtn?.addEventListener('click', () => setLang('pt'));
    enBtn?.addEventListener('click', () => setLang('en'));
    ptBtnMobile?.addEventListener('click', () => setLang('pt'));
    enBtnMobile?.addEventListener('click', () => setLang('en'));

    const savedLang = localStorage.getItem('lang') || 'pt';
    applyLang(savedLang);

    // Iniciar automação do último vídeo se estiver na home
    if (document.getElementById('latestVideoLink')) {
        initYouTubeAutomation();
    }
}

/* --- Partículas --- */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Reduzindo a quantidade para um visual mais limpo
    const count = window.innerWidth < 768 ? 40 : 70;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        resetParticle(p);
        p.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(p);
    }
}

function resetParticle(p) {
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = Math.random() * 4 + 4 + 's';
    p.style.width = Math.random() * 4 + 2 + 'px';
    p.style.height = p.style.width;
}



async function initYouTubeAutomation() {
    const channelID = 'UCfIwli4MmoUXdw94qEUwTUw';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
            const lastVideo = data.items[0];
            const videoID = lastVideo.link.split('v=')[1] || lastVideo.link.split('/').pop();

            const cardEl = document.querySelector('.video-card');
            const linkEl = document.getElementById('latestVideoLink');
            const thumbEl = document.getElementById('latestVideoThumb');
            const infoEl = document.getElementById('latestVideoInfo');

            if (linkEl) linkEl.href = lastVideo.link;
            if (thumbEl) {
                // Tenta carregar a thumbnail em alta resolução
                thumbEl.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
                thumbEl.alt = lastVideo.title;
            }
            if (infoEl) {
                const lang = localStorage.getItem('lang') || 'pt';
                // Atualiza o texto do overlay com o título do vídeo para dar mais info
                infoEl.textContent = lastVideo.title;
                // Remove os atributos de tradução estáticos para não sobrescrever o título real
                infoEl.removeAttribute('data-pt');
                infoEl.removeAttribute('data-en');
            }

            // Remove loading state
            if (cardEl) cardEl.classList.remove('loading');
        }
    } catch (error) {
        console.error('Erro ao carregar o último vídeo:', error);
    }
}

function showPreloader() {
    const loader = document.getElementById('preloader');
    if (loader) loader.classList.add('active');
}

function hidePreloader() {
    const loader = document.getElementById('preloader');
    if (loader) loader.classList.remove('active');
}

function applyLang(lang) {
    const ptBtn = document.getElementById('ptBtn');
    const enBtn = document.getElementById('enBtn');
    const ptBtnMobile = document.getElementById('ptBtnMobile');
    const enBtnMobile = document.getElementById('enBtnMobile');

    if (lang === 'pt') {
        ptBtn?.classList.add('active');
        enBtn?.classList.remove('active');
        ptBtnMobile?.classList.add('active');
        enBtnMobile?.classList.remove('active');
    } else {
        enBtn?.classList.add('active');
        ptBtn?.classList.remove('active');
        enBtnMobile?.classList.add('active');
        ptBtnMobile?.classList.remove('active');
    }

    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = lang === 'pt' ? el.getAttribute('data-pt') : el.getAttribute('data-en');
        if (text) {
            if (el.tagName === 'INPUT') {
                el.placeholder = text;
            } else if (el.innerHTML.includes('<span>')) {
                // Preservar estruturas de span se necessário (como em títulos)
                const spanMatch = el.innerHTML.match(/<span>.*<\/span>/);
                if (spanMatch && text.toUpperCase().includes('BUILD') || text.toUpperCase().includes('SPEC')) {
                    // Lógica específica para títulos com span colorido
                    const parts = text.split(' ');
                    const lastWord = parts.pop();
                    el.innerHTML = parts.join(' ') + ` <span>${lastWord}</span>`;
                } else {
                    el.innerHTML = text;
                }
            } else {
                el.innerHTML = text;
            }
        }
    });

    document.querySelectorAll('[data-en-alt]').forEach(img => {
        img.alt = lang === 'en' ? img.getAttribute('data-en-alt') : img.getAttribute('data-pt-alt');
    });

    // Re-renderizar listas específicas se estiverem presentes (Builds/Specs)
    if (typeof renderVideos === 'function') renderVideos();
    if (typeof renderSpecs === 'function') renderSpecs();
}
