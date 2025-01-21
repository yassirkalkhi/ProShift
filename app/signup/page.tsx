"use client";
import { useState } from "react";
import Header from "@/components/Header/Header";
import Step1 from "@/components/form/signupFormSteps/emailStep";
import Step2 from "@/components/form/signupFormSteps/userInfoStep"
import Step3 from "@/components/form/signupFormSteps/passwordStep"
import { signup } from "../server/auth/testAuth";
import { redirect } from "next/navigation";
import { ArrowUpRight, Chrome, Github } from "lucide-react";
import Link from "next/link";



interface formErrors{
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  fname: string | null;
  lname: string | null;
  username: string | null;
}

const Page = () => {
  const [step, setStep] = useState<string>("first");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({
    email: null,
    password: null,
    confirmPassword:null,
    fname: null,
    lname: null,
    username: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  const checkAccountUsernameExists = async (username: string) => {
    // username existence check logic here
    return true;
  };

  const handleSignUp = async () => {
    try {
      const userData = { email, password };
      setIsLoading(true);
      const res = await signup(userData);
      if (res.success) {
        setIsSuccess(true);
        setError(null);
        setTimeout(() => {
          redirect("/"); // Redirection 
        }, 2000); // Delay Simulation
      } else {
        setError(res.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  

  return (
    <>
      <Header buttonState="login" links={false} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-6 md:pt-10 p-4">
        {/* Main Container */}
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          </div>
          
          <form className="mt-8 space-y-6" >
            {/* Error and Success Message */}
            <div className="flex justify-center items-center">
              {error && (
              <div className="w-full p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> alert!</span>  {error}
            </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-3 p-4 rounded-lg border border-green-500 bg-green-100 text-green-700 w-full max-w-md shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm font-medium">User created successfully</p>
                </div>
              )}
            </div>
            {step === "first" && (
              <Step1
                email={email}
                setEmail={setEmail}
                formErrors={{ email: formErrors.email }}
                setFormErrors={setFormErrors}
                setStep={setStep}
                debounce={debounce}
                setError={setError}
              />
            )}
            {step === "second" && (
              <Step2
                firstName={firstName}
                lastName={lastName}
                username={username}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setUsername={setUsername}
                formErrors={{
                  fname: formErrors.fname,
                  lname: formErrors.lname,
                  username: formErrors.username,
                }}
                setFormErrors={setFormErrors}
                setStep={setStep}
                checkAccountUsernameExists={checkAccountUsernameExists}
                debounce={debounce}
              />
            )}
            {step === "third" && (
              <Step3
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                formErrors={{ password: formErrors.password }}
                setFormErrors={setFormErrors}
                handleSignUp={handleSignUp}
                debounce={debounce}
              />
            )}
            {step === "third" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    onChange={(e) => setRememberMe(e.target.checked)}
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>
            )}
              {step === "first" &&  
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
          </div>}  
          <span className="flex justify-center mt-6 text-sm text-gray-500 pe-2">
            Already have an account? 
            <Link href="/login" className="font-medium text-emerald-500 hover:text-emerald-500">
              <span className="flex ms-1">Login here<ArrowUpRight size={16} strokeWidth={1} /></span>   
            </Link>
          </span>

          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
