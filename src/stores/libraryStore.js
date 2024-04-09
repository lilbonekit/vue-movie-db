import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { MY_LIBRARIES } from '@/js/const/films.const'

export const useLibraryStore = defineStore('libraryStore', () => {
  const movies = ref([])
  const moviesQueue = ref([])
  const moviesWatched = ref([])

  if (localStorage.getItem('moviesQueue')) {
    moviesQueue.value = JSON.parse(localStorage.getItem('moviesQueue'))
  }

  if (localStorage.getItem('moviesWatched')) {
    moviesWatched.value = JSON.parse(localStorage.getItem('moviesWatched'))
  }

  watch(moviesQueue, (newValue) => {
    localStorage.setItem('moviesQueue', JSON.stringify(newValue))
  }, { deep: true })

  watch(moviesWatched, (newValue) => {
    localStorage.setItem('moviesWatched', JSON.stringify(newValue))
  }, { deep: true })

  const addMovie = (movie) => {
    movies.value.push(movie)
  }

  const addMovieToLibrary = (movie) => {
    const movieQueueIndex = moviesQueue.value.findIndex(m => m.id === movie.id)
    const movieWatchedIndex = moviesWatched.value.findIndex(m => m.id === movie.id)
  
    switch (movie.inMyLibrary) {
      case MY_LIBRARIES.none: {
        movie.inMyLibrary = MY_LIBRARIES.queue
        if (movieQueueIndex === -1) {
          moviesQueue.value.push(movie)
        }
        break
      }
      case MY_LIBRARIES.queue: {
        movie.inMyLibrary = MY_LIBRARIES.watched
        if (movieQueueIndex !== -1) {
          moviesQueue.value.splice(movieQueueIndex, 1)
        }
        if (movieWatchedIndex === -1) {
          moviesWatched.value.push(movie)
        }
        break
      }
      case MY_LIBRARIES.watched: {
        movie.inMyLibrary = MY_LIBRARIES.none
        if (movieWatchedIndex !== -1) {
          moviesWatched.value.splice(movieWatchedIndex, 1)
        }
        break
      }
    }
  }  

  return {
    movies,
    addMovie,
    moviesQueue,
    moviesWatched,
    addMovieToLibrary
  }
})
