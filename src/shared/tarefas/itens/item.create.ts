import { Item } from "./item.model.js";
import { IPaginaHTML } from "../../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../../interfaces/repositorio.interface.js";
import { IPaginaFormulario } from "../../interfaces/pagina.ceate.interface.js";
import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
import { TarefaRepositoryLocalStorage } from "../tarefa.repository.local-storage.js";
import { Tarefa } from "../tarefa.model.js";

export class ItemPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtDescricao: HTMLInputElement;
   private selectTarefa: HTMLSelectElement;
   private btnSalvar: HTMLButtonElement;

   constructor(private repositorioItens: IRepositorio<Item>) {
      this.configurarElementos();
   }

   configurarElementos(): void {
      this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
      this.selectTarefa = document.getElementById("selectTarefa") as HTMLSelectElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

      const tarefa = new TarefaRepositoryLocalStorage().selecionarTodos();
      
      tarefa.forEach((x) => {
         const option = document.createElement("option");
         option.innerText = x.titulo;
         this.selectTarefa.appendChild(option);
      });

      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const novoItem = new Item(this.txtDescricao.value, 
                                this.selectTarefa.value);
                                    
      this.repositorioItens.inserir(novoItem);
      window.location.href = "tarefa.list.html";
   }
}

new ItemPaginaCadastro(new ItemRepositoryLocalStorage());