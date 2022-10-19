<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
    >

      <v-list
          class=""
          dense
          nav
      >
        <v-list-item>
          <v-list-item-content>
            <v-img v-if="this.$vuetify.theme.dark" class="mr-3" contain
                   height="40"
                   src="../assets/Google-Workspace-logos/Google-Workspace-wordmark-light-gray/Google_Workspace_256x34px_Grey400@4x.png"
                   width="40"></v-img>
            <v-img v-if="!this.$vuetify.theme.dark" class="" contain
                   height="40"
                   src="../assets/Google-Workspace-logos/Google-Workspace-wordmark-dark-gray/Google_Workspace_256x34px_Grey700@4x.png"
                   width="40"></v-img>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <!--      <v-divider class="mb-2"/>-->
      <v-list>
        <v-list-item
            v-for="(item, i) in items"

            :key="i"
            :to="item.path"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="transparent" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div>
        <v-switch v-model="$vuetify.theme.dark" color="primary" hide-details @click="toggleDarkMode"></v-switch>
      </div>
      <v-btn
          id="login-button"
          class="mx-2"
          color="primary"
          depressed
          p-3
          @click="showEvents">
        <div v-if="userStore.isLoggedIn">Refresh</div>
        <div v-else>Login</div>
      </v-btn>
      <v-menu v-if="userStore.isLoggedIn" offset-y>
        <template #activator="{ on }">
          <v-btn

              depressed
              p-3
              v-on="on"
          >
            <v-avatar size="32px">
              <img :src="userStore.userData.picture" alt="" referrerpolicy="no-referrer">
            </v-avatar>
            {{ userStore.userData.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>


</template>

<script>
import {useLoggedInUserStore} from "@/store/user";
import routes from "@/routes";
import {googleApps, listLoginActivity, listActivity, listGmailActivity, getUserData} from "@/googleApiHelper";

// Gis / Gapi
let gapiInited;
let gisInited;
let client;
let chats;
let mails;

function checkBeforeStart() {
  if (gapiInited && gisInited) {
    // Start only when both gapi and gis are initialized.
    document.getElementById("login-button").style.visibility = "visible";
  }
}

function gapiInit() {
  window.gapi.client.init({
    // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
  })
      .then(function () {  // Load the Calendar API discovery document.
        //window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        const DISCOVERY_URLS = ["https://admin.googleapis.com/$discovery/rest?version=reports_v1", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://gmail.googleapis.com/$discovery/rest?version=v1"];
        DISCOVERY_URLS.forEach(url => {
          window.gapi.client.load(url);
        });
        //window.gapi.client.load('https://admin.googleapis.com/$discovery/rest?version=reports_v1');
        gapiInited = true;
        checkBeforeStart();
      });
}

function gapiLoad() {
  window.gapi.load('client', gapiInit)
}


function showEvents() {

  client.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw(resp);
    }
    // GIS has automatically updated gapi.client with the newly issued access token.
    //console.log('gapi.client access token: ' + JSON.stringify(window.gapi.client.getToken()));
    //console.log('gapi.client access token: ' + JSON.stringify(window.gapi.client.getToken()));
    //this.setAccessToken(window.gapi.client.getToken().access_token)
    this.setAccessToken(window.gapi.client.getToken().access_token)
    setToken(window.gapi.client.getToken().access_token)
    this.login()
    const userData = getUserData(this.setUserData)
    this.login()
    console.log(googleApps)
    this.setUserData(userData)
    chats = await listLoginActivity('all', 'chat', 10);
    console.log("chats", chats)
    let activity = await listActivity('all', 'all', 100);

    console.log("activity", activity)
    this.setChatMessages(chats)

    //await listGmailActivity('me', 10);
    mails = await listGmailActivity(this.getUser(), 100);
    console.log("mails", mails)
    this.setEmails(mails)
    //document.getElementById("showEventsBtn").innerText = "Refresh Calendar";
  }

  // Conditionally ask users to select the Google Account they'd like to use,
  // and explicitly obtain their consent to fetch their Calendar.
  // NOTE: To request an access token a user gesture is necessary.
  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select an Google Account and asked for consent to share their data
    // when establishing a new session.
    client.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    client.requestAccessToken({prompt: ''});
  }


}


/*
function revokeToken() {
  let cred = window.gapi.client.getToken();
  if (cred !== null) {
    window.google.accounts.oauth2.revoke(cred.access_token, () => {
      console.log('Revoked: ' + cred.access_token)
    });
    window.gapi.client.setToken('');
    document.getElementById("showEventsBtn").innerText = "Show Calendar";
  }
}
*/

const tokenResponse = async () => {
  await new Promise((resolve, reject) => {
    try {
      // Settle this promise in the response callback for requestAccessToken()
      client.callback = (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
        }

        // console.log("client resp", resp);
        resolve(resp);
      };
      // console.log("client", client);
      client.requestAccessToken({prompt: "consent"});
    } catch (err) {
      // console.log(err);
    }
  })
};

function gisInit() {
  const scopes = "https://www.googleapis.com/auth/admin.reports.audit.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly"
  client = window.google.accounts.oauth2.initTokenClient({
    client_id: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
    scope: scopes,
    callback: '',  // defined at request time
  });
  gisInited = true;
  checkBeforeStart();
}


function setToken(accessToken) {
  localStorage.setItem('accessToken', accessToken)
}


export default {
  name: 'NavigationBar',

  components: {},
  data: () => ({
    drawer: false,
    items: routes,
  }),
  setup() {
    const userStore = useLoggedInUserStore();

    return {userStore}
  },
  methods: {
    tokenResponse,
    showEvents,
    getUserData,
    getUserId() {
      return this.userStore.user.id;
    },
    getUser() {
      return this.userStore.userData.email;
    },
    logout() {
      this.userStore.logout()
    },
    setUserData(userData) {
      console.log("write userData to pinia", userData)
      this.userStore.setUserData(userData)
    },
    setAccessToken(accessToken) {
      console.log("write access token to pinia", accessToken)
      this.userStore.setAccessToken(accessToken)
    },
    setEmails(emails) {
      console.log("write emails to pinia", emails)
      this.userStore.setEmails(emails)
    },
    setChatMessages(chatMessages) {
      console.log("write chat messages to pinia", chatMessages)
      this.userStore.setChatMessages(chatMessages)
    },
    login() {
      this.userStore.login()
    },
    toggleDarkMode() {
      this.userStore.toggleDarkMode()
    },
  },
  async mounted() {
    gapiLoad()
    gisInit()
    if (this.userStore.darkMode) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  },
};
</script>

<style scoped>

</style>
