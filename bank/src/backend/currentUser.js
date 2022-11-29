import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore";

let currUser = auth.currentUser;
let userData = null;

onAuthStateChanged(auth, async (user) => {
    if (user) { // User is signed in
        currUser = user;
        userData = await getDoc(doc(db, "users", user.uid));
    }
});


export function getCurrentUID(){
    if (currUser){
        return currUser.uid;
    }
    return null;
}

export async function getCurrentBalance(){
    if (userData){
        return userData.data().balance.toFixed(2);
    }
    return null;
}

export function getCurrentEmail(){
    if (currUser){
        return currUser.email;
    }
    return null;
}