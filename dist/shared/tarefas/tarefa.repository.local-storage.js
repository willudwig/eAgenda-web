export class TarefaRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        const indexSelecionado = this.tarefas.findIndex(x => x.id === id);
        this.tarefas[indexSelecionado] = {
            id: id,
            titulo: registroEditado.titulo,
            dataCriacao: registroEditado.dataCriacao,
            dataConclusao: registroEditado.dataConclusao,
            prioridade: registroEditado.prioridade
        };
        this.gravar();
    }
    gravar() {
        const dadosJson = JSON.stringify(this.tarefas);
        this.localStorage.setItem("tarefas", dadosJson);
    }
    inserir(dados) {
        this.tarefas.push(dados);
        this.gravar();
    }
    excluir(id) {
        this.tarefas = this.tarefas.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("tarefas");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
    selecionarPorId(id) {
        return this.tarefas.find(x => x.id === id);
    }
}
