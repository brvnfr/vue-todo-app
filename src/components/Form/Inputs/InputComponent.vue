<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <div class="input-container">
      <input
        :type="type"
        :id="name"
        :value="modelValue"
        :style="{ height: customHeight }"
        :placeholder="placeholder"
        class="form-input"
        @input="$emit('update:modelValue', $event.target.value)"
        :autocomplete="autocomplete"
      />
      <font-awesome-icon v-if="iconClass" :icon="['fas', iconClass]" />
    </div>
  </div>
</template>

<script setup>
const { type, customHeight, label, placeholder, name, modelValue, autocomplete, iconClass } =
  defineProps([
    'type',
    'customHeight',
    'label',
    'placeholder',
    'name',
    'modelValue',
    'autocomplete',
    'iconClass',
  ])
</script>

<style scoped lang="stylus">
@import '../../../styles/variables.styl'

.form-group
  label
    text-styles(14px, 600, brand-gray-800, 1)

.input-container
  position: relative

svg
  color brand-gray-300
.form-input
  background none
  width -webkit-fill-available
  margin: 4px 0;
  padding 1.5rem 1rem
  border-radius 5px
  transition all 0.3s ease
  border 2px solid brand-gray-300
  outline none !important

  &:focus, &:hover
    border 2px solid brand-blue-500

  &:focus-within, &:hover
    + svg
      color brand-blue-500

  &::placeholder
    text-styles(14px, 600, brand-gray-300, 1)

svg
  height 25px
  width 25px
  position absolute
  top 50%
  transform: translateY(-50%)
  transition all 0.3s ease
  right: 20px
</style>
