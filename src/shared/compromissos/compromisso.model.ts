import { EntidadeBase } from "../entidade.model.js";

export class Compromisso extends EntidadeBase  
{
   public assunto: string;
   public local: string;
   public contato: string;
   public data: string;
   public hora: string;

   /**
    *
    */
   constructor(assunto: string, local: string, contato: string, data: string, hora: string) {
      super();
      this.assunto = assunto;
      this.local = local;
      this.contato = contato;
      this.data = data;
      this.hora = hora;
   }

}