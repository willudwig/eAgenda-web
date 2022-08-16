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

         Object.values(item).forEach(

            (valor: any) => {

               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );
      });
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new ItemPageList(new ItemRepositoryLocalStorage());