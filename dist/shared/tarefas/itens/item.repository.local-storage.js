export class ItemRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.items = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        throw new Error("Method not implemented.");
    }
    selecionarPorId(id) {
        throw new Error("Method not implemented.");
    }
    gravar() {
        const dadosJson = JSON.stringify(this.items);
        this.localStorage.setItem("items", dadosJson);
    }
    inserir(dados) {
        this.items.push(dados);
        this.gravar();
    }
    excluir(id) {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("items");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
