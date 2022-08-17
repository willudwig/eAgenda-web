import { Compromisso } from "./compromisso.model.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
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
        const data = this.txtData.value;
        const hora = this.txtHora.value;
        const contato = this.selectContato.value;
        let compromisso = null;
        if (!this.idSelecionado)
            compromisso = new Compromisso(assunto, local, data, hora, contato);
        else
            compromisso = new Compromisso(assunto, local, data, hora, contato, this.idSelecionado);
        return compromisso;
    }
    preencherFormulario(CompromissoSelecionado) {
        this.txtAssunto.value = CompromissoSelecionado.assunto;
        this.txtLocal.value = CompromissoSelecionado.local;
        this.txtData.value = CompromissoSelecionado.data;
        this.txtHora.value = CompromissoSelecionado.hora;
        this.selectContato.value = CompromissoSelecionado.contato;
    }
    configurarElementos() {
        this.txtAssunto = document.getElementById("txtAssunto");
        this.txtLocal = document.getElementById("txtLocal");
        this.txtData = document.getElementById("txtData");
        this.txtHora = document.getElementById("txtHora");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.selectContato = document.getElementById("Compromissos");
        const Compromisso = new CompromissoRepositoryLocalStorage().selecionarTodos();
        Compromisso.forEach((x) => {
            const option = document.createElement("option");
            option.innerText = x.assunto;
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
