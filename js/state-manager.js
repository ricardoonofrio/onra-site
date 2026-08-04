/* ==========================================================================
   ONRA - Gerenciador de Estado Dinâmico & Transição de Ambiente (SPA)
   ========================================================================== */

(function () {
  'use strict';

  const STATES = {
    NEUTRAL: 'neutral',
    CONSULTORIA: 'consultoria',
    EDUCACAO: 'educacao'
  };

  const neutralView = document.getElementById('estado-neutro');
  const consultoriaView = document.getElementById('jornada-consultoria');
  const educacaoView = document.getElementById('jornada-educacao');
  const envToggle = document.getElementById('header-environment-toggle');
  const envConsultoriaBtn = document.getElementById('env-btn-consultoria');
  const envEducacaoBtn = document.getElementById('env-btn-educacao');

  /**
   * Transiciona a página para o estado/ambiente selecionado
   * @param {string} state - 'neutral' | 'consultoria' | 'educacao'
   * @param {boolean} updateHistory - Se atualiza a URL sem recarregar
   */
  function setPageState(state, updateHistory = true) {
    if (![STATES.NEUTRAL, STATES.CONSULTORIA, STATES.EDUCACAO].includes(state)) {
      state = STATES.NEUTRAL;
    }

    // 1. Reset de visibilidade
    if (neutralView) neutralView.style.display = 'none';
    if (consultoriaView) consultoriaView.classList.remove('active');
    if (educacaoView) educacaoView.classList.remove('active');

    if (envConsultoriaBtn) envConsultoriaBtn.classList.remove('active');
    if (envEducacaoBtn) envEducacaoBtn.classList.remove('active');

    // 2. Aplicar estado ativo
    if (state === STATES.NEUTRAL) {
      if (neutralView) neutralView.style.display = 'block';
      if (envToggle) envToggle.classList.remove('visible');
      document.title = "Onra | Educação Financeira e Consultoria";
    } else if (state === STATES.CONSULTORIA) {
      if (consultoriaView) consultoriaView.classList.add('active');
      if (envToggle) envToggle.classList.add('visible');
      if (envConsultoriaBtn) envConsultoriaBtn.classList.add('active');
      document.title = "Consultoria Financeira e de Investimentos | Onra";
    } else if (state === STATES.EDUCACAO) {
      if (educacaoView) educacaoView.classList.add('active');
      if (envToggle) envToggle.classList.add('visible');
      if (envEducacaoBtn) envEducacaoBtn.classList.add('active');
      document.title = "Palestras, Workshops e Educação Financeira | Onra";
    }

    // 3. Atualizar URL e Histórico
    if (updateHistory) {
      const url = new URL(window.location);
      if (state === STATES.NEUTRAL) {
        url.searchParams.delete('area');
      } else {
        url.searchParams.set('area', state);
      }
      window.history.pushState({ state: state }, '', url);
    }
  }

  function scrollToJourneyStart() {
    const root = document.getElementById('app-content-root') || document.body;
    const headerHeight = 84;
    const pos = root.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: pos > 0 ? pos : 0, behavior: 'smooth' });
  }

  function getInitialState() {
    const urlParams = new URLSearchParams(window.location.search);
    const areaParam = urlParams.get('area');
    if (areaParam && [STATES.CONSULTORIA, STATES.EDUCACAO].includes(areaParam)) {
      return areaParam;
    }
    const hash = window.location.hash.replace('#', '');
    if ([STATES.CONSULTORIA, STATES.EDUCACAO].includes(hash)) {
      return hash;
    }
    return STATES.NEUTRAL;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const initialState = getInitialState();
    setPageState(initialState, false);

    document.querySelectorAll('[data-trigger-journey]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-trigger-journey');
        setPageState(target, true);
        scrollToJourneyStart();
      });
    });

    if (envConsultoriaBtn) {
      envConsultoriaBtn.addEventListener('click', () => {
        setPageState(STATES.CONSULTORIA, true);
        scrollToJourneyStart();
      });
    }

    if (envEducacaoBtn) {
      envEducacaoBtn.addEventListener('click', () => {
        setPageState(STATES.EDUCACAO, true);
        scrollToJourneyStart();
      });
    }

    document.querySelectorAll('[data-reset-home]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setPageState(STATES.NEUTRAL, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.state) {
        setPageState(e.state.state, false);
      } else {
        setPageState(getInitialState(), false);
      }
    });
  });

  window.ONRAState = { setPageState, STATES };
})();
