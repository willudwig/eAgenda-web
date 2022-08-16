import { Item } from "./item.model.js";
import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
import { TarefaRepositoryLocalStorage } from "../tarefa.repository.local-storage.js";
export class ItemPaginaCadastro {
    constructor(repositorioItens) {
        this.repositorioItens = repositorioItens;
        this.configurarElementos();
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.selectTarefa = document.getElementById("selectTarefa");
        this.btnSalvar = document.getElementById("btnSalvar");
        const option = document.createElement("option");
        const contato = new TarefaRepositoryLocalStorage().selecionarTodos();
        contato.forEach(x => {
            option.innerText = x.titulo;
            this.selectTarefa.appendChild(option);
        });
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const novoItem = new Item(this.txtDescricao.value, this.selectTarefa.value);
        this.repositorioItens.inserir(novoItem);
        window.location.href = "tarefa.list.html";
    }
}
new ItemPaginaCadastro(new ItemRepositoryLocalStorage());
