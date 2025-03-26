const Tarefa = require('./tarefa');  

class ComandoCriarTarefa {
  constructor(listaTarefas, titulo, prioridade) {
    this.listaTarefas = listaTarefas;
    this.titulo = titulo;
    this.prioridade = prioridade;
    this.tarefa = null;
  }

  executar() {
    const tarefa = new Tarefa(this.titulo, this.prioridade);
    this.listaTarefas.adicionarTarefa(tarefa);
    this.tarefa = tarefa;
    return tarefa;
  }
}

class ComandoConcluirTarefa {
  constructor(listaTarefas, indiceTarefa) {
    this.listaTarefas = listaTarefas;
    this.indiceTarefa = indiceTarefa;
    this.tarefa = null;
  }

  executar() {
    const tarefa = this.listaTarefas.obterTarefa(this.indiceTarefa);
    if (tarefa) {
      tarefa.concluir();
      this.tarefa = tarefa;
      return tarefa;
    }
    return null;
  }
}

module.exports = { ComandoCriarTarefa, ComandoConcluirTarefa };