<template>
    <div class="search-panel">
      <custom-input 
        v-model:value.trim="searchQuery"
        class="search-panel__input"
        :placeholder="$t('homepage.search-plh')"
        @update:value="onQueryChange"
      />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from '@/assets/common/CustomInput.vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/searchStore'

const { onQueryChange } = useSearchStore()
const route = useRoute()

const searchQuery = ref(route.query.query || '')
</script>

<style lang="scss" scoped>
.search-panel {
  min-width: toRem(350);
  max-width: toRem(750);
  margin: 0 auto;
  margin-top: toRem(50);

  @include respond-to (medium) {
    max-width: unset;
  }
}
</style>