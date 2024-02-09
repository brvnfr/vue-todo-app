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

<style scoped lang="stylus">
@import '.././styles/variables.styl'
  
button
  width 100%
  background-color brand-green-500
  border-radius 5px
  color white
  border none
  padding 1.25rem 2rem
  cursor pointer
  transition  all .5s ease
  text-styles(16px, bold, #fff, 1)
  &:hover
    background darken(brand-green-500, 10%)
</style>
