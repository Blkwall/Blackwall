<script lang="tsx" setup>
import { emit } from "process";

defineProps<{
  project: any;
}>();

const emit = defineEmits<{
  (event: "nav-next"): void;
  (event: "nav-prev"): void;
}>();
</script>

<template>
  <!-- Wrapper -->
  <div class="flex flex-col items-center gap-4 bg-opacity-50 fill">
    <PrismicText
      class="tracking-wide uppercase"
      :field="project.primary.caption"
    />

    <!-- Content -->
    <div
      class="relative flex items-center justify-center w-full h-full mt-0 mb-10"
    >
      <LightboxVideo
        v-if="project.primary.vimeo_link.url"
        :url="project.primary.vimeo_link.url"
      />

      <div v-if="!project.primary.vimeo_link.url">
        <PrismicImage
          class="absolute top-0 left-0 object-contain w-full h-full"
          v-for="item in project.items"
          :field="item.image"
        />
      </div>
    </div>

    <!-- Navigation -->
    <div class="fixed top-0 flex items-center h-full right-6">
      <button class="button-hover" @click="() => emit('nav-next')">NEXT</button>
    </div>
    <div class="fixed top-0 flex items-center h-full left-6">
      <button class="button-hover" @click="() => emit('nav-prev')">PREV</button>
    </div>
  </div>
</template>
