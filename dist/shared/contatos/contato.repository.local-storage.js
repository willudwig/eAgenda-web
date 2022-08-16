export class ContatoRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        const indexSelecionado = this.contatos.findIndex(x => x.id === id);
        this.contatos[indexSelecionado] = {
            id: id,
            nome: registroEditado.nome,
            email: registroEditado.email,
            telefone: registroEditado.telefone,
            empresa: registroEditado.empresa,
            cargo: registroEditado.cargo
        };
    }
    selecionarPorId(id) {
        return this.contatos.find(x => x.id === id);
    }
    gravar() {
        const dadosJson = JSON.stringify(this.contatos);
        this.localStorage.setItem("contatos", dadosJson);
    }
    inserir(dados) {
        this.contatos.push(dados);
        this.gravar();
    }
    excluir(id) {
        this.contatos = this.contatos.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("contatos");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
