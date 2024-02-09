<template>
  <div v-if="showOverlay" class="dialog-overlay">
    <div class="dialog-content">
      <button @click="closeDialog" class="close-button">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showOverlay: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="stylus">
@import '.././styles/variables.styl'

.dialog-overlay
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.5)
  display flex
  align-items center
  justify-content center


.dialog-content
  background #fff
  padding 20px
  border-radius 8px
  position relative


.close-button
  position absolute
  top 10px
  right 10px
  font-size 18px
  cursor pointer
  border none
  background none
  padding 0
</style>
