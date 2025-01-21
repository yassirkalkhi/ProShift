import React from 'react'
    import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import {app} from "../../firebase/firebase"





const page = async () => {





const auth = getAuth(app);
const email = "type@gmail.com";

  const signInMethods =  await fetchSignInMethodsForEmail(auth, email);
  console.log(signInMethods)

  return (
    <div>
      
    </div>
  )
}

export default page
