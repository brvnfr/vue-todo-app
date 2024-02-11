<template>
  <ul class="task-list">
    <task-card
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      :index="index"
      :showDropdown="showDropdown"
      @toggle-dropdown="toggleDropdown"
    />
  </ul>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'

const props = defineProps(['tasks', 'showDropdown'])
const emit = defineEmits()

const toggleDropdown = (index) => {
  emit('toggle-dropdown', index)
}
</script>

<style scoped></style>
