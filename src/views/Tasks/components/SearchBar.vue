<template>
  <div class="search-bar">
    <input-component v-bind="inputProps" />
  </div>
</template>

<script setup>
import InputComponent from '@/components/Form/Inputs/InputComponent.vue'

const inputProps = {
  type: 'text',
  placeholder: 'Search tasks',
  name: 'title',
  iconClass: 'magnifying-glass',
}
</script>
