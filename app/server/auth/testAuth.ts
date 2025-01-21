"use server"
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import {adminAuth} from  "../../../firebase/firebase-admin"
import { app, auth, db } from "@/firebase/firebase";
// import { setTimeout } from "timers/promises";
import { serverTimestamp, collection, doc, setDoc } from 'firebase/firestore';
import {z}  from "zod"




interface FormData {
  email: string;
  password: string;
}

interface EmailCheckResult {
    exists: boolean;
    error?: string;
  }

export async function login(formData:FormData) {
    // await setTimeout(2000);
    return { success : true , message: "User created successfully" };
}


export async function signup({email,password}:FormData) {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(collection(db, 'users'), user.uid), {
      email: email,
      password: password,
      createdAt: serverTimestamp(),
    });
    return { success : true , message: "User created successfully" };
  }catch(e : any){
    return { success : false , message: e.message };
  }finally{

  } }
  
  

  export async function checkAccountEmailExists(email: string): Promise<EmailCheckResult> {
    try {
      await adminAuth.getUserByEmail(email);
      return { exists: true ,
              error : "Email already in use"};
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          return { exists: false ,
                   error : "Email Availble"};
        case 'auth/invalid-email':
          return { 
            exists: false, 
            error: 'Invalid email format' 
          };
        
        case 'auth/internal-error':
          return { 
            exists: false, 
            error: 'Firebase service is temporarily unavailable' 
          };
          
        case 'auth/insufficient-permission':
          return { 
            exists: false, 
            error: 'Insufficient permissions to access user data' 
          };
  
        default:
          return { 
            exists: false, 
            error: 'An unexpected error occurred while checking email availability' 
          };
      }
    }
  }