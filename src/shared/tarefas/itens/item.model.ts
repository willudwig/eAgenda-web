import { EntidadeBase } from "../../entidade.model.js";

export class Item extends EntidadeBase  
{
   public descricao: string;
   public tarefa: string;
   public status?: "Aberto" | "Concluído";

   /**
    *
    */
   constructor(descrcicao: string, tarefa: string) {
      super();
      this.descricao = descrcicao;
      this.tarefa = tarefa;
      this.status = "Aberto";
   }

}