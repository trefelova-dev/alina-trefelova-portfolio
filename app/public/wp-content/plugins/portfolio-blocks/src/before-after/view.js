document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('[data-before-after]');

  blocks.forEach((block) => {
    const range = block.querySelector('.before-after-range-input');
    const overlay = block.querySelector('.before-after-overlay');
    const line = block.querySelector('.before-after-slider-line');

    if (!range || !overlay || !line) return;

    const updateSlider = (val) => {
      const rightInset = 100 - val;
      overlay.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
      line.style.left = `${val}%`;
    };

    range.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  });
});