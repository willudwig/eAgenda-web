export class CompromissoRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.compromissos = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        throw new Error("Method not implemented.");
    }
    selecionarPorId(id) {
        throw new Error("Method not implemented.");
    }
    gravar() {
        const dadosJson = JSON.stringify(this.compromissos);
        this.localStorage.setItem("compromissos", dadosJson);
    }
    inserir(dados) {
        this.compromissos.push(dados);
        this.gravar();
    }
    excluir() {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("compromissos");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
