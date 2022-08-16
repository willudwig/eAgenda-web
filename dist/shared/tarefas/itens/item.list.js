import { ItemRepositoryLocalStorage } from "./item.repository.local-storage.js";
class ItemPageList {
    constructor(repositrorioItens) {
        this.repositrorioItens = repositrorioItens;
        this.configurarElementos();
        this.atualizarTabela();
    }
    atualizarTabela() {
        const itens = this.repositrorioItens.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        itens.forEach(item => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(item).forEach((valor) => {
                const novacelula = novaLinha.insertCell();
                novacelula.innerText = valor;
            });
        });
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
}
new ItemPageList(new ItemRepositoryLocalStorage());
