import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";
import { ItemRepositoryLocalStorage } from "./itens/item.repository.local-storage.js";
class TarefaPageList {
    constructor(repositrorioTarefas) {
        this.repositrorioTarefas = repositrorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const tarefas = this.repositrorioTarefas.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach(tarefa => {
            const novaLinha = corpoTabela.insertRow();
            tarefa.porcentagem = this.calculrarPorcentagem(tarefa.titulo);
            tarefa.dataConclusao = this.verficarDataConclusao(tarefa.porcentagem);
            Object.values(tarefa).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
            this.criarBotaoEditar(novaLinha, tarefa);
            this.criarBotaoExcluir(novaLinha, tarefa);
        });
    }
    criarBotaoEditar(novaLinha, tarefa) {
        const celulaBotoes = novaLinha.insertCell();
        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-outline-success";
        btnEditar.addEventListener("click", () => {
            window.location.href = `tarefa.create.html?id=${tarefa.id}`;
        });
        celulaBotoes.appendChild(btnEditar);
    }
    criarBotaoExcluir(novaLinha, tarefa) {
        const celulaBotoes = novaLinha.insertCell();
        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-info";
        btnExcluir.addEventListener("click", () => {
            this.repositrorioTarefas.excluir(tarefa.id);
            window.location.reload();
        });
        celulaBotoes.appendChild(btnExcluir);
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
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
            if (x.status === "Conclu??do")
                concluidos++;
            else
                abertos++;
        });
        porcentagem = (porcentagem * concluidos) / itensDestaTarefa.length;
        return porcentagem.toFixed(2).toString() + "%";
    }
    verficarDataConclusao(porcentagem) {
        if (porcentagem === "100.00%") {
            const data = new Date();
            return data.getDate() + " / " + (data.getMonth() + 1) + " / " + data.getFullYear();
        }
        return "-";
    }
}
new TarefaPageList(new TarefaRepositoryLocalStorage());
