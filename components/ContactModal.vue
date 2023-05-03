<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
</script>

<template>
  <div
    class="absolute flex flex-wrap items-center justify-between w-full h-full gap-8 p-12 text-center uppercase lg:flex-nowrap fill"
  >
    <div class="w-full">Creative Duo</div>
    <div class="w-full">Studio@blackwall.com</div>
    <div class="w-full">Vimeo @blackwall</div>
    <div class="w-full">Follow on Instagram</div>
  </div>
</template>
