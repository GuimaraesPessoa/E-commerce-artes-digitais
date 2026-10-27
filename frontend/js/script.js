
/* =========================================
   ELEMENTOS DO MODAL DE DETALHES DA ARTE
   ========================================= */

   const modalArte = document.getElementById("modal-arte");
   const fecharArte = document.getElementById("fechar-arte");
   const voltarLoja = document.getElementById("voltar-loja");
   
   const tituloArte = document.getElementById("titulo-arte");
   const precoArte = document.getElementById("preco-arte");
   const descricaoArte = document.getElementById("descricao-arte");
   const imagemArte = document.getElementById("imagem-arte-detalhe");
   const adicionarCarrinho = document.getElementById("adicionar-carrinho");
   
   
   /* =========================================
      ELEMENTOS DOS MODAIS DE CONTA
      ========================================= */
   
   // Cadastro
   const modalCadastro = document.getElementById("modal-cadastro");
   const abrirCadastro = document.getElementById("abrir-cadastro");
   const irParaCadastro = document.getElementById("ir-para-cadastro");
   
   // Login
   const modalLogin = document.getElementById("modal-login");
   const abrirLogin = document.getElementById("abrir-login");
   const irParaLogin = document.getElementById("ir-para-login");
   
   
   /* =========================================
      DADOS DAS ARTES
      ========================================= */
   
   const artes = {
       1: {
           nome: "Logo Mecânica",
           preco: "29,90",
           descricao: "Uma identidade visual para oficinas e serviços automotivos."
       },
   
       2: {
           nome: "Estampa Urbana",
           preco: "24,90",
           descricao: "Uma estampa com estilo urbano para projetos criativos."
       },
   
       3: {
           nome: "Logo Esportiva",
           preco: "34,90",
           descricao: "Uma identidade visual para equipes, times e projetos esportivos."
       },
   
       4: {
           nome: "Ilustração Criativa",
           preco: "19,90",
           descricao: "Uma ilustração digital para dar personalidade ao seu projeto."
       },
   
       5: {
           nome: "Pack de Banners",
           preco: "39,90",
           descricao: "Um pacote de banners digitais para divulgação."
       },
   
       6: {
           nome: "Logo Minimalista",
           preco: "29,90",
           descricao: "Uma identidade visual minimalista e versátil."
       },
   
       7: {
           nome: "Estampa Tropical",
           preco: "22,90",
           descricao: "Uma estampa inspirada em elementos tropicais."
       },
   
       8: {
           nome: "Banner Digital",
           preco: "17,90",
           descricao: "Um banner digital para divulgação de produtos e serviços."
       },
   
       9: {
           nome: "Logo Vintage",
           preco: "27,90",
           descricao: "Uma identidade visual com estilo clássico e retrô."
       },
   
       10: {
           nome: "Pack Criativo",
           preco: "44,90",
           descricao: "Um pacote de artes digitais para diferentes necessidades."
       }
   };
   
   
   /* =========================================
      FUNÇÕES DOS MODAIS
      ========================================= */
   
   // Abre um modal e bloqueia a rolagem da página
   function abrirModal(modal) {
       modal.classList.add("aberta");
       modal.setAttribute("aria-hidden", "false");
   
       document.body.style.overflow = "hidden";
   }
   
   // Fecha um modal
   function fecharModal(modal) {
       modal.classList.remove("aberta");
       modal.setAttribute("aria-hidden", "true");
   
       // Só libera a rolagem se nenhum outro modal estiver aberto
       const outroModalAberto = document.querySelector(
           ".sobreposicao.aberta"
       );
   
       if (!outroModalAberto) {
           document.body.style.overflow = "";
       }
   }
   
   // Alterna entre dois modais
   function alternarModal(modalAtual, proximoModal) {
       fecharModal(modalAtual);
       abrirModal(proximoModal);
   }
   
   
   /* =========================================
      DETALHES DA ARTE
      ========================================= */
   
   // Preenche e abre os detalhes de uma arte
   function abrirDetalhes(id) {
       const arte = artes[id];
   
       // Verifica se a arte existe
       if (!arte) {
           return;
       }
   
       tituloArte.textContent = arte.nome;
       precoArte.textContent = `R$ ${arte.preco}`;
       descricaoArte.textContent = arte.descricao;
       imagemArte.textContent = arte.nome;
   
       abrirModal(modalArte);
   
       fecharArte.focus();
   }
   
   // Fecha os detalhes da arte
   function fecharDetalhes() {
       fecharModal(modalArte);
   }
   
   
   /* =========================================
      EVENTOS DOS CARDS DE ARTES
      ========================================= */
   
   // Abre os detalhes quando um card é clicado
   document.querySelectorAll(".card-arte").forEach(function (card) {
       card.addEventListener("click", function (evento) {
           evento.preventDefault();
   
           const endereco = new URL(card.href);
           const id = endereco.searchParams.get("id");
   
           abrirDetalhes(id);
       });
   });
   
   // Fecha pelos botões do modal de arte
   fecharArte.addEventListener("click", fecharDetalhes);
   voltarLoja.addEventListener("click", function (evento) {
       evento.preventDefault();
       fecharDetalhes();
   });
   
   // Fecha clicando no fundo escuro
   modalArte.addEventListener("click", function (evento) {
       if (evento.target === modalArte) {
           fecharDetalhes();
       }
   });
   
   
   /* =========================================
      ABRIR CADASTRO E LOGIN
      ========================================= */
   
   // Abre o cadastro pelo cabeçalho
   abrirCadastro.addEventListener("click", function (evento) {
       evento.preventDefault();
       abrirModal(modalCadastro);
   });
   
   // Abre o login pelo cabeçalho
   abrirLogin.addEventListener("click", function (evento) {
       evento.preventDefault();
       abrirModal(modalLogin);
   });
   
   
   /* =========================================
      ALTERNAR ENTRE CADASTRO E LOGIN
      ========================================= */
   
   // Do cadastro para o login
   irParaLogin.addEventListener("click", function (evento) {
       evento.preventDefault();
   
       alternarModal(modalCadastro, modalLogin);
   });
   
   // Do login para o cadastro
   irParaCadastro.addEventListener("click", function (evento) {
       evento.preventDefault();
   
       alternarModal(modalLogin, modalCadastro);
   });
   
   
   /* =========================================
      FECHAR CADASTRO E LOGIN
      ========================================= */
   
   // Fecha ao clicar no fundo escuro
   [modalCadastro, modalLogin].forEach(function (modal) {
       modal.addEventListener("click", function (evento) {
           if (evento.target === modal) {
               fecharModal(modal);
           }
       });
   });
   
   // Fecha qualquer modal aberto ao pressionar Esc
   document.addEventListener("keydown", function (evento) {
       if (evento.key === "Escape") {
           document.querySelectorAll(".sobreposicao.aberta").forEach(
               function (modal) {
                   fecharModal(modal);
               }
           );
       }
   });
   
   
   /* =========================================
      BOTÃO ADICIONAR AO CARRINHO
      ========================================= */
   
   // O carrinho será implementado na próxima etapa
   adicionarCarrinho.addEventListener("click", function () {
       alert(
           "A funcionalidade do carrinho será implementada em uma próxima etapa."
       );
   });
   
   
   /* =========================================
      FORMULÁRIOS DE CADASTRO E LOGIN
      ========================================= */
   
   // Por enquanto, impedimos o envio e o recarregamento da página.
   // A autenticação real será implementada posteriormente.
   
   const formularioCadastro = document.getElementById("form-cadastro");
   const formularioLogin = document.getElementById("form-login");
   
   formularioCadastro.addEventListener("submit", function (evento) {
       evento.preventDefault();
   
       alert("O cadastro será implementado em uma próxima etapa.");
   });
   
   formularioLogin.addEventListener("submit", function (evento) {
       evento.preventDefault();
   
       alert("O login será implementado em uma próxima etapa.");
   });
   