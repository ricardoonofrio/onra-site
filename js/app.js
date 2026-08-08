(() => {
  'use strict';

  const config = window.ONRA_CONFIG || {};
  const body = document.body;
  const views = [...document.querySelectorAll('[data-view]')];
  const transition = document.querySelector('.page-transition');
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const contactDialog = document.getElementById('contact-dialog');
  const legalDialog = document.getElementById('legal-dialog');
  const contactForm = document.getElementById('contact-form');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const routeData = {
    home: {
      param: '',
      title: 'Onra | Educação Financeira e Consultoria',
      description: 'Educação financeira e orientação profissional para decisões que exigem clareza, estrutura e visão de futuro.',
      theme: '#172638'
    },
    education: {
      param: 'educacao',
      title: 'Palestras, Workshops e Educação Financeira | Onra',
      description: 'Palestras, workshops, programas e jornadas de educação financeira para pessoas, empresas e instituições.',
      theme: '#EFF0F2'
    },
    consulting: {
      param: 'consultoria',
      title: 'Consultoria Financeira e de Investimentos | Onra',
      description: 'Orientação individualizada para organizar decisões, projetos e patrimônio com clareza e visão de longo prazo.',
      theme: '#172638'
    }
  };

  let currentRoute = routeFromUrl();
  let isNavigating = false;

  function routeFromUrl() {
    const area = new URLSearchParams(window.location.search).get('area');
    if (area === 'educacao') return 'education';
    if (area === 'consultoria') return 'consulting';
    return 'home';
  }

  function buildUrl(route) {
    const url = new URL(window.location.href);
    const param = routeData[route].param;
    if (param) url.searchParams.set('area', param);
    else url.searchParams.delete('area');
    url.hash = '';
    return `${url.pathname}${url.search}`;
  }

  function updateMetadata(route) {
    const data = routeData[route];
    document.title = data.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', data.theme);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', data.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', data.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (config.canonicalBase) {
      const base = config.canonicalBase.replace(/\/$/, '');
      const suffix = data.param ? `/?area=${data.param}` : '/';
      canonical?.setAttribute('href', `${base}${suffix}`);
      ogUrl?.setAttribute('content', `${base}${suffix}`);
    }
  }

  function updateNavigation(route) {
    document.querySelectorAll('[data-route]').forEach((button) => {
      const target = button.dataset.route;
      button.classList.toggle('is-active', target === route);
      if (button.closest('nav')) {
        if (target === route) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      }
    });
  }

  function revealVisible(scope = document) {
    const elements = scope.querySelectorAll('.reveal:not(.is-visible)');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.setProperty('--delay', `${delay}ms`);
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
  }

  function commitRoute(route, pushState = true) {
    views.forEach((view) => {
      const active = view.dataset.view === route;
      view.hidden = !active;
      view.classList.toggle('is-active', active);
      view.setAttribute('aria-hidden', String(!active));
    });

    body.dataset.state = route;
    currentRoute = route;
    updateMetadata(route);
    updateNavigation(route);

    try {
      if (pushState) {
        history.pushState({ route }, '', buildUrl(route));
      } else {
        history.replaceState({ route }, '', buildUrl(route));
      }
    } catch (error) {
      // Ambientes de preview com origem nula podem bloquear a History API.
      // Em HTTP/HTTPS (incluindo GitHub Pages), a navegação funciona normalmente.
      console.info('History API indisponível neste preview.', error);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    const activeView = document.querySelector(`[data-view="${route}"]`);
    requestAnimationFrame(() => revealVisible(activeView));
  }

  function navigate(route, options = {}) {
    if (!routeData[route] || isNavigating) return;
    closeMobileMenu();

    if (route === currentRoute && !options.force) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    if (reducedMotion) {
      commitRoute(route, options.pushState !== false);
      return;
    }

    isNavigating = true;
    transition.className = 'page-transition is-entering';

    window.setTimeout(() => {
      commitRoute(route, options.pushState !== false);
      transition.className = 'page-transition is-leaving';

      window.setTimeout(() => {
        transition.className = 'page-transition';
        isNavigating = false;
      }, 560);
    }, 440);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    body.classList.remove('is-locked');
  }

  function toggleMobileMenu() {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenu.hidden = open;
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    body.classList.toggle('is-locked', !open);
  }

  function openContact(type, topic = '') {
    const copy = {
      education: {
        kicker: 'EDUCAÇÃO FINANCEIRA',
        title: 'Conte-nos sobre a experiência que deseja criar.',
        description: 'Informe o contexto, o público e o objetivo principal para prepararmos o próximo passo.',
        interest: topic || 'Educação financeira'
      },
      consulting: {
        kicker: 'CONSULTORIA',
        title: 'Vamos entender seu momento.',
        description: 'Compartilhe brevemente sua necessidade. A primeira conversa serve para avaliar contexto e compatibilidade.',
        interest: topic || 'Consultoria'
      },
      general: {
        kicker: 'CONTATO',
        title: 'Como a Onra pode ajudar?',
        description: 'Envie uma mensagem breve e indique a área de interesse.',
        interest: topic || 'Contato geral'
      },
      raiox: {
        kicker: 'LISTA DE ESPERA',
        title: 'Raio-X da Vida Financeira',
        description: 'Quer ser avisado quando o curso for lançado?',
        interest: 'Raio-X da Vida Financeira'
      },
      pleno: {
        kicker: 'FORMAÇÃO',
        title: 'Método Pleno',
        description: 'Entre na lista de interesse para receber as próximas informações sobre a formação.',
        interest: 'Método Pleno'
      }
    }[type] || null;

    if (!copy || !contactDialog) return;
    document.getElementById('contact-kicker').textContent = copy.kicker;
    document.getElementById('contact-title').textContent = copy.title;
    document.getElementById('contact-description').textContent = copy.description;
    
    // Configura campos baseados no tipo
    const isWaitlist = (type === 'raiox' || type === 'pleno');
    const fieldInterest = document.getElementById('field-interest');
    const fieldMessage = document.getElementById('field-message');
    const submitBtn = contactForm.querySelector('.submit-button');
    
    if (fieldInterest) {
      fieldInterest.style.display = isWaitlist ? 'none' : 'flex';
      const select = document.getElementById('contact-interest');
      if (select) {
        select.required = !isWaitlist;
        // Adiciona option temporária se não existir
        if (isWaitlist && !select.querySelector(option[value="\"])) {
           const opt = document.createElement('option');
           opt.value = type;
           opt.text = copy.interest;
           select.appendChild(opt);
        }
        select.value = isWaitlist ? type : copy.interest;
      }
    }
    
    if (fieldMessage) fieldMessage.style.display = isWaitlist ? 'none' : 'flex';
    if (submitBtn) submitBtn.innerHTML = isWaitlist ? 'Quero ser avisado <span>&nearr;</span>' : 'Continuar no WhatsApp <span>&nearr;</span>';
    
    contactForm.querySelector('[name="message"]').value = topic ? Tenho interesse em \.  : '';
    contactDialog.showModal();
    body.classList.add('is-locked');
    contactDialog.querySelector('input:not([type="hidden"])')?.focus();
  }

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
    body.classList.remove('is-locked');
  }

  function buildMessage(data) {
    return [
      'Olá, Onra.',
      '',
      `Interesse: ${data.get('interest')}`,
      `Nome: ${data.get('name')}`,
      `E-mail: ${data.get('email')}`,
      data.get('phone') ? `Telefone: ${data.get('phone')}` : '',
      '',
      `Mensagem: ${data.get('message')}`
    ].filter(Boolean).join('\n');
  }

  async function submitContact(event) {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      status.textContent = 'Revise os campos obrigatórios.';
      return;
    }

    const data = new FormData(contactForm);
    const message = buildMessage(data);
    const encoded = encodeURIComponent(message);

    if (config.whatsappNumber) {
      window.open(`https://wa.me/${config.whatsappNumber}?text=${encoded}`, '_blank', 'noopener');
      status.textContent = 'Abrindo o WhatsApp…';
      return;
    }

    if (config.contactEmail) {
      const subject = encodeURIComponent(`Contato Onra — ${data.get('interest')}`);
      window.location.href = `mailto:${config.contactEmail}?subject=${subject}&body=${encoded}`;
      status.textContent = 'Abrindo seu aplicativo de e-mail…';
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Protótipo: mensagem copiada. O programador deve configurar WhatsApp ou e-mail em js/config.js.';
    } catch {
      status.textContent = 'Protótipo: configure WhatsApp ou e-mail em js/config.js antes de publicar.';
    }
  }

  function setupTabs(tabListSelector, panelSelector) {
    document.querySelectorAll(tabListSelector).forEach((tabList) => {
      const tabs = [...tabList.querySelectorAll('[role="tab"]')];
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab, tabs, panelSelector));
        tab.addEventListener('keydown', (event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          let next = index;
          if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = tabs.length - 1;
          tabs[next].focus();
          activateTab(tabs[next], tabs, panelSelector);
        });
      });
    });
  }

  function activateTab(selected, tabs, panelSelector) {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll(panelSelector).forEach((panel) => {
      const active = panel.id === selected.getAttribute('aria-controls');
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }

  document.addEventListener('click', (event) => {
    const routeButton = event.target.closest('[data-route]');
    if (routeButton) {
      navigate(routeButton.dataset.route);
      return;
    }

    const contactButton = event.target.closest('[data-open-contact]');
    if (contactButton) {
      openContact(contactButton.dataset.openContact, contactButton.dataset.topic || '');
      return;
    }

    const legalButton = event.target.closest('[data-open-legal]');
    if (legalButton && legalDialog) {
      legalDialog.showModal();
      body.classList.add('is-locked');
      return;
    }

    const scrollButton = event.target.closest('[data-scroll-target]');
    if (scrollButton) {
      const id = scrollButton.dataset.scrollTarget;
      if (currentRoute !== 'consulting') {
        navigate('consulting');
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), reducedMotion ? 0 : 1100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      closeMobileMenu();
    }
  });

  menuToggle?.addEventListener('click', toggleMobileMenu);
  contactForm?.addEventListener('submit', submitContact);

  document.querySelectorAll('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  [contactDialog, legalDialog].forEach((dialog) => {
    dialog?.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeDialog(dialog);
    });
    dialog?.addEventListener('close', () => body.classList.remove('is-locked'));
  });

  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });
  window.addEventListener('popstate', () => navigate(routeFromUrl(), { pushState: false, force: true }));

  setupTabs('.tab-list', '.tab-panel');
  setupTabs('.solution-nav', '.solution-panel');
  commitRoute(currentRoute, false);
  revealVisible(document.querySelector(`[data-view="${currentRoute}"]`));
})();
