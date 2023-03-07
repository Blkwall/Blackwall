<script lang="tsx" setup>
const props = defineProps<{
  images: string[];
}>();

// split images into rows of 2 or 3
const rows = props.images.reduce((acc, image, index) => {
  const rowIndex = Math.floor(index / 3);
  if (!acc[rowIndex]) {
    acc[rowIndex] = [];
  }
  acc[rowIndex].push(image);
  return acc;
}, [] as string[][]);
</script>

<template>
  <div class="grid gap-8 mb-8 md:grid-cols-6" v-for="row in rows">
    <div
      :class="{
        'md:col-span-3': row.length === 2,
        'md:col-span-2': row.length === 3,
      }"
      v-for="image in row"
      :key="image"
    >
      <NuxtLink :to="{ hash: '#' + image.slice(1) }">
        <img :src="image" />
      </NuxtLink>
    </div>
  </div>
</template>
