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
            this.criarBotaoEditar(novaLinha);
        });
    }
    criarBotaoEditar(novaLinha) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        this.obterIdTarefa(btnEditar, novaLinha);
        celulaBotoes.appendChild(btnEditar);
    }
    obterIdTarefa(btnEditar, novaLinha) {
        btnEditar.addEventListener("click", () => {
            const idSelecionado = novaLinha.cells[0].innerText;
            window.location.href = `tarefa.create.htlml?id=${idSelecionado}`;
        });
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new TarefaPageList(new TarefaRepositoryLocalStorage());
