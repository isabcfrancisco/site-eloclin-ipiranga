// Endpoint local do backend Flask.
const API_CONTATO_URL = 'http://127.0.0.1:5000/api/contato';

function mostrarMensagem(formulario, mensagem, tipo = 'info') {
  // Usa a area de feedback que ja existe no formulario.
  const feedback = formulario.querySelector('[data-form-feedback]');

  if (feedback) {
    feedback.textContent = mensagem;
    feedback.dataset.state = tipo;
  }

  console.log(mensagem);
}

function alternarCarregamento(botao, carregando) {
  if (!botao) return;

  botao.disabled = carregando;
  botao.setAttribute('aria-busy', String(carregando));
  botao.innerHTML = carregando
    ? '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Enviando...'
    : '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Enviar mensagem';
}

window.Eloclin = window.Eloclin || {};

window.Eloclin.initContactForm = function initContactForm() {
  // Captura o formulario de contato pelo ID existente no HTML.
  const formulario = document.getElementById('contact-form');

  if (!formulario) return;

  formulario.addEventListener('submit', async (event) => {
    // Impede o recarregamento da pagina.
    event.preventDefault();

    const botao = formulario.querySelector('.btn-form');
    mostrarMensagem(formulario, '');

    // Mantem a validacao nativa dos campos obrigatorios do formulario.
    if (!formulario.checkValidity()) {
      mostrarMensagem(
        formulario,
        'Preencha os campos obrigatorios antes de enviar.',
        'error'
      );
      formulario.reportValidity();
      return;
    }

    // Captura os valores digitados nos campos principais.
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Monta o JSON que sera enviado para a API Flask.
    const dadosContato = {
      nome,
      email,
      mensagem
    };

    alternarCarregamento(botao, true);

    try {
      // Envia os dados para o backend local.
      const resposta = await fetch(API_CONTATO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosContato)
      });

      if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
      }

      alert('Mensagem enviada com sucesso!');
      mostrarMensagem(formulario, 'Mensagem enviada com sucesso!', 'success');
      formulario.reset();
    } catch (erro) {
      alert('Erro ao enviar a mensagem.');
      mostrarMensagem(
        formulario,
        'Nao foi possivel enviar a mensagem. Verifique se o backend Flask esta rodando.',
        'error'
      );
      console.error('Erro ao enviar formulario:', erro);
    } finally {
      alternarCarregamento(botao, false);
    }
  });
};
