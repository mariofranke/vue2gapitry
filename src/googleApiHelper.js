import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const googleApps = [
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

export async function getDataForUser() {
  const userKeys = await getAllUserKeys();
  userKeys.filter((key) => key.includes("mario"));
  //console.log(userKeys);
  let key = userKeys[1];
  let userData = {};
  let filteredGoogleApps = googleApps.slice(0, 4);
  //for (const key of userKeys) {
  for (const app of filteredGoogleApps) {
    const data = await listActivity(key, app, 10);
    if (typeof data === "undefined") {
      userData[app] = [];
    } else {
      userData[app] = data;
    }
  }
  console.log(userData);
  //await createUser("test", userData);
  return userData;
  //}
}

export async function createUser(user, data) {
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

export async function listActivity(userKey, applicationName, maxResults) {
  let response;
  try {
    const request = {
      userKey: userKey,
      applicationName: applicationName,
      maxResults: maxResults,
    };
    response = await window.gapi.client.reports?.activities?.list(request);
    return response.result.items;
  } catch (err) {
    //document.getElementById('content').innerText = err.message;
    return;
  }
}

export async function listGmailActivity(userId, maxResults) {
  let response;
  try {
    const request = {
      userId: userId,
      maxResults: maxResults,
    };
    response = await window.gapi.client.gmail.users.messages.list(request);
    return response.result.messages;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
  }
}

export function getUserData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
      localStorage.getItem("accessToken")
  );
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
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
    console.log(response);
    return response.result.isAdmin;
  } catch (err) {
    console.error("Error: " + err);
  }
}
