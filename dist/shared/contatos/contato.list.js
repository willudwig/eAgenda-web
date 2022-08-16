import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";
class ContatoPageList {
    constructor(repositrorioContatos) {
        this.repositrorioContatos = repositrorioContatos;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const contatos = this.repositrorioContatos.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        contatos.forEach(contato => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(contato).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
            this.criarBotaoEditar(novaLinha, contato);
            this.criarBotaoExcluir(novaLinha, contato);
        });
    }
    criarBotaoEditar(novaLinha, contato) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        btnEditar.addEventListener("click", () => {
            window.location.href = `contato.create.html?id=${contato.id}`;
        });
        celulaBotoes.appendChild(btnEditar);
    }
    criarBotaoExcluir(novaLinha, contato) {
        const celulaBotoes = novaLinha.insertCell();
        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-info";
        btnExcluir.addEventListener("click", () => {
            this.repositrorioContatos.excluir(contato.id);
            window.location.reload();
        });
        celulaBotoes.appendChild(btnExcluir);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new ContatoPageList(new ContatoRepositoryLocalStorage());
