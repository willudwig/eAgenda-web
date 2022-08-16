import { IRepositorioSerializavel } from "../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { Compromisso } from "./compromisso.model.js";

export class CompromissoRepositoryLocalStorage implements IRepositorio<Compromisso>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private readonly compromissos: Compromisso[];

   /**
    *
    */
   constructor() {
      this.localStorage = window.localStorage; 
      this.compromissos = this.selecionarTodos();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.compromissos);
      this.localStorage.setItem("compromissos", dadosJson);
   }

   public inserir(dados: Compromisso): void {
      this.compromissos.push(dados);
      this.gravar();
   }

   public excluir(): void {
      throw new Error("Method not implemented.");
   }

   public selecionarTodos(): Compromisso[] {
      const dadosJson = this.localStorage.getItem("compromissos");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}