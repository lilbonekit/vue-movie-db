<template>
  <app-button
    class="scroll-top-button"
    :scheme="SCHEME.primary"
    :icon="icons.chevronUp"
    :class="{'scroll-top-button--active': isVisible}"
    @click="scrollToTop"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { SCHEME } from '@/js/const/buttons.const'
import AppButton from '@/assets/common/AppButton.vue'


const isVisible = ref(false)
const icons = inject('icons')

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleOnScroll = () => {
  isVisible.value = window.scrollY >= window.innerHeight
}

onMounted(() => {
  window.addEventListener('scroll', handleOnScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleOnScroll)
})
</script>

<style lang="scss" scoped>
.scroll-top-button {
  border-radius: 100%;
  position: fixed;
  bottom: toRem(20);
  padding: toRem(15);
  right: toRem(20);
  transform: translateX(200%);
  transition: 0.5s all ease;

  &--active {
    transform: translateX(0);
  }
}
</style>
