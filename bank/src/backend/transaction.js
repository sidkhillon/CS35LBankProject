import { arrayUnion, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import removeMoney from "./removeMoney";
import addMoney from "./addMoney";
import { db } from "./firebase";

async function transaction(fromUID, toUID, note, amount){
    if (fromUID == null || toUID == null){
        throw new Error("Invalid users passed");
    }
    if (typeof(amount) != "number"){
        console.log(typeof(amount));
        throw new Error("Amount must be a number");
    }
    if (amount < 0){
        throw new Error("Negative amounts not allowed");
    }
    if (fromUID === toUID){
        throw new Error("Cannot send money to self");
    }
    await addMoney(toUID, amount).catch((error) => {
        throw error;
    });
    
    await removeMoney(fromUID, amount).catch((error)=>{
        throw error;
    });
    const batch = writeBatch(db);
    // Creating a transaction in the database
    const transactionData = {
        from: fromUID,
        to: toUID,
        note: note,
        amount: amount,
        timestamp: serverTimestamp()
    }
    // Making a copy of the transaction for both users
    const transactionRefFrom = doc(db, 'transactions', fromUID);
    batch.set(transactionRefFrom, transactionData);
    const transactionRefTo = doc(db, 'transactions', toUID);
    batch.set(transactionRefTo, transactionData);
    // Saving the transactions to the users involved
    batch.update(doc(db, "users", fromUID), {
        transactions: arrayUnion(transactionRefFrom.id)
    });
    batch.update(doc(db, "users", toUID), {
        transactions: arrayUnion(transactionRefTo.id)
    });
    await batch.commit().catch((error) => {
        throw error;
    });
    return "";
}

export default transaction;