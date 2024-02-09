const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  
  addTask(state, task) {
    state.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  editTask(state, { index, task }) {
    state.tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
  deleteTask(state, index) {
    state.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },
};


export default mutations;