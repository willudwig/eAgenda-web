export class ContatoRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();
    }
    gravar() {
        const dadosJson = JSON.stringify(this.contatos);
        this.localStorage.setItem("contatos", dadosJson);
    }
    inserir(dados) {
        this.contatos.push(dados);
        this.gravar();
    }
    excluir() {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("contatos");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
