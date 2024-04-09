<template>
  <header-app/>
  <div class="test landing__inner">
    <router-view/>
   <scroll-top-button/>
  </div>
</template>

<script setup>
import HeaderApp from '@/assets/common/HeaderApp.vue'
import ScrollTopButton from '@/assets/common/ScrollTopButton.vue'
</script>
