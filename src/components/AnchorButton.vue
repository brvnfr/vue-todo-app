<template>
  <button @click="openDialog" class="anchor-button">
    <font-awesome-icon :icon="['fas', 'plus']" />
  </button>
</template>

<script setup>
const { ref } = defineProps(['openDialog'])
</script>

<style scoped lang="stylus">
@import '../styles/variables.styl'

.anchor-button
  position fixed
  bottom 24px
  right 24px
  width 77px
  height 77px
  border none
  border-radius 50%
  background-color brand-green-500
  box-shadow-mixin(0, 2px, 4px, rgba(25, 209, 143, 0.5))
  transition all .5s ease
  color #fff
  font-size 32px
  display flex
  align-items center
  justify-content center
  cursor pointer

  &:hover,
  &:focus {
    background-color darken(brand-green-500,10%);
  }

  @media (max-width: 768px)
    width 56px
    height 56px
    bottom 124px
</style>
