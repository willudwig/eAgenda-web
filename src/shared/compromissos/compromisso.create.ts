import { Compromisso } from "./compromisso.model.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";

export class CompromissoPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtAssunto: HTMLInputElement;
   private txtLocal: HTMLInputElement;
   private txtData: HTMLInputElement;
   private txtHora: HTMLInputElement;
   private btnSalvar: HTMLButtonElement;
   private selectContato: HTMLSelectElement;
   private idSelecionado: string;

   constructor(private repositorioCompromissos: IRepositorio<Compromisso>, id?:string) {
      this.configurarElementos();

      if(id) {
         this.idSelecionado = id;
         const compromissoSelecionado = this.repositorioCompromissos.selecionarPorId(id);

         if (compromissoSelecionado) {
            this.preencherFormulario(compromissoSelecionado);
         }
      }
   }

   private obterDadosFormulario(): Compromisso {
      const assunto = this.txtAssunto.value; 
      const local = this.txtLocal.value;
      const data = this.txtData.value;
      const hora = this.txtHora.value ;
      const contato = this.selectContato.value;

      let compromisso = null;

      if (!this.idSelecionado)
         compromisso = new Compromisso(assunto, local, data, hora, contato);
      else
      compromisso = new Compromisso(assunto, local, data, hora, contato, this.idSelecionado);

      return compromisso;
   }

   private preencherFormulario(CompromissoSelecionado: Compromisso){
      this.txtAssunto.value = CompromissoSelecionado.assunto;
      this.txtLocal.value = CompromissoSelecionado.local;
      this.txtData.value = CompromissoSelecionado.data;
      this.txtHora.value = CompromissoSelecionado.hora;
      this.selectContato.value = CompromissoSelecionado.contato;
   }

   configurarElementos(): void {
      this.txtAssunto = document.getElementById("txtAssunto") as HTMLInputElement;
      this.txtLocal = document.getElementById("txtLocal") as HTMLInputElement;
      this.txtData = document.getElementById("txtData") as HTMLInputElement;
      this.txtHora = document.getElementById("txtHora") as HTMLInputElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;
      this.selectContato = document.getElementById("Compromissos") as HTMLSelectElement;

      const Compromisso = new CompromissoRepositoryLocalStorage().selecionarTodos();
      
      Compromisso.forEach( (x) => {
         const option = document.createElement("option");
         option.innerText = x.assunto;
         this.selectContato.appendChild(option);
      });
      
      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const compromisso = this.obterDadosFormulario();

      if(!this.idSelecionado)
         this.repositorioCompromissos.inserir(compromisso);
      else
         this.repositorioCompromissos.editar(compromisso.id, compromisso);

      window.location.href = "compromisso.list.html";
   }
   
}

const params = new URLSearchParams(window.location.search); 
const id = params.get("id") as string;

new CompromissoPaginaCadastro(new CompromissoRepositoryLocalStorage(), id);