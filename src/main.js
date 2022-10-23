import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Routes from "./routes";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlcNJDmT69z1sxAG5EujOjIgVgTbW043I",
  authDomain: "workspace-dashboard-356409.firebaseapp.com",
  projectId: "workspace-dashboard-356409",
  storageBucket: "workspace-dashboard-356409.appspot.com",
  messagingSenderId: "1003950224550",
  appId: "1:1003950224550:web:a76132d437827b6abeb067",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// Your web app's Firebase configuration

export { db, auth };

//const app = initializeApp(firebaseConfig);
const router = new VueRouter({
  routes: Routes,
});

const pinia = createPinia();
Vue.config.productionTip = false;

new Vue({
  pinia,
  vuetify,
  router: router,
  render: (h) => h(App),
  theme: { dark: true },
}).$mount("#app");
