<script lang="tsx" setup>
defineProps<{
  url: string;
}>();

const video = ref<null | HTMLDivElement>(null);
const ratio = ref(0);

const onRatio = (val: number) => {
  ratio.value = val;
  onReize();
  window.addEventListener("resize", onReize);
};

const videoReady = ref(false);

const onReize = () => {
  if (video.value) {
    const maxHeight = window.innerHeight - 140;
    // change video.value width to fit the screen using the aspect-ratio
    if (ratio.value !== 0) {
      const width = Math.min(
        maxHeight * ratio.value,
        window.innerWidth - (window.innerWidth > 768 ? 180 : 0)
      );
      video.value.style.width = Math.min(width, maxHeight * ratio.value) + "px";
      videoReady.value = true;
    }
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", onReize);
});
</script>

<template>
  <div ref="video" class="w-full mx-auto overflow-hidden">
    <Video
      ref="video"
      class="w-full transition-opacity duration-300 opacity-0 delay-50"
      :class="{ 'opacity-100': videoReady }"
      :url="url"
      :actual-ratio="true"
      @ratio="onRatio"
    />
  </div>
</template>
