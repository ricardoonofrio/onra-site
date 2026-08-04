/* ==========================================================================
   ONRA - Gerenciador de Estados (SPA)
   ========================================================================== */
(function() {
  'use strict';

  const viewInicio = document.getElementById('view-inicio');
  const viewEducacao = document.getElementById('view-educacao');
  const viewConsultoria = document.getElementById('view-consultoria');
  const header = document.getElementById('siteHeader');
  
  const rotas = {
    '': { view: viewInicio, bodyClass: 'state-inicio', title: 'Onra | Educação Financeira e Consultoria' },
    'educacao': { view: viewEducacao, bodyClass: 'state-educacao', title: 'Palestras, Workshops e Educação Financeira | Onra' },
    'consultoria': { view: viewConsultoria, bodyClass: 'state-consultoria', title: 'Consultoria Financeira e de Investimentos | Onra' }
  };

  function updateActiveView(area, push = true) {
    // Esconder todas
    viewInicio.classList.remove('active');
    viewEducacao.classList.remove('active');
    viewConsultoria.classList.remove('active');

    // Remover classes do body e header
    document.body.className = '';
    header.className = 'site-header';

    const rotaAtual = rotas[area] || rotas[''];
    
    // Atualizar UI
    rotaAtual.view.classList.add('active');
    document.body.classList.add(rotaAtual.bodyClass);
    document.title = rotaAtual.title;
    
    // Header Style
    if (area === 'educacao') {
      header.classList.add('bg-light');
      document.querySelectorAll('.btn-voltar').forEach(b => b.style.display = 'block');
    } else if (area === 'consultoria') {
      header.classList.add('bg-dark');
      document.querySelectorAll('.btn-voltar').forEach(b => b.style.display = 'block');
    } else {
      header.classList.add('bg-dark');
      document.querySelectorAll('.btn-voltar').forEach(b => b.style.display = 'none');
    }

    // Scroll to top on transition
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // History API
    if (push) {
      const newUrl = area ? `/?area=${area}` : '/';
      window.history.pushState({ area: area }, '', newUrl);
    }
  }

  function handleNavigation(e) {
    const trigger = e.target.closest('[data-area]');
    if (trigger) {
      e.preventDefault();
      const area = trigger.getAttribute('data-area');
      updateActiveView(area);
    }
  }

  // Init
  function init() {
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', (e) => {
      const area = e.state ? e.state.area : '';
      updateActiveView(area, false);
    });

    // Check initial URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialArea = urlParams.get('area') || '';
    updateActiveView(initialArea, false);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
