<script lang="tsx" setup>
const inView = ref(false);
const el = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
  (entries) => {
    inView.value = entries[0].isIntersecting;
  },
  { threshold: 0.5, rootMargin: `0px 0px ${window.innerHeight}px  0px` }
);

onMounted(() => {
  observer.observe(el.value!);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <div ref="el">
    <slot :in-view="inView" />
  </div>
</template>
