<script lang="tsx" setup>
import { ThreeInstance } from "~~/composables/threeInstance/index";

const el = ref<HTMLElement>();

onMounted(async () => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }
  const { $dat } = useNuxtApp();
  // Can't attach to ref because of Nuxt issues.
  const threeInstance = await ThreeInstance.load(el.value, [
    "/images/TA_fashion_2021_12_a.jpg",
    "/images/TA_fashion_2021_13 copy.jpg",
    "/images/TA_fashion_2021_17_b.jpg",
    "/images/TA_fashion_2021_19.jpg",
    "/images/TA_FX_2021_15.jpg",
    "/images/TA_FX_2021_26_a.jpg",
    "/images/TA_portrait_2021_19.jpg",
    "/images/TA_portrait_2021_22copy.jpg",
  ]);
  threeInstance.configManager.init($dat);
  threeInstance.tick();
});
</script>

<template>
  <div id="wrapper">
    <div ref="el" class="fixed top-0 left-0 w-full h-full bg-green-100"></div>
  </div>
</template>
