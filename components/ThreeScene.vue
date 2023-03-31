<script lang="tsx" setup>
import { ThreeInstance } from "~~/composables/threeInstance/index";
const { client } = usePrismic();

const el = ref<HTMLElement>();
const loading = ref(true);
let threeInstance: ThreeInstance | null;
const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home")
);

const videos = home.value?.data.slices
  .filter((slice: any) => slice.variation === "sceneObjectVideo")
  .map((slice: any) => {
    return {
      url: slice.primary.video.url,
      width: slice.primary.video_height,
      height: slice.primary.video_width,
    };
  });

const assetURLS = home.value?.data.slices.map((slice: any) => {
  if (slice.variation === "sceneObjectVideo") {
    return slice.primary.video.url;
  }
  if (slice.variation === "default") {
    return slice.primary.image.url;
  }
  return null;
});

const video = ref();

watch(video, (v) => {
  if (v) init(v);
});

const init = async (videoRefs: any[]) => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }
  const videos = Object.values(videoRefs);
  threeInstance = await ThreeInstance.load(el.value, assetURLS, videos);
  threeInstance.tick();

  loading.value = false;
};

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
        crossorigin="anonymous"
        class="hidden"
        :src="video.url"
        :data-id="video.url"
        :data-width="video.width"
        :data-height="video.height"
        muted
        autoplay
        loop
        playsinline="true"
      ></video>
    </div>
    <div ref="el" class="fixed top-0 left-0 z-20 w-full h-full"></div>
    <div class="fixed z-10 fill fill-center">
      <div class="grid w-full md:grid-cols-12">
        <div class="col-span-6 md:col-start-4">
          <SVGLogo class="w-full h-full px-4" />
        </div>
      </div>
    </div>
  </div>
</template>
