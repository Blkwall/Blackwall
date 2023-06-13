<script lang="tsx" setup>
const inView = ref(false);
const el = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

watch(
  () => el.value,
  () => {
    if (!el.value) return;
    observer.value?.observe(el.value);
  }
);

onMounted(() => {
  if (!el.value) return;
  observer.value = new IntersectionObserver(
    (entries) => {
      inView.value = entries[0].isIntersecting;
    },
    {
      // root: document.body,
      rootMargin: `0px 0px ${window.innerHeight * 0.5}px 0px`,
      threshold: 0.5,
    }
  );
  observer.value.observe(el.value);
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div ref="el">
    <slot :in-view="inView" />
  </div>
</template>
