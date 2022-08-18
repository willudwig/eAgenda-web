import { EntidadeBase } from "../entidade.model.js";
export class Tarefa extends EntidadeBase {
    /**
     *
     */
    constructor(titulo, prioridade, porcentagem, id) {
        super();
        if (id) {
            this.id = id;
        }
        const data = new Date();
        this.titulo = titulo;
        this.dataCriacao = data.getDate() + " / " + (data.getMonth() + 1) + " / " + data.getFullYear();
        this.dataConclusao = "-";
        this.prioridade = prioridade;
        this.porcentagem = porcentagem;
    }
}
