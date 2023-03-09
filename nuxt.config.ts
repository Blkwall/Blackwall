// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
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
});
