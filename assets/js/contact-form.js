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

    if (!form.checkValidity()) {
      setMessage(form, 'Preencha os campos obrigatorios e confirme o consentimento para enviar.', 'error');
      form.reportValidity();
      return;
    }

    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot?.value) return;

    const payload = {
      nome: form.elements.nome.value.trim(),
      telefone: form.elements.telefone.value.trim(),
      email: form.elements.email.value.trim(),
      especialidade: form.elements.especialidade.value.trim(),
      mensagem: form.elements.mensagem.value.trim()
    };

    setLoading(button, true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      setMessage(form, 'Mensagem enviada com sucesso. A equipe da Eloclin Ipiranga retornara em breve.', 'success');
      form.reset();
    } catch (error) {
      setMessage(form, 'Nao foi possivel enviar a mensagem agora. Tente novamente em instantes.', 'error');
    } finally {
      setLoading(button, false);
    }
  });
};
