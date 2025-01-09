"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  AuthError,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import Header from "../components/Navigation/Header"


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);



  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      setErrors({ submit: getErrorMessage(authError.code) });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      setLoading(true);
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      setErrors({ submit: getErrorMessage(authError.code) });
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed';
      case 'auth/weak-password':
        return 'Password is too weak';
      default:
        return 'An error occurred during registration';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Header categories={false}/>
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 px-4 bg-white">
      <div className="w-full max-w-6xl grid gap-6 lg:gap-8 lg:grid-cols-2 items-start mt-6 sm:mt-10 md:mt-20">
        {/* Left section remains the same */}
        <div className="hidden lg:block">
          <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Join Our Community Today
          </h2>
          <p className="text-sm mt-4 text-gray-800">
            Create your account to unlock exclusive features and personalized experiences.
          </p>
          <p className="text-sm mt-8 text-gray-800">
            Already have an account?
            <a href="/login" className="text-primary font-semibold hover:underline ml-1">
              Sign in here
            </a>
          </p>
        </div>

        <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 md:mb-8">
            Create Account
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  type="text"
                  className={`w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="First Name"
                  onChange={handleChange}
                  value={formData.firstName}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  className={`w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <input
                name="email"
                type="email"
                className={`w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email address"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <input
                name="password"
                type="password"
                className={`w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
              <input
                name="confirmPassword"
                type="password"
                className={`w-full bg-gray-100 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-primary focus:bg-transparent ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-primary border-gray-300 rounded"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  checked={rememberMe}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-button hover:bg-button/90 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <div className="my-6 flex items-center gap-4">
            <hr className="w-full border-gray-300" />
            <p className="text-sm text-gray-800 whitespace-nowrap">or</p>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            type="button"
            disabled={loading}
            className="w-full flex justify-center items-center border p-3 rounded outline-none gap-2 font-medium hover:bg-slate-400/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleSignIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 512 512">
            </svg>
            <span className="text-sm text-button/80">Continue with Google</span>
          </button>
        </form>
      </div>
    </div></>
  );
};

export default RegisterForm;