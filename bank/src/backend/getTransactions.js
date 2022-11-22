import { collection, doc, getDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firebase"

// Takes an array of transaction IDs as input and returns an array of those transaction objects
export async function processsTransactions(transactions){
    const allTransactions = []
    for (const transactionID of transactions) {
        const transRef = doc(db, "Transactions", transactionID);
        const transSnap = await getDoc(transRef);
        const transData = transSnap.data();
        allTransactions.push(transData);
    }
    return allTransactions;
}

// Given a UID, returns an array of all of that users transactions
export async function getAllTransactions(UID){
    const userRef = doc(db, "users", UID);
    const userSnap = await getDoc(userRef);
    const transactions = userSnap.data().transactions;
    return transactions;
}

// Given the number of transactions you want and the UID, returns an array of that many of the most recent current user transactions
export async function getPreviousTransactions(UID, numTransactions){
    const allTransactions = await getAllTransactions()
    return allTransactions.slice(-numTransactions);
}

// Takes as input two UIDs, returns an array of all IDS of transactions between the two users
export async function getSharedTransactions(UID1, UID2){
    if (UID1 === UID2){
        throw new Error("Cannot retrieve transactions to self");
    }
    const trans1 = getAllTransactions(UID1);
    const trans2 = getAllTransactions(UID2);
    // Getting the shared transactions
    const sharedTrans = trans1.filter((transaction) => trans2.includes(transaction));
    return sharedTrans;
}

// Takes as input a UID and returns an array of all withdrawal transaction objects
export async function getWithdrawals(UID){
    const transRef = collection(db, "Transactions");
    const q = query(transRef, where("receiver", "==", UID), where("sender", "==", UID), where("amount", "<", "0"));
    const querySnapshot = await getDocs(q);
    let transactions = []
    querySnapshot.forEach((doc) => {
        transactions.push(doc.data());
    });
    return transactions;
}

// Takes as input a UID and returns an array of all deposit transaction objects
export async function getDeposits(UID){
    const transRef = collection(db, "Transactions");
    const q = query(transRef, where("receiver", "==", UID), where("sender", "==", UID), where("amount", ">", "0"));
    const querySnapshot = await getDocs(q);
    let transactions = []
    querySnapshot.forEach((doc) => {
        transactions.push(doc.data());
    });
    return transactions;
}
//takes in a date (must enter date as a javascript Date object) as well as the UID and returns array of all transactions in the specified date
//https://www.codegrepper.com/code-examples/whatever/convert+date+to+firebase+timestamp
export async function getTransactionsByDate(UID, date){
    const transRef = collection(db, "Transactions");
    //store all collections where receiver or sender === UID in q
    const q = query(transRef, where("receiver", "==", UID), where("sender", "==", UID), );
    const querySnapshot = await getDocs(q);
    let transactions = []  
    //iterate through doc and find all the collections where the date is the same as the given date
    querySnapshot.forEach((doc) => {
        const d = doc.data().get("date");
        const transDate = new Timestamp(d.seconds , d.nanoseconds).toDate();
        if(date === transDate){
            transactions.push(doc.data());
        }      
    });
    return transactions;
}