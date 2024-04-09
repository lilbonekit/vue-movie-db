<template>
  <div class="app-tabs">
    <template v-if="tabsLinks.length">
      <app-button
        v-for="(tab, index) in tabsLinks"
        class="app-tabs__button"
        :key="index"
        :text="tab.text"
        :route="tab.route"
        :class="[
          {
            'app-tabs__button--full': isFullSize,
          }
        ]"
      />
    </template>
    <template v-else>
      <app-button
        v-for="(tab, index) in tabsText"
        class="app-tabs__button"
        :key="index"
        :text="tab.text"
        :class="[
          {
            'app-tabs__button--full': isFullSize,
            'app-tabs__button--selected': tab.value === value
          }
        ]"
        @click="selectTab(tab.value)"
      />
    </template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import AppButton from '@/assets/common/AppButton.vue'

const emit = defineEmits(['input'])

const props = defineProps({
    value: { type: [String, Number], default: '' },
    isFullSize: { type: Boolean, default: true },
    tabsText: { type: Array, default: () => [] },
    tabsLinks: { type: Array, default: () => [] },
})

const selectTab = (tab) => {
  emit('input', tab)
}
</script>

<style lang="scss" scoped>
.app-tabs {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  overflow-x: auto;
  overflow-y: hidden;

  ::-webkit-scrollbar-thumb {
    height: toRem(2);
  }
}

.app-tabs__button {
  border-radius: 0;
  border-bottom: var(--app-tab-border);
  --app-tab-border: #{toRem(1)} solid var(--border-primary-main);
  --app-button-text: var(--text-secondary-main);
  padding: toRem(14) toRem(24);
  white-space: nowrap;
  font-weight: 400;
  height: toRem(48);

  &:hover {
    background: var(--background-secondary-light);
  }

  &:active {
    border-bottom: var(--app-tab-border);
  }

  &.router-link-active,
  &--selected {
    font-weight: 700;
    --app-tab-border: #{toRem(1)} solid var(--primary-main);
  }

  &--full {
    width: 100%;
  }
}
</style>
