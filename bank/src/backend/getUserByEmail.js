import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"

const balRef = collection(db, "users");

async function getUserByEmail(email){
    const q = query(balRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    // If no users with email, return null
    if (querySnapshot.empty){
        return null;
    }
    let balID = null;
    querySnapshot.forEach((doc) => {
        balID = doc.id;
    });
    return balID;
}

export default getUserByEmail;



