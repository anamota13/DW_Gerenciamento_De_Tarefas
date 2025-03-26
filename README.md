# 📋 Sistema de Gerenciamento de Tarefas

![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![Padrões de Design](https://img.shields.io/badge/Padrões-4-blue)

Sistema CLI para gerenciamento de tarefas implementando padrões de design em Node.js.

## 🎯 Funcionalidades

- ✨ **CRUD de Tarefas**
  - Criar/Listar/Concluir tarefas
  - Prioridades: Alta, Média, Baixa
- 🔍 **Filtros Avançados**
  - Por prioridade (Strategy Pattern)
  - Iteração personalizada (Iterator Pattern)
- 🔔 **Sistema de Notificações** (Observer Pattern)
- ⏳ **Histórico de Ações** (Command Pattern)

## 🛠️ Tecnologias e Padrões

| Componente          | Arquivo               | Padrão       |
|---------------------|-----------------------|-------------|
| Modelo de Tarefa    | `tarefa.js`           | -           |
| Lista de Tarefas    | `listaTarefas.js`     | Iterator    |
| Comandos           | `comandos.js`         | Command     |
| Filtros            | `filtroPrioridade.js` | Strategy    |
| Notificações       | `observadorTarefa.js` | Observer    |
| Histórico          | `historicoComandos.js`| -           |

## 🚀 Execução


# Clone o repositório
git clone https://github.com/anamota13/DW_Gerenciamento_De_Tarefas

# Instale as dependências (se houver)
npm install

# Execute o sistema
node app.js

1. ➕ Criar tarefa
2. 📋 Listar tarefas
3. 🔍 Filtrar por prioridade
4. ✅ Concluir tarefa
5. ⏳ Ver histórico
6. ❌ Sair

# 📝 Exemplo de Uso

```
const tarefa = criarTarefa("Estudar padrões de design","alta");
```
