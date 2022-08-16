import { EntidadeBase } from "../entidade.model.js";

export interface IRepositorio<T extends EntidadeBase>
{
   inserir(dados: T ): void;
   editar(id: string, registroEditado: T): void;
   excluir(id: string): void;
   selecionarTodos(): T[];
   selecionarPorId(id: string): T | undefined;
}