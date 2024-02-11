<template>
  <div class="form-group">
    <label>{{ label }}</label>

    <label v-for="(option, index) in options" :key="index">
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="updateModelValue(option.value)"
      />
      <span>
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { label, name, modelValue, options } = defineProps(['label', 'name', 'modelValue', 'options'])
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="stylus">
@import '../../../styles/variables.styl'

.form-group label
  display inline-flex
  align-items center
  text-styles(14px, 600, brand-gray-800, 1);

input[type="radio"]
  margin-left 8px
  height 25px
  width 25px
  outline 2px auto brand-gray-300

  &:checked, &:focus
    outline 2px auto brand-blue-500

span
  margin-left .5rem
</style>
