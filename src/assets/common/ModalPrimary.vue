<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container" ref="target">
          <div class="modal__header">
            <app-button 
              class="modal__close"
              :icon="icons.close"
              @click.stop="emit('modal-close')"
            />
            <slot name="header"/>
          </div>
          <div class="modal__body">
            <slot/> 
          </div>
          <div class="modal__footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, inject } from 'vue'
import { onClickOutside } from '@vueuse/core'
import AppButton from '@/assets/common/AppButton.vue'

const icons = inject('icons')

const props = defineProps({
  isOpen: Boolean,
  default: false
});

const emit = defineEmits(['modal-close'])

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

</script >

<style lang="scss" scoped>
.modal__mask {
  position: fixed;
  z-index: var(--z-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-background);

  @include respond-to (small) {
    align-items: flex-start;
  }
}

.modal__wrapper {
  @include respond-to (small) {
    width: 100%;
  }
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
}

.modal__header {
  display: flex;
  justify-content: flex-end;
}

.modal__container {
  position: relative;
  min-width: toRem(700);
  margin: toRem(150) auto;
  padding: toRem(20);
  background-color: var(--background-primary-main);
  border-radius: toRem(5);
  box-shadow: var(--modal-box-shadow);
  max-height: toRem(600);
  overflow-y: auto;

  @include respond-to (medium) {
    min-width: toRem(300);
  }

  @include respond-to (small) {
    margin: auto;
    max-height: unset;
    width: 100%;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.25s ease-in-out;
  transition-property: opacity, transform;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>