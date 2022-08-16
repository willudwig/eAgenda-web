import { EntidadeBase } from "../entidade.model.js";
import {Prioridade} from "./prioridade.enum.js";

export class Tarefa extends EntidadeBase  
{
   public titulo: string;
   public dataCriacao: Date;
   public dataConclusao?: Date;
   public prioridade: Prioridade;

   /**
    *
    */
   constructor(titulo: string, prioridade: Prioridade) {
      super();
      this.titulo = titulo;
      this.dataCriacao = new Date();
      this.dataConclusao = new Date();
      this.prioridade = prioridade;
   }

}