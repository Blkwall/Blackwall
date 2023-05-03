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

const getWidth = (width: string) => {
  switch (width) {
    case "1/4":
      return "lg:col-span-3 col-span-1";
    case "1/3":
      return "lg:col-span-4 col-span-1";
    case "1/2":
      return "lg:col-span-6 col-span-1";
    case "full":
      return "lg:col-span-12 col-span-1";
    default:
      return "lg:col-span-12 col-span-1";
  }
};
</script>

<template>
  <div
    class="grid grid-cols-1 gap-12 px-4 mt-8 mb-16 xl:gap-28 lg:grid-cols-12 sm:grid-cols-2"
  >
    <div
      v-for="project in projects"
      :class="getWidth(project.primary.width)"
      class="flex items-center justify-center"
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
