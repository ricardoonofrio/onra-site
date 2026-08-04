/* js/router.js */
export const BASE_PATH = '/onra-site/';

const rotas = {
  '': { viewId: 'view-inicio', bodyClass: 'state-inicio', title: 'Onra | Educação Financeira e Consultoria', metaDesc: 'Marca de educação e orientação financeira para pessoas e instituições.' },
  'educacao': { viewId: 'view-educacao', bodyClass: 'state-educacao', title: 'Palestras, Workshops e Educação Financeira | Onra', metaDesc: 'Experiências de educação financeira para empresas, institutos, pessoas e comunidades.' },
  'consultoria': { viewId: 'view-consultoria', bodyClass: 'state-consultoria', title: 'Consultoria Financeira e de Investimentos | Onra', metaDesc: 'Orientação individualizada para organizar decisões, projetos e patrimônio.' }
};

export function updateRoute(area, push = true) {
  const currentView = document.querySelector('.view-container.active');
  const targetRoute = rotas[area] || rotas[''];
  const targetView = document.getElementById(targetRoute.viewId);

  if (!targetView || (currentView && currentView.id === targetRoute.viewId)) return;

  // Atualizar Metadados
  document.title = targetRoute.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = targetRoute.metaDesc;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = targetRoute.title;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = targetRoute.metaDesc;
  
  // SEO e Canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  const fullUrl = window.location.origin + BASE_PATH + (area ? `?area=${area}` : '');
  if (canonical) canonical.href = fullUrl;

  // Interações de saída e entrada
  if (window.transitionState) {
    window.transitionState(currentView, targetView, targetRoute.bodyClass, area);
  } else {
    // Fallback se interactions.js não estiver pronto
    if (currentView) currentView.classList.remove('active');
    targetView.classList.add('active');
    document.body.className = targetRoute.bodyClass;
  }

  // Analytics
  if (window.trackPageView) window.trackPageView(area);

  // History API
  if (push) {
    const url = area ? `?area=${area}` : window.location.pathname;
    window.history.pushState({ area }, '', url);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialArea = urlParams.get('area') || '';
  updateRoute(initialArea, false);
});

window.addEventListener('popstate', (e) => {
  const area = e.state ? e.state.area : '';
  updateRoute(area, false);
});
