<template>
  <div class="error-message">
    <icon
      v-if="isIconShown"
      class="error-message__icon"
      :name="'close'"
    />

    <p class="error-message__message">
      <template v-if="message">
        {{ message }}
      </template>
      <template v-else>
        {{ $t('error-message.message') }}
      </template>
    </p>
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ICON_NAMES } from '@/js/const/icons.const'
import Icon from '@/assets/common/Icon.vue'

const props = defineProps({
  iconName: { type: String, default: ICON_NAMES.errorMessage },
  message: { type: String, default: '' },
  isIconShown: { type: Boolean, default: true },
})
</script>

<style lang="scss" scoped>
.error-message {
  max-width: toRem(418);
  width: 100%;
  background-color: var(--background-primary-light);
  padding: toRem(24) toRem(28);
  border-radius: toRem(10);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: toRem(40);
  box-shadow: 0 toRem(1) toRem(22) 0 var(--card-shadow);
  margin: toRem(10) auto;
}

.error-message__message {
  color: var(--text-primary-main);
  text-align: center;

  @include body-text-18;
}

.error-message__icon {
  width: toRem(272);
  height: toRem(202.55);
  color: var(--error-main);
}
</style>
