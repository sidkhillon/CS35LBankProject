import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import errorCodes from "../errorCodes.json"

/* 
Function that, when passed an email, password, and a confirmation of password attempts to sign user up
If it runs into a problem, will return the error message
Otherwise returns an empty string
The error is set to the output of this function
*/

async function AuthSignup(email, password, confirm) {
  // Checking that the password and its confirmation are the same
  if (password !== confirm){
    //console.log("Password no match");
    return "Passwords Do Not Match";
  }
  if (password.length < 6){
    return "Password must be at least six characters long"
  }
  let toReturn = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    /*
    if (user != null){
      console.log("Sending verification email");
      sendEmailVerification(user);
    }
    */
    return "";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log (`Error code ${errorCode} with message ${errorMessage}`);
    for (const errorType in errorCodes){
      const errorObj = errorCodes[errorType];
      if (errorObj.code === errorCode){
        return errorObj.error;
      }
    }
    return "Ran into an issue creating account";
  });
  return toReturn;
  };

export default AuthSignup;
  