export class CompromissoRepositoryLocalStorage {
    /**
     *
     */
    constructor() {
        this.localStorage = window.localStorage;
        this.compromissos = this.selecionarTodos();
    }
    editar(id, registroEditado) {
        const indexSelecionado = this.compromissos.findIndex(x => x.id === id);
        this.compromissos[indexSelecionado] = {
            id: id,
            assunto: registroEditado.assunto,
            local: registroEditado.local,
            contato: registroEditado.contato,
            data: registroEditado.data,
            hora: registroEditado.hora
        };
        this.gravar();
    }
    selecionarPorId(id) {
        return this.compromissos.find(x => x.id === id);
    }
    gravar() {
        const dadosJson = JSON.stringify(this.compromissos);
        this.localStorage.setItem("compromissos", dadosJson);
    }
    inserir(dados) {
        this.compromissos.push(dados);
        this.gravar();
    }
    excluir(id) {
        this.compromissos = this.compromissos.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarTodos() {
        const dadosJson = this.localStorage.getItem("compromissos");
        if (!dadosJson)
            return [];
        return JSON.parse(dadosJson);
    }
}
