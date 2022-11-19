import { doc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import { getCurrentBalance, getCurrentUID } from "./currentUser";
import { db } from "./firebase"

// You can only remove money from your account
async function removeMoney(amount){
    const currUID = getCurrentUID();
    if (currUID == null){
        throw new Error("No user logged in");
    }
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    // Must remove a set amount of money
    if (amount <= 0){
        throw new Error("Can only remove positive amounts of money");
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't remove values less than a cent");
        }
    }
    const userRef = doc(db, "users", currUID);
    // Makes sure that the amount to remove is less than the current balance
    if (getCurrentBalance() < amount){
        throw new Error("Not enough money in account");
    }
    await updateDoc(userRef, {
        balance: increment(-amount)
    });
    console.log(`Subtracted $${amount} from currently logged in user`);
    return;
}


export default removeMoney;