<script lang="tsx" setup>
import { useStore } from "~~/store";
const { client } = usePrismic();

const { data: page } = await useAsyncData("projects", () =>
  client.getSingle("projects")
);

const store = useStore();

const activeProject = ref<any>(null);
const projects = computed(() => {
  return page.value?.data.slices;
});

const onImageClick = async (project: any) => {
  store.blurModalActive = true;
  await nextTick();
  activeProject.value = project;
};

watchEffect(() => {
  if (!store.blurModalActive) activeProject.value = null;
});

const tagline = computed(() => {
  return page.value?.data.tagline;
});

const onNavClick = (direction: -1 | 1) => {
  const totalProjects = projects.value.length;
  const index = projects.value.findIndex(
    (p: any) => p.id === activeProject?.value?.id
  );
  const nextIndex = index + direction;
  if (nextIndex >= 0 && nextIndex < totalProjects) {
    activeProject.value = projects.value[nextIndex];
  } else if (direction === 1) {
    activeProject.value = projects.value[0];
  } else {
    activeProject.value = projects.value[totalProjects - 1];
  }
};
</script>

<template>
  <div class="relative z-10 min-h-screen pb-4">
    <ProjectsGrid @image-click="onImageClick" :projects="projects" />
  </div>
  <div v-if="tagline" class="flex items-center justify-center w-full py-24">
    <span class="tracking-wide" v-html="tagline"></span>
  </div>

  <ClientOnly>
    <Teleport :disabled="!activeProject" :to="store.blurModalEl">
      <Lightbox
        @nav-next="onNavClick(1)"
        @nav-prev="onNavClick(-1)"
        v-if="activeProject"
        :project="activeProject"
      />
    </Teleport>
  </ClientOnly>
</template>
