<script lang="tsx" setup>
import { ThreeInstance } from "~~/composables/threeInstance/index";

const el = ref<HTMLElement>();
const loading = ref(true);
let threeInstance: ThreeInstance | null;
onMounted(async () => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }
  const { $dat } = useNuxtApp();
  // Can't attach to ref because of Nuxt issues.
  if (threeInstance?.stats) {
    threeInstance.stats.domElement.remove();
  }

  threeInstance = await ThreeInstance.load(el.value, [
    "/videos/testVideo.mp4",
    "/images/TA_fashion_2021_12_a.jpg",
    "/images/TA_fashion_2021_13 copy.jpg",
    "/images/TA_fashion_2021_17_b.jpg",
    "/videos/file_example_MP4_640_3MG.mp4",
    "/videos/testVideo.mp4",
    "/videos/file_example_MP4_640_3MG.mp4",
    "/images/TA_fashion_2021_19.jpg",
    "/images/TA_FX_2021_15.jpg",
    "/images/TA_FX_2021_26_a.jpg",
    "/images/TA_portrait_2021_19.jpg",
    "/images/TA_portrait_2021_22copy.jpg",
  ]);
  // threeInstance.configManager.init($dat);
  threeInstance.tick();

  loading.value = false;
});

onBeforeUnmount(() => {
  if (!threeInstance) {
    return;
  }
  threeInstance.destroy();
  threeInstance = null;
});
</script>

<template>
  <div id="wrapper">
    <div v-if="loading" class="fixed z-20 text-white fill fill-center">
      Loading...
    </div>
    <div ref="el" class="fixed top-0 left-0 w-full h-full bg-black"></div>
  </div>
</template>
