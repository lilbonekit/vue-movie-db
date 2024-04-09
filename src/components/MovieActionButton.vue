<template>
  <app-button 
    :scheme="buttonScheme" 
    :text="buttonText"
    @click="libraryStore.addMovieToLibrary(movie)"
  />
</template>

<script setup>
import { useLibraryStore } from '@/stores/libraryStore'
import { computed, defineProps } from 'vue'
import { MY_LIBRARIES } from '@/js/const/films.const'
import { useI18n } from 'vue-i18n'
import { SCHEME } from '@/js/const/buttons.const'
import AppButton from '@/assets/common/AppButton.vue'

const { t } = useI18n()
const libraryStore = useLibraryStore()

const props = defineProps({
  movie: { type: Object, required: true }
})

const buttonScheme = computed(() => 
  props.movie.inMyLibrary === MY_LIBRARIES.watched 
    ? SCHEME.danger
    : SCHEME.primary
)

const buttonText = computed(() => {
  switch (props.movie.inMyLibrary) {
    case MY_LIBRARIES.none: {
      return t(`movie-card.queue`)
    }
    case MY_LIBRARIES.queue: {
      return t(`movie-card.watched`)
    }
    case MY_LIBRARIES.watched: {
      return t(`movie-card.remove`)
    }
  }
})

</script>