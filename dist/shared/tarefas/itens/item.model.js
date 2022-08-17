import { EntidadeBase } from "../../entidade.model.js";
export class Item extends EntidadeBase {
    /**
     *
     */
    constructor(descrcicao, tarefa, id) {
        super();
        if (id) {
            this.id = id;
        }
        this.descricao = descrcicao;
        this.tarefa = tarefa;
        this.status = "Aberto";
    }
}
