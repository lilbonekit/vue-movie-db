import { defineStore } from 'pinia'
import _isEqual from 'lodash/isEqual'
import _debounce from 'lodash/debounce'
import { useLibraryStore } from '@/stores/libraryStore'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { apiConfig } from '@/api/api'
import { useI18n } from 'vue-i18n'

import { MovieRecord } from '@/js/records/movie.record'

export const useSearchStore = defineStore('searchStore', () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()
  const libraryStore = useLibraryStore()

  const isLoading = ref(false)
  const isLoadingFailed = ref(false)
  const currentPage = ref(route.query.page || 1)
  const query = ref(route.query.query || '')
  const totalPages = ref(4)
  const isScrolled = ref(true)

  const endpoint = computed(() => 
    route.query.query 
      ? `${apiConfig.baseUrl}search/movie?page=${currentPage.value}&query=${query.value}&api_key=${apiConfig.apiKey}`
      : `${apiConfig.baseUrl}discover/movie?page=${currentPage.value}&api_key=${apiConfig.apiKey}`
  )

  const loadMovies = _debounce(async () => {
    try {
      isLoading.value = true
      const res = await fetch(endpoint.value)
      const data = await res.json()
      const records = data.results.map(item => new MovieRecord(item, t))
      addToLibraryStore(records)
      totalPages.value = data.total_pages
      isScrolled.value = false
    } catch {
      isLoadingFailed.value = false
    }
    isLoading.value = false
  }, 1000)

  const increasePage = () => {
    if(currentPage.value < totalPages.value) {
      currentPage.value++
    }
    router.push({ query: { ...route.query, page: currentPage.value } })
  }

  const resetPage = () => {
    currentPage.value = 1
    router.push({ query: { ...route.query, page: currentPage.value } })
  }

  const updateIsScrolled = (newValue) => {
    isScrolled.value = newValue
  }

  const onIsScrolledChanged = () => {
    if (isScrolled.value) {
      increasePage()
      loadMovies()
    }
  }

  const addToLibraryStore = (newMovies) => {
    newMovies.forEach(movie => {
      if (!libraryStore.movies.some(existingMovie => _isEqual(existingMovie, movie))) {
        libraryStore.addMovie(movie)
      }
    })
  }

  const onQueryChange = _debounce((newValue) => {
    query.value = newValue
    libraryStore.movies = []
    // HACK! resetPage() doesn't update page query correctly
    currentPage.value = 1
    router.push({ query: { page: 1, query: query.value } })
  }, 500)

  const onUrlQueryChange = () => {
    loadMovies()
  }
  
  watch(isScrolled, onIsScrolledChanged)
  watch(query, onQueryChange)
  watch(() => route.query.query, onUrlQueryChange)

  return {
    isLoading,
    isLoadingFailed,
    loadMovies,
    updateIsScrolled,
    resetPage,
    onQueryChange
  }
})