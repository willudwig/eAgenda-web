import { Item } from "./item.model.js";
import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
import { TarefaRepositoryLocalStorage } from "../tarefa.repository.local-storage.js";
export class ItemPaginaCadastro {
    constructor(repositorioItens, id) {
        this.repositorioItens = repositorioItens;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const itemSelecionado = this.repositorioItens.selecionarPorId(id);
            if (itemSelecionado) {
                this.preencherFormulario(itemSelecionado);
            }
        }
    }
    preencherFormulario(itemSelecionado) {
        this.txtDescricao.value = itemSelecionado.descricao;
        this.selectTarefa.value = itemSelecionado.tarefa;
    }
    obterDadosFormulario() {
        const descrcicao = this.txtDescricao.value;
        const tarefa = this.selectTarefa.value;
        let item = null;
        if (!this.idSelecionado)
            item = new Item(descrcicao, tarefa);
        else
            item = new Item(descrcicao, tarefa, this.idSelecionado);
        return item;
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.selectTarefa = document.getElementById("selectTarefa");
        this.btnSalvar = document.getElementById("btnSalvar");
        //select tarefa
        const tarefa = new TarefaRepositoryLocalStorage().selecionarTodos();
        tarefa.forEach((x) => {
            const option = document.createElement("option");
            option.innerText = x.titulo;
            this.selectTarefa.appendChild(option);
        });
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const item = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioItens.inserir(item);
        else
            this.repositorioItens.editar(item.id, item);
        window.location.href = "item.list.html";
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new ItemPaginaCadastro(new ItemRepositoryLocalStorage(), id);
