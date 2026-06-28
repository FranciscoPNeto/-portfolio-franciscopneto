/* ================================================
   script.js – Portfólio Francisco Neto
   Disciplina: Fundamentos da Programação Web
   UNINTER – ADS
   Vanilla JS puro (sem bibliotecas ou frameworks)
   ================================================ */

/* ------------------------------------------------
   1. MENU HAMBÚRGUER (responsivo)
   Alterna a classe .aberto no menu e .ativo no botão
   para expandir/recolher a navegação em telas pequenas
   ------------------------------------------------ */
const btnHamburger = document.getElementById('btnHamburger');
const navLinks     = document.getElementById('navLinks');

btnHamburger.addEventListener('click', function () {
  // Alterna a classe que mostra/esconde o menu mobile
  navLinks.classList.toggle('aberto');
  // Alterna a animação do ícone hambúrguer → X
  btnHamburger.classList.toggle('ativo');
});

// Fecha o menu ao clicar em qualquer link de navegação (mobile)
document.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('aberto');
    btnHamburger.classList.remove('ativo');
  });
});

/* ------------------------------------------------
   2. ALTERNÂNCIA DE TEMA CLARO / ESCURO
   Adiciona ou remove a classe .dark-mode no <body>.
   O CSS usa variáveis CSS para trocar todas as cores.
   ------------------------------------------------ */
const btnTema = document.getElementById('btnTema');

btnTema.addEventListener('click', function () {
  // Alterna a classe .dark-mode no elemento body
  document.body.classList.toggle('dark-mode');

  // Atualiza o texto do botão conforme o tema ativo
  if (document.body.classList.contains('dark-mode')) {
    btnTema.textContent = '☀️ Tema Claro';
  } else {
    btnTema.textContent = '🌙 Tema Escuro';
  }
});

/* ------------------------------------------------
   3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO
   Verifica os campos antes de "enviar":
   - Nome não pode estar vazio
   - E-mail não pode estar vazio e deve ter formato válido
   - Mensagem não pode estar vazia
   Se tudo estiver ok, limpa os campos e exibe sucesso.
   ------------------------------------------------ */
const formContato  = document.getElementById('formContato');
const campoNome    = document.getElementById('nome');
const campoEmail   = document.getElementById('email');
const campoMsg     = document.getElementById('mensagem');
const erroNome     = document.getElementById('erroNome');
const erroEmail    = document.getElementById('erroEmail');
const erroMensagem = document.getElementById('erroMensagem');
const msgSucesso   = document.getElementById('msgSucesso');

// Expressão regular para validar formato de e-mail
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Função auxiliar: exibe mensagem de erro em um campo */
function mostrarErro(campo, spanErro, mensagem) {
  campo.classList.add('invalido');
  spanErro.textContent = mensagem;
}

/* Função auxiliar: limpa o estado de erro de um campo */
function limparErro(campo, spanErro) {
  campo.classList.remove('invalido');
  spanErro.textContent = '';
}

/* Valida todos os campos e retorna true se tudo estiver ok */
function validarFormulario() {
  let valido = true;

  // Valida campo Nome
  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
    valido = false;
  } else {
    limparErro(campoNome, erroNome);
  }

  // Valida campo E-mail (vazio + formato com regex)
  if (campoEmail.value.trim() === '') {
    mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!regexEmail.test(campoEmail.value.trim())) {
    mostrarErro(campoEmail, erroEmail, 'Informe um e-mail válido (ex: voce@email.com).');
    valido = false;
  } else {
    limparErro(campoEmail, erroEmail);
  }

  // Valida campo Mensagem
  if (campoMsg.value.trim() === '') {
    mostrarErro(campoMsg, erroMensagem, 'Por favor, escreva sua mensagem.');
    valido = false;
  } else {
    limparErro(campoMsg, erroMensagem);
  }

  return valido;
}

/* Ouve o evento de envio do formulário */
formContato.addEventListener('submit', function (evento) {
  // Impede o comportamento padrão (recarregar a página)
  evento.preventDefault();

  // Oculta mensagem de sucesso caso esteja visível de envio anterior
  msgSucesso.style.display = 'none';

  // Executa a validação
  const formularioValido = validarFormulario();

  if (formularioValido) {
    // Simulação de envio: limpa os campos do formulário
    campoNome.value  = '';
    campoEmail.value = '';
    campoMsg.value   = '';

    // Exibe a mensagem de sucesso na tela
    msgSucesso.style.display = 'block';

    // Oculta a mensagem automaticamente após 6 segundos
    setTimeout(function () {
      msgSucesso.style.display = 'none';
    }, 6000);
  }
});

/* Remove o estado de erro em tempo real conforme o usuário digita */
campoNome.addEventListener('input',  function () { limparErro(campoNome,  erroNome);     });
campoEmail.addEventListener('input', function () { limparErro(campoEmail, erroEmail);    });
campoMsg.addEventListener('input',   function () { limparErro(campoMsg,   erroMensagem); });
