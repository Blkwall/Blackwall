<script lang="tsx" setup>
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
</script>

<template>
  <div>
    <div class="p-8">
      <ProjectsGrid :images="images" />
    </div>
    <ProjectsLightbox v-if="false" :image="images[0]" />
  </div>
</template>
