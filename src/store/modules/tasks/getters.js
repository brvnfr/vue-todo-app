const getters = {
  getTasks: (state) => {
    if (state.categoryFilter) {
      return state.tasks.filter((task) => task.category === state.categoryFilter)
    }
    return state.tasks
  },
}

export default getters
