import { Compromisso } from "./compromisso.model.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
import { ContatoRepositoryLocalStorage } from "../contatos/contato.repository.local-storage.js";
export class CompromissoPaginaCadastro {
    constructor(repositorioCompromissos, id) {
        this.repositorioCompromissos = repositorioCompromissos;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const compromissoSelecionado = this.repositorioCompromissos.selecionarPorId(id);
            if (compromissoSelecionado) {
                this.preencherFormulario(compromissoSelecionado);
            }
        }
    }
    obterDadosFormulario() {
        const assunto = this.txtAssunto.value;
        const local = this.txtLocal.value;
        const contato = this.selectContato.value;
        const data = this.txtData.value;
        const hora = this.txtHora.value;
        let compromisso = null;
        if (!this.idSelecionado)
            compromisso = new Compromisso(assunto, local, contato, data, hora);
        else
            compromisso = new Compromisso(assunto, local, contato, data, hora, this.idSelecionado);
        return compromisso;
    }
    preencherFormulario(compromissoSelecionado) {
        this.txtAssunto.value = compromissoSelecionado.assunto;
        this.txtLocal.value = compromissoSelecionado.local;
        this.selectContato.value = compromissoSelecionado.contato;
        this.txtData.value = compromissoSelecionado.data;
        this.txtHora.value = compromissoSelecionado.hora;
    }
    configurarElementos() {
        this.txtAssunto = document.getElementById("txtAssunto");
        this.txtLocal = document.getElementById("txtLocal");
        this.selectContato = document.getElementById("contatos");
        this.txtData = document.getElementById("txtData");
        this.txtHora = document.getElementById("txtHora");
        this.btnSalvar = document.getElementById("btnSalvar");
        //adiciona os contatos no select
        const contatos = new ContatoRepositoryLocalStorage().selecionarTodos();
        contatos.forEach((x) => {
            const option = document.createElement("option");
            option.innerText = x.nome;
            this.selectContato.appendChild(option);
        });
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const compromisso = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioCompromissos.inserir(compromisso);
        else
            this.repositorioCompromissos.editar(compromisso.id, compromisso);
        window.location.href = "compromisso.list.html";
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new CompromissoPaginaCadastro(new CompromissoRepositoryLocalStorage(), id);
