/* js/forms.js */
document.addEventListener('submit', (e) => {
  if (e.target.matches('form')) {
    e.preventDefault();
    console.log('[Form] form_submit: ', e.target.id);
    alert('Formulário enviado com sucesso. Em breve a equipe Onra entrará em contato.');
  }
});
