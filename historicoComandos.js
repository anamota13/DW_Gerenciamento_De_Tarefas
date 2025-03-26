class HistoricoComandos{
    constructor(){
        this.historico = [];
        this.pilhaDesfazer = [];
    }

    executar(comando){
        const resultado = comando.executar();
        this.historico.push(comando);
        return resultado;
    }

    desfazer(){
        const comando = this.historico.pop();
        if (comando) {
            this.pilhaDesfazer.push(comando);
            return `Comando desfeito: ${comando.constructor.name}`;
        }
        return "Nada para desfazer.";
    }

    refazer(){
        const comando = this.pilhaDesfazer.pop();
        if(comando){
            this.historico.push(comando);
            return comando.executar();
        }
        return "Nada para refazer.";
    }

    obterHistorico(){
        return this.historico.map(cmd => ({
            tipo: cmd.constructor.name,
            detalhes: cmd.tarefa ? cmd.tarefa.titulo : 'Sem tarefa.'
        }));
    }
}

module.exports = HistoricoComandos;