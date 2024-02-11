<template>
  <li class="task-card">
    <div class="task-title">
      <div class="task-check">
        <input v-model="task.completed" type="checkbox" :id="checkboxId" />
      </div>
      <div class="task-description">
        {{ task.title }}
      </div>
    </div>
    <div class="category-badge">
      <span>{{ task.category }}</span>
      <dropdown-menu :showDropdown="showDropdown" @toggleDropdown="toggleDropdown" />
    </div>
  </li>
</template>

<script setup>
import DropdownMenu from '@/components/DropdownMenu.vue'

const props = defineProps(['task', 'index', 'showDropdown'])
const checkboxId = `task-checkbox-${props.index}`

const toggleDropdown = () => {
  emit('toggle-dropdown', props.index)
}
</script>

<style scoped></style>
