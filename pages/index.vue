<script lang="tsx" setup>
const ready = ref(false);
</script>

<template>
  <div>
    <div v-if="!ready" class="fixed fill fill-center">
      <button
        @click="ready = true"
        class="p-2 px-4 pb-1 bg-gray-500 rounded-sm"
      >
        Start
      </button>
    </div>
    <ThreeScene v-if="ready" />
  </div>
</template>
