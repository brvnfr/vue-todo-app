<template>
  <button :type="type" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
const { props, emit } = defineProps(['type'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="stylus"></style>
