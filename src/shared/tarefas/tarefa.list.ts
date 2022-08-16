import { Tarefa } from "./tarefa.model.js";
import { IPageList } from "../interfaces/pagina.list.inteface.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioTarefas: IRepositorio<Tarefa>) {

      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const tarefas = this.repositrorioTarefas.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      tarefas.forEach(tarefa => {

         const novaLinha = corpoTabela.insertRow();

         Object.values(tarefa).forEach(

            (valor: any) => {

               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );

         this.criarBotaoEditar(novaLinha);

      });
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      this.obterIdTarefa(btnEditar, novaLinha);

      celulaBotoes.appendChild(btnEditar);
   }

   private obterIdTarefa(btnEditar: HTMLAnchorElement, novaLinha: HTMLTableRowElement) {
      btnEditar.addEventListener("click", () => {
         const idSelecionado = novaLinha.cells[0].innerText;
         window.location.href = `tarefa.create.htlml?id=${idSelecionado}`;
      });
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new TarefaPageList(new TarefaRepositoryLocalStorage());