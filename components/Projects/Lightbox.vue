<script lang="tsx" setup>
import { useStore } from "~~/store";

defineProps<{
  image: string;
}>();
</script>

<template>
  <!-- Wrapper -->
  <div class="flex flex-col items-center gap-4 p-8 bg-opacity-50 fill">
    <!-- Content -->
    <div>{{ image }}</div>
    <div class="relative w-full h-full">
      <img
        class="absolute top-0 left-0 object-contain w-full h-full"
        :src="image"
      />
    </div>
  </div>
</template>
