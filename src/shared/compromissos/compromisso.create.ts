import { Compromisso } from "./compromisso.model.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
import { ContatoRepositoryLocalStorage } from "../contatos/contato.repository.local-storage.js";

export class CompromissoPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtAssunto: HTMLInputElement;
   private txtLocal: HTMLInputElement;
   private txtData: HTMLInputElement;
   private txtHora: HTMLInputElement;
   private btnSalvar: HTMLButtonElement;
   private selectContato: HTMLSelectElement;

   constructor(private repositorioCompromissos: IRepositorio<Compromisso>) {
      this.configurarElementos();
   }

   configurarElementos(): void {
      this.txtAssunto = document.getElementById("txtAssunto") as HTMLInputElement;
      this.txtLocal = document.getElementById("txtLocal") as HTMLInputElement;
      this.txtData = document.getElementById("txtData") as HTMLInputElement;
      this.txtHora = document.getElementById("txtHora") as HTMLInputElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;
      this.selectContato = document.getElementById("contatos") as HTMLSelectElement;

      const option = document.createElement("option");
      const contato = new ContatoRepositoryLocalStorage().selecionarTodos();

      contato.forEach(x => {
         option.innerText = x.nome;
         this.selectContato.appendChild(option);
      });
      
      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const novoCompromisso = new Compromisso(this.txtAssunto.value, 
                                      this.txtLocal.value,
                                      this.selectContato.value,
                                      this.txtData.value,
                                      this.txtHora.value);

      this.repositorioCompromissos.inserir(novoCompromisso);
      window.location.href = "compromisso.list.html";
   }
   
}

new CompromissoPaginaCadastro(new CompromissoRepositoryLocalStorage());