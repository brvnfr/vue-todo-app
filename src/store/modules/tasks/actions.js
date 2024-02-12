export default {
  fetchTasks({ commit, state }) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []

    // Aplicar filtro se existir
    const filteredTasks = state.filter
      ? savedTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(state.filter.toLowerCase()) ||
            task.description.toLowerCase().includes(state.filter.toLowerCase()),
        )
      : savedTasks

    // Ordenar por categoria: 'urgent' primeiro, 'important' depois, o restante no final
    const sortedTasks = filteredTasks.sort((a, b) => {
      const categoryOrder = {
        Urgente: 1,
        Importante: 0,
      }

      const categoryA = categoryOrder[a.category] || 2
      const categoryB = categoryOrder[b.category] || 2

      return categoryA - categoryB
    })

    commit('setTasks', sortedTasks)
  },

  setTaskCompleted({ commit, state }, task) {
    console.log('task chegando em setTaskcompleted', task)
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []

    const updatedTasks = savedTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    commit('setTasks', updatedTasks)
  },

  addTask({ commit, state }, task) {
    commit('addTask', task)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },

  editTask({ commit }, { task }) {
    console.log('id vindo do formulario:', task)
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    console.log('array de tasks no localStorage', savedTasks)

    // clona as tarefas
    const updatedTasks = savedTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
    console.log('updatedTasks criado na action', updatedTasks)

    //~ Atualiza o localStorage com as tarefas atualizadas
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    commit('setTasks', updatedTasks)
  },

  deleteTaskById({ commit }, taskId) {
    console.log('id vindo do formulario:', taskId)
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    console.log('array de tasks no localStorage', savedTasks)

    // Encontra o índice da tarefa com o id correspondente
    const indexToDelete = savedTasks.findIndex((task) => task.id === taskId)
    console.log('index da tarefa a ser deletada', indexToDelete)

    if (indexToDelete !== -1) {
      // Remove a tarefa da array
      savedTasks.splice(indexToDelete, 1)

      // Atualiza o localStorage com as tarefas atualizadas
      localStorage.setItem('tasks', JSON.stringify(savedTasks))

      // Atualiza o estado Vuex com as tarefas atualizadas
      commit('setTasks', savedTasks)
    }
  },

  updateFilter({ commit }, filter) {
    commit('setFilter', filter)
  },

  updateCategoryFilter({ commit }, category) {
    commit('updateCategoryFilter', category)
  },
}
