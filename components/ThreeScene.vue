<script lang="tsx" setup>
import { ThreeInstance } from "~~/composables/threeInstance/index";

const el = ref<HTMLElement>();
const loading = ref(true);
let threeInstance: ThreeInstance | null;

const videos = ref([
  "/videos/testVideo.mp4",
  "/videos/3.mp4",
  "/videos/test_1.mp4",
  "/videos/file_example_MP4_640_3MG.mp4",
]);

const video = ref();

onMounted(async () => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }

  await nextTick();
  threeInstance = await ThreeInstance.load(
    el.value,
    [
      "/videos/test_1.mp4",
      "/videos/3.mp4",
      "/images/TA_fashion_2021_12_a.jpg",
      "/videos/testVideo.mp4",
      "/images/TA_fashion_2021_13 copy.jpg",
      "/images/TA_fashion_2021_17_b.jpg",
      "/videos/file_example_MP4_640_3MG.mp4",
      "/images/TA_fashion_2021_19.jpg",
      "/images/TA_FX_2021_26_a.jpg",
    ],
    video.value
  );

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
    <Transition name="fade" mode="out-in">
      <div
        v-if="loading"
        class="fixed z-30 text-white bg-black fill fill-center"
      >
        <div>Loading...</div>
      </div>
    </Transition>
    <div v-for="video in videos" :key="video">
      <video
        ref="video"
        class="hidden"
        :src="video"
        :data-id="video"
        muted
        autoplay
        loop
        playsinline="true"
      ></video>
    </div>
    <div ref="el" class="fixed top-0 left-0 z-20 w-full h-full"></div>
    <div class="fixed z-10 fill fill-center">
      <div class="grid w-full md:grid-cols-12">
        <div class="col-span-8 md:col-start-3">
          <SVGLogo class="w-full h-full px-4" />
        </div>
      </div>
    </div>
  </div>
</template>
