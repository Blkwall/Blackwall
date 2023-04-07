<script lang="tsx" setup>
defineProps<{
  url: string;
}>();
const loaded = ref(false);
const video = ref<HTMLVideoElement>();

onMounted(async () => {
  loaded.value = true;
});
</script>

<template>
  <div class="cursor-pointer">
    <video
      ref="video"
      class="transition-all duration-500"
      :class="{
        'opacity-0': !loaded,
        'opacity-100': loaded,
      }"
      muted
      autoplay
      playsinline
      loop
    >
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>
