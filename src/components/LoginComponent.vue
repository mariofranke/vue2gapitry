<template>
  <v-app>

  </v-app>


</template>

<script>
import {useLoggedInUserStore} from "@/store/user";
import routes from "@/routes";
import {getUserData, googleApps, listActivity, listGmailActivity, listLoginActivity} from "@/googleApiHelper";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
        const DISCOVERY_URLS = ["https://admin.googleapis.com/$discovery/rest?version=reports_v1", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://gmail.googleapis.com/$discovery/rest?version=v1", "https://admin.googleapis.com/$discovery/rest?version=directory_v1"];
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
    chats = await listLoginActivity('all', 'login', 10);
    console.log("chats", chats)
    let activity = await listActivity('all', 'login', 100);

    console.log("activity", activity)
    this.setChatMessages(chats)
    let users = await listUsers()
    console.log("users", users)
    console.log(users.forEach(user => {
      console.log(user.name.fullName)
    }))
    this.setUsers(users)
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
/**
 * Print the first 10 users in the domain.
 */
async function listUsers() {
  let response;
  try {
    const request = {
      'domain': 'dev.ektosym.com',
      'maxResults': 10,
      'orderBy': 'email',
    };
    response = await window.gapi.client.directory.users.list(request);
    return response.result.users;
  } catch (err) {
    console.error('Error: ' + err);
  }

}

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
  const scopes = "https://www.googleapis.com/auth/admin.reports.audit.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/admin.directory.user.readonly"
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
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            this.createSettings()
          })
          .then(() => {
            this.$router.replace({
              name: "Home"
            });
          })
          .catch(err => {
            console.log(err);
          });
    },
    createSettings() {
      firebase
          .firestore()
          .collection("settings")
          .add({
            name: "Default",
            description: "Default settings",
            settings: {
              theme: "light",
              language: "en"
            }
          })
          .then(() => {
            console.log("Settings created");
          });
    },

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
    setUsers(users) {
      this.userStore.setUsers(users)
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
