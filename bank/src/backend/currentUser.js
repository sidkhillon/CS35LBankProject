import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore";

let currUser = null;
let docSnap = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    currUser = user;
    docSnap = await getDoc(doc(db, "users", user.uid));
  } else {
    // User is signed out
    }
});


export function getCurrentUID(){
    // If a user is currently signed in, return the uid
    if (currUser){
        return currUser.uid;
    }
    //  Otherwise return null
    return null;
}

export async function getCurrentBalance(){
    if (docSnap){
        return docSnap.data().balance;
    }
    return null;
}

export async function getCurrentEmail(){
    if (docSnap){
        return docSnap.data().email;
    }
    return null;
}