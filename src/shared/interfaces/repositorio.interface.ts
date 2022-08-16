import { EntidadeBase } from "../entidade.model.js";

export interface IRepositorio<T extends EntidadeBase>
{
   inserir(dados: T ): void;
   excluir(): void;
   selecionarTodos(): T[];
}