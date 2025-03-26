class Tarefa {
    constructor(titulo, prioridade){
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.concluida = false;
        this.dataCriacao =  new Date();
        this.dataConclusao = null;
    }

    concluir(){
        this.concluida = true;
        this.dataConclusao = new Date();
    }
}

module.exports = Tarefa;