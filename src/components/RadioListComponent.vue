<!-- RadioListComponent.vue -->
<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div>
      <label v-for="(option, index) in options" :key="index">
        <input
          type="radio"
          :name="name"
          :value="option.value"
          v-model="selectedValue"
          @change="updateModelValue"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { label, name, modelValue, options } = defineProps(['label', 'name', 'modelValue', 'options'])
const emit = defineEmits(['update:modelValue'])

const selectedValue = modelValue

const updateModelValue = () => {
  emit('update:modelValue', selectedValue)
}
</script>

<style scoped lang="stylus">
@import '.././styles/variables.styl'

.form-group label
 text-styles(14px, 600, brand-gray-800, 1);
</style>
