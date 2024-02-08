<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <button-component :type="buttonType" @click="handleButtonClick" type="button">{{
      buttonText
    }}</button-component>
  </form>
</template>

<script setup>
const { emit } = defineProps(['buttonText', 'buttonType'])

const handleSubmit = () => {
  emit('submit')
}

const handleButtonClick = () => {
  emit('buttonClick')
}
</script>
