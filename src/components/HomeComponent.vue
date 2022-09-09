<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <h1>asdasd</h1>
          <h2>{{ counterStore.counter }}</h2>
          <h2>{{ counterStore }}</h2>
          <v-btn @click="counterStore.increment">Increment</v-btn>
          <v-btn @click="counterStore.add(2)">add</v-btn>
          <v-btn @click="test">test</v-btn>
          <p>{{ userStore }}</p>
          <v-btn @click="login">test</v-btn>
          <v-btn @click="logout">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {useCounterStore} from "@/store/counter";
import {useLoggedInUserStore} from "@/store/user";

const test = () => {
  this.login()
}

export default {
  name: "HomeComponent",
  setup() {
    const counterStore = useCounterStore();
    const userStore = useLoggedInUserStore();
    return {
      counterStore,
      userStore
    };
  }, methods: {
    increment() {
      this.counterStore.increment();
    },
    add(n) {
      this.counterStore.add(n);
    },
    getCounter() {
      return this.counterStore.counter
    },
    login() {
      this.userStore.login();
    },
    logout() {
      this.userStore.logout();
    },
    test
  },
}
</script>

<style scoped>

</style>
