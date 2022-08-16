import { Contato } from "./contato.model.js";
import { IPageList } from "../interfaces/pagina.list.inteface.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioContatos: IRepositorio<Contato>) {
      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const contatos = this.repositrorioContatos.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      contatos.forEach(contato => {

         const novaLinha = corpoTabela.insertRow();

         Object.values(contato).forEach(

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

new ContatoPageList(new ContatoRepositoryLocalStorage());