<script lang="tsx" setup>
const props = defineProps<{ image: any }>();

const loaded = ref(false);

onMounted(async () => {
  await new Promise((resolve) => {
    const img = new Image();
    img.src = props.image.url;
    img.onload = () => {
      loaded.value = true;
      resolve(true);
    };
  });
});
</script>

<template>
  <div
    class="transition-all duration-500 cursor-pointer"
    :class="{
      'opacity-0': !loaded,
      'opacity-100': loaded,
    }"
  >
    <prismic-image :field="image" />
  </div>
</template>
