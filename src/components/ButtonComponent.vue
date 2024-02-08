<template>
  <button :type="type" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['type'])
const emit = defineEmits()

const handleClick = () => {
  if (emit) {
    emit('click')
  } else {
    console.error('Error: emit is not defined')
  }
}
</script>

<style scoped lang="stylus"></style>
