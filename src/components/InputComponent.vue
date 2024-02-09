<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :id="name"
      :value="modelValue"
      :style="{ height: customHeight }"
      class="form-input"
      @input="$emit('update:modelValue', $event.target.value)"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script setup>
const props = defineProps(['type', 'customHeight', 'label', 'name', 'modelValue', 'autocomplete'])
</script>

<style scoped lang="stylus">
@import '.././styles/variables.styl'
.form-group 

  label
    text-styles(14px, 600, brand-gray-800, 1)

  .form-input
    width -webkit-fill-available
    margin: 4px 0; 
    padding 16px
    border-radius 5px
    transition all 0.3s ease
    border 2px solid brand-gray-300
    outline none !important

    &:focus, &:hover
      border 2px solid brand-blue-500 


    
</style>
