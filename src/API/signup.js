import axios from "axios"
import { createUserWithEmailAndPassword} from 'firebase/auth'

const duplicateUserName =  async (username) => { //function checks if username already exists
    try {

      const response = await axios.get(`https://album-review-app-lnmu.onrender.com/users/username/${username}`);   //api call to backend to see if username already exists, will return 200 if found 

        return response.status === 200; //user name found
 
    } catch (error) { //if there is an error, that means no duplicate username was found
        if (error.response?.status === 404) { return false }
        throw error
    }
}

export const submitUser = async (username, email, password, auth) => {
 
  
  if (password.length < 8) return { error: "badPassword" }
  const isDuplicate = await duplicateUserName(username)
  if (isDuplicate) return { error: "duplicateUsername"}
  
  try {
    console.log("Creating Firebase user...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
   
    
   
    const userData = {
      userid: uid,
      email: email,
      username: username,
      created: new Date().toLocaleString().split(',')[0],
    };

    
    const response = await axios.post(`https://album-review-app-lnmu.onrender.com/users`, userData);
    

    
    if (response.status === 201) {
      console.log("User creation successful");
      return {status: true}
    }
    
  } catch (error) {
    console.error("Error in submitUser:", error);
    console.error("Full error object:", error.response?.data);
    
    if (error.code === "auth/email-already-in-use") return { error: "duplicateEmail" }
    if (error.code === "auth/invalid-email") return { error: "badEmail" }
    return { error: "unknown" }
  }
}

