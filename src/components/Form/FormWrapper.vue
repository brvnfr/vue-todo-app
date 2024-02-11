<template>
  <form class="form-wrapper" @submit.prevent="handleSubmit">
    <h5>
      {{ formTitle }}
    </h5>
    <slot></slot>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const { formTitle } = defineProps(['formTitle'])
const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit')
  }
}

const validateForm = () => {
  return true
}
</script>

<style scoped lang="stylus">
@import '../../styles/variables.styl'
.form-wrapper
  flex-direction:column
  display  flex
  gap 1rem;
  h5
    text-styles(25px, bold, brand-gray-950, 1)
    margin-bottom 36px
</style>
