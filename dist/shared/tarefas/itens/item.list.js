import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
class ItemPageList {
    constructor(repositrorioItens) {
        this.repositrorioItens = repositrorioItens;
        this.configurarElementos();
        this.atualizarTabela();
        this.clicado = 0;
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
            this.criarCheckBox(novaLinha, item);
            this.criarBotaoEditar(novaLinha, item);
            this.criarBotaoExcluir(novaLinha, item);
        });
    }
    criarCheckBox(novaLinha, item) {
        const celulaBotoes = novaLinha.insertCell();
        const check = document.createElement("input");
        check.type = "checkbox";
        check.name = "check";
        check.className = "checkbox";
        check.addEventListener("click", () => {
            this.alternarStatusCheckBox(novaLinha, check, item);
        });
        celulaBotoes.appendChild(check);
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
    alternarStatusCheckBox(novaLinha, check, item) {
        switch (this.clicado) {
            case 0:
                check.checked = true;
                item.status = "Concluído";
                this.clicado = 1;
                break;
            case 1:
                check.checked = false;
                item.status = "Aberto";
                this.clicado = 0;
                break;
        }
        if (item.status !== undefined)
            novaLinha.cells[3].innerText = item.status;
        this.repositrorioItens.editar(item.id, item);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new ItemPageList(new ItemRepositoryLocalStorage());
