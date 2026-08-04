/* js/interactions.js */
window.transitionState = function(currentView, targetView, bodyClass, area) {
  document.body.style.pointerEvents = 'none';

  const header = document.getElementById('siteHeader');
  header.className = 'site-header ' + (area === 'educacao' ? 'bg-light' : 'bg-dark');

  document.querySelectorAll('.btn-voltar').forEach(b => {
    b.style.display = area === '' ? 'none' : 'block';
  });

  if (currentView) {
    currentView.classList.remove('active');
  }

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeOutTime = isReduced ? 0 : 450;
  const fadeInTime = isReduced ? 0 : 150;

  setTimeout(() => {
    document.body.className = bodyClass;
    window.scrollTo(0, 0);

    setTimeout(() => {
      targetView.classList.add('active');
      document.body.style.pointerEvents = 'auto';

      const h1 = targetView.querySelector('h1, h2');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus();
      }
    }, fadeInTime);
  }, fadeOutTime);
};

// Logica de Tabs (Educação)
document.addEventListener('click', (e) => {
  const tabBtn = e.target.closest('.tab-btn');
  if (tabBtn) {
    const targetId = tabBtn.getAttribute('data-tab');
    const container = tabBtn.closest('.section');
    
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
      setTimeout(() => c.style.display = 'none', 300); // aguardar fade
    });

    tabBtn.classList.add('active');
    const targetContent = container.querySelector('#' + targetId);
    if (targetContent) {
      targetContent.style.display = 'block';
      setTimeout(() => targetContent.classList.add('active'), 50);
    }
  }
});

// Logica Seletor Vertical (Consultoria)
document.addEventListener('click', (e) => {
  const selBtn = e.target.closest('.selector-btn');
  if (selBtn) {
    const targetId = selBtn.getAttribute('data-solucao');
    const container = selBtn.closest('.vertical-selector');
    
    container.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.selector-content').forEach(c => {
      c.classList.remove('active');
      setTimeout(() => c.style.display = 'none', 300);
    });

    selBtn.classList.add('active');
    const targetContent = container.querySelector('#' + targetId);
    if (targetContent) {
      targetContent.style.display = 'block';
      setTimeout(() => targetContent.classList.add('active'), 50);
    }
  }
});
