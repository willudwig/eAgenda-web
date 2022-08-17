import { Item } from "./item.model.js";
import { IPageList } from "../../interfaces/pagina.list.inteface.js";
import { IPaginaHTML } from "../../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../../interfaces/repositorio.interface.js";
import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";

class ItemPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioItens: IRepositorio<Item>) {
      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const itens = this.repositrorioItens.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      itens.forEach(item => {

         const novaLinha = corpoTabela.insertRow();

         Object.values(item).forEach((valor: any) => {
               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );

         this.criarBotaoEditar(novaLinha, item);
         this.criarBotaoExcluir(novaLinha, item);
      });
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement, item: Item) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      btnEditar.addEventListener("click", () => {
         window.location.href = `item.create.html?id=${item.id}`;
      });

      celulaBotoes.appendChild(btnEditar);
   }

   private criarBotaoExcluir(novaLinha: HTMLTableRowElement, item: Item) {
      const celulaBotoes = novaLinha.insertCell();
      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-info";

      btnExcluir.addEventListener("click", () => {
         this.repositrorioItens.excluir(item.id);
         window.location.reload();
      });

      celulaBotoes.appendChild(btnExcluir);
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new ItemPageList(new ItemRepositoryLocalStorage());