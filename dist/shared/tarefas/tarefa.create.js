import { Tarefa } from "./tarefa.model.js";
import { Prioridade } from "./prioridade.enum.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
import { ItemRepositoryLocalStorage } from "./itens/item.repository.local-storage.js";
export class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
            if (tarefaSelecionada) {
                this.preencherFormulario(tarefaSelecionada);
            }
        }
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtTitulo.value = tarefaSelecionada.titulo;
        switch (tarefaSelecionada.prioridade) {
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Média:
                this.rdbPrioridade = document.querySelector("input[value='Média']");
                break;
            case Prioridade.Alta:
                this.rdbPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rdbPrioridade.checked = true;
    }
    obterDadosFormulario() {
        const titulo = this.txtTitulo.value;
        const prioridade = this.obterPrioridadeSelecionada();
        const porcentagem = this.calculrarPorcentagem(titulo);
        let tarefa = null;
        if (!this.idSelecionado)
            tarefa = new Tarefa(titulo, prioridade, porcentagem);
        else
            tarefa = new Tarefa(titulo, prioridade, porcentagem, this.idSelecionado);
        return tarefa;
    }
    obterPrioridadeSelecionada() {
        const rdbPrioridade = document.querySelector("input[type='radio']:checked");
        return rdbPrioridade.value;
    }
    configurarElementos() {
        this.txtTitulo = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const tarefa = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    calculrarPorcentagem(tituloTarefa) {
        let porcentagem = 100;
        const itens = new ItemRepositoryLocalStorage().selecionarTodos();
        const itensDestaTarefa = [];
        itens.forEach(x => {
            if (x.tarefa === tituloTarefa)
                itensDestaTarefa.push(x);
        });
        if (itensDestaTarefa.length === 0)
            return "0%";
        let concluidos = 0;
        let abertos = 0;
        itensDestaTarefa.forEach(x => {
            if (x.status === "Concluído")
                concluidos++;
            else
                abertos++;
        });
        porcentagem = (porcentagem * concluidos) / itensDestaTarefa.length;
        return porcentagem.toFixed(2).toString() + "%";
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);
