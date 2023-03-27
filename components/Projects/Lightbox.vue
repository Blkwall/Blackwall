<script lang="tsx" setup>
const video = ref<null | HTMLDivElement>(null);
const ratio = ref(0);
const onRatio = (val: number) => {
  ratio.value = val;
  onReize();
  window.addEventListener("resize", onReize);
};

const onReize = () => {
  if (video.value) {
    const maxHeight = window.innerHeight - 100;
    // change video.value width to fit the screen using the aspect-ratio
    console.log(ratio.value);
    if (ratio.value !== 0) {
      const width = Math.min(maxHeight * ratio.value, window.innerWidth);
      video.value.style.width = Math.min(width, maxHeight * ratio.value) + "px";
    }
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", onReize);
});

defineProps<{
  project: any;
}>();
</script>

<template>
  <!-- Wrapper -->
  <div class="flex flex-col items-center gap-4 bg-opacity-50 fill">
    <!-- Content -->
    <PrismicText :field="project.primary.caption" />
    <div class="relative flex items-center w-full h-full">
      <div
        v-if="project.primary.vimeo_link.url"
        ref="video"
        class="w-full mx-auto"
      >
        <Video
          ref="video"
          class="w-full"
          :url="project.primary.vimeo_link.url"
          :actual-ratio="true"
          @ratio="onRatio"
        />
      </div>

      <PrismicImage
        class="absolute top-0 left-0 object-contain w-full h-full"
        v-for="item in project.items"
        :field="item.image"
      />
    </div>
  </div>
</template>
