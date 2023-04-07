<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const contactOpen = ref(false);
const onContactClick = () => {
  store.blurModalActive = true;
  contactOpen.value = true;
};

const onIndexClick = () => {
  store.isProjects = true;
};

watchEffect(() => {
  if (!store.blurModalActive) contactOpen.value = false;
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <transition name="fade">
      <nav
        v-if="!store.blurModalActive && !store.isProjects"
        class="absolute right-0 flex gap-4 p-6 tracking-wide text-white uppercase"
      >
        <div @click="onContactClick" class="cursor-pointer button-hover">
          Contact
        </div>
        <div @click="onIndexClick" class="cursor-pointer button-hover">
          Index
        </div>
      </nav>
    </transition>
    <transition name="fade">
      <div
        v-if="store.isProjects"
        class="absolute right-0 flex gap-4 p-6 tracking-wide text-white uppercase"
      >
        <button @click="store.isProjects = false">CLOSE</button>
      </div>
    </transition>
  </header>

  <ClientOnly>
    <Teleport :disabled="!contactOpen" :to="store.blurModalEl">
      <ContactModal v-if="contactOpen" />
    </Teleport>
  </ClientOnly>
</template>
