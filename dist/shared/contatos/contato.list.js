import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";
class ContatoPageList {
    constructor(repositrorioContatos) {
        this.repositrorioContatos = repositrorioContatos;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const contatos = this.repositrorioContatos.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        contatos.forEach(contato => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(contato).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
        });
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new ContatoPageList(new ContatoRepositoryLocalStorage());
