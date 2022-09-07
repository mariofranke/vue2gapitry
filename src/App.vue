<template>
  <v-app>
    <v-container>
      <v-btn @click="tokenResponse">Login</v-btn>
      <v-btn @click="showEvents">Show Calendar</v-btn>
      <button id="revokeBtn" onclick="revokeToken">Revoke access token</button>
    </v-container>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

let gapiInited;
let gisInited;
let client;

function checkBeforeStart() {
  if (gapiInited && gisInited) {
    // Start only when both gapi and gis are initialized.
    document.getElementById("showEventsBtn").style.visibility = "visible";
    document.getElementById("revokeBtn").style.visibility = "visible";
  }
}

function gapiInit() {
  window.gapi.client.init({
    // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
  })
      .then(function () {  // Load the Calendar API discovery document.
        window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        gapiInited = true;
        checkBeforeStart();
      });
}

function gapiLoad() {
  window.gapi.load('client', gapiInit)
}


const showEvents = () => {


  client.callback = (resp) => {
    if (resp.error !== undefined) {
      throw(resp);
    }
    // GIS has automatically updated gapi.client with the newly issued access token.
    console.log('gapi.client access token: ' + JSON.stringify(window.gapi.client.getToken()));

    window.gapi.client.calendar.events.list({'calendarId': 'primary'})
        .then(calendarAPIResponse => console.log(JSON.stringify(calendarAPIResponse)))
        .catch(err => console.log(err));

    document.getElementById("showEventsBtn").innerText = "Refresh Calendar";
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

        console.log("client resp", resp);
        resolve(resp);
      };
      console.log("client", client);
      client.requestAccessToken({prompt: "consent"});
    } catch (err) {
      console.log(err);
    }
  })
};

function gisInit() {
  client = window.google.accounts.oauth2.initTokenClient({
    client_id: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    callback: '',  // defined at request time
  });
  gisInited = true;
  checkBeforeStart();
}

console.log(tokenResponse)
export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  methods: {
    tokenResponse,
    showEvents
  },
  async mounted() {

    /*
        await window.gapi.load(('client'), function () {
          window.gapi.client.init({
            clientId: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
            discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest',


            // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
          })
              .then(function () {  // Load the Calendar API discovery document.
                window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
              });
          /!* Ready. Make a call to gapi.auth2.init or some other API *!/
        })


        console.log("gapi", window.gapi);
        window.gapi.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        const scopes = "https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/calendar.readonly  https://www.googleapis.com/auth/admin.reports.audit.readonly  https://www.googleapis.com/auth/admin.reports.usage.readonly"
        client = window.google.accounts.oauth2.initTokenClient({
          client_id: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
          scope: scopes,
          callback: "", // defined at request time
        });*/
    gapiLoad()
    gisInit()


  },

  data: () => ({
    //
  }),
};
</script>
