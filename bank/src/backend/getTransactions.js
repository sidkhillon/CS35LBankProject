import { doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase"

// Function that takes a uid and returns an array of all user transactions
export async function getAllTransactions(uid){
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const transactions = userSnap.data().transactions;
    console.log(transactions);
    let transactionInfo = [];
    
    transactions.forEach(async transactionId => {
        const transRef = doc(db, "Transactions", transactionId);
        const transSnap = await getDoc(transRef);
        transactionInfo.push(transSnap.data())
    });
    
    console.log(transactionInfo);
}