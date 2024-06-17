'use strict';

/*let banco = [
    {'tarefa': 'Estudar JS', 'status': ''},
    {'tarefa': 'NetFlix', 'status': 'checked'}
];*/

localStorage.setItem

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

function criarItem(tarefa, status, indice){
    const item = document.createElement('label');
    item.classList.add("todo__item");

    item.innerHTML = `
        <input type = "checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type = "button" value = "X" data-indice = ${indice}>
    `

    document.getElementById("todoList").appendChild(item);
}

function limparTarefas(){
    const lista = document.querySelector("#todoList");
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

function atualizarTela(){
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const adicionarItem = (evento) => {
    const tecla = evento.key;
    const tarefaDescricao = evento.target.value;
    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push({'tarefa': tarefaDescricao, 'status': ''});
        setBanco(banco);
        atualizarTela();
        //tarefaDescricao = ''; //limpar a tarefa
        document.querySelector('[name="textoTarefa"]').value = "";
    }
}

function removerItem(indice){
    const banco = getBanco();
    banco.splice(indice,1);
    setBanco(banco);
    atualizarTela();
}

function atualizarItem(indice){
    const banco = getBanco();
    const situacao = banco[indice].status;
    if (situacao === '') {
        banco[indice].status = 'checked';
    } else{
        banco[indice].status = ''
    }
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.querySelector("#newItem").addEventListener("keypress", adicionarItem);
document.querySelector("#todoList").addEventListener("click", clickItem);

atualizarTela();
