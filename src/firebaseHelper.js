import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export function getMyUserData() {
  firebase
    .firestore()
    .collection(this.getUser())
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        switch (doc.id) {
          case "admin":
            this.adminActivityData = doc.data();
            break;
          case "calendar":
            this.calendarActivityData = doc.data();
            break;
          case "drive":
            this.driveActivityData = doc.data();
            break;
          case "gmail":
            this.gmailActivityData = doc.data();
            break;
          case "mobile":
            this.mobileActivityData = doc.data();
            break;
          case "login":
            this.loginActivityData = doc.data();
            break;
          case "meet":
        }
        console.log(doc.id, " => ", doc.data());
      });
    });
}
