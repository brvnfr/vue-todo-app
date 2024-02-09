<template>
  <section>
    <!-- Formulário para adicionar uma nova tarefa -->
    <form-wrapper :formTitle="editingTask !== null ? 'Editar Tarefa' : 'Adicionar Tarefa'">
      <input-component v-model="newTask.title" type="text" label="Título:" name="taskTitle" />

      <text-area-component label="Descrição:" v-model="newTask.description" rows="4" />

      <radio-list-component
        name="newTaskPriority"
        v-model="newTask.category"
        :options="[
          { label: 'Urgente', value: 'urgent' },
          { label: 'Importante', value: 'important' },
        ]"
      />

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
          v-model="editedTask.title"
          type="text"
          customHeight="auto"
          label="Título:"
          name="editedTaskTitle"
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
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import TextAreaComponent from '@/components/TextAreaComponent.vue'
import RadioListComponent from '@/components/RadioListComponent.vue'

const store = useStore()

let newTask = {
  title: '',
  description: '',
  completed: false,
  category: 'low',
}

let editedTask = {
  title: '',
  description: '',
  completed: false,
  category: 'low',
}

let editingTask = null

const tasks = computed(() => store.getters['tasks/getTasks'])

const addTask = () => {
  if (newTask.title.trim() !== '') {
    store.dispatch('tasks/addTask', { ...newTask })
    resetNewTask()
  }
}

const editTask = (index) => {
  editingTask = index
  editedTask = { ...tasks[index] }
}

const saveEditedTask = () => {
  if (editedTask.title.trim() !== '') {
    store.dispatch('tasks/editTask', { index: editingTask, task: { ...editedTask } })
    resetEditingTask()
  }
}

const deleteTask = (index) => {
  store.dispatch('tasks/deleteTask', index)
  resetEditingTask()
}

const resetNewTask = () => {
  newTask = {
    title: '',
    description: '',
    completed: false,
    category: 'low',
  }
}

const resetEditingTask = () => {
  editingTask = null
  editedTask = {
    title: '',
    description: '',
    completed: false,
    category: 'low',
  }
}

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
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
