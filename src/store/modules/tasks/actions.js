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
        urgent: 1,
        important: 0,
      }

      const categoryA = categoryOrder[a.category] || 2
      const categoryB = categoryOrder[b.category] || 2

      return categoryA - categoryB
    })

    commit('setTasks', sortedTasks)
  },

  setTaskCompleted({ commit, state }, index) {
    const tasks = state.tasks

    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true

      commit('setTasks', [...tasks])

      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
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

  updateFilter({ commit }, filter) {
    commit('setFilter', filter)
  },
}
