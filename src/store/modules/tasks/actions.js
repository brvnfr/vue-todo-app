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

  addTask({ commit, state }, task) {
    commit('addTask', task)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },

  editTask({ commit, state }, { index, task }) {
    commit('editTask', { index, task })
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },

  deleteTask({ commit, state }, index) {
    commit('deleteTask', index)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },

  updateFilter({ commit }, filter) {
    commit('setFilter', filter)
  },
}
