/* ==========================================================================
   ONRA - Interatividade, Seletor Editorial de Soluções e Acessibilidade
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── 1. CABEÇALHO TRANSPARENTE NA ROLAGEM ───────────────────────────── */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── 2. MENU MOBILE TELA CHEIA ───────────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 3. SELETOR EDITORIAL INTERATIVO DE SOLUÇÕES (SEÇÃO 10.5) ───────── */
  const solutionBtns = document.querySelectorAll('.solucao-menu-btn');
  const solutionPanels = document.querySelectorAll('.solucao-panel');

  solutionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target-panel');

      solutionBtns.forEach(b => b.classList.remove('active'));
      solutionPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  /* ── 4. ACORDEÃO DE FAQ COM ACESSIBILIDADE WCAG ─────────────────────── */
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach((btn, index) => {
    const item = btn.closest('.faq-item');
    const answer = btn.nextElementSibling;
    const answerId = `faq-answer-${index + 1}`;

    btn.setAttribute('id', `faq-btn-${index + 1}`);
    btn.setAttribute('aria-controls', answerId);
    btn.setAttribute('aria-expanded', 'false');

    if (answer) {
      answer.setAttribute('id', answerId);
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', `faq-btn-${index + 1}`);
    }

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-btn');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── 5. GERADOR CONTEXTUAL DE WHATSAPP (SEM FRASES CLICHÊS) ───────────── */
  const PHONE_NUMBER = '5527988055172';

  const MESSAGES = {
    consultoria_geral: 'Olá, conheci a Onra pelo site e gostaria de agendar uma conversa sobre meu momento financeiro.',
    consultoria_investimentos: 'Olá, gostaria de entender o funcionamento da consultoria de investimentos da Onra.',
    educacao_institucional: 'Olá, gostaria de solicitar uma proposta de palestra/workshop para nossa instituição.',
    metodo_pleno: 'Olá, gostaria de saber mais informações sobre a formação Método Pleno.'
  };

  document.querySelectorAll('[data-wapp-context]').forEach(el => {
    const contextKey = el.getAttribute('data-wapp-context');
    const message = MESSAGES[contextKey] || MESSAGES.consultoria_geral;
    const encodedMsg = encodeURIComponent(message);
    const wappUrl = `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER}&text=${encodedMsg}&type=phone_number&app_absent=0`;

    el.setAttribute('href', wappUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
});
