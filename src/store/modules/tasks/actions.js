export default {
  fetchTasks({ commit }) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []

    commit('setTasks', savedTasks)
  },

  addTask({ commit }, task) {
    commit('addTask', task)
  },

  editTask({ commit }, { index, task }) {
    commit('editTask', { index, task })
  },

  deleteTask({ commit }, index) {
    commit('deleteTask', index)
  },
}
