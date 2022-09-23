import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    calender: useStorage("calender", "none"),
    calendarEntries: useStorage("calendarEntries", "none"),
    logins: useStorage("logins", "none"),
    loginData: useStorage("loginData", {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Data two",
          backgroundColor: "#f87979",
          data: [40, 20, 12],
        },
      ],
    }),
  }),

  getters: {
    getCalenderEntries: (state) => state.calender.for,
  },
  actions: {},
});
