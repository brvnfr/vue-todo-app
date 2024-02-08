<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :id="name"
      :value="modelValue"
      :style="{ width: width }"
      class="form-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps(['type', 'width', 'label', 'name', 'modelValue'])
</script>

<style scoped></style>
