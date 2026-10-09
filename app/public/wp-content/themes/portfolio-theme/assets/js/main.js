/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova. All rights reserved.
 * Author: Alina Trefelova / ATcode
 * 
 * Главный скрипт темы. Отвечает за отправку контактной формы,
 * анимацию переключения языков, мобильное бургер-меню и анимацию появления элементов при прокрутке.
 */

document.addEventListener('DOMContentLoaded', () => {
    init_contact_form();
    init_lang_switcher();
    init_burger_menu();
    init_scroll_animations();
    init_line_numbers();
});


/**
 * Динамический расчет номеров строк
 */
function init_editor_line_numbers(lineBoxSelector = '.stack-line-numbers', contentSelector = '.stack-content') {
    const line_boxes = document.querySelectorAll(lineBoxSelector);

    line_boxes.forEach((line_box) => {
        const parent = line_box.closest('.stack-editor-ui, .form-editor-ui');
        if (!parent) return;

        const content = parent.querySelector(contentSelector);
        if (!content) return;

        const LINE_HEIGHT = 20;

        function updateLines() {
            const contentHeight = content.offsetHeight;
            const linesCount = Math.max(1, Math.floor(contentHeight / LINE_HEIGHT));
            const currentCount = line_box.children.length;

            if (currentCount === linesCount) return;

            if (linesCount > currentCount) {
                const fragment = document.createDocumentFragment();
                for (let i = currentCount + 1; i <= linesCount; i++) {
                    const span = document.createElement('span');
                    span.textContent = String(i).padStart(2, '0');
                    span.classList.add('line-num-item');
                    fragment.appendChild(span);
                }
                line_box.appendChild(fragment);
            } else {
                while (line_box.children.length > linesCount) {
                    line_box.removeChild(line_box.lastChild);
                }
            }
        }

        updateLines();

        if (window.ResizeObserver) {
            const observer = new ResizeObserver(() => updateLines());
            observer.observe(content);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init_editor_line_numbers('#line-numbers', '.form-content');
    init_editor_line_numbers('.stack-line-numbers', '.stack-content');
});

/**
 * Инициализация и обработка отправки контактной формы через AJAX.
 * 
 * @returns {void}
 */
function init_contact_form() {
    const contact_form = document.getElementById('contact-form');

    if (!contact_form) {
        return;
    }

    contact_form.addEventListener('submit', function(e) {
        e.preventDefault();

        const form = this;
        const submit_btn = form.querySelector('.contact-submit');
        const response_box = document.getElementById('form-response');

        const success_msg = form.dataset.success || 'Сообщение отправлено!';
        const error_msg = form.dataset.error || 'Ошибка отправки.';

        if (!submit_btn) {
            return;
        }

        submit_btn.classList.add('loading');
        submit_btn.disabled = true;

        if (response_box) {
            response_box.innerText = '';
            response_box.classList.remove('is-success', 'is-error');
        }

        const form_data = new FormData(form);

        fetch('/wp-admin/admin-ajax.php?action=send_contact_form', {
            method: 'POST',
            body: form_data
        })
        .then(res => res.text())
        .then(data => {
            submit_btn.classList.remove('loading');
            submit_btn.disabled = false;
            
            if (data.includes('отправлено')) {
                if (response_box) {
                    response_box.innerText = success_msg;
                    response_box.classList.add('is-success');
                }
                form.reset();
            } else {
                if (response_box) {
                    response_box.innerText = data || error_msg;
                    response_box.classList.add('is-error');
                }
            }
        })
        .catch(() => {
            submit_btn.classList.remove('loading');
            submit_btn.disabled = false;

            if (response_box) {
                response_box.innerText = error_msg;
                response_box.classList.add('is-error');
            }
        });
    });
}

/**
 * Инициализация анимации переключателя языков.
 * 
 * @returns {void}
 */
function init_lang_switcher() {
    document.querySelectorAll('.lang-switcher').forEach((switcher) => {
        const buttons = switcher.querySelectorAll('.lang-btn');
        
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const is_en = btn.textContent.trim().toLowerCase() === 'en';
                
                if (is_en) {
                    switcher.classList.add('lang-en');
                } else {
                    switcher.classList.remove('lang-en');
                }
            });
        });
    });
}

/**
 * Инициализация мобильного бургер-меню с плавной анимацией закрытия.
 * 
 * @returns {void}
 */
function init_burger_menu() {
    const burger_btn = document.querySelector('.burger-menu-btn');
    const navigation = document.querySelector('.site-navigation');

    if (burger_btn && navigation) {
        burger_btn.addEventListener('click', () => {
            burger_btn.classList.toggle('is-active');
            
            if (navigation.classList.contains('is-open')) {
                navigation.classList.remove('is-open');
                navigation.classList.add('is-closed');
            } else {
                navigation.classList.remove('is-closed');
                navigation.classList.add('is-open');
            }
        });
        
        navigation.addEventListener('transitionend', (e) => {
            if (e.target === navigation && !navigation.classList.contains('is-open')) {
                navigation.classList.remove('is-closed');
            }
        });
        
        navigation.querySelectorAll('.header-menu-list a').forEach(link => {
            link.addEventListener('click', () => {
                burger_btn.classList.remove('is-active');
                navigation.classList.remove('is-open');
                navigation.classList.add('is-closed');
            });
        });
    }
}


