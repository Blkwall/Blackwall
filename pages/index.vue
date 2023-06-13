<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const route = useRoute();
const router = useRouter();
if (route.hash === "#projects") store.isProjects = true;
const isProjects = computed(() => store.isProjects);

// const onClick = () => {
//   router.push({ hash: "#projects" });
//   store.isProjects = true;
// };
</script>

<template>
  <div class="">
    <Transition name="fade">
      <ThreeScene v-if="!isProjects" :is-projects="isProjects" />
    </Transition>

    <Transition name="fade">
      <div v-if="isProjects" class="relative z-30 p-8 bg-black">
        <ProjectsWrapper />
      </div>
    </Transition>
  </div>
</template>
