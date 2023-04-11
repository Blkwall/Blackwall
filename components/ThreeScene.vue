<script lang="tsx" setup>
import { loadAssets } from "~~/composables/threeInstance/assets";
import { ThreeInstance } from "~~/composables/threeInstance/index";
const { client } = usePrismic();

const props = defineProps<{
  isProjects: boolean;
}>();

const el = ref<HTMLElement>();
const bgVideo = ref<HTMLVideoElement>();
const isLoading = ref(true);
let threeInstance: ThreeInstance | null;
const { data: home } = await useAsyncData("home", () =>
  client.getSingle("home")
);

const isMain = ref(false);
if (process.client) {
  window.addEventListener("sequenceChange", () => {
    isMain.value = threeInstance?.activeSequenceKey === "main";
  });
}

watch(
  () => props.isProjects,
  (isProjects) => {
    if (!threeInstance) return;
    threeInstance.setIsProjects(isProjects);
  }
);

const background_video = computed(() => {
  return home.value?.data.background_video;
});

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

onMounted(async () => {
  if (!el.value) {
    console.error("No element to mount ThreeInstance to");
    return;
  }

  await nextTick();
  const videos = [...document.querySelectorAll("video")];
  threeInstance = new ThreeInstance(
    el.value,
    await loadAssets(assetURLS, videos),
    home.value?.data.slices
  );
  await nextTick();
  threeInstance.tick();
  isLoading.value = false;
});

onBeforeUnmount(() => {
  if (!threeInstance) {
    return;
  }
  threeInstance.destroy();
  threeInstance = null;
});

const isExit = ref(false);
onBeforeRouteLeave(async (to, from) => {
  isExit.value = true;
  if (!threeInstance) return true;
  if (threeInstance.activeSequenceKey !== "main") return true;
  await new Promise((r) => setTimeout(r, 1000));
  return true;
});
</script>

<template>
  <div id="wrapper">
    <!-- Video Assets (Hidden) -->
    <div v-for="video in videos" :key="video">
      <video
        ref="video"
        crossorigin="anonymous"
        class="hidden"
        :data-id="video.url"
        :data-width="video.width"
        :data-height="video.height"
        muted
        autoplay
        loop
        playsinline="true"
      >
        <source :src="video.url" type="video/mp4" />
      </video>
    </div>

    <!-- THREE.js Scene -->
    <Transition name="fade">
      <div ref="el" class="fixed top-0 left-0 z-30 w-full h-full"></div>
    </Transition>

    <!-- Background Video -->
    <Transition name="fade">
      <div
        v-if="background_video && !isLoading"
        class="fixed top-0 left-0 w-full h-full"
      >
        <video
          ref="bgVideo"
          crossorigin="anonymous"
          :data-id="background_video.url"
          :data-width="background_video.width"
          :data-height="background_video.height"
          muted
          autoplay
          loop
          playsinline="true"
          class="object-cover w-full h-full"
        >
          <source :src="background_video.url" type="video/mp4" />
        </video>
      </div>
    </Transition>

    <!-- Logo -->
    <Transition name="fade">
      <div
        class="fixed fill fill-center"
        :class="{
          'z-30': !isMain,
          'z-10': isMain,
        }"
      >
        <div class="grid w-full md:grid-cols-12">
          <div class="col-span-6 md:col-start-4">
            <SVGLogo
              class="w-full h-full px-4 transition-transform ease-in-out delay-1000"
              :style="{
                'transition-duration': '5s',
                transform: isLoading ? 'scale(1.5)' : 'scale(1)',
              }"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
