import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core/index";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: useStorage("counter", 0),
  }),
  actions: {
    increment() {
      this.counter++;
    },
    add(n) {
      this.counter += n;
    },
  },
  getters: {
    getCounter: (state) => state.counter,
  },
});