function init_scroll_animations() {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const selectors = [
        '.skills-section', '.about-section', '.featured-projects-section', 
        '.contacts-callout', '.projects-grid', '.contacts-items-wrapper', 
        '.contacts-banner-card', '.contacts-form', '.about-academic-section', 
        '.about-toolbox-section', '.about-signature', '.stack-editor-ui', 
        '.project-nav-container', '.project-content-body > *', '.project-stack-note'
    ].join(', ');

    document.querySelectorAll(selectors).forEach(sec => {
        sectionObserver.observe(sec);
    });

    const cardObserver = new IntersectionObserver((entries) => {
        const visibleCards = entries
            .filter(entry => entry.isIntersecting)
            .map(entry => entry.target);

        if (visibleCards.length === 0) return;

        const gridEl = document.querySelector('.projects-grid');
        const gridColumns = gridEl 
            ? window.getComputedStyle(gridEl).getPropertyValue('grid-template-columns').split(' ').length 
            : 1;

        visibleCards.forEach((card) => {
            const allCards = Array.from(document.querySelectorAll('.project-card'));
            const cardIndex = allCards.indexOf(card);

            const indexInRow = cardIndex % gridColumns;

            const delay = indexInRow * 0.15; 

            card.style.transitionDelay = `${delay}s`;
            card.classList.add('is-animated');

            cardObserver.unobserve(card);
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.project-card').forEach(card => cardObserver.observe(card));

    init_project_card_galleries();
}

function init_project_card_galleries() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const images = card.querySelectorAll('.project-card-img');
        if (images.length <= 1) return;

        let intervalId = null;
        let timeoutId = null;
        let currentIndex = 0;

        const BADGE_ANIMATION_DELAY = 0; 
        const GALLERY_INTERVAL = 2500;

        card.addEventListener('mouseenter', () => {
            timeoutId = setTimeout(() => {
                intervalId = setInterval(() => {
                    images[currentIndex].classList.remove('is-active');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add('is-active');
                }, GALLERY_INTERVAL);
            }, BADGE_ANIMATION_DELAY);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);

            images.forEach((img, idx) => {
                img.classList.toggle('is-active', idx === 0);
            });
            currentIndex = 0;
        });
    });
}

document.addEventListener('DOMContentLoaded', init_scroll_animations);

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('.btn-copy-config');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const jsonData = copyBtn.dataset.json;
        if (!jsonData) return;

        try {
            await navigator.clipboard.writeText(jsonData);

            const textSpan = copyBtn.querySelector('.copy-text');
            const originalText = textSpan.textContent;

            copyBtn.classList.add('is-copied');
            textSpan.textContent = '[copied!]';

            setTimeout(() => {
                copyBtn.classList.remove('is-copied');
                textSpan.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
});

(function initGlobalLightbox() {
  function getOrCreateOverlay() {
    let overlay = document.querySelector('.global-lightbox-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'global-lightbox-overlay';
      overlay.innerHTML = `
        <button type="button" class="global-lightbox-close geek-badge">[close / esc]</button>
        <img class="global-lightbox-img" src="" alt="Fullscreen preview" />
      `;
      document.body.appendChild(overlay);

      const close = () => {
        overlay.classList.remove('is-active');
        setTimeout(() => {
          if (!overlay.classList.contains('is-active')) {
            const imgNode = overlay.querySelector('.global-lightbox-img');
            if (imgNode) imgNode.src = '';
          }
        }, 200);
      };

      overlay.querySelector('.global-lightbox-close')?.addEventListener('click', close);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
          close();
        }
      });
    }
    return overlay;
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    const isInProjectContent = img.closest('.project-content-body');
    const hasZoomAttr = img.hasAttribute('data-zoomable');

    if (!isInProjectContent && !hasZoomAttr) return;

    const isExcluded =
      img.classList.contains('no-zoom') ||
      img.classList.contains('not-lightbox') ||
      img.closest('.no-zoom') ||
      img.closest('.not-lightbox');

    if (isExcluded) return;

    e.preventDefault();
    e.stopPropagation();

    const parentLink = img.closest('a');
    const targetSrc = parentLink?.getAttribute('href')?.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)
      ? parentLink.getAttribute('href')
      : (img.currentSrc || img.getAttribute('src'));

    if (!targetSrc) return;

    const overlay = getOrCreateOverlay();
    const lightboxImg = overlay.querySelector('.global-lightbox-img');
    if (lightboxImg) {
      lightboxImg.src = targetSrc;
      overlay.classList.add('is-active');
    }
  });
})();


document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;

    const checkScroll = () => {
        const scrolled = window.scrollY || 
                         window.pageYOffset || 
                         document.documentElement.scrollTop || 
                         document.body.scrollTop || 0;

        if (scrolled > 400) {
            scrollToTopBtn.classList.add('is-visible');
        } else {
            scrollToTopBtn.classList.remove('is-visible');
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});