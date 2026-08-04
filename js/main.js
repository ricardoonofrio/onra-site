/* ==========================================================================
   ONRA - Lógica de Interação, Acessibilidade ARIA e WhatsApp Contextual
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── 1. MENU MOBILE ─────────────────────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.classList.toggle('active', isOpen);
    });

    // Fechar menu ao clicar num link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
      });
    });
  }

  /* ── 2. ACORDEÃO DE FAQ COM ACESSIBILIDADE WCAG (ARIA) ───────────────── */
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach((btn, index) => {
    const item = btn.closest('.faq-item');
    const answer = btn.nextElementSibling;
    const answerId = `faq-answer-${index + 1}`;

    // Atributos de acessibilidade
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

      // Fechar todos os outros itens do FAQ
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-btn');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alternar item atual
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

    // Suporte a teclado (Enter e Espaço já funcionam nativamente em <button>)
  });

  /* ── 3. GERADOR DE LINK CONTEXTUAL DE WHATSAPP ────────────────────── */
  const PHONE_NUMBER = '5527988055172'; // Número oficial Onra

  const MESSAGES = {
    consultoria_geral: 'Olá, conheci a Onra pelo site e gostaria de conversar sobre meu momento financeiro.',
    consultoria_investimentos: 'Olá, gostaria de entender como funciona a consultoria de investimentos da Onra.',
    educacao_institucional: 'Olá, gostaria de solicitar uma proposta de palestra/workshop para minha instituição.',
    metodo_pleno: 'Olá, gostaria de saber mais e entrar na lista de interesse do Método Pleno.'
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
