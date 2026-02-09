<script setup lang="ts">
import Navigation from "~/components/Navigation.vue";
</script>

<template>
  <div class="relative">
    <Navigation />
    <div class="p-4 sm:px-12 bg-neutral-100">
      <slot />
    </div>
  </div>
</template>
