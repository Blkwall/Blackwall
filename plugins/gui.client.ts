import * as dat from "dat.gui";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      dat,
    },
  };
});
