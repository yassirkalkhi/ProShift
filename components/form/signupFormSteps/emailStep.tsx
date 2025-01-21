import { emailSchema } from "../../../app/validation/authCredentialsValidation";
import { useState, useEffect, useCallback } from "react";
import {checkAccountEmailExists} from "../../../app/server/auth/testAuth"


interface Step1Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  formErrors: { email: string | null };
  setFormErrors: React.Dispatch<React.SetStateAction<{ email: string | null }>>;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  debounce: (func: (...args: any) => any, wait: number) => (...args: any) => void;
  setError:  React.Dispatch<React.SetStateAction<string | null>>;
}

const Step1 = ({
  email,
  setEmail,
  formErrors,
  setFormErrors,
  setStep,
  debounce,
  setError
}: Step1Props) => {
  const [isLoading, setIsLoading] = useState(false);


  const validateEmail = (email : string)=>{
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: result.error.errors[0].message }));
      return true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: null }));
      return false;
    }

  }

  const handleEmailChange = useCallback(
    debounce((email: string) => {
        validateEmail(email);
    }, 1000), []
  );
  useEffect(() => {
    handleEmailChange(email);
  }, [email]);


  const handleNext = async () => {
    if(validateEmail(email)){
        return;
    }
    setIsLoading(true);
    if (formErrors.email === null && email) {
      const res = await checkAccountEmailExists(email);
      if (!res.exists) {
        setError(null)
        setStep("second");
      } else {
        setError(res.error ?? null)
      }
    }
    setIsLoading(false);
  };

  return (
    <>
       <div>
           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
             </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                />
                {formErrors.email && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.email}</p>}
              </div>
         <button
              onClick={handleNext}
              type="button"
              disabled={isLoading || formErrors.email !== null || !email}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all ease-in-out duration-150 disabled:opacity-50">
              {isLoading ? "Signing in..." : "Join Us"}
            </button>
    </>
  );
};

export default Step1;
