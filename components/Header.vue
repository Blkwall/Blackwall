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
const onLogoClick = () => {
  store.isProjects = false;
  store.blurModalActive = false;
  contactOpen.value = false;
};

watchEffect(() => {
  if (!store.blurModalActive) contactOpen.value = false;
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <transition name="fade">
      <nav
        v-if="store.isProjects && !store.blurModalActive"
        class="absolute left-0 flex gap-4 p-6 tracking-wide text-white uppercase"
      >
        <div class="cursor-pointer button-hover" @click="onLogoClick">
          Blackwall
        </div>
      </nav>
    </transition>
    <transition name="fade">
      <nav
        v-if="!store.blurModalActive"
        class="absolute right-0 flex gap-4 p-6 tracking-wide text-white uppercase"
      >
        <div @click="onContactClick" class="cursor-pointer button-hover">
          Contact
        </div>
        <div
          @click="onIndexClick"
          class="cursor-pointer button-hover"
          :class="{
            'text-gray-500': store.isProjects,
          }"
        >
          Index
        </div>
      </nav>
    </transition>
  </header>

  <ClientOnly>
    <Teleport :disabled="!contactOpen" :to="store.blurModalEl">
      <ContactModal v-if="contactOpen" />
    </Teleport>
  </ClientOnly>
</template>
