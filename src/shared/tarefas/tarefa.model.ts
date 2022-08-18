import { EntidadeBase } from "../entidade.model.js";
import {Prioridade} from "./prioridade.enum.js";

export class Tarefa extends EntidadeBase  
{
   public titulo: string;
   public dataCriacao: Date;
   public dataConclusao?: Date;
   public prioridade: Prioridade;
   public porcentagem: string;

   /**
    *
    */
   constructor(titulo: string, prioridade: Prioridade, porcentagem: string, id?: string) {
      super();

      if(id) {
         this.id = id;
      }

      this.titulo = titulo;
      this.dataCriacao = new Date();
      this.dataConclusao = new Date();
      this.prioridade = prioridade;
      this.porcentagem = porcentagem;
   }

}