<script lang="tsx" setup>
const props = defineProps<{
  images: string[];
}>();

const emit = defineEmits<{
  (e: "image-click", image: string): void;
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

const onClick = (image: string) => {
  emit("image-click", image);
};
</script>

<template>
  <div class="grid gap-16 px-8 mt-8 mb-16 md:grid-cols-6" v-for="row in rows">
    <div
      :class="{
        'md:col-span-3': row.length === 2,
        'md:col-span-2': row.length === 3,
      }"
      v-for="image in row"
      :key="image"
    >
      <div @click="onClick(image)" class="transition-transform cursor-pointer">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>
