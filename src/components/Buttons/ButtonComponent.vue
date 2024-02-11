<template>
  <button
    :class="buttonClass"
    :style="{ width: fullWidth ? '100%' : '120px' }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { buttonType, fullWidth } = defineProps(['buttonType', 'fullWidth'])
const emit = defineEmits(['click'])

const handleClick = () => {
  if (buttonType !== 'disabled') {
    emit('click')
  }
}

const buttonClass = {
  button: true,
  primary: buttonType === 'primary',
  warning: buttonType === 'warning',
  danger: buttonType === 'danger',
  info: buttonType === 'info',
  disabled: buttonType === 'disabled',
}
</script>

<style scoped lang="stylus">
@import '../.././styles/variables.styl'

.button
  border-radius 5px
  border none
  padding 1rem
  cursor pointer
  transition all .5s ease
  text-styles(16px, bold, #fff, 1)
  background-color brand-blue-500
  &:hover
   background-color darken(brand-blue-500, 10%)


.primary
  background-color brand-green-500
  color white
  &:hover
   background-color darken(brand-green-500, 10%)

.warning
  background-color brand-yellow-500
  color white
  &:hover
   background-color darken(brand-yellow-500, 10%)

.danger
  background-color brand-red-500
  color white
  &:hover
   background-color darken(brand-red-500, 10%)

.info
  background-color brand-gray-500
  color white
  &:hover
   background-color darken(brand-gray-500, 10%)

.disabled
  background-color brand-gray-500
  color brand-gray-700
</style>
