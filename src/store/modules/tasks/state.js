// Recuperar dados do localStorage ou usar um array vazio se não houver dados
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [
    {
      title: 'Tarefa 1',
      description: 'Descrição da Tarefa 1',
      completed: false,
      priority: 'low',
    },
];

export default {
  tasks: savedTasks,
};
