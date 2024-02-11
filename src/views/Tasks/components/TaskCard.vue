<!-- eslint-disable vue/no-mutating-props -->
<template>
  <li class="task-card">
    <div class="task-title">
      <div class="task-check">
        <input
          v-model="task.completed"
          type="checkbox"
          :id="'task-checkbox-' + index"
          :value="task.completed"
        />
      </div>
      <div class="task-title">
        {{ task.title }}
      </div>
    </div>
    <div class="category-badge">
      <span
        class="badge"
        :style="{
          backgroundColor: task.category === 'urgent' ? '#FF4874' : '#FFC42E',
        }"
        >{{ task.category }}</span
      >
      <div class="dropdown" ref="dropdownRef" @click="toggleDropdown">
        <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
        <div v-if="showDropdown" class="dropdown-menu">
          <font-awesome-icon
            :icon="['fas', 'ellipsis-vertical']"
            @click="toggleDropdown"
            class="dropdown-icon"
          />
          <button class="dropdown-button" @click="emitEditTask">
            <span class="dot"></span>Editar
          </button>
          <button class="dropdown-button" @click="emitDeleteTask">
            <span class="dot"></span>Excluir
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['task', 'index'])
const emits = defineEmits(['editTask', 'deleteTask'])

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const emitEditTask = () => {
  toggleDropdown()
  emits('editTask', props.index)
}

const emitDeleteTask = () => {
  toggleDropdown()
  emits('deleteTask', props.index)
}
</script>

<style scoped lang="stylus">
@import '../../../styles/variables.styl'
.task-title, .category-badge
  display inline-flex
  align-items center

.task-card
  padding 1.5rem
  margin 0.5rem 0
  border-radius 5px
  display flex
  align-items center
  justify-content: space-between
  background-color white
  overflow auto
  text-align start
  box-shadow-mixin(0, 2px, 4px, rgba(0, 0, 0, 0.1))
  text-styles(16px, 700, brand-gray-800, 1)

  div
    gap 1rem

  ul
    list-style none
    padding 0

  .task-title
    width -webkit-fill-available
    overflow hidden
    text-overflow ellipsis
    text-align start

    @media (max-width: 400px)
      max-width 100px

  .category-badge
    .badge
      margin 0 0.5rem
      padding .25rem 1rem
      background-color brand-gray-200
      border-radius 40px
      text-styles(11px, 700, white, 1)

  .task-header
    display flex
    justify-content space-between
    align-items center
    width 80%

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
</style>
