<script lang="tsx" setup>
defineProps<{
  image: string;
}>();
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full backdrop-blur-xl">
    <!-- Wrapper -->
    <div class="flex flex-col items-center gap-8 p-8 bg-opacity-50 fill">
      <!-- Content -->
      <div>hey</div>
      <div class="relative w-full h-full">
        <img
          class="absolute top-0 left-0 object-contain w-full h-full"
          :src="image"
        />
      </div>
    </div>
  </div>
</template>
