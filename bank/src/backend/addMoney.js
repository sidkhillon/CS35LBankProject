import { doc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import { getCurrentUID } from "./currentUser";
import { db } from "./firebase"


async function addMoney(amount){
    const currUID = getCurrentUID();
    if (currUID == null){
        throw new Error("No user logged in");
    }
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    // Must add a set amount of money
    if (amount <= 0){
        throw new Error("Can only remove positive amounts of money");
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't add values less than a cent");
        }
    }
    const userRef = doc(db, "users", currUID);
    await updateDoc(userRef, {
        balance: increment(amount)
    });
    console.log(`Added $${amount} to currently logged in user`);
    return;
}



export default addMoney;