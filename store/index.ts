import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    blurModalActive: false,
    blurModalEl: null as null | HTMLElement,
  }),
});
