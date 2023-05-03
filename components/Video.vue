<script lang="tsx" setup>
import Plyr from "plyr";
import { emit } from "process";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  url: string;
  actualRatio?: boolean;
}>();

const emit = defineEmits<{
  (event: "ratio", ratio: number): void;
}>();

const el = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();
const player = ref<any>();

const providerName = computed(() => {
  if (props.url.includes("youtube")) {
    return "youtube";
  } else if (props.url.includes("vimeo")) {
    return "vimeo";
  } else {
    return "html5";
  }
});

onMounted(async () => {
  if (!el.value) return;

  player.value = new Plyr(el.value, {
    hideControls: false,
    resetOnEnd: true,
    controls: ["play", "progress", "fullscreen"],
    debug: false,
    ratio: props.actualRatio ? undefined : "16:9",
    fullscreen: {
      iosNative: true,
    },
  });

  player.value.on("ready", () => {
    setTimeout(() => {
      if (player.value.embed?.ratio && props.actualRatio) {
        const [width, height] = player.value.embed.ratio;
        const ratio = width / height;
        emit("ratio", ratio);

        if (wrapper.value && ratio < 1) {
          wrapper.value.style.width = window.innerHeight * ratio + "px";
        }
      }
    }, 1000);
  });

  if (process.client) {
    window.addEventListener("stopAllVideos", () => {
      player.value.pause();
      player.value.stop();
    });
  }
});
</script>

<template>
  <div ref="wrapper" class="relative mx-auto video-player">
    <div
      ref="el"
      :data-plyr-provider="providerName"
      :data-plyr-embed-id="url"
    ></div>
  </div>
</template>

<style lang="scss">
@import "plyr/dist/plyr.css";

.video-player {
  --plyr-range-track-height: 2px;
  --plyr-color-main: red;
  --plyr-badge-background: white;
  --plyr-audio-controls-background: white;
  --plyr-video-controls-background: transparent;
  --plyr-video-control-color: white;
  --plyr-tooltip-color: red;
  .plyr {
    height: 100%;
    width: 100%;
  }

  .plyr--fullscreen-fallback {
    display: flex;
  }

  .plyr__control--overlaid {
    border-radius: 10px;
    width: 4em;
    text-align: center;
    svg {
      margin: auto;
      fill: white;
    }
  }
  .plyr__controls .plyr__controls__item:first-child {
    margin-left: auto;
    margin-right: 0;
  }
}
.plyr--playing {
  .plyr__controls {
    opacity: 0;
  }
  &:hover {
    .plyr__controls {
      opacity: 1;
    }
  }
}
</style>
