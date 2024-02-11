<template>
  <main class="tasks-page">
    <div class="tasks-filter">
      <h2>Categorias</h2>
      <ul class="filter-list">
        <li @click="handleCategoryFilter(null)">
          <font-awesome-icon :icon="['fas', 'chevron-right']" /> Todas
        </li>
        <li @click="handleCategoryFilter('urgent')">
          <font-awesome-icon :icon="['fas', 'chevron-right']" /> Urgentes
          <span class="urgent-dot">0</span>
        </li>
        <li @click="handleCategoryFilter('important')">
          <font-awesome-icon :icon="['fas', 'chevron-right']" /> Importantes
          <span class="important-dot">0</span>
        </li>
        <li @click="handleCategoryFilter('other')">
          <font-awesome-icon :icon="['fas', 'chevron-right']" /> Outras
        </li>
        <li @click="handleCompletedFilter">
          <font-awesome-icon :icon="['fas', 'chevron-right']" /> Finalizadas
        </li>
      </ul>
    </div>
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
          v-model="newTaskFilter"
          type="text"
          placeholder="Buscar tarefas"
          name="filter"
          iconClass="magnifying-glass"
          @input="handleSearch"
        />
      </div>
      <!-- Lista de Tarefas -->
      <ul class="task-list">
        <task-card
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          :index="index"
          @editTask="editTaskDialog"
          @deleteTask="openDeleteTaskDialog"
          @set-task-completed="setTaskComplete"
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
let newTaskFilter = null

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
  store.dispatch('tasks/deleteTask', deletingTaskIndex)

  closeDeleteTaskDialog()
}

const setTaskComplete = (index) => {
  store.dispatch('tasks/setTaskCompleted', index)
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

const handleCategoryFilter = (category) => {
  store.dispatch('tasks/updateFilter', newTaskFilter)
  store.dispatch('tasks/updateCategoryFilter', category)
  store.dispatch('tasks/fetchTasks')
}

const handleCompletedFilter = () => {
  store.dispatch('tasks/updateFilter', newTaskFilter)
  store.dispatch('tasks/updateCompletedFilter')
  store.dispatch('tasks/fetchTasks')
}

const handleSearch = () => {
  store.dispatch('tasks/updateFilter', newTaskFilter)
  store.dispatch('tasks/fetchTasks')
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
  display flex
  flex-direction column
  gap 4rem
  align-items center
  justify-content center
  width 100%
  height 100%
  max-width 227px
  background-color brand-gray-100
  overflow hidden
  box-shadow-mixin(0, 2px, 4px, rgba(0, 0, 0, 0.1))
  text-styles(14px, bold, brand-gray-800, 1)

  h2
    color brand-gray-950
    @media (max-width: 1024px)
      display none
  @media (max-width: 1024px)
    height 112px
    max-width 100%

  .tasks-filter
  .filter-list
    width 70%
    display flex
    justify-content center
    align items center
    flex-direction column
    list-style-type none
    padding 0
    margin 0
    svg
      margin-right 8px

    @media (max-width: 1024px)
      flex-direction row
      flex-wrap wrap

    li
      cursor pointer
      padding 8px
      margin 10px 0
      border-radius 5px
      background-color brand-gray-100
      transition background-color 0.3s
      transition all .3s ease

      .urgent-dot
        padding 4px 7px
        background-color brand-red-500
        border-radius 100%
        text-styles(11px, 700, white, 1)

      .important-dot
        padding 4px 7px
        background-color brand-yellow-500
        border-radius 100%
        text-styles(11px, 700, white, 1)


      @media (max-width: 425px)
        margin 0


      &:hover
        color brand-blue-500

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
