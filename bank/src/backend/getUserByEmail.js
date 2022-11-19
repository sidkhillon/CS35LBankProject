import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"

const userRef = collection(db, "users");

async function getUserByEmail(email){
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    // If no users with email, return null
    if (querySnapshot.empty){
        return null;
    }
    let UID = null;
    querySnapshot.forEach((doc) => {
        UID = doc.id;
    });
    return UID;
}

export default getUserByEmail;



