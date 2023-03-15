<script lang="tsx" setup>
import { useStore } from "~~/store";

const store = useStore();
const contactOpen = ref(false);
const onClick = () => {
  store.blurModalActive = true;
  contactOpen.value = true;
};

watchEffect(() => {
  if (!store.blurModalActive) contactOpen.value = false;
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <transition name="fade">
      <nav
        v-if="!store.blurModalActive"
        class="absolute right-0 flex gap-4 p-8 tracking-wide text-white"
      >
        <div @click="onClick" class="cursor-pointer md:hover:text-gray-500">
          Contact
        </div>
        <nuxt-link to="/projects" :active-class="'text-gray-500'"
          >Index</nuxt-link
        >
      </nav>
    </transition>
  </header>

  <ClientOnly>
    <Teleport :disabled="!contactOpen" :to="store.blurModalEl">
      <ContactModal v-if="contactOpen" />
    </Teleport>
  </ClientOnly>
</template>
