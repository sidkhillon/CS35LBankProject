import { doc, getDoc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import { db } from "./firebase"

async function removeMoney(balID, amount){
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    // Must add a set amount of money
    if (amount < 0){
        throw new Error("Can't remove a negative amount of money");
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't remove values less than a cent");
        }
    }
    const balIDref = doc(db, "Balances", balID);
    const curBal = await getDoc(balIDref);
    if (curBal.data().balance < amount){
        throw new Error("Not enough money in account");
    }
    await updateDoc(balID, {
        balance: increment(-amount)
    });
    return "";
}



// async function removeMoney(uid, amount){
//     if (typeof(amount) != "number"){
//         throw new Error("Amount must be a number");
//     }
//     // Must add a set amount of money
//     if (amount < 0){
//         throw new Error("Can't remove a negative amount of money");
//     }
//     // Can't add less than a cent of money
//     const amtStr = String(amount);
//     if (amtStr.includes('.')){
//         if (amtStr.split('.')[1].length > 2){
//             throw new Error("Can't remove values less than a cent");
//         }
//     }
//     const uidRef = doc(db, "users", uid);
//     const uidSnap = await getDoc(uidRef);
//     if (uidSnap.data().balance < amount){
//         throw new Error("Not enough money in account");
//     }
//     await updateDoc(uidRef, {
//         balance: increment(-amount)
//     });
//     return "";
// }

export default removeMoney;