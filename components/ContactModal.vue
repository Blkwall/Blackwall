<script lang="tsx" setup>
const { client } = usePrismic();
const { data: contactData } = await useAsyncData("contact", () =>
  client.getSingle("contact")
);

console.log(contactData);
</script>

<template>
  <div
    class="absolute flex flex-wrap items-center justify-between w-full h-full gap-8 p-12 text-center uppercase transition-opacity lg:flex-nowrap fill"
    :class="{
      'opacity-0': !contactData?.data,
      'opacity-100': contactData?.data,
    }"
  >
    <div class="w-full" v-for="slice in contactData?.data.slices">
      <PrismicRichText :field="slice.primary.text" />
    </div>
  </div>
</template>
