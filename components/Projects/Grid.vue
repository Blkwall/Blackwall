<script lang="tsx" setup>
const props = defineProps<{
  slices: any[];
}>();

const emit = defineEmits<{
  (e: "image-click", image: string): void;
}>();

const onClick = (image: string) => {
  emit("image-click", image);
};
</script>

<template>
  <div class="grid gap-16 px-8 mt-8 mb-16 md:grid-cols-6">
    <div
      v-for="project in slices"
      :class="{
        'md:col-span-2': project.primary.width === '1/3',
        'md:col-span-3': project.primary.width === '1/2',
        'md:col-span-6': project.primary.width.toLowerCase() === 'full',
      }"
      :key="project.id"
    >
      <div v-if="project.primary.video_preview.url">
        <video
          @click="onClick(project)"
          class="transition-transform cursor-pointer"
          muted
          autoplay
          playsinline
          loop
        >
          <source :src="project.primary.video_preview.url" type="video/mp4" />
        </video>
      </div>
      <div
        v-for="image in project.items.slice(0, 1)"
        :key="image.image.url"
        @click="onClick(project)"
        class="transition-transform cursor-pointer"
      >
        <prismic-image :field="image.image" />
      </div>
    </div>
  </div>
</template>
