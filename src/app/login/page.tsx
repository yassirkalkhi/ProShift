'use client'
import React, { useEffect, useRef, useState } from 'react';
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useRouter } from "next/navigation";

import Header from "../components/Navigation/Header";

const LoginPage: React.FC = () => {
    const router = useRouter();
     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) router.push("/");
       });
       return () => unsubscribe();
     }, [router]);
   

  const userRef = useRef<HTMLInputElement | null>(null); 
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  //  logout
  const handleLogout = React.useCallback(async () => {
    try {
      await signOut(auth); 
      setUser(null);
      router.push("/login");
    } catch (error: unknown) {
      alert("Error logging out: " + error);
    }
  }, [router]);

  const handleUserLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      user: userRef.current?.value || '',
      password: passwordRef.current?.value || ''
    };

       // Session
    try {
    
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence); 
      } else {
        await setPersistence(auth, browserSessionPersistence);  
      }

      const response = await signInWithEmailAndPassword(auth, data.user, data.password);
      console.log(response.user);
      setError(null); 
      router.push("/"); 

    } catch (error) {
      const errorCode = (error as { code: string }).code;
      let errorMessage = '';


      switch (errorCode) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid credentials';
          break;
        default:
          errorMessage = 'An unknown error occurred. Please try again later.';
      }

      setError(errorMessage);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google login successful:', user);
      setUser(user); 
      router.push("/"); 
    } catch (error) {
      const errorCode = (error as { code: string }).code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'The popup was closed before authentication was completed.';
          break;
        default:
          errorMessage = 'An error occurred during Google login. Please try again.';
      }

      setError(errorMessage);
    }
  };

  // Session expiry 
  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      handleLogout();
    }, 60 * 60 * 1000); 
    if (user) {
      clearTimeout(sessionTimeout);
    }

    return () => clearTimeout(sessionTimeout);
  }, [user, handleLogout]);

  return (
    <>
      <Header categories={false} />
      <div className="min-h-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 px-8 lg:px-32 bg-white">
        <div className="w-full max-w-6xl grid gap-6 lg:gap-8 lg:grid-cols-2 items-start sm:mt-20">
          {/* Left side - Hero section */}
          <div className="hidden lg:block mt-8">
            <h2 className="text-5xl font-extrabold text-gray-800  leading-tight">
              Login in ProShift for Exclusive Access
            </h2>
            <p className="text-sm mt-4 text-gray-800">
              Access your account with ease and confidence, ensuring a smooth and secure login process.
            </p>
            <p className="text-sm mt-8 text-gray-800">
              Don&apos;t have an account 
              <a href="/signup" className="text-primary font-semibold hover:underline ml-1">
                Register here
              </a>
            </p>
          </div>

          {/* Right side - Form */}
          <form className="w-full max-w-md mx-auto" onSubmit={handleUserLogin}>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 md:mb-8">
              Sign in
            </h3>
            {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
             {error}
            </div>
          )}
            <div className="space-y-4">
              <div>
                <input
                  ref={userRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent"
                  placeholder="Password"
                />
              </div> 

           
            

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 focus:ring-primary border-gray-300 rounded"
                    onChange={() => setRememberMe(!rememberMe)}
                    checked={rememberMe}
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <a href="javascript:void(0);" className="text-sm text-primary hover:text-secondary font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-button hover:bg-button/90 transition-all focus:outline-none">
                Log in
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 whitespace-nowrap">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex justify-center items-center border p-3 rounded outline-none gap-2 font-medium hover:bg-slate-400/10 transition-all"
                onClick={handleGoogleLogin}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 512 512">
                  <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                  <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                  <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                  <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                  <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c56.873 0 105.779 18.279 141.543 53.168z" />
                </svg>
                <span>Log in with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
