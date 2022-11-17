import { serverTimestamp, writeBatch, doc, setDoc, arrayUnion, collection, updateDoc } from "firebase/firestore";
import removeMoney from "./removeMoney";
import addMoney from "./addMoney";
import { db } from "./firebase";
import { getCurrentBalance } from "./currentUser";
import { exit } from "process";

async function transaction(senderID, receiverID, note, amount){
    let valid = true;

    if (senderID == null || receiverID == null){
        valid = false;
        throw new Error("Invalid users passed");
    }
    if (typeof(amount) != "number"){
        valid = false;
        console.log(typeof(amount));
        throw new Error("Amount must be a number");
    }
    if (amount < 0){
        valid = false;
        throw new Error("Negative amounts not allowed");
    }
    if (senderID == receiverID){
        valid = false;
        throw new Error("Cannot send money to self");
        
    }
    var balance = getCurrentBalance(); // TODO: FIX
    if (amount > balance) {
        valid = false;
        throw new Error("Insufficient funds in account")
    }

    if (valid == true) {
        await addMoney(receiverID, amount).catch((error) => {
            
            throw error;
        });
        
        await removeMoney(senderID, amount).catch((error)=>{
           // console.log(error);
            throw error;
        });
        const batch = writeBatch(db);

        const transactionData = {
            amount: amount, 
            date:  serverTimestamp(), 
            note: note, 
            receiver: receiverID, 
            sender: senderID
        }

        const transactions = collection(db,'Transactions') // collectionRef
        const transRef = doc(transactions) // docRef
        const transID = transRef.id // a docRef has an id property
        await setDoc(transRef, transactionData) // create the document

        const senderDoc = doc(db, "users", senderID);
        const receiverDoc = doc(db, "users", receiverID);

        await updateDoc(senderDoc, {
            transactions: arrayUnion(transID)
        });

        await updateDoc(receiverDoc, {
            transactions: arrayUnion(transID)
        });
    }

}


export default transaction;