<template>
  <section>
    <div class="tasks-filter"></div>
    <div class="tasks-content">
      <!-- Lista de Tarefas -->
      <ul>
        <li v-for="(task, index) in tasks" :key="index" class="task-card">
          <!-- <button @click="editTaskDialog(index)">Editar</button>
            <button @click="deleteTask(index)">Excluir</button> -->
          <div class="task-check">
            <input
              v-model="task.completed"
              type="checkbox"
              id="task-checkbox"
              :value="task.completed"
            />
          </div>

          <div class="task-description">
            {{ task.description }}
          </div>
          <div class="category-badge">
            <span>{{ task.category }}</span>
          </div>
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
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
import AnchorButton from '@/components/Buttons/AnchorButton.vue'
import DialogOverlay from '@/components/DialogOverlay.vue'
import ButtonComponent from '@/components/Buttons/ButtonComponent.vue'
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
@import '../styles/variables.styl'

section
  display flex
  flex-direction column
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%

.tasks-filter
.tasks-content


  .task-check
    height 32px
    width 32px

    input[type=checkbox] {
      position: relative;
      border: 2px solid white;
      border-radius: 5px;
      background: brand-gray-200;
      cursor: pointer;
      line-height: 0;
      margin: 0 .6em 0 0;
      outline: 0;
      padding: 0 !important;
      vertical-align: text-top;
      height: 32px;
      width: 32px;
      -webkit-appearance: none;
      /* Removed opacity: .5; */
    }

    input[type=checkbox]:hover {
      opacity: 1;
    }

    input[type=checkbox]:checked {
      background-color: brand-green-500;
      opacity: 1;
    }

    input[type=checkbox]:before {
      content: '';
      position: absolute;
      right: 50%;
      top: 50%;
      width: 6px;
      height: 14px;
      border: solid brand-gray-200;
      border-width: 0 3px 3px 0;
      margin: -1px -1px 0 -1px;
      transform: rotate(45deg) translate(-50%, -50%);
      z-index: 2;
    }



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
    margin .5rem
    padding 1.5rem
    display flex
    justify-content space-between
    text-styles(16px, 700, brand-gray-800, 1)
    text-align start


    .task-description
      max-width: 250px
      overflow: hidden;
      text-overflow ellipsis
      text-align start


    .task-header
      display flex
      justify-content space-between
      align-items center
      width 80%
</style>
