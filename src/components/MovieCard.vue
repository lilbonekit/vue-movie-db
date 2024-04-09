<template>
  <div class="movie-card">
    <div class="movie-card__inner">
      <div class="movie-card__front">
        <img 
          class="movie-card__img" 
          :src="movie.src" 
          :alt="movie.alt"
        >
      </div>
      <div class="movie-card__back">
        <div>
          <img 
            class="movie-card__img movie-card__img--small" 
            :src="movie.src" 
            :alt="movie.alt"
          >
          <div class="movie-card__text">
            <h4 class="movie-card__title"> {{ movie.title }} </h4>
            <p class="movie-card__description"> {{ movie.description }} </p>
          </div>
        </div>
        <div class="movie-card__actions">
          <movie-action-button 
            class="movie-card__button"
            :movie="props.movie"
          />
          <app-button 
            class="movie-card__button" 
            :scheme="SCHEME.secondary" 
            :text="$t('movie-card.more')"
            @click="openModal"
          />
        </div>
      </div>
    </div>
  </div>

  <modal-primary
    :is-open="isModalOpened" 
    @modal-close="closeModal" 
  >
    <movie-modal :movie="movie"/>
  </modal-primary>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/assets/common/AppButton.vue'
import ModalPrimary from '@/assets/common/ModalPrimary.vue'
import { defineProps } from 'vue'
import { SCHEME } from '@/js/const/buttons.const'
import MovieActionButton from '@/components/MovieActionButton.vue'
import MovieModal from '@/components/MovieModal.vue'

const props = defineProps({
  movie: { type: Object, required: true }
})

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
}

</script>

<style lang="scss" scoped>
.movie-card {
  background-color: transparent;
  height: toRem(400);
  overflow: hidden;
  border: toRem(1) solid var(--border-primary-main);
  border-radius: toRem(5);
  perspective: toRem(1000); 
}

.movie-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  &--small {
    max-width: toRem(150);
    max-height: toRem(150);
    border-radius: 100%;
  }
}

.movie-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.movie-card__text {
  text-align: left;
}

.movie-card__title,
.movie-card__description {
  margin-top: toRem(15);

  @include text-ellipsis;
}

.movie-card:hover .movie-card__inner {
  transform: rotateY(180deg);
}

.movie-card__front, .movie-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.movie-card__back {
  padding: toRem(15);
  background-color: var(--background-secondary-main);
  color: var(--text-primary-main);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-card__actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: toRem(5);
  bottom: toRem(20);
}

.movie-card__button {
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>