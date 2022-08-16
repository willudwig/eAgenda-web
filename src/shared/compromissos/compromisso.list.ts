import { Compromisso } from "./compromisso.model.js";
import { IPageList } from "../interfaces/pagina.list.inteface.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";

class CompromissoPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioCompromisso: IRepositorio<Compromisso>) {
      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const compromissos = this.repositrorioCompromisso.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      compromissos.forEach(compromisso => {

         const novaLinha = corpoTabela.insertRow();

         Object.values(compromisso).forEach(

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

new CompromissoPageList(new CompromissoRepositoryLocalStorage());