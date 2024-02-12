const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },

  addTask(state, task) {
    // Gere um ID único
    const taskId = Math.floor(Math.random() * 1000)
    task.id = taskId

    state.tasks.push(task)
  },

  editTask(state, updatedTask) {
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, ...updatedTask }
      }
      return task
    })

    console.log('updatedTasks chegando na mutation', updatedTasks)
    state.tasks = updatedTasks

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  },

  deleteTask(state, index) {
    state.tasks.splice(index, 1)
  },
  setFilter(state, filter) {
    state.filter = filter
  },
  updateCategoryFilter(state, category) {
    state.categoryFilter = category
  },
}

export default mutations
