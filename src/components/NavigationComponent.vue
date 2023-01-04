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
      <v-btn v-if="this.getAdminStatus" @click="getX"> Load Reporting Data</v-btn>
      <!--      <v-btn v-if="this.getAdminStatus" @click="getDataX"> Load</v-btn>-->

      <div class="text-center">
        <v-dialog
            v-model="dialog"
            overlay-opacity="0.95"
            persistent
            width="400"
        >
          <v-card
              color="primary"
              dark
          >
            <v-card-text>
              Please stand by
              <v-progress-linear
                  class="mb-0"
                  color="white"
                  indeterminate
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <v-btn
          id="login-button"
          class="mx-2"
          color="primary"
          depressed
          p-3
          @click="getData">
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
import {
  getActivityDataForUsers,
  getMessageforId,
  getMessagesforId,
  getUserAdminStatus,
  getUserData,
  listGmailActivity,
  listCalenders, getAllCalenderEntries, getAllUserKeys
} from "@/googleApiHelper";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAdminStore} from "@/store/admin";

// Gis / Gapi
let gapiInited;
let gisInited;
let client;
let mails;
let messages;
let calendarEntries;


function checkBeforeStart() {
  if (gapiInited && gisInited) {
    // Start only when both gapi and gis are initialized.
    document.getElementById("login-button").style.visibility = "visible";
  }
}

