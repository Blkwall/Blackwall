<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
</script>

<template>
  <div
    class="absolute items-center justify-between hidden gap-8 p-12 uppercase lg:flex fill"
  >
    <div class="text-center">Creative Duo</div>
    <div class="text-center">Studio@blackwall.com</div>
    <div class="text-center">Vimeo @blackwall</div>
    <div class="text-center">Follow on Instagram</div>
  </div>
  <div
    class="absolute flex flex-wrap w-full gap-8 p-12 uppercase lg:hidden fill"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-center">Creative Duo</div>
      <div class="text-center">Studio@blackwall.com</div>
    </div>
    <div class="flex items-center justify-between w-full">
      <div class="text-center">Vimeo @blackwall</div>
      <div class="text-center">Follow on Instagram</div>
    </div>
  </div>
</template>
