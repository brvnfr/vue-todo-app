<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :id="name"
      :value="value"
      @input="$emit('update:value', $event)"
      :style="{ width: width }"
      class="form-input"
    />
  </div>
</template>

<script setup>
const { props } = defineProps(['type', 'width', 'value', 'label', 'name'])
</script>

<style scoped lang="stylus"></style>
