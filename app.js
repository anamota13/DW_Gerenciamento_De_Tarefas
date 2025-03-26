const readline = require('readline');
const ListaTarefas = require('./listaTarefas');
const { ComandoCriarTarefa, ComandoConcluirTarefa } = require('./comando');
const FiltroPrioridade = require('./filtroPrioridade');
const ObservadorTarefaConcluida = require('./observadorTarefa');
const HistoricoComandos = require('./historicoComandos');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const listaTarefas = new ListaTarefas();
const observadorTarefa = new ObservadorTarefaConcluida();
const historicoComandos = new HistoricoComandos();


observadorTarefa.assinar((tarefa) => {
  console.log(`\nNotificação: Tarefa "${tarefa.titulo}" foi concluída em ${tarefa.dataConclusao}`);
});


function criarTarefa(titulo, prioridade) {
  const comando = new ComandoCriarTarefa(listaTarefas, titulo, prioridade);
  const tarefa = historicoComandos.executar(comando);
  console.log(`\nTarefa criada: "${titulo}" (Prioridade: ${prioridade})`);
  return tarefa;
}

function concluirTarefa(indice) {
  const comando = new ComandoConcluirTarefa(listaTarefas, indice);
  const tarefa = historicoComandos.executar(comando);
  if (tarefa) {
    observadorTarefa.notificar(tarefa);
  }
  return tarefa;
}

function listarTarefas(filtroPrioridade = null) {
  console.log('\n=== LISTA DE TAREFAS ===');
  
  let tarefasParaMostrar = listaTarefas.obterTodasTarefas();
  
  if (filtroPrioridade) {
    const filtro = new FiltroPrioridade(filtroPrioridade);
    tarefasParaMostrar = filtro.filtrar(tarefasParaMostrar);
    console.log(`(Filtrado por prioridade: ${filtroPrioridade})`);
  }
  
  if (tarefasParaMostrar.length === 0) {
    console.log('Nenhuma tarefa encontrada.');
    return;
  }
  
  tarefasParaMostrar.forEach((tarefa, index) => {
    console.log(`${index + 1}. ${tarefa.titulo} [${tarefa.prioridade}] ${tarefa.concluida ? '(✓ Concluída)' : ''}`);
  });
}

function mostrarMenu() {
  console.log('\n=== MENU PRINCIPAL ===');
  console.log('1. Criar nova tarefa');
  console.log('2. Listar todas as tarefas');
  console.log('3. Filtrar tarefas por prioridade');
  console.log('4. Marcar tarefa como concluída');
  console.log('5. Ver histórico de ações');
  console.log('6. Sair');
  
  rl.question('\nEscolha uma opção: ', (opcao) => {
    switch(opcao) {
      case '1':
        criarTarefaInterativa();
        break;
      case '2':
        listarTarefas();
        mostrarMenu();
        break;
      case '3':
        filtrarTarefas();
        break;
      case '4':
        concluirTarefaInterativa();
        break;
      case '5':
        mostrarHistorico();
        mostrarMenu();
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Opção inválida!');
        mostrarMenu();
    }
  });
}

function criarTarefaInterativa() {
  rl.question('\nDigite o nome da tarefa: ', (titulo) => {
    rl.question('Prioridade (alta/media/baixa): ', (prioridade) => {
      if (!['alta', 'media', 'baixa'].includes(prioridade.toLowerCase())) {
        console.log('Prioridade inválida! Use alta, media ou baixa.');
        return criarTarefaInterativa();
      }
      criarTarefa(titulo, prioridade.toLowerCase());
      mostrarMenu();
    });
  });
}

function filtrarTarefas() {
  rl.question('\nFiltrar por prioridade (alta/media/baixa): ', (prioridade) => {
    if (!['alta', 'media', 'baixa'].includes(prioridade.toLowerCase())) {
      console.log('Prioridade inválida! Use alta, media ou baixa.');
      return filtrarTarefas();
    }
    listarTarefas(prioridade.toLowerCase());
    mostrarMenu();
  });
}

function concluirTarefaInterativa() {
  listarTarefas();
  rl.question('\nDigite o número da tarefa a concluir: ', (indice) => {
    const num = parseInt(indice) - 1;
    if (isNaN(num) || num < 0 || num >= listaTarefas.obterTodasTarefas().length) {
      console.log('Número inválido!');
      return concluirTarefaInterativa();
    }
    concluirTarefa(num);
    mostrarMenu();
  });
}

function mostrarHistorico() {
  console.log('\n=== HISTÓRICO DE AÇÕES ===');
  const historico = historicoComandos.obterHistorico();
  if (historico.length === 0) {
    console.log('Nenhuma ação registrada.');
    return;
  }
  
  historico.forEach((cmd, i) => {
    console.log(`${i + 1}. ${cmd.tipo}: ${cmd.detalhes}`);
  });
}


console.log('=== SISTEMA DE GERENCIAMENTO DE TAREFAS ===');
mostrarMenu();


rl.on('close', () => {
  console.log('\nSistema encerrado. Até logo!');
  process.exit(0);
});