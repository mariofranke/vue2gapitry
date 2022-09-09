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
    accessToken: useStorage("accessToken", null),
    isLoggedIn: useStorage("isLoggedIn", false),
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
  },
  actions: {
    setUserData(userData) {
      this.userData = userData;
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
