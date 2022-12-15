import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const googleApps = [
  "calendar",
  "chat",
  "drive",
  "login",
  "meet",
  "mobile",
  "keep",
];
export const googleAppsALL = [
  "access_transparency",
  "admin",
  "calendar",
  "chat",
  "drive",
  "gcp",
  "gplus",
  "groups",
  "groups_enterprise",
  "jamboard",
  "login",
  "meet",
  "mobile",
  "rules",
  "saml",
  "token",
  "user_accounts",
  "context_aware_access",
  "chrome",
  "data_studio",
  "keep",
];

export async function getActivityDataForUsers() {
  const userKeys = await getAllUserKeys();
  userKeys.push("all");
  //userKeys.filter((key) => key.includes("mario"));
  //console.log(userKeys);
  //let key = userKeys[1];
  let users = new Map();
  //let filteredGoogleApps = googleApps.slice(0, 4);
  for (const key of userKeys) {
    let userData = {};
    console.log("loading data for", key);
    for (const app of googleApps) {
      console.log("loading data for", app);
      const data = await listActivity(key, app);
      if (typeof data === "undefined") {
        userData[app] = [];
      } else {
        userData[app] = data;
        await createUser(key, data, app);
      }
    }
    users.set(key, userData);
    //await createUser(key, userData);
  }
  console.log(users);
  //await createUser("test", userData);
  return users;
}

export async function createUser(userKey, data, app) {
  firebase
    .firestore()
    .collection(userKey)
    .doc(app)
    .set({
      name: userKey,
      data: data,
      description: "ActivityData",
    })
    .then(() => {
      console.log("user created");
    });
}

export async function getAllUserKeys() {
  const userKeys = [];
  const users = await listUsers();
  users.forEach((user) => {
    let filtered = user.emails.filter((e) => e.primary);
    let userKey = filtered[0].address;
    userKeys.push(userKey);
  });
  return userKeys;
}

export async function listActivity(userKey, applicationName) {
  let response;
  try {
    const request = {
      userKey: userKey,
      applicationName: applicationName,
    };
    response = await window.gapi.client.reports?.activities?.list(request);
    return response.result.items;
  } catch (err) {
    //document.getElementById('content').innerText = err.message;
    return;
  }
}

export async function listGmailActivity(userId) {
  let response;
  try {
    const request = {
      userId: userId,
    };
    response = await window.gapi.client.gmail.users.messages.list(request);
    return response.result.messages;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
  }
}

export async function listCalendarEntriesforCalender(calendarId) {
  let response;
  try {
    const request = {
      calendarId: calendarId,
    };
    response = await window.gapi.client.calendar.events.list(request);
    console.log("listCalendarEntriesforCalender", response);
    return response.result.items;
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function getAllCalenderEntries() {
  const calendars = await listCalenders();
  let filteredCalendars = calendars.filter((c) => c.accessRole === "owner");
  let calendarEntries = [];
  for (const calendar of filteredCalendars) {
    const entries = await listCalendarEntriesforCalender(calendar.id);
    for (const entry of entries) {
      if (entry.start.dateTime !== undefined) {
        calendarEntries.push(entry);
      }
    }
    return calendarEntries;
  }
}

export async function listCalenders() {
  let response;
  try {
    response = await window.gapi.client.calendar.calendarList.list();
    return response.result.items;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
  }
}

export async function getMessageforId(userId, messageId) {
  let response;
  try {
    const request = {
      userId: userId,
      id: messageId,
    };
    response = await window.gapi.client.gmail.users.messages.get(request);
    return response;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
  }
}

export async function getMessagesforId(userId, mails) {
  let messages = [];
  for (const mail of mails) {
    let message = await getMessageforId(userId, mail.id);
    messages.push(message);
  }
  return messages;
}

export function getUserData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
      localStorage.getItem("accessToken")
  );
  const accessToken = localStorage.getItem("accessToken");
  //console.log(accessToken);
  xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
  xhr.onload = function () {
    //console.log(typeof xhr.responseText);
    let data = JSON.parse(xhr.responseText);
    return callback(data);
    //console.log("onload", JSON.parse(xhr.responseText));
    // return JSON.parse(xhr.responseText);
    //setData(JSON.parse(xhr.responseText))
  };
  xhr.send();
  return xhr.responseText;
}

/**
 * Print the first 10 users in the domain.
 */
async function listUsers() {
  let response;
  try {
    const request = {
      domain: "dev.ektosym.com",
      maxResults: 10,
      orderBy: "email",
    };
    response = await window.gapi.client.directory.users.list(request);
    return response.result.users;
  } catch (err) {
    console.error("Error: " + err);
  }
}

/**
 *
 */
export async function getUserAdminStatus(userKey) {
  let response;
  try {
    const request = {
      userKey: userKey,
    };
    response = await window.gapi.client.directory.users.get(request);
    //console.log(response);
    return response.result.isAdmin;
  } catch (err) {
    console.error("Error: " + err);
  }
}
