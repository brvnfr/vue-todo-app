<template>
  <section>
    <div class="tasks-content">
      <!-- Lista de Tarefas -->
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          {{ task.description }}
          <span v-if="task.completed">Completa</span>
          <span v-if="task.category === 'urgent'">Urgente</span>
          <span v-if="task.category === 'important'">Importante</span>
          <div>
            <button @click="editTaskDialog(index)">Editar</button>
            <button @click="deleteTask(index)">Excluir</button>
          </div>
        </li>
      </ul>

      <!-- Diálogo para adicionar tarefa -->
      <dialog-overlay :showOverlay="showAddTaskDialog" @close="closeAddTaskDialog">
        <form-wrapper :formTitle="'Adicionar Tarefa'" @submit="addTask">
          <text-area-component label="Descrição:" v-model="newTask.description" rows="4" />
          <div class="form-buttons">
            <radio-list-component
              name="newTaskPriority"
              v-model="newTask.category"
              :options="[
                { label: 'Urgente', value: 'urgent' },
                { label: 'Importante', value: 'important' },
              ]"
            />
            <button-component type="submit" button-type="primary">Adicionar</button-component>
          </div>
        </form-wrapper>
      </dialog-overlay>

      <!-- Diálogo para editar tarefa -->
      <dialog-overlay :showOverlay="showEditTaskDialog" @close="closeEditTaskDialog">
        <form-wrapper :formTitle="'Editar Tarefa'" @submit="editTask">
          <text-area-component label="Descrição:" v-model="editedTask.description" rows="4" />
          <div class="form-buttons">
            <radio-list-component
              name="editedTaskPriority"
              v-model="editedTask.category"
              :options="[
                { label: 'Urgente', value: 'urgent' },
                { label: 'Importante', value: 'important' },
              ]"
            />
            <button-component type="submit" button-type="primary">Salvar</button-component>
          </div>
        </form-wrapper>
      </dialog-overlay>

      <!-- Usando o componente AnchorButton -->
      <anchor-button :openDialog="openAddTaskDialog" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AnchorButton from '@/components/AnchorButton.vue'
import DialogOverlay from '@/components/DialogOverlay.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormWrapper from '@/components/FormWrapper.vue'
import TextAreaComponent from '@/components/TextAreaComponent.vue'
import RadioListComponent from '@/components/RadioListComponent.vue'

const store = useStore()

let newTask = {
  description: '',
  completed: false,
  category: null,
}

let editedTask = {
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
  if (newTask.description.trim() !== '' && newTask.category !== null) {
    store.dispatch('tasks/addTask', { ...newTask })
    resetNewTask()
    closeAddTaskDialog()
  } else {
    console.error('Por favor, preencha todos os campos obrigatórios.')
  }
}

const editTask = () => {
  if (
    editingTaskIndex !== null &&
    editedTask.description.trim() !== '' &&
    editedTask.category !== null
  ) {
    store.dispatch('tasks/editTask', { index: editingTaskIndex, task: { ...editedTask } })
    editingTaskIndex = null
    closeEditTaskDialog()
  } else {
    console.error('Por favor, preencha todos os campos obrigatórios.')
  }
}

const deleteTask = (index) => {
  store.dispatch('tasks/deleteTask', index)
}

const editTaskDialog = (index) => {
  editingTaskIndex = index
  editedTask = { ...tasks.value[index] }
  openEditTaskDialog()
}

const resetNewTask = () => {
  newTask = {
    description: '',
    completed: false,
    category: null,
  }
}

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
</script>

<style scoped lang="stylus">
@import '../styles/variables.styl'

section
  display flex
  flex-direction column
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  padding 0 1rem

.tasks-content
  width 100%
  max-width 600px
  overflow-y auto

.form-buttons
    width 100%
    display inline-flex
    justify-content space-between
    gap 16px
    margin 1rem 0

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
    align-items start

    .task-header
      display flex
      justify-content space-between
      align-items center
      width 80%
</style>
