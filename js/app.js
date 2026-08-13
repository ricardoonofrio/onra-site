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
    
    transition.addEventListener('animationend', function handler(e) {
      if (e.animationName !== 'cover') return;
      transition.removeEventListener('animationend', handler);
      
      commitRoute(route, options.pushState !== false);
      transition.className = 'page-transition is-leaving';
      
      transition.addEventListener('animationend', function handlerOut(eOut) {
        if (eOut.animationName !== 'uncover') return;
        transition.removeEventListener('animationend', handlerOut);
        
        transition.className = 'page-transition';
        isNavigating = false;
      });
    });
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
    if (!open) {
      // Menu opened: trap focus
      const focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled])');
      if (focusable.length) focusable[0].focus();
    } else {
      // Menu closed: return focus
      menuToggle.focus();
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (mobileMenu && !mobileMenu.hidden) {
        closeMobileMenu();
        menuToggle.focus();
      }
    }
    if (event.key === 'Tab' && mobileMenu && !mobileMenu.hidden) {
      const focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (event.shiftKey) {
        if (document.activeElement === first || document.activeElement === menuToggle) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  });

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
      },
      diagnostic: {
        kicker: 'CONSULTORIA',
        title: 'Diagnóstico Financeiro',
        description: 'Compartilhe brevemente seu cenário atual para avaliarmos suas necessidades iniciais.',
        interest: 'Diagnóstico Financeiro'
      },
      project: {
        kicker: 'CONSULTORIA',
        title: 'Planejamento de Projetos',
        description: 'Compartilhe qual projeto de vida você deseja estruturar.',
        interest: 'Planejamento de Projetos'
      },
      invest: {
        kicker: 'CONSULTORIA',
        title: 'Consultoria de Investimentos',
        description: 'Conte-nos sobre sua carteira e seus objetivos com os investimentos.',
        interest: 'Consultoria de Investimentos'
      },
      follow: {
        kicker: 'CONSULTORIA',
        title: 'Acompanhamento',
        description: 'Compartilhe sua necessidade de acompanhamento financeiro de longo prazo.',
        interest: 'Acompanhamento Financeiro'
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
        select.value = (type === 'general') ? '' : type;
      }
    }
    
    if (fieldMessage) fieldMessage.style.display = isWaitlist ? 'none' : 'flex';
    if (submitBtn) submitBtn.innerHTML = isWaitlist ? 'Quero ser avisado <span>&nearr;</span>' : 'Continuar no WhatsApp <span>&nearr;</span>';
    
    contactForm.querySelector('[name="message"]').value = topic ? `Tenho interesse em ${topic}. ` : '';
    contactDialog.showModal();
    body.classList.add('is-locked');
    contactDialog.querySelector('input:not([type="hidden"])')?.focus();
  }

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
    body.classList.remove('is-locked');
  }

  function buildMessage(data, interestText) {
    const userMessage = data.get('message');
    const msgArray = [
      `Nome: ${data.get('name')}`,
      `Assunto: ${interestText}`
    ];
    if (userMessage) {
      msgArray.push('');
      msgArray.push(userMessage);
    }
    return msgArray.join('\n');
  }

  async function submitContact(event) {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      status.textContent = 'Revise os campos obrigatórios.';
      return;
    }

    const submitBtn = contactForm.querySelector('.submit-button');
    if (submitBtn) submitBtn.disabled = true;

    const data = new FormData(contactForm);
    const interestSelect = document.getElementById('contact-interest');
    const interestText = interestSelect && interestSelect.selectedIndex >= 0 
      ? interestSelect.options[interestSelect.selectedIndex].text 
      : data.get('interest');

    const message = buildMessage(data, interestText);
    const encoded = encodeURIComponent(message);
    let waOpened = false;

    // 1. Abrir WhatsApp imediatamente para não cair no bloqueador de popup
    if (config.whatsappNumber) {
      window.open(`https://wa.me/${config.whatsappNumber}?text=${encoded}`, '_blank', 'noopener');
      waOpened = true;
      status.textContent = 'WhatsApp aberto. Salvando registro...';
    } else {
      try {
        await navigator.clipboard.writeText(message);
        status.textContent = 'Mensagem copiada. Salvando registro...';
      } catch {
        status.textContent = 'Salvando registro...';
      }
    }

    // 2. Enviar dados ao Google Sheets e aguardar confirmação real
    if (config.googleSheetWebhookUrl) {
      try {
        const response = await fetch(config.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            name: data.get('name'),
            phone: data.get('phone'),
            interest: interestText,
            message: data.get('message')
          })
        });
        
        status.textContent = waOpened ? 'WhatsApp aberto e contato registrado com sucesso!' : 'Contato registrado com sucesso!';
      } catch (err) {
        console.error('Erro ao salvar no Sheets:', err);
        status.textContent = waOpened ? 'WhatsApp aberto. (Falha ao registrar contato no sistema)' : 'Falha ao registrar contato.';
      }
    } else {
      status.textContent = waOpened ? 'WhatsApp aberto em nova aba.' : 'Concluído.';
    }

    if (submitBtn) submitBtn.disabled = false;
    setTimeout(() => closeDialog(contactDialog), 3000);
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
      event.preventDefault();
      navigate(routeButton.dataset.route);
      return;
    }

    const contactButton = event.target.closest('[data-open-contact]');
    if (contactButton) {
      if (contactButton.tagName === 'A') event.preventDefault();
      openContact(contactButton.dataset.openContact, contactButton.dataset.topic || '');
      return;
    }

    const legalButton = event.target.closest('[data-open-legal]');
    if (legalButton && legalDialog) {
      if (legalButton.tagName === 'A') event.preventDefault();
      legalDialog.showModal();
      body.classList.add('is-locked');
      return;
    }

    const scrollButton = event.target.closest('[data-scroll-target]');
    if (scrollButton) {
      if (scrollButton.tagName === 'A') event.preventDefault();
      let id = scrollButton.dataset.scrollTarget;

      if (id === 'leo') {
        if (currentRoute === 'education') {
          id = 'leo-education';
        } else if (currentRoute === 'consulting') {
          id = 'leo-consulting';
        } else {
          navigate('consulting');
          id = 'leo-consulting';
        }
      }

      const targetEl = document.getElementById(id);
      if (targetEl) {
        const view = targetEl.closest('.view');
        if (view && view.dataset.view !== currentRoute) {
          navigate(view.dataset.view);
          window.setTimeout(() => targetEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), reducedMotion ? 0 : 1100);
        } else {
          targetEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
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
  setupTabs('.solution-selector', '.solution-panel');
  commitRoute(currentRoute, false);
  revealVisible(document.querySelector(`[data-view="${currentRoute}"]`));
})();
