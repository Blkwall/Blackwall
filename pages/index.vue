<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const isProjects = computed(() => store.isProjects);
</script>

<template>
  <div class="bg-black">
    <ThreeScene :is-projects="isProjects" />

    <Transition name="fade">
      <div v-if="isProjects" class="relative z-30 p-8 bg-black">
        <ProjectsWrapper />
      </div>
    </Transition>
  </div>
</template>
