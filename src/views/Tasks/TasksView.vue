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
        <h2>Minhas Tarefas</h2>
        <p>
          Olá <strong>Eduardo Pereira da Costa</strong>,
          <span v-if="pendingTasksCount > 0">
            você tem <strong>{{ pendingTasksCount }} tarefas pendentes</strong>
          </span>
          <span v-else> você não tem nenhuma tarefa pendente </span>
        </p>
        <input-component
          v-model="newTaskFilter"
          type="text"
          placeholder="Buscar tarefas"
          name="filter"
          iconClass="magnifying-glass"
          @input="handleSearch"
        />
      </div>
      <div class="task-list">
        <!-- Lista de Tarefas -->
        <ul>
          <task-card
            v-for="(task, index) in tasks"
            :key="index"
            :task="task"
            :index="index"
            @editTask="editTaskDialog"
            @deleteTask="openDeleteTaskDialog"
            @set-task-completed="setTaskComplete(task)"
          />
        </ul>
      </div>

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
    store.dispatch('tasks/fetchTasks')
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
    store.dispatch('tasks/fetchTasks')
  } else {
    console.error('Por favor, preencha todos os campos obrigatórios.')
  }
}

const deleteTask = () => {
  store.dispatch('tasks/deleteTask', deletingTaskIndex)

  closeDeleteTaskDialog()
}

const setTaskComplete = (task) => {
  console.log('dados vindo do checkbox da tarefa', task)
  store.dispatch('tasks/setTaskCompleted', task)
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

const handleSearch = () => {
  store.dispatch('tasks/updateFilter', newTaskFilter)
  store.dispatch('tasks/fetchTasks')
}
const pendingTasksCount = computed(() => {
  return tasks.value.filter((task) => !task.completed).length
})

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
</script>

<style scoped lang="stylus">
@import './TasksView.styl'
</style>
