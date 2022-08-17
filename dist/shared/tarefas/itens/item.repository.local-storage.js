export class ItemRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.itens = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        const indexSelecionado = this.itens.findIndex(x => x.id === id);
        this.itens[indexSelecionado] = {
            id: id,
            descricao: registroEditado.descricao,
            tarefa: registroEditado.tarefa,
            status: registroEditado.status,
        };
        this.gravar();
    }
    selecionarPorId(id) {
        return this.itens.find(x => x.id === id);
    }
    gravar() {
        const dadosJson = JSON.stringify(this.itens);
        this.localStorage.setItem("items", dadosJson);
    }
    inserir(dados) {
        this.itens.push(dados);
        this.gravar();
    }
    excluir(id) {
        this.itens = this.itens.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("items");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
