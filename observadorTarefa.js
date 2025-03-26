class ObservadorTarefaConcluida {
    constructor() {
        this.assinantes = [];
    }

    assinar(callback) {
        this.assinantes.push(callback);
    }

    cancelarAssinatura(callback){
        this.assinantes = this.assinantes.filter(sub => sub !==callback);
    }

    notificar(tarefa){
        this.assinantes.forEach(callback => callback(tarefa));
    }
}

module.exports = ObservadorTarefaConcluida;