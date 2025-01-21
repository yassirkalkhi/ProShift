import { passwordSchema } from "../../../app/validation/authCredentialsValidation";
import { useState, useEffect, useCallback } from "react";

interface Step3Props {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  formErrors: { password: string | null };
  setFormErrors: React.Dispatch<React.SetStateAction<{ password: string | null }>>;
  handleSignUp: () => void;
  debounce: (func: (...args: any) => any, wait: number) => (...args: any) => void;
}

const Step3 = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  formErrors,
  setFormErrors,
  handleSignUp,
  debounce,
}: Step3Props) => {
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNext = async () => {
    if (password !== confirmPassword) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: "Passwords do not match" }));
    } else {
      setIsLoading(true);
      await handleSignUp();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePasswordChange(password);
  }, [password]);

  return (
    <>
     <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
             </label>
          <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              placeholder="Password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            />
             {formErrors.password && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.password}</p>}
        </div>
        <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 Confirm 
              </label>
          <input
               onChange={(e) => setConfirmPassword(e.target.value)}
               value={confirmPassword}
               id="password"
               placeholder="Confirm"
               type="password"
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                 />
              {formErrors.password && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.password}</p>}
          </div>
         <button
              type="button"
              onClick={handleNext}
              disabled={isLoading || formErrors.password !== null || !password || !confirmPassword}
              className="mt-4 w-full py-2 px-4 bg-emerald-500 text-white rounded-md disabled:opacity-50"
       >
           {isLoading ? "Signing Up..." : "Sign Up"}
       </button>
    </>
  );
};

export default Step3;

<>

</>