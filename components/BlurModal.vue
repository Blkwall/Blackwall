<script lang="tsx" setup>
import { useStore } from "~~/store";
const store = useStore();
const el = ref<HTMLElement | null>(null);

onMounted(() => {
  if (el.value) store.blurModalEl = el.value;
});

const onClose = () => {
  store.blurModalActive = false;
};
</script>

<template>
  <div
    class="fixed top-0 left-0 z-30 w-full h-full overflow-y-scroll"
    :class="{
      'backdrop-blur-xl': store.blurModalEl, // Hack to stop first frame blur.
    }"
  >
    <!-- Close -->
    <div class="absolute top-0 right-0 z-20">
      <button @click="onClose" class="p-6 tracking-wide uppercase button-hover">
        Close
      </button>
    </div>

    <!-- Wrapper for teleport. -->
    <div ref="el" class="absolute w-full h-full p-6" id="blurModal"></div>
  </div>
</template>
