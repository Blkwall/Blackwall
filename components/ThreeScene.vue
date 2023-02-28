<script lang="tsx" setup>
import { ThreeInstance } from "~~/composables/threeInstance/index";

const el = ref<HTMLElement>();

onMounted(async () => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }
  // Can't attach to ref because of Nuxt issues.
  const threeInstance = await ThreeInstance.load(el.value, [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/2.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/4.jpg",
    "/images/4.jpg",
    "/images/4.jpg",
  ]);
  threeInstance.tick();
});
</script>

<template>
  <div id="wrapper">
    <div ref="el" class="fixed top-0 left-0 w-full h-full bg-green-100"></div>
  </div>
</template>
