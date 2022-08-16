import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPageList {
    constructor(repositrorioTarefas) {
        this.repositrorioTarefas = repositrorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const tarefas = this.repositrorioTarefas.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach(tarefa => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(tarefa).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
            this.criarBotaoEditar(novaLinha, tarefa);
            this.criarBotaoExcluir(novaLinha, tarefa);
        });
    }
    criarBotaoEditar(novaLinha, tarefa) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        btnEditar.addEventListener("click", () => {
            window.location.href = `tarefa.create.html?id=${tarefa.id}`;
        });
        celulaBotoes.appendChild(btnEditar);
    }
    criarBotaoExcluir(novaLinha, tarefa) {
        const celulaBotoes = novaLinha.insertCell();
        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-info";
        btnExcluir.addEventListener("click", () => {
            this.repositrorioTarefas.excluir(tarefa.id);
            window.location.reload();
        });
        celulaBotoes.appendChild(btnExcluir);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new TarefaPageList(new TarefaRepositoryLocalStorage());
