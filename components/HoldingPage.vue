<script lang="tsx" setup></script>

<template>
  <div class="fixed fill">
    <header class="fixed top-0 left-0 w-full tracking-[0.035em] z-50">
      <!-- Desktop -->
      <div class="justify-between hidden p-6 leading-none md:flex">
        <div>Creative Duo</div>
        <a
          class="transition-colors hover:text-[#65FF00]"
          href="mailto:info@blkwall.com"
          >info@blkwall.com</a
        >
        <a
          class="transition-colors hover:text-[#65FF00]"
          href="https://www.instagram.com/__blackwall/?igshid=YmMyMTA2M2Y%3D"
          target="_blank"
          >Follow on Instagram</a
        >
      </div>
      <!-- Mobile -->
      <div class="grid grid-cols-2 p-4 pt-3 md:hidden">
        <div>
          <a href="mailto:info@blkwall.com">info@blkwall.com</a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/__blackwall/?igshid=YmMyMTA2M2Y%3D"
            target="_blank"
            >Follow on Instagram</a
          >
        </div>
      </div>
    </header>

    <!-- Background Video -->
    <div class="absolute fill">
      <video class="object-cover w-full h-full" loop muted autoplay playsinline>
        <source src="~/assets/video/holding-page.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Logo -->
    <div class="absolute z-20 fill fill-center">
      <div class="grid w-full md:grid-cols-12">
        <div class="col-span-8 md:col-start-3">
          <SVGLogo class="w-full h-full px-4" />
        </div>
      </div>
    </div>
  </div>
</template>
