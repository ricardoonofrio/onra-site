/* js/interactions.js */
window.transitionState = function(currentView, targetView, bodyClass, area) {
  // Desabilitar interações durante a transição
  document.body.style.pointerEvents = 'none';

  // Header update
  const header = document.getElementById('siteHeader');
  header.className = 'site-header ' + (area === 'educacao' ? 'bg-light' : 'bg-dark');

  // Botões voltar
  document.querySelectorAll('.btn-voltar').forEach(b => {
    b.style.display = area === '' ? 'none' : 'block';
  });

  // Fade out atual
  if (currentView) {
    currentView.classList.remove('active');
  }

  // Transição (respeitando prefers-reduced-motion)
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeOutTime = isReduced ? 0 : 450;
  const fadeInTime = isReduced ? 0 : 150;

  setTimeout(() => {
    document.body.className = bodyClass;
    window.scrollTo(0, 0);

    setTimeout(() => {
      targetView.classList.add('active');
      document.body.style.pointerEvents = 'auto';

      // Foco para acessibilidade
      const h1 = targetView.querySelector('h1, h2');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus();
      }
    }, fadeInTime);
  }, fadeOutTime);
};
