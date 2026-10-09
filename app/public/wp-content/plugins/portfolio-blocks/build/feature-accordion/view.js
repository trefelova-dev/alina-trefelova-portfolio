/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/feature-accordion/view.js ***!
  \***************************************/
function initAccordionLightbox() {
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
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        close();
      }
    });
  }
  document.querySelectorAll('.feature-preview-img, .feature-mobile-img').forEach(img => {
    img.addEventListener('click', e => {
      e.stopPropagation();
      const targetSrc = img.getAttribute('src');
      if (!targetSrc) return;
      const lightboxImg = overlay.querySelector('.gallery-lightbox-img');
      lightboxImg.src = targetSrc;
      overlay.classList.add('is-active');
    });
  });
}
function initFeatureAccordion() {
  const blocks = document.querySelectorAll('[data-feature-accordion]');
  blocks.forEach(block => {
    const items = block.querySelectorAll('.feature-item');
    const previews = block.querySelectorAll('.feature-preview-img');
    items.forEach(item => {
      const trigger = item.querySelector('.feature-trigger');
      const body = item.querySelector('.feature-body');
      const targetIndex = item.getAttribute('data-feature-index');
      trigger.addEventListener('click', e => {
        e.preventDefault();
        const isCurrentlyActive = item.classList.contains('is-active');
        items.forEach(otherItem => {
          otherItem.classList.remove('is-active');
          const otherBody = otherItem.querySelector('.feature-body');
          const otherTrigger = otherItem.querySelector('.feature-trigger');
          if (otherBody) otherBody.style.display = 'none';
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });
        previews.forEach(p => p.classList.remove('is-active'));
        if (!isCurrentlyActive) {
          item.classList.add('is-active');
          if (body) body.style.display = 'block';
          trigger.setAttribute('aria-expanded', 'true');
          const activePreview = block.querySelector(`.feature-preview-img[data-preview-index="${targetIndex}"]`);
          if (activePreview) {
            activePreview.classList.add('is-active');
          }
        }
      });
    });
  });
  initAccordionLightbox();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeatureAccordion);
} else {
  initFeatureAccordion();
}
/******/ })()
;
//# sourceMappingURL=view.js.map