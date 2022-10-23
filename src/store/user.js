import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useLoggedInUserStore = defineStore({
  id: "user",
  state: () => ({
    userData: useStorage("userData", {
      id: "none",
      email: "none",
      verified_email: true,
      name: "test",
      given_name: "test",
      family_name: "",
      picture: "",
      locale: "",
      hd: "dev.ektosym.com",
    }),
    users: useStorage("users", [{}]),
    accessToken: useStorage("accessToken", null),
    isLoggedIn: useStorage("isLoggedIn", false),
    darkMode: useStorage("darkMode", true),
    emails: useStorage("emails", []),
    chatMessages: useStorage("chatMessages", []),
    isAdmin: useStorage("isAdmin", false),
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    getUser: (state) => state.userData.email,
    getAdminStatus: (state) => state.isAdmin,
  },
  actions: {
    setUserData(userData) {
      this.userData = userData;
    },
    setAdminStatus(isAdmin) {
      this.isAdmin = isAdmin;
    },
    setUsers(users) {
      this.users = users;
    },
    setEmails(emails) {
      this.emails = emails;
    },
    setChatMessages(chatMessages) {
      this.chatMessages = chatMessages;
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
    logout() {
      this.isLoggedIn = false;
    },
    login() {
      this.isLoggedIn = true;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});

/*
function setUserData(userData) {
	console.log(this.store)
	userStore.$patch(state => {
		state.userData = userData;
	});
}

function setAccessToken(accessToken) {
	console.log(accessToken)

	userStore.$patch(state => {
		state.accessToken = accessToken;
		state.isLoggedIn = true;
	});
}

function logout() {
	this.userStore.user.$patch(state => {
		state.isLoggedIn = false;
	});
}*/
