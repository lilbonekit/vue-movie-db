<template>
  <error-message v-if="isLoadingFailed"/>
  <template v-if="!isLoadingFailed">
    <no-data-message v-if="!movies.length"/>
    <div v-else class="movie-list">
      <movie-card 
        v-for="movie in movies" 
        :movie="movie"
        :key="movie.id"
      />
    </div>
  </template>
  <loader v-if="isLoading"/>
</template>

<script setup>
import { defineProps } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import Loader from '@/assets/common/Loader.vue'
import ErrorMessage from '@/assets/common/ErrorMessage.vue'
import NoDataMessage from '@/assets/common/NoDataMessage.vue'

const props = defineProps({
  isLoadingFailed: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  movies: { type: Array, default: [] }
})
</script>

<style lang="scss" scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(toRem(250), 1fr));
  gap: toRem(20);
  margin: toRem(60)0 toRem(5) 0;
  min-height: 10vh;
}
</style>
