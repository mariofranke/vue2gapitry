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

export async function listLoginActivity(userKey, applicationName, maxResults) {
  let response;
  try {
    const request = {
      userKey: userKey,
      applicationName: applicationName,
      maxResults: maxResults,
    };
    response = await window.gapi.client.reports.activities.list(request);
    console.log(response);
    return response.result.items;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
    return;
  }
}

export async function listActivity(userKey, applicationName, maxResults) {
  let response;
  try {
    const request = {
      userKey: userKey,
      applicationName: applicationName,
      maxResults: maxResults,
    };
    response = await window.gapi.client.reports.activities.list(request);
    console.log(response);
    return response.result.items;
  } catch (err) {
    console.log(err);
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
    console.log(response.result.messages);
    return response.result.messages;
  } catch (err) {
    console.log(err);
    //document.getElementById('content').innerText = err.message;
    return;
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
