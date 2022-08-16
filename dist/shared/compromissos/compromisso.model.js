import { EntidadeBase } from "../entidade.model.js";
export class Compromisso extends EntidadeBase {
    /**
     *
     */
    constructor(assunto, local, contato, data, hora) {
        super();
        this.assunto = assunto;
        this.local = local;
        this.contato = contato;
        this.data = data;
        this.hora = hora;
    }
}
