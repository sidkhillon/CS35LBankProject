import { arrayUnion, collection, doc, serverTimestamp, increment, writeBatch } from "firebase/firestore";
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
    if (amount < 0){
        throw new Error("Can only deposit a positive amount of money");
    }
    if(amount == 0){
        throw new Error("Must deposit a non-zero amount of money")
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't add values less than a cent");
        }
    }

    const batch = writeBatch(db);
    // Everytime the user makes a deposit, a special transaction is created that stores that
    const transactionData = {
        amount: amount,
        date: serverTimestamp(),
        note: "Deposit",
        receiver: currUID,
        sender: currUID
    }
    const transactions = collection(db, "Transactions");
    const transRef = doc(transactions);
    const userRef = doc(db, "users", currUID);
    const transID = transRef.id;
    batch.set(transRef, transactionData);
    batch.update(userRef, {
        balance: increment(amount),
        transactions: arrayUnion(transID)
    })
    await batch.commit();
    console.log(`Added $${amount} to currently logged in user`);
    return;
}



export default addMoney;