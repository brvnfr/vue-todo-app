<!-- TextAreaComponent.vue -->
<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <textarea
      :id="name"
      :value="modelValue"
      :rows="rows"
      @input="updateModelValue"
      class="form-input"
    ></textarea>
  </div>
</template>

<script setup>
const { label, name, modelValue, rows } = defineProps(['label', 'name', 'modelValue', 'rows'])
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped lang="stylus">
@import '.././styles/variables.styl'

.form-group
  label
    text-styles(14px, 600, brand-gray-800, 1)

  .form-input
    min-height 150px
    width -webkit-fill-available
    margin 4px 0
    padding 16px
    border-radius 5px
    transition all 0.3s ease
    border 2px solid brand-gray-300
    outline none !important

    &:focus, &:hover
      border 2px solid brand-blue-500
</style>
