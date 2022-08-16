import { CompromissoRepositoryLocalStorage } from "./compromisso.repository.local-storage.js";
class CompromissoPageList {
    constructor(repositrorioCompromisso) {
        this.repositrorioCompromisso = repositrorioCompromisso;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const compromissos = this.repositrorioCompromisso.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        compromissos.forEach(compromisso => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(compromisso).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
        });
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new CompromissoPageList(new CompromissoRepositoryLocalStorage());
