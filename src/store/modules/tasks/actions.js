export default {
  fetchTasks({ commit }) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    commit('setTasks', savedTasks)
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
}
