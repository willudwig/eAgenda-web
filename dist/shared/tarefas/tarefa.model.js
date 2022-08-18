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
        this.titulo = titulo;
        this.dataCriacao = new Date();
        this.dataConclusao = new Date();
        this.prioridade = prioridade;
        this.porcentagem = porcentagem;
    }
}
