<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['buttonText', 'buttonType'])
const emit = defineEmits()

const handleSubmit = () => {
  emit('submit')
}
</script>
