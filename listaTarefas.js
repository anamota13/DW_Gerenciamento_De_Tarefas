const Tarefa = require('./tarefa');

class ListaTarefas {
  constructor() {
    this.tarefas = [];
  }

  adicionarTarefa(tarefa) {
    this.tarefas.push(tarefa);
  }

  obterTarefa(indice) {
    return this.tarefas[indice];
  }

  obterTodasTarefas() {
    return this.tarefas;
  }

  [Symbol.iterator]() {
    let indice = 0;
    const tarefas = this.tarefas;
    
    return {
      next() {
        if (indice < tarefas.length) {
          return { value: tarefas[indice++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  criarIteradorPrioridade(prioridade) {
    let indice = 0;
    const tarefasFiltradas = this.tarefas.filter(tarefa => tarefa.prioridade === prioridade);
    
    return {
      next() {
        if (indice < tarefasFiltradas.length) {
          return { value: tarefasFiltradas[indice++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

module.exports = ListaTarefas;