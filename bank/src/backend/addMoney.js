import { doc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import { db } from "./firebase"


async function addMoney(balID, amount){
    if (typeof(amount) != "number"){
        throw new Error("Amount must be a number");
    }
    // Must add a set amount of money
    if (amount < 0){
        throw new Error("Can't add a negative amount of money");
    }
    // Can't add less than a cent of money
    const amtStr = String(amount);
    if (amtStr.includes('.')){
        if (amtStr.split('.')[1].length > 2){
            throw new Error("Can't add values less than a cent");
        }
    }
    const balIDref = doc(db, "users", balID);
    await updateDoc(balIDref, {
        balance: increment(amount)
    });
    console.log(`Added ${amount} to balance with ID ${balID}`)
    return;
}


// async function addMoney(uid, amount){
//     if (typeof(amount) != "number"){
//         throw new Error("Amount must be a number");
//     }
//     // Must add a set amount of money
//     if (amount < 0){
//         throw new Error("Can't add a negative amount of money");
//     }
//     // Can't add less than a cent of money
//     const amtStr = String(amount);
//     if (amtStr.includes('.')){
//         if (amtStr.split('.')[1].length > 2){
//             throw new Error("Can't add values less than a cent");
//         }
//     }
//     const uidRef = doc(db, "users", uid);
//     await updateDoc(uidRef, {
//         balance: increment(amount)
//     });
//     return "";
// }

export default addMoney;