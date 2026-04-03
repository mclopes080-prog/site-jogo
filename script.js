document.addEventListener('DOMContentLoaded', () => {
    console.log("Site de Hospedagem de Jogo Construct 3 iniciado!");
    
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Função para atualizar o destaque do menu com base no scroll (Scroll Spy)
    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Offset para compensar o header fixo
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`#nav-links a[href*=${sectionId}]`);
            
            // Só processa se a seção estiver visível (display != none) e o link existir no menu
            if (navItem && window.getComputedStyle(current).display !== 'none') {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    }

    // Ouvinte para o evento de rolagem
    window.addEventListener('scroll', scrollSpy);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // O Scroll Spy cuidará do destaque após a rolagem, 
                // mas forçamos aqui para feedback imediato
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const btnPlay = document.querySelectorAll('.btn-play');
    btnPlay.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href === '#jogo') {
                e.preventDefault();
                const gameSection = document.querySelector('#jogo');
                const gameLink = document.querySelector('.nav-jogo');
                
                gameSection.scrollIntoView({ behavior: 'smooth' });
                
                navLinks.forEach(l => l.classList.remove('active'));
                if (gameLink) gameLink.classList.add('active');
            }
        });
    });

    // Lógica do Carrossel
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        if (items.length === 0) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        currentIndex = index;
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function startAutoPlay() {
        interval = setInterval(() => showSlide(currentIndex + 1), 5000);
    }

    function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { showSlide(currentIndex - 1); resetAutoPlay(); });
        nextBtn.addEventListener('click', () => { showSlide(currentIndex + 1); resetAutoPlay(); });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { showSlide(index); resetAutoPlay(); });
        });
        startAutoPlay();
    }
});
