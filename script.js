// Substitua "agio" pelo link exato que o Render gerou, caso eu tenha lido errado da imagem!
const API_CONTATO_URL = 'https://backend-eloclin-dgio.onrender.com/contato';

function mostrarMensagem(formulario, mensagem, tipo = 'info') {
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
  const formulario = document.getElementById('contact-form');

  if (!formulario) return;

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const botao = formulario.querySelector('.btn-form');
    mostrarMensagem(formulario, '');

    if (!formulario.checkValidity()) {
      mostrarMensagem(
        formulario,
        'Preencha os campos obrigatórios antes de enviar.',
        'error'
      );
      formulario.reportValidity();
      return;
    }

    // Captura os valores digitados no HTML
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone') ? document.getElementById('telefone').value.trim() : '';
    const especialidade = document.getElementById('especialidade') ? document.getElementById('especialidade').value.trim() : '';
    const mensagem = document.getElementById('mensagem').value.trim();
    
    // Captura o checkbox da LGPD (Certifique-se de que o input checkbox no HTML tem id="autorizacao")
    const checkboxAutorizacao = document.getElementById('autorizacao');
    const autorizouDados = checkboxAutorizacao ? checkboxAutorizacao.checked : false;

    // Monta o JSON completo com os 6 parâmetros
    const dadosContato = {
      nome: nome,
      email: email,
      telefone: telefone,
      especialidade: especialidade,
      mensagem: mensagem,
      autorizacao_dados: autorizouDados
    };

    alternarCarregamento(botao, true);

    try {
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
        'Não foi possível enviar a mensagem no momento. Tente novamente mais tarde.',
        'error'
      );
      console.error('Erro ao enviar formulário:', erro);
    } finally {
      alternarCarregamento(botao, false);
    }
  });
};
