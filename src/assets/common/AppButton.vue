<template>
  <router-link 
    v-if="route"
    :disabled="isLoading"
    :class="buttonClasses"
    :to="route"
  >
    <icon 
      v-if="icon" 
      class="app-button__icon"
      :name="icon"
    />
    {{ text }}
    <slot/>
  </router-link>
  <button
    v-else
    :disabled="isLoading"
    :class="buttonClasses"
  >
    <icon 
      v-if="icon"
      class="app-button__icon"
      :name="icon"
    />
    {{ text }}
    <slot/>
  </button>
</template>

<script setup>
import { SCHEME } from '@/js/const/buttons.const'
import { defineProps, computed } from 'vue'
import { oneOf } from '@/js/helpers/type-validators'
import Icon from '@/assets/common/Icon.vue'

const props = defineProps({
  scheme: {
      type: String,
      default: SCHEME.default,
      validator: oneOf(SCHEME),
    },
  icon: { type: String, default: '' },
  text: { type: [String, Number], default: '' },
  route: { type: Object, default: null },
  isLoading: { type: Boolean, default: false },
})

const buttonClasses = computed(() => 
  [
    'app-button',
    `app-button--${props.scheme}`,
    ...(props.isLoading ? ['app-button--disabled'] : []),
  ].join(' '))
</script>

<style lang="scss" scoped>
.app-button {
  padding: toRem(10);
  gap: toRem(5);
  display: flex;
  align-items: center;
  border-radius: toRem(5);
  transition: 0.3s all ease;
  height: fit-content;

  &--primary {
    background-color: var(--primary-main);
    color: var(--primary-dark);
    border: toRem(1) solid var(--primary-dark);

    &:hover {
      background-color: var(--primary-light);
    }
  }

  &--secondary {
    border: toRem(1) solid var(--border-primary-dark);

    &:hover {
      background-color: var(--background-secondary-light);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--danger {
   background: var(--error-dark);
   color: var(--text-primary-main);
   border: toRem(1) solid var(--error-dark);

   &:hover {
      background-color: var(--error-main);
      border: toRem(1) solid var(--error-main);
    }
  }
}

.app-button__icon {
  width: toRem(20);
  height: toRem(20);
}

.router-link-active {
  font-weight: 700;
}
</style>