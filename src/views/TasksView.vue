<template>
  <section>
    <!-- Botão para abrir o diálogo de adicionar tarefa -->
    <button @click="openAddTaskDialog">Adicionar Tarefa</button>

    <!-- Lista de Tarefas -->
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.title }}
        <button @click="editTaskDialog(index)">Editar</button>
        <button @click="deleteTask(index)">Excluir</button>
        <span v-if="task.completed">Completa</span>
        <span v-if="task.category === 'urgent'">Urgente</span>
        <span v-if="task.category === 'important'">Importante</span>
      </li>
    </ul>

    <!-- Diálogo para adicionar tarefa -->
    <dialog-overlay :showOverlay="showAddTaskDialog" @close="closeAddTaskDialog">
      <form-wrapper :formTitle="'Adicionar Tarefa'" @submit="addTask">
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
        <button-component type="submit">Salvar</button-component>
        <button-component @click="closeAddTaskDialog">Fechar</button-component>
      </form-wrapper>
    </dialog-overlay>

    <!-- Diálogo para editar tarefa -->
    <dialog-overlay :showOverlay="showEditTaskDialog" @close="closeEditTaskDialog">
      <form-wrapper :formTitle="'Editar Tarefa'" @submit="editTask">
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
        <button-component type="submit">Salvar</button-component>
        <button-component @click="closeEditTaskDialog">Fechar</button-component>
      </form-wrapper>
    </dialog-overlay>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import DialogOverlay from '@/components/DialogOverlay.vue'
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
  category: null,
}

let editingTaskIndex = null

const tasks = computed(() => store.getters['tasks/getTasks'])

const showAddTaskDialog = ref(false)
const showEditTaskDialog = ref(false)

const openAddTaskDialog = () => {
  showAddTaskDialog.value = true
}

const closeAddTaskDialog = () => {
  showAddTaskDialog.value = false
  resetNewTask()
}

const openEditTaskDialog = () => {
  showEditTaskDialog.value = true
}

const closeEditTaskDialog = () => {
  showEditTaskDialog.value = false
}

const addTask = () => {
  if (newTask.title.trim() !== '') {
    store.dispatch('tasks/addTask', { ...newTask })
    resetNewTask()
    closeAddTaskDialog()
  }
}

const editTask = () => {
  if (editingTaskIndex !== null) {
    store.dispatch('tasks/editTask', { index: editingTaskIndex, task: { ...newTask } })
    editingTaskIndex = null
    closeEditTaskDialog()
  }
}

const deleteTask = (index) => {
  store.dispatch('tasks/deleteTask', index)
}

const editTaskDialog = (index) => {
  editingTaskIndex = index
  newTask = { ...tasks.value[index] }
  openEditTaskDialog()
}

const resetNewTask = () => {
  newTask = {
    title: '',
    description: '',
    completed: false,
    category: null,
  }
}

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>

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
