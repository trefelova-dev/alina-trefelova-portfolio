/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/code-snippet/view.js ***!
  \**********************************/
document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.code-snippet-box .btn-copy-code');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-code');
      const label = btn.querySelector('.copy-label');
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        btn.classList.add('is-copied');
        if (label) label.textContent = '[copied!]';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (label) label.textContent = '[copy_code]';
        }, 2000);
      } catch (err) {
        console.error('Не удалось скопировать код', err);
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map