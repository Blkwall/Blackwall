<script lang="tsx" setup>
import { useStore } from "./store";

const store = useStore();
const ready = ref(false);

onMounted(() => {
  ready.value = true;
});

const onEnter = () => {
  let scrollBarWidth = document.body.offsetWidth - document.body.clientWidth;
  document.body.style.overflow = "hidden";
  // Add scrollbar padding.
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};
const onLeave = () => {
  document.body.style.overflow = "auto";
  // Remove scrollbar padding.
  document.body.style.paddingRight = "0px";
};

console.log("App.vue");
</script>

<template>
  <Html class="bg-bluecity-blue">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <Link rel="icon" href="/favicon.png" type="image/png" />
    </Head>
    <Body class="antialiased text-white bg-black">
      <Header />
      <NuxtPage />

      <Transition
        name="fade"
        mode="out-in"
        @enter="onEnter"
        @after-leave="onLeave"
      >
        <BlurModal v-show="store.blurModalActive" />
      </Transition>
    </Body>
  </Html>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
