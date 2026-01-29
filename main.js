/* --- CARREGADOR DE COMPONENTES --- */
/* Este código busca o menu e o injeta na página */

// Ouve o evento "DOMContentLoaded" (quando o HTML básico da página termina de carregar)
document.addEventListener("DOMContentLoaded", function() {

    // 1. Encontra o "placeholder" (o local) onde queremos injetar o menu
    const navPlaceholder = document.getElementById("nav-placeholder");

    // 2. Se ele não encontrar o placeholder, não faz nada
    if (!navPlaceholder) {
        console.error("Erro: Placeholder do menu (nav-placeholder) não encontrado.");
        return;
    }

    // 3. Busca o conteúdo do arquivo _nav.html
    fetch("_nav.html")
        .then(response => {
            // Se o arquivo não for encontrado (404), lança um erro
            if (!response.ok) {
                throw new Error("Falha ao carregar _nav.html: " + response.statusText);
            }
            return response.text(); // Converte a resposta em texto (HTML)
        })
        .then(html => {
            // 4. Injeta o HTML do menu dentro do placeholder
            navPlaceholder.innerHTML = html;

            // 5. Ativa o link da página atual
            // Isso lê o nome do arquivo da URL e aplica a classe "active-sub"
            // no link correspondente do menu que acabamos de carregar.
            ativarLinkAtual();
        })
        .catch(error => {
            console.error("Erro ao carregar o menu:", error);
            navPlaceholder.innerHTML = "<p style='color:red;'>Erro ao carregar o menu.</p>";
        });
});

/**
 * Função auxiliar que aplica o estilo "ativo" ao link do submenu
 * correspondente à página que está sendo visualizada.
 */
function ativarLinkAtual() {
    // Pega o nome do arquivo da URL (ex: "planos.html")
    const nomePagina = window.location.pathname.split("/").pop();

    // Se estiver na página inicial, não faz nada
    if (nomePagina === "" || nomePagina === "index.html") {
        return;
    }

    // Procura por um link no menu que corresponda ao nome da página
    const linkAtivo = document.querySelector(`.dropdown a[href="${nomePagina}"]`);

    if (linkAtivo) {
        linkAtivo.classList.add("active-sub"); // Aplica o estilo de ativo
    }
}


/* --- Efeito de Luz Mística (Spotlight) --- */
/* Este é o seu código existente, mantido exatamente como estava. */

// "Ouve" pelo evento 'mousemove' na janela inteira
document.addEventListener("mousemove", function(e) {

    // 1. Captura as coordenadas X (e.clientX) e Y (e.clientY) do mouse
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // 2. Define essas coordenadas como variáveis CSS globais
    //    O <html> (document.documentElement) vai ter acesso
    //    a '--mouse-x' e '--mouse-y'
    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
});

/* --- LÓGICA DO LIGHTBOX (POP-UP DE IMAGEM) --- */

// Ouve quando a página inteira carregar
document.addEventListener("DOMContentLoaded", function() {

    // Encontra os elementos do lightbox no HTML
    const lightboxOverlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-imagem");

    // Se não encontrar os elementos, não faz nada
    if (!lightboxOverlay || !lightboxImage) {
        return;
    }

    // Encontra TODAS as imagens que devem abrir o pop-up
    const imagensParaAbrir = document.querySelectorAll(".js-lightbox-trigger");

    // Adiciona um "ouvinte" de clique em cada imagem
    imagensParaAbrir.forEach(function(imagem) {
        imagem.addEventListener("click", function() {
            const imgSrc = imagem.getAttribute("src"); // Pega o link da imagem clicada
            lightboxImage.setAttribute("src", imgSrc); // Coloca esse link na imagem do pop-up
            lightboxOverlay.style.display = "flex"; // Mostra o pop-up
        });
    });

    // Adiciona um "ouvinte" de clique no fundo preto para FECHAR
    lightboxOverlay.addEventListener("click", function() {
        lightboxOverlay.style.display = "none"; // Esconde o pop-up
    });
});

/* --- LÓGICA DOS MODAIS DE CONTEÚDO (Pedras da Alma) --- */

document.addEventListener("DOMContentLoaded", function() {
    // Abrir Modal
    const triggers = document.querySelectorAll(".js-open-modal");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal"); // Pega o ID do alvo (ex: modal-edrian)
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; // Impede rolagem da página de fundo
            }
        });
    });

    // Fechar Modal (Botão X ou Clicar fora)
    const closeButtons = document.querySelectorAll(".modal-close, .modal-overlay");

    closeButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            // Garante que só fecha se clicar no X ou no fundo escuro (não no conteúdo)
            if (this === e.target || this.classList.contains("modal-close")) {
                const overlay = this.closest(".modal-overlay") || this;
                overlay.style.display = "none";
                document.body.style.overflow = "auto"; // Libera rolagem
            }
        });
    });
});

/* --- SISTEMA DE FILTRO DO ACERVO --- */

function filtrarMagias() {
    // 1. Pega o texto da busca
    let input = document.getElementById('buscaMagia');
    let filter = input.value.toUpperCase();

    // 2. Pega todos os cards
    let container = document.querySelector('.magias-container');
    let cards = container.getElementsByClassName('magia-card');

    // 3. Loop em cada card para ver se o nome bate com a busca
    for (let i = 0; i < cards.length; i++) {
        let h4 = cards[i].getElementsByTagName("h4")[0];
        let txtValue = h4.textContent || h4.innerText;

        // Se o texto bater, mostra. Senão, esconde.
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function filtrarPorTipo(tipo) {
    let cards = document.querySelectorAll('.magia-card');
    let botoes = document.querySelectorAll('.btn-filtro');

    // 1. Gerenciar visual dos botões (quem está ativo)
    botoes.forEach(btn => {
        btn.classList.remove('ativo');
        // Se o texto do botão for igual ao tipo (Ignis/Ignis), ativa
        if(btn.innerText.toLowerCase() === tipo) {
            btn.classList.add('ativo');
        }
        // Se for 'todos', ativa o botão 'Todos'
        if(tipo === 'todos' && btn.innerText.toLowerCase() === 'todos') {
            btn.classList.add('ativo');
        }
    });

    // 2. Mostrar/Esconder Cards
    cards.forEach(card => {
        // Se o filtro for 'todos', mostra tudo
        if (tipo === 'todos') {
            card.style.display = 'block';
        } else {
            // Se o card tiver o data-tipo igual ao filtro, mostra
            if (card.getAttribute('data-tipo') === tipo) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}