<template>
  <h1 class="landing__h1">{{ $t('homepage.title') }}</h1>
  <search-panel/>
  <movie-list 
    :movies="libraryStore.movies"
    :is-loading="searchStore.isLoading"
    :is-loading-failed="searchStore.isLoadingFailed"
  />
  <div ref="target"/>
</template>

<script setup>
import SearchPanel from '@/pages/HomePage/components/SearchPanel.vue'
import MovieList from '@/components/MovieList.vue'
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useSearchStore } from '@/stores/searchStore'
import { useLibraryStore } from '@/stores/libraryStore'

const libraryStore = useLibraryStore()
const searchStore = useSearchStore()

onBeforeMount(() => searchStore.loadMovies())
onUnmounted(() => stop())

const target = ref(null)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    searchStore.updateIsScrolled(isIntersecting)
  },
)
</script>