
/*
 * PH Art Design
 * Lógica responsável pelo funcionamento do carrinho.
 */

// Recupera os produtos armazenados no navegador.
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ============================================== //

/*
 * Salva o estado atual do carrinho no navegador.
 */
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ============================================== //

/*
 * Exibe os produtos armazenados no carrinho.
 */
function renderizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");

    // Limpa a lista antes de exibir os produtos novamente.
    listaCarrinho.innerHTML = "";

    // Verifica se o carrinho está vazio.
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <div class="carrinho-vazio">
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione suas artes favoritas para continuar.</p>
                <a href="../index.html" class="botao-continuar-comprando">
                    Explorar artes
                </a>
            </div>
        `;

        return;
    }

    // Percorre cada produto armazenado no carrinho.
    carrinho.forEach((produto) => {
        const item = document.createElement("article");
        item.classList.add("item-carrinho");

        item.innerHTML = `
            <input
                type="checkbox"
                class="selecionar-produto"
                aria-label="Selecionar ${produto.nome}"
                checked
            >

            
            <div class="imagem-produto-carrinho">
                ${
                    produto.imagem
                        ? `<img src="${produto.imagem}" alt="${produto.nome}">`
                        : `<span>Arte digital</span>`
                }
            </div>


            <h2 class="nome-produto-carrinho">
                ${produto.nome}
            </h2>

            <p class="preco-produto-carrinho">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>

            <button type="button" class="remover-produto">
                Remover
            </button>
        `;

        listaCarrinho.appendChild(item);
    });
}

// ============================================== //

/*
 * Limpa o resumo e calcula os valores dos produtos selecionados.
 */
function atualizarResumoCarrinho() {
    const itensResumo = document.getElementById("itens-resumo-carrinho");
    const subtotalElemento = document.getElementById("subtotal-carrinho");
    const totalElemento = document.getElementById("total-carrinho");

    // Limpa o resumo anterior.
    itensResumo.innerHTML = "";

    let subtotal = 0;

    // Percorre os produtos atualmente exibidos.
    const itensCarrinho = document.querySelectorAll(".item-carrinho");

    itensCarrinho.forEach((item, indice) => {
        const checkbox = item.querySelector(".selecionar-produto");
        const produto = carrinho[indice];

        // Ignora produtos que não estejam selecionados.
        if (!checkbox.checked) {
            return;
        }

        subtotal += produto.preco;

        // Cria uma linha para o produto no resumo.
        const linha = document.createElement("div");
        linha.classList.add("item-resumo");

        linha.innerHTML = `
            <span class="nome-item-resumo">${produto.nome}</span>

            <span class="preco-item-resumo">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </span>
        `;

        itensResumo.appendChild(linha);
    });

    // Formata os valores em reais.
    const valorFormatado = subtotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    subtotalElemento.textContent = valorFormatado;
    totalElemento.textContent = valorFormatado;
}

// ============================================== //

/*
 * Detecta alterações nas caixas de seleção dos produtos.
 */
function configurarSelecaoProdutos() {
    const listaCarrinho = document.getElementById("lista-carrinho");

    listaCarrinho.addEventListener("change", (evento) => {
        if (evento.target.classList.contains("selecionar-produto")) {
            atualizarResumoCarrinho();
        }
    });
}

// ============================================== //

/*
 * Configura a remoção de produtos do carrinho.
 */
function configurarRemocaoProdutos() {
    const listaCarrinho = document.getElementById("lista-carrinho");

    listaCarrinho.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("remover-produto")) {
            const item = evento.target.closest(".item-carrinho");

            const itensCarrinho = Array.from(
                listaCarrinho.querySelectorAll(".item-carrinho")
            );

            const indice = itensCarrinho.indexOf(item);

            // Verifica se o produto foi encontrado.
            if (indice === -1) {
                return;
            }

            // Remove o produto do array.
            carrinho.splice(indice, 1);

            // Salva e atualiza a página.
            salvarCarrinho();
            renderizarCarrinho();
            atualizarResumoCarrinho();
        }
    });
}

// ============================================== //

/*
 * Inicializa o funcionamento do carrinho.
 */
renderizarCarrinho();
atualizarResumoCarrinho();
configurarSelecaoProdutos();
configurarRemocaoProdutos();
