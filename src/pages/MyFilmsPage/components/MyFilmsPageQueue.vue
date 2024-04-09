<template>
  <h2 class="my-films-page-queue">{{ $t('queue.title') }}</h2>
  <movie-list :movies="libraryStore.moviesQueue"/>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue'
import { useLibraryStore } from '@/stores/libraryStore'
const libraryStore = useLibraryStore()
</script>

<style lang="scss" scoped>
.my-films-page-queue {
  text-align: center;
  margin-top: toRem(60);
}
</style>