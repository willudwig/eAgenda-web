import { Tarefa } from "./tarefa.model.js";
import { Prioridade } from "./prioridade.enum";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

export class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtDescricao: HTMLInputElement;
   private rdbPrioridade: HTMLInputElement;
   private btnSalvar: HTMLButtonElement;

   constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
      this.configurarElementos();
   }

   configurarElementos(): void {
      this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      this.rdbPrioridade = document.querySelector( 'input[type="radio"]:checked' ) as HTMLInputElement;
      const prioridade = this.rdbPrioridade.value as Prioridade;

      const novaTarefa = new Tarefa(this.txtDescricao.value, 
                                    prioridade);
                                    
      this.repositorioTarefas.inserir(novaTarefa);
      window.location.href = "tarefa.list.html";
   }
   
}

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage());