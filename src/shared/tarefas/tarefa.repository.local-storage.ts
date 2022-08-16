import { Guid } from "../guid.model.js";
import { IRepositorioSerializavel } from "../interfaces/repositorio-serializavel.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
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

   public editar(id: string, registroEditado: Tarefa): void {
      const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

      this.tarefas[indexSelecionado] = {
         id: id,
         titulo: registroEditado.titulo,
         dataCriacao: registroEditado.dataCriacao,
         dataConclusao: registroEditado.dataConclusao,
         prioridade: registroEditado.prioridade
      };

      this.gravar();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.tarefas);
      this.localStorage.setItem("tarefas", dadosJson);
   }

   public inserir(dados: Tarefa): void {
      dados.id = new Guid().gerarNovoID();
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

   public selecionarPorId(id: string): Tarefa | undefined{
      return this.tarefas.find(x => x.id === id);
   }

}