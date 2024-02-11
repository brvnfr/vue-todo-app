<template>
  <div class="dropdown" @click="toggleDropdown">
    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
    <div v-if="showDropdown" class="dropdown-menu">
      <font-awesome-icon
        icon="fa-solid fa-ellipsis-vertical"
        class="dropdown-icon"
        @click="toggleDropdown"
      />
      <button class="dropdown-button" @click="editTaskDialog"><span class="dot"></span>Edit</button>
      <button class="dropdown-button" @click="deleteTask"><span class="dot"></span>Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['showDropdown'])
const emit = defineEmits()

const toggleDropdown = () => {
  emit('toggle-dropdown')
}

const editTaskDialog = () => {
  emit('edit-task-dialog')
}

const deleteTask = () => {
  emit('delete-task')
}
</script>

<style scoped></style>
