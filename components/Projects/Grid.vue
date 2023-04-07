<script lang="tsx" setup>
const props = defineProps<{
  projects: any[];
}>();

const emit = defineEmits<{
  (e: "image-click", image: string): void;
}>();

const onClick = (image: string) => {
  emit("image-click", image);
};
</script>

<template>
  <div class="grid px-4 mt-8 mb-16 gap-28 md:grid-cols-6">
    <div
      v-for="project in projects"
      :class="{
        'md:col-span-2': project.primary.width === '1/3',
        'md:col-span-3': project.primary.width === '1/2',
        'md:col-span-6': project.primary.width.toLowerCase() === 'full',
      }"
      :key="project.id"
    >
      <ProjectsItemVideo
        v-if="project.primary.video_preview.url"
        :url="project.primary.video_preview.url"
        @click="onClick(project)"
      />

      <ProjectsItemImage
        v-for="image in project.items.slice(0, 1)"
        :key="image.image.url"
        :image="image.image"
        @click="onClick(project)"
      />
    </div>
  </div>
</template>
