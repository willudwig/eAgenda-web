import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
class ItemPageList {
    constructor(repositrorioItens) {
        this.repositrorioItens = repositrorioItens;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const itens = this.repositrorioItens.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        itens.forEach(item => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(item).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
            this.criarBotaoEditar(novaLinha, item);
            this.criarBotaoExcluir(novaLinha, item);
        });
    }
    criarBotaoEditar(novaLinha, item) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        btnEditar.addEventListener("click", () => {
            window.location.href = `item.create.html?id=${item.id}`;
        });
        celulaBotoes.appendChild(btnEditar);
    }
    criarBotaoExcluir(novaLinha, item) {
        const celulaBotoes = novaLinha.insertCell();
        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-info";
        btnExcluir.addEventListener("click", () => {
            this.repositrorioItens.excluir(item.id);
            window.location.reload();
        });
        celulaBotoes.appendChild(btnExcluir);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new ItemPageList(new ItemRepositoryLocalStorage());
