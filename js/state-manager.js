/* ==========================================================================
   ONRA - Gerenciador de Estado Dinâmico & Rotas (SPA sem reload)
   ========================================================================== */

(function () {
  'use strict';

  const STATES = {
    NEUTRAL: 'neutral',
    CONSULTORIA: 'consultoria',
    EDUCACAO: 'educacao'
  };

  // Elementos do DOM
  const neutralView = document.getElementById('estado-neutro');
  const consultoriaView = document.getElementById('jornada-consultoria');
  const educacaoView = document.getElementById('jornada-educacao');
  const switcherBar = document.getElementById('journey-switcher-bar');
  const btnSwitchConsultoria = document.getElementById('switch-btn-consultoria');
  const btnSwitchEducacao = document.getElementById('switch-btn-educacao');

  /**
   * Altera o estado visual da página
   * @param {string} state - 'neutral' | 'consultoria' | 'educacao'
   * @param {boolean} updateHistory - Se deve atualizar a URL via pushState
   */
  function setPageState(state, updateHistory = true) {
    // Sanitize
    if (![STATES.NEUTRAL, STATES.CONSULTORIA, STATES.EDUCACAO].includes(state)) {
      state = STATES.NEUTRAL;
    }

    // 1. Ocultar todas as visões
    if (neutralView) neutralView.style.display = 'none';
    if (consultoriaView) consultoriaView.classList.remove('active');
    if (educacaoView) educacaoView.classList.remove('active');

    // Reset botões do seletor
    if (btnSwitchConsultoria) btnSwitchConsultoria.classList.remove('active');
    if (btnSwitchEducacao) btnSwitchEducacao.classList.remove('active');

    // 2. Exibir estado selecionado
    if (state === STATES.NEUTRAL) {
      if (neutralView) neutralView.style.display = 'block';
      if (switcherBar) switcherBar.classList.remove('visible');
    } else if (state === STATES.CONSULTORIA) {
      if (consultoriaView) consultoriaView.classList.add('active');
      if (switcherBar) switcherBar.classList.add('visible');
      if (btnSwitchConsultoria) btnSwitchConsultoria.classList.add('active');
    } else if (state === STATES.EDUCACAO) {
      if (educacaoView) educacaoView.classList.add('active');
      if (switcherBar) switcherBar.classList.add('visible');
      if (btnSwitchEducacao) btnSwitchEducacao.classList.add('active');
    }

    // 3. Persistência em SessionStorage
    sessionStorage.setItem('onra_last_state', state);

    // 4. Atualizar a URL sem recarregar a página
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

  /**
   * Rola a tela suavemente para o início do conteúdo dinâmico ao alternar área
   */
  function scrollToContent() {
    const target = document.getElementById('app-content-root') || document.body;
    const headerHeight = 80;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition > 0 ? offsetPosition : 0,
      behavior: 'smooth'
    });
  }

  /**
   * Detecta o estado inicial pela URL ou SessionStorage
   */
  function getInitialState() {
    const urlParams = new URLSearchParams(window.location.search);
    const areaParam = urlParams.get('area');

    if (areaParam && [STATES.CONSULTORIA, STATES.EDUCACAO].includes(areaParam)) {
      return areaParam;
    }

    // Suporte a hash como fallback
    const hash = window.location.hash.replace('#', '');
    if ([STATES.CONSULTORIA, STATES.EDUCACAO].includes(hash)) {
      return hash;
    }

    return STATES.NEUTRAL;
  }

  // Event Listeners para botões e gatilhos
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Definir estado inicial
    const initialState = getInitialState();
    setPageState(initialState, false);

    // 2. Escutar cliques nos cards da porta de entrada
    document.querySelectorAll('[data-trigger-journey]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetJourney = trigger.getAttribute('data-trigger-journey');
        setPageState(targetJourney, true);
        scrollToContent();
      });
    });

    // 3. Escutar cliques no seletor do cabeçalho
    if (btnSwitchConsultoria) {
      btnSwitchConsultoria.addEventListener('click', () => {
        setPageState(STATES.CONSULTORIA, true);
        scrollToContent();
      });
    }

    if (btnSwitchEducacao) {
      btnSwitchEducacao.addEventListener('click', () => {
        setPageState(STATES.EDUCACAO, true);
        scrollToContent();
      });
    }

    document.querySelectorAll('[data-reset-home]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setPageState(STATES.NEUTRAL, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 4. Suporte ao botão voltar/avançar do navegador (popstate)
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.state) {
        setPageState(event.state.state, false);
      } else {
        const stateFromUrl = getInitialState();
        setPageState(stateFromUrl, false);
      }
    });
  });

  // Exportar globalmente se necessário
  window.ONRAState = {
    setPageState,
    STATES
  };
})();
