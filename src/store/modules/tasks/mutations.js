const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },

  addTask(state, task) {
    state.tasks.push(task)
  },

  editTask(state, { index, task }) {
    state.tasks[index] = task
  },

  deleteTask(state, index) {
    state.tasks.splice(index, 1)
  },
}

export default mutations
