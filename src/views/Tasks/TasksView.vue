<template>
  <main class="tasks-page">
    <div class="tasks-filter">aaaaa</div>
    <div class="tasks-content">
      <!-- Barra de Busca -->
      <div class="task-search">
        <!-- <h2>Minhas Tarefas</h2>
        <span
          >Olá <span>Eduardo</span>,
          <span v-if="incompleteTasks.length > 0">
            você tem
            <router-link to="/tasks/incomplete">{{ incompleteTasks.length }} tarefas</router-link>
            pendentes
          </span>
          <span v-if="incompleteTasks.length < 1">você não tem tarefas pendentes.</span>
        </span> -->
        <input-component
          type="text"
          placeholder="Buscar tarefas"
          name="title"
          iconClass="magnifying-glass"
        />
      </div>
      <!-- Lista de Tarefas -->
      <ul class="task-list">
        <task-card
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          :index="index"
          @editTask="openEditTaskDialog"
          @deleteTask="openDeleteTaskDialog"
        />
      </ul>

      <!-- Diálogo para adicionar tarefa -->
      <dialog-overlay :showOverlay="showAddTaskDialog" @close="closeAddTaskDialog">
        <form-wrapper :formTitle="'Adicionar Tarefa'" @submit="addTask" class="dialog-form">
          <input-component v-model="newTask.title" type="text" label="Titulo:" name="title" />
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
        <form-wrapper :formTitle="'Editar Tarefa'" @submit="editTask" class="dialog-form">
          <input-component v-model="editedTask.title" type="text" label="Titulo:" name="title" />
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

      <!-- Diálogo para excluir tarefa -->
      <dialog-overlay :showOverlay="showDeleteTaskDialog" @close="closeDeleteTaskDialog">
        <div class="delete-dialog-content">
          <div class="delete-ilustration">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </div>
          <h3>Tem certeza que deseja <strong>excluir</strong> esta tarefa?</h3>
          <p>Esta ação não poderá ser desfeita.</p>
          <div class="dialog-buttons">
            <button-component button-type="primary" @click="closeDeleteTaskDialog"
              >Cancelar</button-component
            >
            <button-component button-type="danger" @click="deleteTask">Confirmar</button-component>
          </div>
        </div>
      </dialog-overlay>

      <!-- Botão Flutuante/Ancorado -->
      <anchor-button :openDialog="openAddTaskDialog" />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AnchorButton from '@/components/Buttons/AnchorButton.vue'
import DialogOverlay from '@/components/DialogOverlay.vue'
import ButtonComponent from '@/components/Buttons/ButtonComponent.vue'
import FormWrapper from '@/components/Form/FormWrapper.vue'
import TextAreaComponent from '@/components//Form/Inputs/TextAreaComponent.vue'
import RadioListComponent from '@/components/Form/Inputs/RadioListComponent.vue'
import InputComponent from '@/components/Form/Inputs/InputComponent.vue'
import TaskCard from '@/views/Tasks/components/TaskCard.vue'

const store = useStore()

let showDropdown = ref(null)

const toggleDropdown = (index) => {
  showDropdown.value = showDropdown.value === index ? null : index
}

const dropdownRef = ref(null)

let newTask = {
  title: '',
  description: '',
  completed: false,
  category: null,
}

let editedTask = {
  title: '',
  description: '',
  completed: false,
  category: null,
}

let editingTaskIndex = null
let deletingTaskIndex = null

const tasks = computed(() => store.getters['tasks/getTasks'])

const showAddTaskDialog = ref(false)
const showEditTaskDialog = ref(false)
const showDeleteTaskDialog = ref(false)

const openAddTaskDialog = () => {
  showAddTaskDialog.value = true
}

const closeAddTaskDialog = () => {
  showAddTaskDialog.value = false
  resetNewTask()
}

const openEditTaskDialog = (index) => {
  editingTaskIndex = index
  showEditTaskDialog.value = true
}

const closeEditTaskDialog = () => {
  showEditTaskDialog.value = false
}

const openDeleteTaskDialog = (index) => {
  deletingTaskIndex = index
  showDeleteTaskDialog.value = true
}

const closeDeleteTaskDialog = () => {
  showDeleteTaskDialog.value = false
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

const deleteTask = () => {
  // Implemente a lógica para excluir a tarefa usando deletingTaskIndex
  store.dispatch('tasks/deleteTask', deletingTaskIndex)
  // ...

  // Feche o modal após a exclusão
  closeDeleteTaskDialog()
}

const editTaskDialog = (index) => {
  editingTaskIndex = index
  editedTask = { ...tasks.value[index] }
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

<style scoped lang="stylus">
@import '../../styles/variables.styl'

.tasks-page
  background-color brand-gray-150
  width 100%
  height calc(100vh - 82px)
  display flex
  justify-content start
  align-items center

  @media (max-width: 1024px)
    flex-direction column

.tasks-filter
  width 100%
  height 100%
  max-width 227px
  background-color brand-gray-100
  box-shadow-mixin(0, 2px, 4px, rgba(0, 0, 0, 0.1))

  @media (max-width: 1024px)
    height 112px
    max-width 100%

.tasks-content
  width calc(100% - 227px)
  display flex
  flex-direction column
  justify-content center
  align-items center
  height calc(100% - 112px)
  overflow auto

  @media (max-width: 1024px)
    width 100%

  .task-search, .task-list
    min-width 300px
    width: 90%
    max-width 700px
    max-height 420px

    @media (max-width: 375px)
      width 300px

.task-title, .category-badge
  display inline-flex
  align-items center

.form-buttons
  width 100%
  display inline-flex
  justify-content space-between
  gap 16px
  margin 1rem 0

label
  text-styles(16px, 300, brand-gray-950, 1)

.delete-dialog-content
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap 1rem
  .delete-ilustration
      display flex
      align-items center
      justify-content center
      padding 2rem
      background-color brand-gray-200
      border-radius 50%

      svg
        width 67px
        height 67px
        color brand-gray-0

  .dialog-buttons
    width 100%
    display inline-flex
    justify-content center
    gap 16px
    margin 1rem 0

.dialog-form
  width 100%
</style>
