<script lang="tsx" setup>
const props = defineProps<{
  url: string;
  inView: boolean;
  preview: string;
}>();

const video = ref<HTMLVideoElement>();
const inViewTimer = ref<NodeJS.Timeout | null>(null);
const inViewLocal = ref(false);

watch(
  () => props.inView,
  () => {
    if (props.inView) {
      inViewTimer.value = setTimeout(async () => {
        inViewLocal.value = true;
        await nextTick();
        video.value?.play();
      }, 500);
    } else {
      inViewLocal.value = false;
      if (inViewTimer.value) clearTimeout(inViewTimer.value);
    }
  }
);
</script>

<template>
  <div class="relative cursor-pointer">
    <prismic-image
      :class="{
        'opacity-0': inViewLocal,
        'opacity-100': !inViewLocal,
      }"
      class="w-full"
      :field="preview"
    />

    <div
      v-if="inViewLocal"
      class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
    >
      <video
        class="absolute top-0 z-10 w-full h-full"
        ref="video"
        muted
        playsinline
        autoplay
        loop
      >
        <source :src="url" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
