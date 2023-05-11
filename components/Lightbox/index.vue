<script lang="tsx" setup>
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
      class="absolute tracking-wide uppercase left-6 md:relative md:left-0"
      :field="project.primary.caption"
    />

    <!-- Content -->
    <div
      class="relative flex items-center justify-center w-full h-full mt-0 md:mb-10"
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
    <div class="fixed bottom-0 right-0 flex items-center w-auto md:h-full">
      <button
        class="w-full h-full p-6 select-none md:h-auto button-hover"
        @click="() => emit('nav-next')"
      >
        NEXT
      </button>
    </div>
    <div class="fixed bottom-0 left-0 flex items-center w-auto md:h-full">
      <button
        class="w-full h-full p-6 select-none md:h-auto button-hover"
        @click="() => emit('nav-prev')"
      >
        PREV
      </button>
    </div>
  </div>
</template>
