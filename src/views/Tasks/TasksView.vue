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
        <li v-for="(task, index) in tasks" :key="index" class="task-card">
          <div class="task-title">
            <div class="task-check">
              <input
                v-model="task.completed"
                type="checkbox"
                id="task-checkbox"
                :value="task.completed"
              />
            </div>
            <div class="task-description">
              {{ task.title }}
            </div>
          </div>
          <div class="category-badge">
            <span>{{ task.category }}</span>
            <div class="dropdown" ref="dropdownRef" @click="toggleDropdown(index)">
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
              <div v-if="showDropdown === index" class="dropdown-menu">
                <font-awesome-icon
                  icon="fa-solid fa-ellipsis-vertical"
                  class="dropdown-icon"
                  @click="toggleDropdown(index)"
                />
                <button class="dropdown-button" @click="editTaskDialog(index)">
                  <span class="dot"></span>Editar
                </button>
                <button class="dropdown-button" @click="deleteTask(index)">
                  <span class="dot"></span>Excluir
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Diálogo para adicionar tarefa -->
      <dialog-overlay :showOverlay="showAddTaskDialog" @close="closeAddTaskDialog">
        <form-wrapper :formTitle="'Adicionar Tarefa'" @submit="addTask">
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
        <form-wrapper :formTitle="'Editar Tarefa'" @submit="editTask">
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

.task-card
  padding 2rem 1rem
  margin 0.5rem 0
  border-radius 5px
  display flex
  align-items center
  justify-content: space-between

  .task-description
    max-width 150px

  .dropdown
    position relative
    cursor pointer

    .dropdown-menu
      position absolute
      padding 1rem
      top -15px
      right -16px
      width 109px
      background-color white
      box-shadow 0px 2px 4px rgba(0, 0, 8, 0.3)
      border-radius 5px
      padding 8px
      z-index 2

      .dropdown-button
        display block
        padding .5rem 1rem
        margin-left 8px
        text-align center
        border none
        background none
        cursor pointer
        position relative
        overflow hidden
        text-styles(14px, 600, brand-gray-800, 1)

        &::before
          content ""
          width 9px
          height 9px
          background-color brand-gray-500
          border-radius 50%
          display inline-block
          position absolute
          left 0
          top 50%
          transform translateY(-50%)
          transition background-color 0.3s ease

        &:hover
          &::before
            background-color brand-green-500

      .dropdown-icon
        margin 8px
        position absolute
        top 8px
        right 8px
        color brand-blue-500
        cursor pointer

  .task-check
    height 32px
    width 32px

    input[type=checkbox]
      position relative
      border 2px solid white
      border-radius 5px
      background brand-gray-200
      cursor pointer
      line-height 0
      margin 0 .6em 0 0
      outline 0
      padding 0 !important
      vertical-align text-top
      height 32px
      width 32px
      -webkit-appearance none

      &:hover
        opacity 1

      &:checked
        background-color brand-green-400
        opacity 1

      &:before
        content ''
        position absolute
        right 40%
        top 20%
        width 6px
        height 14px
        border solid brand-gray-200
        border-width 0 3px 3px 0
        margin -1px -1px 0 -1px
        transform rotate(45deg)
        translate(-50%, -50%)
        z-index 2

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
  box-shadow-mixin(0, 2px, 4px, rgba(0, 0, 0, 0.1))
  background-color white
  border-radius 4px
  margin 0.5rem
  padding 1.5rem
  display flex
  justify-content space-between
  text-styles(16px, 700, brand-gray-800, 1)
  text-align start

.task-description
  width -webkit-fill-available
  max-width 250px
  overflow hidden
  text-overflow ellipsis
  text-align start

.task-header
  display flex
  justify-content space-between
  align-items center
  width 80%
</style>
