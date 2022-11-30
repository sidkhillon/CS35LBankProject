import { arrayUnion, collection, doc, serverTimestamp, increment, writeBatch } from "firebase/firestore";
import { getCurrentBalance, getCurrentUID } from "./currentUser";
import { db } from "./firebase"

// You can only remove money from your account
async function removeMoney(amount){
    const currUID = getCurrentUID();
    if (currUID === null){
        throw new Error("No user logged in");
    }
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    // Must remove a set amount of money
    if (amount < 0){
        throw new Error("Can only remove positive amounts of money");
    }
    if (amount === 0){
        throw new Error("Can only remove a non-zero amount of money");
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't remove values less than a cent");
        }
    }
    // Makes sure that the amount to remove is less than the current balance
    const balance = await getCurrentBalance();
    if (balance < amount){
        throw new Error("Insufficient funds");
    }

    const batch = writeBatch(db);
    // Everytime the user makes a withdrawal, a special transaction is created that stores that
    const transactionData = {
        amount: -amount,
        date: serverTimestamp(),
        note: "Withdrawal",
        receiver: currUID,
        sender: currUID
    }
    const transactions = collection(db, "Transactions");
    const transRef = doc(transactions);
    const userRef = doc(db, "users", currUID);
    const transID = transRef.id;
    batch.set(transRef, transactionData);
    batch.update(userRef, {
        balance: increment(-amount),
        transactions: arrayUnion(transID)
    });
    await batch.commit();
    console.log(`Subtracted $${amount} from currently logged in user`);
    return;
}


export default removeMoney;