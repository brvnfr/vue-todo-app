<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <textarea :id="name" :value="modelValue" :rows="rows" @input="updateModelValue"></textarea>
  </div>
</template>

<script setup>
const { label, name, modelValue, rows } = defineProps(['label', 'name', 'modelValue', 'rows'])
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
/* Seu estilo personalizado para TextAreaComponent */
</style>
