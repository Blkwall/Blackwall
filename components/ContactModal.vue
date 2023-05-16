<script lang="tsx" setup>
const { client } = usePrismic();
const { data: contactData } = await useAsyncData("contact", () =>
  client.getSingle("contact")
);
</script>

<template>
  <div
    class="absolute flex flex-wrap items-center justify-between w-full h-full gap-8 p-12 text-center uppercase lg:flex-nowrap fill"
  >
    <div class="w-full" v-for="slice in contactData?.data.slices">
      <PrismicRichText :field="slice.primary.text" />
    </div>
  </div>
</template>
