<template>
  <section>
    <h1>Todo List</h1>

    <!-- Formulário para adicionar uma nova tarefa -->
    <form @submit.prevent="addTask">
      <label for="taskTitle">Título:</label>
      <input v-model="newTask.title" type="text" id="taskTitle" required />

      <label for="taskDescription">Descrição:</label>
      <textarea v-model="newTask.description" id="taskDescription" rows="4"></textarea>

      <label>
        Completa:
        <input v-model="newTask.completed" type="checkbox" />
      </label>

      <label>
        Prioridade:
        <select v-model="newTask.priority">
          <option value="high">Alta</option>
          <option value="low">Baixa</option>
        </select>
      </label>

      <button type="submit">Adicionar Tarefa</button>
    </form>

    <!-- Lista de Tarefas -->
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.title }}
        <button @click="editTask(index)">Editar</button>
        <button @click="deleteTask(index)">Excluir</button>
        <span v-if="task.completed">Completa</span>
        <span v-if="task.priority === 'high'">Urgente</span>
        <span v-if="task.priority === 'low'">Baixa Prioridade</span>
      </li>
    </ul>

    <!-- Formulário para editar uma tarefa -->
    <div v-if="editingTask !== null">
      <h2>Editar Tarefa</h2>
      <form @submit.prevent="saveEditedTask">
        <label for="editedTaskTitle">Título:</label>
        <input v-model="editedTask.title" type="text" id="editedTaskTitle" required />

        <label for="editedTaskDescription">Descrição:</label>
        <textarea v-model="editedTask.description" id="editedTaskDescription" rows="4"></textarea>

        <label>
          Completa:
          <input v-model="editedTask.completed" type="checkbox" />
        </label>

        <label>
          Prioridade:
          <select v-model="editedTask.priority">
            <option value="high">Alta</option>
            <option value="low">Baixa</option>
          </select>
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newTask = ref({
  title: '',
  description: '',
  completed: false,
  priority: 'low',
});

const editedTask = ref({
  title: '',
  description: '',
  completed: false,
  priority: 'low',
});

const editingTask = ref(null);
const tasks = ref(store.state.tasks.tasks);

const addTask = () => {
  if (newTask.value.title.trim() !== '') {
    store.commit('tasks/addTask', { ...newTask.value });
    resetNewTask();
  }
};

const editTask = (index) => {
  editingTask.value = index;
  editedTask.value = { ...tasks.value[index] };
};

const saveEditedTask = () => {
  if (editedTask.value.title.trim() !== '') {
    store.commit('tasks/editTask', { index: editingTask.value, task: { ...editedTask.value } });
    resetEditingTask();
  }
};

const deleteTask = (index) => {
  store.commit('tasks/deleteTask', index);
  resetEditingTask();
};

const resetNewTask = () => {
  newTask.value = {
    title: '',
    description: '',
    completed: false,
    priority: 'low',
  };
};

const resetEditingTask = () => {
  editingTask.value = null;
  editedTask.value = {
    title: '',
    description: '',
    completed: false,
    priority: 'low',
  };
};

onMounted(() => {
  store.dispatch('tasks/fetchTasks');
});

watch(() => store.state.tasks.tasks, (newTasks) => {
  tasks.value = newTasks;
});
</script>

<style scoped lang="stylus">
  section
    display flex
    flex-direction column

  form
    display flex
    flex-direction column
</style>
