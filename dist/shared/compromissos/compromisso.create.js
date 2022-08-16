import { Compromisso } from "./compromisso.model.js";
import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
import { ContatoRepositoryLocalStorage } from "../contatos/contato.repository.local-storage.js";
export class CompromissoPaginaCadastro {
    constructor(repositorioCompromissos) {
        this.repositorioCompromissos = repositorioCompromissos;
        this.configurarElementos();
    }
    configurarElementos() {
        this.txtAssunto = document.getElementById("txtAssunto");
        this.txtLocal = document.getElementById("txtLocal");
        this.txtData = document.getElementById("txtData");
        this.txtHora = document.getElementById("txtHora");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.selectContato = document.getElementById("contatos");
        const contato = new ContatoRepositoryLocalStorage().selecionarTodos();
        contato.forEach((x) => {
            const option = document.createElement("option");
            option.innerText = x.nome;
            this.selectContato.appendChild(option);
        });
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const novoCompromisso = new Compromisso(this.txtAssunto.value, this.txtLocal.value, this.selectContato.value, this.txtData.value, this.txtHora.value);
        this.repositorioCompromissos.inserir(novoCompromisso);
        window.location.href = "compromisso.list.html";
    }
}
new CompromissoPaginaCadastro(new CompromissoRepositoryLocalStorage());
