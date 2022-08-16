import { Tarefa } from "./tarefa.model.js";
import { Prioridade } from "./prioridade.enum.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

export class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtTitulo: HTMLInputElement;
   private rdbPrioridade: HTMLInputElement;
   private btnSalvar: HTMLButtonElement;
   private idSelecionado: string;

   constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?:string) {
      this.configurarElementos();

      if(id) {
         this.idSelecionado = id;
         const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);

         if (tarefaSelecionada) {
            this.preencherFormulario(tarefaSelecionada);
         }
      } 

   }

   private preencherFormulario(tarefaSelecionada: Tarefa){
      this.txtTitulo.value = tarefaSelecionada.titulo;

      switch(tarefaSelecionada.prioridade) {
         case Prioridade.Baixa:
            this.rdbPrioridade = document.querySelector("input[value='Baixa']") as HTMLInputElement;
            break;

         case Prioridade.Média:
            this.rdbPrioridade = document.querySelector("input[value='Média']") as HTMLInputElement;
            break;

         case Prioridade.Alta:
            this.rdbPrioridade = document.querySelector("input[value='Alta']") as HTMLInputElement;
            break;
      }

      this.rdbPrioridade.checked = true;
   }

   private obterDadosFormulario(): Tarefa {
      const titulo = this.txtTitulo.value;
      const prioridade = this.obterPrioridadeSelecionada();

      let tarefa = null;

      if (!this.idSelecionado)
         tarefa = new Tarefa(titulo, prioridade);
      else
      tarefa = new Tarefa(titulo, prioridade, this.idSelecionado);

      return tarefa;
   }

   private obterPrioridadeSelecionada(): Prioridade {
      const rdbPrioridade = document.querySelector("input[type='radio']:checked") as HTMLInputElement;
      return rdbPrioridade.value as Prioridade;
   }

   configurarElementos(): void {
      this.txtTitulo = document.getElementById("txtDescricao") as HTMLInputElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const tarefa = this.obterDadosFormulario();

      if(!this.idSelecionado)
         this.repositorioTarefas.inserir(tarefa);
      else
         this.repositorioTarefas.editar(tarefa.id, tarefa);

      window.location.href = "tarefa.list.html";
   }
   
}

const params = new URLSearchParams(window.location.search); 
const id = params.get("id") as string;

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);