<template>
  <div
    class="loader"
    :class="{'loader--centered': isPositionCentered}"
  >
    <template v-if="type === SPINNER_TYPE.spinner">
      <spinner />
    </template>
    <template v-else-if="type === SPINNER_TYPE.dot">
      <dot />
    </template>
  </div>
</template>

<script setup>
import Spinner from '@/assets/common/loader/Spinner.vue'
import Dot from '@/assets/common/loader/Dot.vue'
import { SPINNER_TYPE } from '@/js/const/loader.const.js'
import { defineProps } from 'vue'
import { oneOf } from '@/js/helpers/type-validators'

const props = defineProps({
  type: { 
    type: String, 
    default: SPINNER_TYPE.dot, 
    validator: oneOf(SPINNER_TYPE) 
  },
  isPositionCentered: { type: Boolean, default: true }
})
</script>

<style lang="scss" scoped>
.loader {
  display: grid;
  place-items: start;

  &--centered {
    place-items: center;
  }
}
</style>
