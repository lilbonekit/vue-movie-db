<template>
  <label>
    {{ label }}
    <input 
      class="custom-input"
      v-model="value" 
      :type="inputType"
      :placeholder="placeholder"
    />
  </label>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const value = defineModel('value')

const props = defineProps({
  inputType: { type: String, default: 'text' },
  label: { type: String, default: ''},
  placeholder: { type: String, default: ''}
})
</script>

<style lang="scss" scoped>
.custom-input {
  padding: toRem(15);
  border-radius: toRem(5);
  outline: none;
  background: transparent;
  border: toRem(1) solid var(--border-primary-main);
  width: 100%;
}
</style>