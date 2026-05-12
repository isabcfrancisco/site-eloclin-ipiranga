const formspreePlaceholder = 'https://formspree.io/f/SEU_ENDPOINT_AQUI';

function setMessage(form, message, type = 'info') {
  const feedback = form.querySelector('[data-form-feedback]');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.dataset.state = type;
}

function setLoading(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;
  button.setAttribute('aria-busy', String(isLoading));
  button.innerHTML = isLoading
    ? '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Enviando...'
    : '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Enviar mensagem';
}

window.Eloclin = window.Eloclin || {};

window.Eloclin.initContactForm = function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const endpoint = form.action;
    const button = form.querySelector('.btn-form');
    setMessage(form, '');

    if (endpoint === formspreePlaceholder) {
      setMessage(form, 'Configure o endpoint real do Formspree no atributo action do formulário antes de publicar.', 'error');
      return;
    }

    if (!form.checkValidity()) {
      setMessage(form, 'Preencha os campos obrigatórios e confirme o consentimento para enviar.', 'error');
      form.reportValidity();
      return;
    }

    setLoading(button, true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      setMessage(form, 'Mensagem enviada com sucesso. A equipe da Eloclin Ipiranga retornará em breve.', 'success');
      form.reset();
    } catch (error) {
      setMessage(form, 'Não foi possível enviar a mensagem agora. Tente novamente em instantes.', 'error');
    } finally {
      setLoading(button, false);
    }
  });
};
