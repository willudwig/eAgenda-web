import { EntidadeBase } from "../../entidade.model.js";
export class Item extends EntidadeBase {
    /**
     *
     */
    constructor(descrcicao, tarefa) {
        super();
        this.descricao = descrcicao;
        this.tarefa = tarefa;
        this.status = "Aberto";
    }
}
