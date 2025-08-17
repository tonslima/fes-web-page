// Script para comportamento do header e menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerContainer = document.querySelector('.header-container');
    const characteristicsSection = document.querySelector('.characteristics-section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    // Função para verificar se é dispositivo móvel/tablet
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Criar header fixo para desktop
    let fixedHeader;
    
    function createFixedHeader() {
        if (!fixedHeader && !isMobileDevice()) {
            fixedHeader = document.createElement('div');
            fixedHeader.className = 'fixed-header';
            fixedHeader.innerHTML = headerContainer.innerHTML;
            document.body.appendChild(fixedHeader);
        }
    }
    
    function removeFixedHeader() {
        if (fixedHeader) {
            document.body.removeChild(fixedHeader);
            fixedHeader = null;
        }
    }
    
    // Inicializar header fixo
    createFixedHeader();
    
    let isHeaderVisible = true;
    let isFixedHeaderVisible = false;
    
    // Função para alternar menu mobile
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        if (mobileNav.style.display === 'block') {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            mobileNav.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Event listener para o botão do menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu mobile ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.style.display = 'none';
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Scroll behavior apenas para desktop
    function handleScroll() {
        if (isMobileDevice() || !fixedHeader) return;
        
        const scrollY = window.scrollY;
        const characteristicsOffset = characteristicsSection.offsetTop;
        const viewportHeight = window.innerHeight;
        
        // Esconder header original quando começar a rolar
        if (scrollY > 100 && isHeaderVisible) {
            headerContainer.style.opacity = '0';
            headerContainer.style.transform = 'translateY(-100%)';
            isHeaderVisible = false;
        } else if (scrollY <= 100 && !isHeaderVisible) {
            headerContainer.style.opacity = '1';
            headerContainer.style.transform = 'translateY(0)';
            isHeaderVisible = true;
        }
        
        // Mostrar header fixo quando chegar na seção de características
        if (scrollY >= characteristicsOffset - viewportHeight * 0.3 && !isFixedHeaderVisible) {
            fixedHeader.style.opacity = '1';
            fixedHeader.style.transform = 'translateY(0)';
            isFixedHeaderVisible = true;
        } else if (scrollY < characteristicsOffset - viewportHeight * 0.3 && isFixedHeaderVisible) {
            fixedHeader.style.opacity = '0';
            fixedHeader.style.transform = 'translateY(-100%)';
            isFixedHeaderVisible = false;
        }
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', handleScroll);
    
    // Event listener para redimensionamento da tela
    window.addEventListener('resize', function() {
        if (isMobileDevice()) {
            removeFixedHeader();
        } else {
            createFixedHeader();
        }
    });
});

// Contador de membros animado
document.addEventListener('DOMContentLoaded', function() {
    const totalMembros = document.querySelectorAll('.integrantes li').length;
    const titulo = document.querySelector('.titulo-integrantes strong');
    
    if (titulo) {
        // Animação de contagem
        let contador = 0;
        const intervalo = setInterval(() => {
            contador++;
            titulo.textContent = `Conheça os ${contador} integrantes da FES:`;
            
            if (contador >= totalMembros) {
                clearInterval(intervalo);
                
                // Adiciona efeito hover ao número após a contagem
                setTimeout(() => {
                    adicionarHoverNumero();
                }, 500);
            }
        }, 400);
    }
    
    function adicionarHoverNumero() {
        const numeroSpan = document.createElement('span');
        numeroSpan.textContent = totalMembros;
        numeroSpan.style.transition = 'all 0.3s ease';
        numeroSpan.style.cursor = 'pointer';
        numeroSpan.style.borderRadius = '5px';
        numeroSpan.style.padding = '2px 6px';
        
        // Substitui o número no texto
        titulo.innerHTML = titulo.textContent.replace(totalMembros, numeroSpan.outerHTML);
        
        // Pega a referência do span criado
        const numeroElemento = titulo.querySelector('span');
        
        numeroElemento.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = '#ff0000ff';
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            this.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        });
        
        numeroElemento.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '';
            this.style.backgroundColor = '';
            this.style.textShadow = '';
        });
    }
});
    // Touch support for member cards on mobile
    const cards = document.querySelectorAll(".card");
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        cards.forEach(card => {
            let isCardActive = false;
            
            // Touch/click event for mobile
            card.addEventListener("touchstart", function(e) {
                e.preventDefault();
                
                // Remove active state from all other cards
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove("card-active");
                    }
                });
                
                // Toggle active state for current card
                if (isCardActive) {
                    card.classList.remove("card-active");
                    isCardActive = false;
                } else {
                    card.classList.add("card-active");
                    isCardActive = true;
                }
            });
            
            // Fallback click event for touch devices that support both
            card.addEventListener("click", function(e) {
                if (isTouchDevice) {
                    e.preventDefault();
                    
                    // Remove active state from all other cards
                    cards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove("card-active");
                        }
                    });
                    
                    // Toggle active state for current card
                    card.classList.toggle("card-active");
                }
            });
        });
        
        // Close cards when tapping outside
        document.addEventListener("touchstart", function(e) {
            if (!e.target.closest(".card")) {
                cards.forEach(card => {
                    card.classList.remove("card-active");
                });
            }
        });
    }
