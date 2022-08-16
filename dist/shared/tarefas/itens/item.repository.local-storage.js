export class ItemRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.items = this.selecionarTodos();
    }
    gravar() {
        const dadosJson = JSON.stringify(this.items);
        this.localStorage.setItem("items", dadosJson);
    }
    inserir(dados) {
        this.items.push(dados);
        this.gravar();
    }
    excluir() {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("items");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
