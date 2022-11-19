import { serverTimestamp, writeBatch, doc, arrayUnion, collection, increment } from "firebase/firestore";
import { db } from "./firebase";
import { getCurrentBalance, getCurrentUID } from "./currentUser";

// Transactions only work with the currently logged in user
async function transaction(receiverID, note, amount){
    const senderID = getCurrentUID();
    if (senderID == null){
        throw new Error("No user logged in");
    }
    if (receiverID == null){
        throw new Error("Invalid recipient passed");
    }
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    if (amount <= 0){
        throw new Error("Only positive amounts can be sent");
    }
    if (senderID === receiverID){
        throw new Error("Cannot send money to self");
    }
    const balance = getCurrentBalance();
    if (amount > balance) {
        throw new Error("Insufficient funds in account");
    }
    const batch = writeBatch(db);

    const transactionData = {
        amount: amount, 
        date:  serverTimestamp(), 
        note: note, 
        receiver: receiverID, 
        sender: senderID
    }

    const transactions = collection(db,'Transactions'); // collectionRef
    // Getting all the document refs
    const transRef = doc(transactions); // docRef
    const senderRef = doc(db, "users", senderID);
    const receiverRef = doc(db, "users", receiverID);
    const transID = transRef.id; // a docRef has an id property
    batch.set(transRef, transactionData);
    batch.update(senderRef, {
        balance: increment(-amount),
        transactions: arrayUnion(transID)
    });
    batch.update(receiverRef, {
        balance: increment(amount),
        transactions: arrayUnion(transID)
    })
    await batch.commit();
    return;
}


export default transaction;