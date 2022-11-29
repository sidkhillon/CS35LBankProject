import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"

/*
Transactions:
All transactions are stored with a sender, recipient, amount, note, and time
Users store an array of transaction IDs
If the user is the recipient, they gained money
If the user is the sender, they lost money
Users cannot send to themselves
Transactions in general should have a positive amount, with one exception:
Withdrawals and Deposits:
When a user makes a withdrawal or makes a deposit, it is stored as a transaction
The sender and recipient are the same, as transactions cannot be made with oneself
If the user made a withdrawal, the amount is negative
This is the only case in which the amount can be negative
If the user made a deposit, the amount is positive
The note is also set to 'Deposit' or 'Withdrawal', but this should not be used to check the type
Instead, this should be done by checking if the sender UID and receiver UID are the same
*/

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
    const transactions = await userSnap.data().transactions;
    return transactions;
}

// Given the number of transactions you want and the UID, returns an array of that many of the most recent current user transactions
export async function getPreviousTransactions(UID, numTransactions){
    const allTransactions = await getAllTransactions(UID)
    return allTransactions.slice(-numTransactions);
}

// Takes as input two UIDs, returns an array of all IDS of transactions between the two users
export async function getSharedTransactions(UID1, UID2){
    if (UID1 === UID2){
        throw new Error("Cannot retrieve transactions to self");
    }
    const trans1 = await getAllTransactions(UID1);
    const trans2 = await getAllTransactions(UID2);
    const ts1 = new Set();
    for (let i = 0; i < trans1.length; i++) {
        ts1.add(trans1[i]);
    }
    const ts2 = new Set();
    for (let i = 0; i < trans2.length; i++) {
        ts2.add(trans2[i]);
    }
    // Getting the shared transactions
    const sharedTrans = new Set(
        [...ts1].filter(transaction => ts2.has(transaction))
      );
    const sharedTransObjs = await processsTransactions(sharedTrans);
    return sharedTransObjs;
}

// Takes as input a UID and returns an array of all withdrawal transaction objects
export async function getWithdrawals(UID){
    const transRef = collection(db, "Transactions");
    const q = query(transRef, where("receiver", "==", UID), where("sender", "==", UID), where("amount", "<", 0));
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
    const q = query(transRef, where("receiver", "==", UID), where("sender", "==", UID), where("amount", ">", 0));
    const querySnapshot = await getDocs(q);
    let transactions = []
    querySnapshot.forEach((doc) => {
        transactions.push(doc.data());
    });
    return transactions;
}

// Takes in a d1 (must enter date as a javascript Date object) as well as the UID and returns array of all transactions in the specified date
export async function getTransactionsByDate(UID, date){
    const transRef = collection(db, "Transactions");
    // Creates new date d2 which is one day after d1
    var d1 = new Date(removeTime(date).valueOf());
    var d2 = new Date(d1.valueOf());
    d2.setDate(d1.getDate() + 1);
    // Store all collections where receiver or sender == UID in q
    const q1 = query(transRef, where("receiver", "==", UID), where('date', '>=', d1), where('date','<=', d2));
    const q2 = query(transRef, where("sender", "==", UID), where('date', '>=', d1), where('date','<=', d2));
    const query1Snapshot = await getDocs(q1);
    const query2Snapshot = await getDocs(q2);

    // Adds transaction object to array as long as it isn't a deposit/withdrawal
    const transactions = []
    query1Snapshot.forEach((doc) => {
        if (doc.data().receiver !== doc.data().sender) {
            transactions.push(doc.data());
        }
    });

    query2Snapshot.forEach((doc) => {
        if (doc.data().receiver !== doc.data().sender) {
            transactions.push(doc.data());
        }
    });

    return transactions;
}

function removeTime(date = new Date()) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  export async function getSharedTransactions(UID1, UID2){
    if (UID1 === UID2){
        throw new Error("Cannot retrieve transactions to self");
    }
    const trans1 = await getAllTransactions(UID1);
    const trans2 = await getAllTransactions(UID2);
    const ts1 = new Set();
    for (let i = 0; i < trans1.length; i++) {
        ts1.add(trans1[i]);
    }
    const ts2 = new Set();
    for (let i = 0; i < trans2.length; i++) {
        ts2.add(trans2[i]);
    }
    // Getting the shared transactions
    const sharedTrans = new Set(
        [...ts1].filter(transaction => ts2.has(transaction))
      );
    const sharedTransObjs = await processsTransactions(sharedTrans);
    return sharedTransObjs;
}