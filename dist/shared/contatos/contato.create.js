import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";
export class ContatoPaginaCadastro {
    constructor(repositorioContatos, id) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);
            if (contatoSelecionado) {
                this.preencherFormulario(contatoSelecionado);
            }
        }
    }
    obterDadosFormulario() {
        const nome = this.txtNome.value;
        const telefone = this.txtTelefone.value;
        const empresa = this.txtEmpresa.value;
        const cargo = this.txtCargo.value;
        const email = this.txtEmail.value;
        let contato = null;
        if (!this.idSelecionado)
            contato = new Contato(nome, email, telefone, empresa, cargo);
        else
            contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);
        return contato;
    }
    preencherFormulario(contatoSelecionado) {
        this.txtNome.value = contatoSelecionado.nome;
        this.txtEmail.value = contatoSelecionado.email;
        this.txtTelefone.value = contatoSelecionado.telefone;
        if (contatoSelecionado.empresa === undefined)
            this.txtEmpresa.value = "";
        else
            this.txtEmpresa.value = contatoSelecionado.empresa;
        if (contatoSelecionado.cargo === undefined)
            this.txtCargo.value = "";
        else
            this.txtCargo.value = contatoSelecionado.cargo;
    }
    configurarElementos() {
        this.txtNome = document.getElementById("txtNome");
        this.txtEmail = document.getElementById("txtEmail");
        this.txtTelefone = document.getElementById("txtTelefone");
        this.txtEmpresa = document.getElementById("txtEmpresa");
        this.txtCargo = document.getElementById("txtCargo");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const contato = new Contato(this.txtNome.value, this.txtEmail.value, this.txtTelefone.value, this.txtEmpresa.value, this.txtCargo.value);
        if (!this.idSelecionado)
            this.repositorioContatos.inserir(contato);
        else
            this.repositorioContatos.editar(contato.id, contato);
        window.location.href = "contato.list.html";
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);
