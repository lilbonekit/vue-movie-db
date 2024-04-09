<template>
  <h1 class="landing__h1">{{ $t('my-films.title') }}</h1>
  <app-tabs class="my-films-page-tabs" :tabs-links="tabsLinks"/>
  <router-view/>
</template>

<script setup>
import { computed, inject } from 'vue'
import AppTabs from '@/assets/common/AppTabs.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const routes = inject('routes')
const tabsLinks = computed(() => [
  {
    text: t('my-films.queue'),
    route: routes.queue,
  },
  {
    text: t('my-films.watched'),
    route: routes.watched,
  },
])
</script>

<style lang="scss" scoped>
.my-films-page-tabs {
  margin-top: toRem(60);
}
</style>