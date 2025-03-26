class FiltroPrioridade {
    constructor(prioridade){
        this.prioridade = prioridade;
    }

    filtrar(tarefas){
        return tarefas.filter(tarefa => tarefa.prioridade === this.prioridade);
    }
}

module.exports = FiltroPrioridade;