async function getActivityData() {
  this.dialog = true
  await this.getActivityDataForUsers()
  this.dialog = false
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

//
// function getAll() {
//   this.getData()
//
// }

function getData() {
  this.googleSignIn()
  client.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw(resp);
    }
    //console.log("response", resp)
    // GIS has automatically updated gapi.client with the newly issued access token.
    //console.log('gapi.client access token: ' + JSON.stringify(window.gapi.client.getToken()));
    //console.log('gapi.client access token: ' + JSON.stringify(window.gapi.client.getToken()));
    //this.setAccessToken(window.gapi.client.getToken().access_token)

    // Sign in user and save access token
    this.setAccessToken(window.gapi.client.getToken().access_token)
    localStorage.setItem("accessToken", window.gapi.client.getToken().access_token)
    setToken(window.gapi.client.getToken().access_token)
    this.login()
    getUserData(this.setUserData)
    this.login()
    this.dialog = true
    //console.log(userData)
    //console.log("this user", this.getUser())
    const admin = await getUserAdminStatus(this.getUser())
    this.setAdminStatus(admin)
    if (admin
    ) {
      console.log("admin", admin)
      this.getMyUserData(true)
      let userKeys = await getAllUserKeys()
      this.setUserKeys(userKeys)
      console.log("userKeys", userKeys)
    }
    //await listGmailActivity('me', 10);
    mails = await listGmailActivity(this.getUser())
    console.log("mails", mails)


    calendarEntries = await getAllCalenderEntries()
    console.log("calendarEntries", calendarEntries)
    this.setCalendarEntries(calendarEntries)


    messages = await this.getMessagesforId(this.getUser(), mails)
    console.log("messages", messages)
    this.setEmails(messages)
    this.getMyUserData(false)
    this.dialog = false
    //document.getElementById("getDataBtn").innerText = "Refresh Calendar";
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

async function getDataX() {
  mails = await listGmailActivity(this.getUser(), 100);
  console.log("mails", mails)
  messages = await getMessageforId(mails, this.getUser())

  console.log("mails", messages)
  this.setEmails(messages)
}

/*
function revokeToken() {
  let cred = window.gapi.client.getToken();
  if (cred !== null) {
    window.google.accounts.oauth2.revoke(cred.access_token, () => {
      console.log('Revoked: ' + cred.access_token)
    });
    window.gapi.client.setToken('');
    document.getElementById("getDataBtn").innerText = "Show Calendar";
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
    dialog: false,
  }),
  setup() {
    const userStore = useLoggedInUserStore();
    const adminStore = useAdminStore()
    return {userStore, adminStore}
  },
  methods: {
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
          .auth()
          .signInWithPopup(provider)

          .catch(err => {
            console.log(err);
          });
    },
    getX: getActivityData,
    getActivityDataForUsers,
    getMessageforId,
    getMessagesforId,
    getDataX,
    createUser(user, data) {
      firebase
          .firestore()
          .collection("Users")
          .add({
            name: user,
            data: data,
            description: "User Data",
          })
          .then(() => {
            console.log("user created");
          });
    },
    getKeys() {
      return this.getAllUserKeys()
    },
    getMyUserData(adminStatus) {
      let collection;
      if (adminStatus) {
        collection = "all"
      } else {
        collection = this.getUser()
      }
      firebase
          .firestore()
          .collection(collection)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              switch (doc.id) {
                case "admin":
                  this.setAdminActivityData(doc.data(), adminStatus)
                  break;
                case "calendar":
                  this.setCalendarActivityData(doc.data(), adminStatus)
                  break;
                case "gmail":
                  this.setGmailActivityData(doc.data(), adminStatus)
                  break;
                case "drive":
                  this.setDriveActivityData(doc.data(), adminStatus)
                  break;
                case "mobile":
                  this.setMobileActivityData(doc.data(), adminStatus);
                  break;
                case "login":
                  this.setLoginActivityData(doc.data(), adminStatus);
                  break;
                case "chat":
                  this.setChatActivityData(doc.data(), adminStatus);
                  break;
                case "meet":
                  this.setMeetActivityData(doc.data(), adminStatus);
                  break;
              }
              console.log(doc.id, " => ", doc.data());
            });
          });
    },

    tokenResponse,
    getData,
    getUserData,
    listCalenders,
    setAdminActivityData(adminActivityData, adminStatus) {
      console.log("adminActivityData", adminActivityData)
      console.log("adminStatus", adminStatus)
      if (adminStatus) {
        this.adminStore.setAdminActivityData(adminActivityData)
      } else {
        this.userStore.setAdminActivityData(adminActivityData)
      }
    },
    setCalendarActivityData(calendarActivityData, adminStatus) {
      if (adminStatus) {
        // set calendar activity for all
        this.adminStore.setCalendarActivityData(calendarActivityData)
      } else {
        this.userStore.setCalendarActivityData(calendarActivityData)
      }
    },
    setDriveActivityData(driveActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setDriveActivityData(driveActivityData)
      } else {
        this.userStore.setDriveActivityData(driveActivityData)
      }
    },
    setGmailActivityData(gmailActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setGmailActivityData(gmailActivityData)
      } else {
        this.userStore.setGmailActivityData(gmailActivityData)
      }
    },

    setMobileActivityData(mobileActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setMobileActivityData(mobileActivityData)
      } else {
        this.userStore.setMobileActivityData(mobileActivityData)
      }
    },
    setLoginActivityData(loginActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setLoginActivityData(loginActivityData)
      } else {
        this.userStore.setLoginActivityData(loginActivityData)
      }
    },
    setChatActivityData(chatActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setChatActivityData(chatActivityData)
      } else {
        this.userStore.setChatActivityData(chatActivityData)
      }
    },
    setMeetActivityData(meetActivityData, adminStatus) {
      if (adminStatus) {
        this.adminStore.setMeetActivityData(meetActivityData)
      } else {
        this.userStore.setMeetActivityData(meetActivityData)
      }
    },


    getUserId() {
      return this.userStore.user.id;
    },
    setAdminStatus(isAdmin) {
      this.userStore.setAdminStatus(isAdmin)
    },

    getAdminStatus() {
      return this.userStore.user.admin;
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
    setUserKeys(userKeys) {
      console.log("userKeys", userKeys)
      this.adminStore.setUserKeys(userKeys)
    },

    setUserData(userData) {
      // console.log("write userData to pinia", userData)
      this.user = userData
      this.userStore.setUserData(userData)
    },
    setAccessToken(accessToken) {
      // console.log("write access token to pinia", accessToken)
      this.userStore.setAccessToken(accessToken)
    },
    setEmails(emails) {
      console.log("write emails to pinia", emails)
      this.userStore.setEmails(emails)
    },
    setCalendarEntries(calendarEntries) {
      console.log("write calendar entries to pinia", calendarEntries)
      this.userStore.setCalendarEntries(calendarEntries)
    },
    setChatMessages(chatMessages) {
      // console.log("write chat messages to pinia", chatMessages)
      this.userStore.setChatMessages(chatMessages)
    },
    login() {
      this.userStore.login()
    },
    toggleDarkMode() {
      this.userStore.toggleDarkMode()
    },
  }
  ,
  async mounted() {
    gapiLoad()
    gisInit()
    if (this.userStore.darkMode) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  }
  ,
}
;
</script>

<style scoped>

</style>
