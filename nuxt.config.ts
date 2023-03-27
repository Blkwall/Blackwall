// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/prismic"],
  typescript: {
    strict: true,
    // typeCheck: true,
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["@/assets/css/main.css"],
  prismic: {
    endpoint: "https://blackwall.cdn.prismic.io/api/v2",
    modern: true,
  },
});
