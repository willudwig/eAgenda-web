import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
class CompromissoPageList {
    constructor(repositrorioCompromisso) {
        this.repositrorioCompromisso = repositrorioCompromisso;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const compromissos = this.repositrorioCompromisso.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        compromissos.forEach(compromisso => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(compromisso).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
            this.criarBotaoEditar(novaLinha, compromisso);
            this.criarBotaoExcluir(novaLinha, compromisso);
        });
    }
    criarBotaoEditar(novaLinha, compromisso) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        btnEditar.addEventListener("click", () => {
            window.location.href = `compromisso.create.html?id=${compromisso.id}`;
        });
        celulaBotoes.appendChild(btnEditar);
    }
    criarBotaoExcluir(novaLinha, compromisso) {
        const celulaBotoes = novaLinha.insertCell();
        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-info";
        btnExcluir.addEventListener("click", () => {
            this.repositrorioCompromisso.excluir(compromisso.id);
            window.location.reload();
        });
        celulaBotoes.appendChild(btnExcluir);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new CompromissoPageList(new CompromissoRepositoryLocalStorage());
