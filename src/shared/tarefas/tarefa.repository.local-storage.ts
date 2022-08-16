import { IRepositorioSerializavel } from "../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { Tarefa } from "./tarefa.model.js";

export class TarefaRepositoryLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private readonly tarefas: Tarefa[];

   /**
    *
    */
   constructor() {

      this.localStorage = window.localStorage; 
      this.tarefas = this.selecionarTodos();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.tarefas);
      this.localStorage.setItem("tarefas", dadosJson);
   }

   public inserir(dados: Tarefa): void {
      this.tarefas.push(dados);
      this.gravar();
   }

   public excluir(): void {
      throw new Error("Method not implemented.");
   }

   public selecionarTodos(): Tarefa[] {

      const dadosJson = this.localStorage.getItem("tarefas");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}