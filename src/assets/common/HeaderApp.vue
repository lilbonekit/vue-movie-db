<template>
  <header class="header-app">
    <app-button class="header-app__logo" :route="routes.home">
      <icon class="header-app__logo-icon" :name="icons.movie"/>
      <span class="header-app__logo-title">{{ $t('header.title') }}</span>
    </app-button>
    <nav v-if="!isMobile" class="header-app__nav">
      <app-button :text="$t('header.home')" :route="routes.home"/>
      <app-button :text="$t('header.my-films')" :route="routes.myFilms"/>
    </nav>
   <div class="header-app__buttons">
      <app-button
        class="header-app__burger"
        v-if="isMobile"
        :scheme="SCHEME.secondary" 
        :icon="icons.burger"
        @click="toggleMenu"
      >
        <transition name="header-app__menu">
          <nav 
            v-if="isMobile && isMenuActive" 
            ref="target" 
            class="header-app__menu"
          >
            <app-button :text="$t('header.home')" :route="routes.home"/>
            <app-button :text="$t('header.my-films')" :route="routes.myFilms"/>
          </nav>
        </transition>
      </app-button>
      <app-button
        :scheme="SCHEME.secondary" 
        :icon="icons.planet"
        :text="$t('header.lang')"
        @click="switchLang"
      />
   </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Icon from '@/assets/common/Icon.vue'
import AppButton from '@/assets/common/AppButton.vue'
import { useI18n } from 'vue-i18n'
import { SCHEME } from '@/js/const/buttons.const'
import { LANGS } from '@/js/const/langs.const'
import { DEVICES_WIDTH } from '@/js/const/device.const'
import { onClickOutside } from '@vueuse/core'

const { locale } = useI18n({ useScope: 'global' })
const icons = inject('icons')
const routes = inject('routes')

const switchLang = () => {
  locale.value = locale.value === LANGS.ru 
    ? LANGS.en 
    : LANGS.ru
  localStorage.setItem('lang', locale.value)
}

const isMobile = ref(window.innerWidth < DEVICES_WIDTH.small)
const isMenuActive = ref(false)

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const closeMenu = () => {
  isMenuActive.value = false
}

const onMobileDetected = () => {
  isMobile.value = window.innerWidth < DEVICES_WIDTH.small
}

onMounted(() => {
  window.addEventListener('resize', onMobileDetected)
})

onUnmounted(() => {
  window.removeEventListener('resize', onMobileDetected)
})

const target = ref(null)
onClickOutside(target, () => closeMenu())
</script>

<style lang="scss" scoped>
.header-app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: toRem(20);
}

.header-app__buttons {
  display: flex;
  gap: toRem(10);
}

.header-app__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: toRem(10);
}

.header-app__logo-title {
  font-weight: 700;
  
  @include body-text-20;
}

.header-app__logo-icon {
  width: toRem(40);
  height: toRem(40);
}

.header-app__language {
  display: flex;
  align-items: center;
}

.header-app__language-txt {
  font-weight: 700;
}

.header-app__nav {
  display: flex;
  align-self: center;
}

.header-app__burger {
  position: relative;
}

.header-app__menu {
  border-radius: toRem(5);
  padding: toRem(5);
  border: toRem(1) solid var(--border-primary-dark);
  background: var(--background-primary-main);
  position: absolute;
  top: 150%;
  white-space: nowrap;
  left: 0;
}

.header-app__menu-enter-active {
  animation: dropdown var(--field-transition-duration);
}

.header-app__menu-leave-active {
  animation: dropdown var(--field-transition-duration) 0.1s reverse;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(20%);
    max-height: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500%;
  }
}
</style>