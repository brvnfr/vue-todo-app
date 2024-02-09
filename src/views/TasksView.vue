<template>
  <section>
    <!-- Formulário para adicionar uma nova tarefa -->
    <form-wrapper :formTitle="editingTask !== null ? 'Editar Tarefa' : 'Adicionar Tarefa'">
      <input-component
        type="text"
        label="Título:"
        name="taskTitle"
        :modelValue="taskTitleModel"
        @update:modelValue="taskTitleModel = $event"
      />

      <label for="taskDescription">Descrição:</label>
      <textarea v-model="newTask.description" id="taskDescription" rows="4"></textarea>

      <label>
        Prioridade:
        <input type="radio" v-model="newTask.category" value="high" /> Urgente

        <input type="radio" v-model="newTask.category" value="low" /> Importante
      </label>

      <button-component type="submit" @click="addTask">Adicionar Tarefa</button-component>
    </form-wrapper>

    <!-- Lista de Tarefas -->
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.title }}
        <button @click="editTask(index)">Editar</button>
        <button @click="deleteTask(index)">Excluir</button>
        <span v-if="task.completed">Completa</span>
        <span v-if="task.category === 'high'">Urgente</span>
        <span v-if="task.category === 'low'">Importante</span>
      </li>
    </ul>

    <!-- Formulário para editar uma tarefa -->
    <div v-if="editingTask !== null">
      <h2>Editar Tarefa</h2>
      <form-wrapper :formTitle="'Editar Tarefa'">
        <input-component
          type="text"
          customHeight="auto"
          label="Título:"
          name="editedTaskTitle"
          :modelValue="editedTask.title"
          @update:modelValue="editedTask.title = $event"
        />

        <label for="editedTaskDescription">Descrição:</label>
        <textarea v-model="editedTask.description" id="editedTaskDescription" rows="4"></textarea>

        <label>
          Prioridade:
          <input type="radio" v-model="editedTask.category" value="high" /> Urgente
          <input type="radio" v-model="editedTask.category" value="low" /> Importante
        </label>

        <button-component type="submit" @click="saveEditedTask">Salvar</button-component>
      </form-wrapper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormWrapper from '@/components/FormWrapper.vue'

const store = useStore()

const newTask = ref({
  title: '',
  description: '',
  completed: false,
  category: 'low',
})

const editedTask = ref({
  title: '',
  description: '',
  completed: false,
  category: 'low',
})

const editingTask = ref(null)
const tasks = ref(store.state.tasks.tasks)
const taskTitleModel = ref(newTask.value.title)

const addTask = () => {
  if (newTask.value.title.trim() !== '') {
    store.commit('tasks/addTask', { ...newTask.value })
    resetNewTask()
  }
}

const editTask = (index) => {
  editingTask.value = index
  editedTask.value = { ...tasks.value[index] }
}

const saveEditedTask = () => {
  if (editedTask.value.title.trim() !== '') {
    store.commit('tasks/editTask', { index: editingTask.value, task: { ...editedTask.value } })
    resetEditingTask()
  }
}

const deleteTask = (index) => {
  store.commit('tasks/deleteTask', index)
  resetEditingTask()
}

const resetNewTask = () => {
  newTask.value = {
    title: '',
    description: '',
    completed: false,
    category: 'low',
  }
  taskTitleModel.value = newTask.value.title
}

const resetEditingTask = () => {
  editingTask.value = null
  editedTask.value = {
    title: '',
    description: '',
    completed: false,
    category: 'low',
  }
}

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})

watch(
  () => store.state.tasks.tasks,
  (newTasks) => {
    tasks.value = newTasks
  },
)
</script>

<style scoped lang="stylus">
section
  display flex
  flex-direction column
  align-items center

form
  display flex
  flex-direction column
  gap 1rem

  label
    text-styles(16px, 300, brand-gray-950, 1)

  div
    gap 1rem

ul
  list-style none
  padding 0

  li
    border 1px solid #ccc
    border-radius 8px
    margin-top 1rem
    padding 1rem
    display flex
    justify-content space-between
    align-items center

    .task-header
      display flex
      justify-content space-between
      align-items center
      width 80%
</style>
