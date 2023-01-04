import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => ({
    userKeys: useStorage("users", []),
    adminActivityData: useStorage("adminActivityData", []),
    calendarActivityData: useStorage("calendarActivityData", []),
    driveActivityData: useStorage("driveActivityData", []),
    gmailActivityData: useStorage("gmailActivityData", []),
    mobileActivityData: useStorage("mobileActivityData", []),
    loginActivityData: useStorage("loginActivityData", []),
    meetActivityData: useStorage("meetActivityData", []),
    chatActivityData: useStorage("chatActivityData", []),
  }),
  getters: {
    getUserKeys: (state) => state.userKeys,
  },
  actions: {
    setUserKeys(users) {
      this.userKeys = users;
    },
    setAdminActivityData(adminActivityData) {
      this.adminActivityData = adminActivityData;
    },
    setCalendarActivityData(calendarActivityData) {
      this.calendarActivityData = calendarActivityData;
    },
    setDriveActivityData(driveActivityData) {
      this.driveActivityData = driveActivityData;
    },
    setGmailActivityData(gmailActivityData) {
      this.gmailActivityData = gmailActivityData;
    },
    setMobileActivityData(mobileActivityData) {
      this.mobileActivityData = mobileActivityData;
    },
    setLoginActivityData(loginActivityData) {
      this.loginActivityData = loginActivityData;
    },
    setMeetActivityData(meetActivityData) {
      this.meetActivityData = meetActivityData;
    },
    setChatActivityData(chatActivityData) {
      this.chatActivityData = chatActivityData;
    },
  },
});
