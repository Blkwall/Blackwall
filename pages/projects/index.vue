<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const images = [
  "/images/TA_fashion_2021_12_a.jpg",
  "/images/TA_fashion_2021_13 copy.jpg",
  "/images/TA_fashion_2021_17_b.jpg",
  "/images/TA_fashion_2021_19.jpg",
  "/images/TA_portrait_2021_19.jpg",
  "/images/TA_FX_2021_15.jpg",
  "/images/TA_FX_2021_26_a.jpg",
  "/images/TA_portrait_2021_22copy.jpg",
];

const activeImage = ref<string | null>(null);
const onImageClick = async (image: string) => {
  store.blurModalActive = true;
  await nextTick();
  activeImage.value = image;
};

watchEffect(() => {
  if (!store.blurModalActive) activeImage.value = null;
});
</script>

<template>
  <div class="p-8">
    <div class="relative z-10 pb-4 bg-black">
      <ProjectsGrid @image-click="onImageClick" :images="images" />
    </div>
    <div class="sticky bottom-0 flex items-center justify-center w-full py-24">
      <span class="tracking-wide">Creative Duo</span>
    </div>
  </div>

  <ClientOnly>
    <Teleport :disabled="!activeImage" :to="store.blurModalEl">
      <ProjectsLightbox v-if="activeImage" :image="activeImage" />
    </Teleport>
  </ClientOnly>
</template>
