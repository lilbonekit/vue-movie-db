<template>
  <div class="movie-modal">
    <img
      class="movie-modal__img" 
      :src="movie.src" 
      :alt="movie.alt"
    />
    <div class="movie-modal__content">
      <h2>{{ movie.title }}</h2>
      <p>{{ movie.description }}</p>
      <movie-action-button 
        class="movie-modal__button" 
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import MovieActionButton from '@/components/MovieActionButton.vue'

const props = defineProps({
  movie: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.movie-modal {
  max-width: toRem(700);
  display: flex;
  gap: toRem(20);

  @include respond-to (small) {
    flex-wrap: wrap;
    margin: toRem(15) 0;
  }
}

.movie-modal__img {
  width: toRem(300);
  max-height: toRem(300);
  object-fit: cover;
  border-radius: toRem(5);

  @include respond-to (small) {
    width: 100%;
  }
}

.movie-modal__content {
  display: flex;
  flex-direction: column;
  gap: toRem(10);

  @include respond-to (small) {
    max-height: toRem(300);
    overflow-y: auto;
  }
}

.movie-modal__button {
  width: fit-content;
}
</style>