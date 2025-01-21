"use client"
import Header from '@/components/Header/Header'
import { ArrowUpRight, Chrome, Github } from 'lucide-react';  
import {useState,useCallback, useEffect} from "react"
import { emailSchema, passwordSchema, formSchema } from "../validation/authCredentialsValidation";
import { login } from '../server/auth/testAuth';
import { redirect } from 'next/navigation';
import Link from 'next/link';


interface FormErrors {
  email : String | null,
  password : String | null,
}


const page = () => {

 const [email,setEmail] = useState<string>("");
 const [password,setPassword] = useState<string>("");
 const [isLoading,setIsLoading] = useState<boolean>(false)
 const [error,setError] = useState<String | null>(null)
 const [isSuccess,setIsSuccess] = useState<boolean>(false)
 const [rememberMe,setRememberMe] = useState<boolean>(false)
 const [formErrors,setFormErrors] = useState<FormErrors>({
   email : null,
   password : null,
 })
 

 const handleLogin = async () => {
  try {
    const userData = { email, password };
    setIsLoading(true);
    const res = await  login(userData);
    if(res.success){
      setIsSuccess(true);
      setError(null)
      setTimeout(() => { redirect("/") }, 2000);
    }else{
        setError(res.message)
      }
  }catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }
  }finally{
    setIsLoading(false)
  }
 };



const handleFormSubmit =  useCallback(
  async (e : React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     console.log(email,password)
     const result = formSchema.safeParse({email,password})
     if(result.success){
       handleLogin()
     }else{
       console.log("validation failed",email,password)
     setError("Please verify form fields")
     }
},[formSchema,email,password])


const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Debounced handlers
const handleEmailChange = useCallback(
  debounce((value: string) => {
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: result.error.errors[0].message }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: null }));
    }
  }, 1000), []
);

const handlePasswordChange = useCallback(
  debounce((value: string) => {
    const result = passwordSchema.safeParse(value);
    if (!result.success) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: result.error.errors[0].message }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
  }, 1000), []
);

useEffect(() => {
    setError(null);
    handleEmailChange(email);  
}, [email, handleEmailChange]);

useEffect(() => {
    setError(null);
    handlePasswordChange(password);
}, [password, handlePasswordChange]);



  return (
    <>
    <Header buttonState='signup' links={false}></Header>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-6 md:pt-24 p-4">
      {/* Main Container */}
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
      <div className="flex justify-center items-center">
  {error && (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-red-500 bg-red-100 text-red-700 w-full max-w-md shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
        />
      </svg>
      <p className="text-sm font-medium">{error}</p>
    </div>
  )}
  {isSuccess && (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-green-500 bg-green-100 text-green-700 w-full max-w-md shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p className="text-sm font-medium">Login success</p>
    </div>
  )}
</div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={e => handleFormSubmit(e)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
             {formErrors.email && (<p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.email}</p>)}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
               {formErrors.password && (<p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.password}</p>)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
              onChange={e =>setRememberMe(e.target.checked)}
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-emerald-500 hover:text-emerald-400">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all ease-in-out duration-150"
          >
           {isLoading ? "signing in": "Sign in"}
          </button>
        </form>

        {/* Social Sign In */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <Chrome className="h-5 w-5" />
              <span className="ml-2">Google</span>
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <Github className="h-5 w-5" />
              <span className="ml-2">GitHub</span>
            </button>
          </div>
        </div>
        <span className="flex justify-center mt-6 text-sm text-gray-500 pe-2">
        Don't have an account? 
          <Link href="/signup" className="font-medium text-emerald-500 hover:text-emerald-500">
           <span className='flex ms-1'> Create Proshift Account <ArrowUpRight size={16} strokeWidth={1} absoluteStrokeWidth /></span>   
          </Link>
        </span>
      </div>
    </div>
    </>
  )
}

export default page
