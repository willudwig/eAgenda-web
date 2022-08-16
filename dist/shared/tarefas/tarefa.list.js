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
        });
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new TarefaPageList(new TarefaRepositoryLocalStorage());
