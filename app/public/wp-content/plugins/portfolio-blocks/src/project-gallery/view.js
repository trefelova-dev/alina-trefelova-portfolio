import EmblaCarousel from 'embla-carousel';

function initLightbox() {
  let overlay = document.querySelector('.gallery-lightbox-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'gallery-lightbox-overlay';
    overlay.innerHTML = `
      <button type="button" class="gallery-lightbox-close geek-badge">[close / esc]</button>
      <img class="gallery-lightbox-img" src="" alt="Fullscreen preview" />
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.gallery-lightbox-close');
    const imgNode = overlay.querySelector('.gallery-lightbox-img');

    const close = () => {
      overlay.classList.remove('is-active');
      setTimeout(() => {
        if (!overlay.classList.contains('is-active')) {
          imgNode.src = '';
        }
      }, 250);
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        close();
      }
    });
  }

  document.querySelectorAll('.project-gallery-block img').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetSrc = img.getAttribute('src');
      if (!targetSrc) return;

      const lightboxImg = overlay.querySelector('.gallery-lightbox-img');
      lightboxImg.src = targetSrc;
      overlay.classList.add('is-active');
    });
  });
}

function initSliders() {
  const galleries = document.querySelectorAll('.project-gallery-block[data-gallery-layout^="slider-"]');

  galleries.forEach((gallery) => {
    const emblaNode = gallery.querySelector('.embla');
    const prevBtn = gallery.querySelector('.gallery-nav-btn.prev');
    const nextBtn = gallery.querySelector('.gallery-nav-btn.next');

    if (!emblaNode) return;

    const emblaApi = EmblaCarousel(emblaNode, {
      loop: true,
      align: 'center',
      skipSnaps: false,
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        emblaApi.scrollPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        emblaApi.scrollNext();
      });
    }
  });

  initLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}