import { Item } from "./item.model.js";
import { IRepositorio } from "../../interfaces/repositorio.interface.js";
import { IRepositorioSerializavel } from "../../interfaces/repositorio-serializavel.interface.js";

export class ItemRepositoryLocalStorage implements IRepositorio<Item>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private readonly items: Item[];

   /**
    *
    */
   constructor() {

      this.localStorage = window.localStorage; 
      this.items = this.selecionarTodos();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.items);
      this.localStorage.setItem("items", dadosJson);
   }

   public inserir(dados: Item): void {
      this.items.push(dados);
      this.gravar();
   }

   public excluir(): void {
      throw new Error("Method not implemented.");
   }

   public selecionarTodos(): Item[] {

      const dadosJson = this.localStorage.getItem("items");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}