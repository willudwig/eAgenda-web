export class TarefaRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    gravar() {
        const dadosJson = JSON.stringify(this.tarefas);
        this.localStorage.setItem("tarefas", dadosJson);
    }
    inserir(dados) {
        this.tarefas.push(dados);
        this.gravar();
    }
    excluir() {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("tarefas");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
