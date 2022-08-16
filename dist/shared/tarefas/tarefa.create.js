import { Tarefa } from "./tarefa.model.js";
import { Prioridade } from "./prioridade.enum";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
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
        const tarefa = new Tarefa(titulo, prioridade);
        tarefa.id = this.idSelecionado;
    }
    obterPrioridadeSelecionada() {
        const rdbPrioridade = document.querySelector("input[value='Alta']");
        return rdbPrioridade.value;
    }
    configurarElementos() {
        this.txtTitulo = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const tarefa = this.obterDadosFormulario();
        if (!tarefa.id)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage());
