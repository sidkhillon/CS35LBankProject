import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  }
});
 