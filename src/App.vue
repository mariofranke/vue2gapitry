<template>
  <v-app>
    <v-container>
  <v-btn @click="tokenResponse">Login</v-btn>
    </v-container>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
let client;
const  tokenResponse = async ()=> { await new Promise((resolve, reject) => {
  try {
    // Settle this promise in the response callback for requestAccessToken()
    client.callback = (resp) => {
      if (resp.error !== undefined) {
        reject(resp);
      }

      console.log("client resp",resp);
      resolve(resp);
    };
    console.log("client",client);
    client.requestAccessToken({ prompt: "consent" });
  } catch (err) {
    console.log(err);
  }
})};
console.log(tokenResponse)
export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  methods: {
    tokenResponse
  },
  async mounted () {
    let script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-signin';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    let script2 = document.createElement('script');
    script2.src = 'https://apis.google.com/js/api.js';
    script2.id = 'google-api';
    script2.async = true;
    script2.defer = true;
    document.head.appendChild(script2);

    const scopes = "https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/calendar.readonly  https://www.googleapis.com/auth/admin.reports.audit.readonly  https://www.googleapis.com/auth/admin.reports.usage.readonly"
    client = window.google.accounts.oauth2.initTokenClient({
      client_id: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
      scope: scopes,
      callback: "", // defined at request time
    });


  },
  data: () => ({
    //
  }),
};
</script>
