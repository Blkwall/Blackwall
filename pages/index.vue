<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const isProjects = computed(() => store.isProjects);
</script>

<template>
  <div class="">
    <Transition name="fade">
      <ThreeScene v-show="!isProjects" :is-projects="isProjects" />
    </Transition>

    <Transition name="fade">
      <div v-if="isProjects" class="relative z-30 p-8 bg-black">
        <ProjectsWrapper />
      </div>
    </Transition>
  </div>
</template>
``
