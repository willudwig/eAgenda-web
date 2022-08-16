import { IRepositorioSerializavel } from "../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { Contato } from "./contato.model.js";

export class ContatoRepositoryLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private readonly contatos: Contato[];

   /**
    *
    */
   constructor() {

      this.localStorage = window.localStorage; 
      this.contatos = this.selecionarTodos();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.contatos);
      this.localStorage.setItem("contatos", dadosJson);
   }

   public inserir(dados: Contato): void {
      this.contatos.push(dados);
      this.gravar();
   }

   public excluir(): void {
      throw new Error("Method not implemented.");
   }

   public selecionarTodos(): Contato[] {

      const dadosJson = this.localStorage.getItem("contatos");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}