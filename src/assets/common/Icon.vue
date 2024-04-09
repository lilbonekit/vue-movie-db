<template>
  <component
    class="icon" 
    :is="iconComponent"
  />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { ICON_NAMES } from '@/js/const/icons.const'
import { oneOf } from '@/js/helpers/type-validators'
import upperFirst from 'lodash/upperFirst'

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: oneOf(ICON_NAMES),
  }
})

const iconComponent = defineAsyncComponent(() =>
  import(`@/assets/icons/${upperFirst(props.name)}-icon.vue`)
)
</script>

<style lang="scss" scoped>
.icon {
  display: block;
}
</style>
