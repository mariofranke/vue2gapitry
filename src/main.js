import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./routes";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

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
