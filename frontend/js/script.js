
/*
 * PH Art Design
 * Arquivo responsável pelas interações da página inicial,
 * pelos modais de artes e pelas telas de cadastro e login.
 */

// ============================================== //
// REFERÊNCIAS DOS ELEMENTOS HTML
// ============================================== //

// Modal de detalhes da arte.
const modalArte = document.getElementById("modal-arte");
const fecharArte = document.getElementById("fechar-arte");
const voltarLoja = document.getElementById("voltar-loja");
const tituloArte = document.getElementById("titulo-arte");
const precoArte = document.getElementById("preco-arte");
const descricaoArte = document.getElementById("descricao-arte");
const imagemArte = document.getElementById("imagem-arte-detalhe");
const adicionarCarrinho = document.getElementById("adicionar-carrinho");

// Modal de cadastro.
const modalCadastro = document.getElementById("modal-cadastro");
const abrirCadastro = document.getElementById("abrir-cadastro");
const formCadastro = document.getElementById("form-cadastro");
const irParaCadastro = document.getElementById("ir-para-cadastro");

// Modal de login.
const modalLogin = document.getElementById("modal-login");
const abrirLogin = document.getElementById("abrir-login");
const formLogin = document.getElementById("form-login");
const irParaLogin = document.getElementById("ir-para-login");

// ============================================== //
// DADOS DAS ARTES
// ============================================== //

let arteSelecionadaId = null;

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

// ============================================== //
// FUNÇÕES GERAIS DOS MODAIS
// ============================================== //

/*
 * Abre um modal e atualiza seu estado de acessibilidade.
 */
function abrirModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");
}

/*
 * Fecha um modal e atualiza seu estado de acessibilidade.
 */
function fecharModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
}

/*
 * Fecha o modal de detalhes da arte.
 */
function fecharDetalhes() {
    fecharModal(modalArte);
}

// ============================================== //
// DETALHES DAS ARTES
// ============================================== //

/*
 * Preenche e abre o modal com os dados da arte escolhida.
 */
function abrirDetalhes(id) {
    const arte = artes[id];

    // Interrompe a função caso o ID não exista no catálogo.
    if (!arte) {
        return;
    }

    arteSelecionadaId = Number(id);

    tituloArte.textContent = arte.nome;
    precoArte.textContent = `R$ ${arte.preco}`;
    descricaoArte.textContent = arte.descricao;

    // O HTML atual utiliza um span como espaço reservado para a imagem.
    imagemArte.textContent = arte.nome;

    abrirModal(modalArte);

    fecharArte.focus();
}

// ============================================== //
// CLIQUES NOS CARDS DE PRODUTOS
// ============================================== //

/*
 * Intercepta os links das artes para abrir o modal de detalhes.
 */
document.querySelectorAll(".card-arte").forEach(function (card) {
    card.addEventListener("click", function (evento) {
        evento.preventDefault();

        const endereco = new URL(card.href);
        const id = endereco.searchParams.get("id");

        abrirDetalhes(id);
    });
});

// ============================================== //
// FECHAR MODAL DE DETALHES
// ============================================== //

fecharArte.addEventListener("click", fecharDetalhes);

voltarLoja.addEventListener("click", function (evento) {
    evento.preventDefault();
    fecharDetalhes();
});

/*
 * Fecha o modal quando o usuário clica fora do conteúdo.
 */
modalArte.addEventListener("click", function (evento) {
    if (evento.target === modalArte) {
        fecharDetalhes();
    }
});

// ============================================== //
// ADICIONAR ARTE AO CARRINHO
// ============================================== //

adicionarCarrinho.addEventListener("click", function () {
    const arte = artes[arteSelecionadaId];

    // Verifica se existe uma arte selecionada.
    if (!arte) {
        return;
    }

    // Recupera o carrinho salvo no navegador.
    const carrinho = JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

    // Verifica se a arte já está no carrinho.
    const arteJaAdicionada = carrinho.some(function (produto) {
        return produto.id === Number(arteSelecionadaId);
    });

    // Impede que a mesma arte seja adicionada novamente.
    if (arteJaAdicionada) {
        alert("Esta arte já está no seu carrinho!");
        return;
    }

    // Converte o preço de texto para número.
    const preco = Number(arte.preco.replace(",", "."));

    // Monta o objeto que representa o produto no carrinho.
    const produto = {
        id: Number(arteSelecionadaId),
        nome: arte.nome,
        preco: preco,
        imagem: ""
    };

    // Adiciona o produto ao carrinho.
    carrinho.push(produto);

    // Salva a lista atualizada no navegador.
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Arte adicionada ao carrinho!");

    fecharDetalhes();
});

// ============================================== //
// CADASTRO E LOGIN
// ============================================== //

/*
 * Abre o modal de cadastro.
 */
abrirCadastro.addEventListener("click", function (evento) {
    evento.preventDefault();

    fecharModal(modalLogin);
    abrirModal(modalCadastro);
});

/*
 * Abre o modal de login.
 */
abrirLogin.addEventListener("click", function (evento) {
    evento.preventDefault();

    fecharModal(modalCadastro);
    abrirModal(modalLogin);
});

/*
 * Alterna do cadastro para o login.
 */
irParaLogin.addEventListener("click", function (evento) {
    evento.preventDefault();

    fecharModal(modalCadastro);
    abrirModal(modalLogin);
});

/*
 * Alterna do login para o cadastro.
 */
irParaCadastro.addEventListener("click", function (evento) {
    evento.preventDefault();

    fecharModal(modalLogin);
    abrirModal(modalCadastro);
});

// ============================================== //
// ENVIO DOS FORMULÁRIOS
// ============================================== //

/*
 * Cadastro provisório: ainda não envia dados a um servidor.
 */
formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    alert("O cadastro será implementado nas próximas etapas.");
});

/*
 * Login provisório: ainda não verifica credenciais.
 */
formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    alert("O login será implementado nas próximas etapas.");
});
