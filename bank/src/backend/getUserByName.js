import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"

const userRef = collection(db, "users");

async function getUserByName(name){
    const q = query(userRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty){
        return null;
    }
    let userID = null;
    querySnapshot.forEach((doc) => {
        userID = doc.id;
    });
    return userID;
}

export default getUserByName;