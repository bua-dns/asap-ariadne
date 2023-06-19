<script setup>
import { RouterLink, RouterView } from "vue-router";
import PageHeader from '@/components/parts/Header.vue';
import PageFooter from '@/components/parts/Footer.vue';
</script>

<template>
  <header>
    <PageHeader />
  </header>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
  <footer v-if="false">
    <PageFooter />
  </footer>
</template>

<style lang="scss" scoped>

</style>
