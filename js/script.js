// Script para comportamento do header igual ao NestJS
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerContainer = document.querySelector('.header-container');
    const characteristicsSection = document.querySelector('.characteristics-section');
    
    // Criar header fixo (inicialmente oculto)
    const fixedHeader = document.createElement('div');
    fixedHeader.className = 'fixed-header';
    fixedHeader.innerHTML = headerContainer.innerHTML;
    document.body.appendChild(fixedHeader);
    
    let isHeaderVisible = true;
    let isFixedHeaderVisible = false;
    
    window.addEventListener('scroll', function() {
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