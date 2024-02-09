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

const props = defineProps(['formTitle'])
const emit = defineEmits()

const handleSubmit = () => {
  emit('submit')
}
</script>
<style scoped lang="stylus">
@import '.././styles/variables.styl'
.form-wrapper 
  h5
    text-styles(18px, bold, brand-gray-950, 1)
    margin-bottom 36px
</style>