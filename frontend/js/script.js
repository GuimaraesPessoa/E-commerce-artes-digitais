const modalArte = document.getElementById("modal-arte");
const fecharArte = document.getElementById("fechar-arte");
const voltarLoja = document.getElementById("voltar-loja");

const tituloArte = document.getElementById("titulo-arte");
const precoArte = document.getElementById("preco-arte");
const descricaoArte = document.getElementById("descricao-arte");
const imagemArte = document.getElementById("imagem-arte-detalhe");


// Dados temporários das artes da loja
const artes = {
    1: {
        nome: "Logo Mecânica",
        preco: "R$ 29,90",
        descricao: "Uma identidade visual para oficinas mecânicas e negócios automotivos."
    },
    2: {
        nome: "Estampa Urbana",
        preco: "R$ 24,90",
        descricao: "Uma estampa de estilo urbano para roupas e projetos criativos."
    },
    3: {
        nome: "Logo Esportiva",
        preco: "R$ 34,90",
        descricao: "Uma identidade visual com estilo esportivo para equipes e marcas."
    },
    4: {
        nome: "Ilustração Criativa",
        preco: "R$ 19,90",
        descricao: "Uma ilustração digital para projetos pessoais e comerciais."
    },
    5: {
        nome: "Pack de Banners",
        preco: "R$ 39,90",
        descricao: "Um pacote de banners digitais para divulgar sua marca."
    },
    6: {
        nome: "Logo Minimalista",
        preco: "R$ 29,90",
        descricao: "Uma identidade visual com estilo simples e moderno."
    },
    7: {
        nome: "Estampa Tropical",
        preco: "R$ 22,90",
        descricao: "Uma estampa inspirada em elementos e cores tropicais."
    },
    8: {
        nome: "Banner Digital",
        preco: "R$ 17,90",
        descricao: "Um banner digital para divulgação de produtos ou serviços."
    },
    9: {
        nome: "Logo Vintage",
        preco: "R$ 27,90",
        descricao: "Uma identidade visual com inspiração em estilos clássicos."
    },
    10: {
        nome: "Pack Criativo",
        preco: "R$ 44,90",
        descricao: "Um pacote de artes digitais para diferentes necessidades criativas."
    }
};

function abrirDetalhes(id) {
    const arte = artes[id];

    if (!arte) {
        return;
    }

    tituloArte.textContent = arte.nome;
    precoArte.textContent = arte.preco;
    descricaoArte.textContent = arte.descricao;
    imagemArte.textContent = `Arte ${String(id).padStart(2, "0")}`;

    modalArte.classList.add("aberta");
    modalArte.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    fecharArte.focus();
}

function fecharDetalhes() {
    modalArte.classList.remove("aberta");
    modalArte.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


// Intercepta os links dos dez produtos
document.querySelectorAll(".card-arte").forEach((card) => {
    card.addEventListener("click", (evento) => {
        evento.preventDefault();

        const endereco = new URL(card.href);
        const id = endereco.searchParams.get("id");

        abrirDetalhes(id);
    });
});

fecharArte.addEventListener("click", fecharDetalhes);
voltarLoja.addEventListener("click", (evento) => {
    evento.preventDefault();
    fecharDetalhes();
});

modalArte.addEventListener("click", (evento) => {
    if (evento.target === modalArte) {
        fecharDetalhes();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalArte.classList.contains("aberta")) {
        fecharDetalhes();
    }
});

// Ainda é apenas uma demonstração visual: o carrinho não está implementado.
document.getElementById("adicionar-carrinho").addEventListener("click", () => {
    alert("A funcionalidade do carrinho será implementada em uma próxima etapa.");
});