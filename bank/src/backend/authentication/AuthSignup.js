import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function AuthSignup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  };

export default AuthSignup;
  