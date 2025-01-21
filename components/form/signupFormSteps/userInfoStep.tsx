import { nameSchema, usernameSchema } from "../../../app/validation/authCredentialsValidation";
import { useState, useEffect, useCallback } from "react";

interface Step2Props {
  firstName: string;
  lastName: string;
  username: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  formErrors: { fname: string | null; lname: string | null; username: string | null };
  setFormErrors: React.Dispatch<React.SetStateAction<{ fname: string | null; lname: string | null; username: string | null }>>;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  checkAccountUsernameExists: (username: string) => Promise<boolean>;
  debounce: (func: (...args: any) => any, wait: number) => (...args: any) => void;
}

const Step2 = ({
  firstName,
  lastName,
  username,
  setFirstName,
  setLastName,
  setUsername,
  formErrors,
  setFormErrors,
  setStep,
  checkAccountUsernameExists,
  debounce,
}: Step2Props) => {
  const [isLoading, setIsLoading] = useState(false);

    const validateSchema = (schema : any, value : string) => {
       const result  = schema.safeParse(value);
       return result.success;
   }

  const handleFirstNameChange = useCallback(
    debounce((value: string) => {
      const result = nameSchema.safeParse(value);
      if (!result.success) {
        setFormErrors((prevErrors) => ({ ...prevErrors, fname: result.error.errors[0].message }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, fname: null }));
      }
    }, 1000), []
  );

  const handleLastNameChange = useCallback(
    debounce((value: string) => {
      const result = nameSchema.safeParse(value);
      if (!result.success) {
        setFormErrors((prevErrors) => ({ ...prevErrors, lname: result.error.errors[0].message }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, lname: null }));
      }
    }, 1000), []
  );

  const handleUsernameChange = useCallback(
    debounce((value: string) => {
      const result = usernameSchema.safeParse(value);
      if (!result.success) {
        setFormErrors((prevErrors) => ({ ...prevErrors, username: result.error.errors[0].message }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, username: null }));
      }
    }, 1000), []
  );


  useEffect(() => {
    handleFirstNameChange(firstName);
    handleLastNameChange(lastName);
    handleUsernameChange(username);
  }, [firstName, lastName, username]);

  const handleNext = async () => {
    if(!validateSchema(nameSchema, firstName) || !validateSchema(nameSchema, lastName) || !validateSchema(usernameSchema, username)){
        return;
    }
    setIsLoading(true);
    if (formErrors.fname === null && formErrors.lname === null && formErrors.username === null) {
      if (await checkAccountUsernameExists(username)) {
        setStep("third");
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, username: "Username already exists" }));
      }
    }
    setIsLoading(false);
  };

  return (
   
<>
                <div className="flex gap-2">
                  <div className="w-full">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      id="first-name"
                      placeholder="First Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                    />
                    {formErrors.fname && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.fname}</p>}
                  </div>
                  <div className="w-full">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      id="last-name"
                      placeholder="Last Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                    />
                    {formErrors.lname && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.lname}</p>}
                  </div>
                </div>
                <div className="w-full mt-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    id="username"
                    placeholder="Username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                  {formErrors.username && <p className="flex items-center text-red-500 text-sm font-medium mt-1.5 ml-1 transition-all ease-in"> <span className="mr-1">•</span>{formErrors.username}</p>}
                </div>
             
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading || formErrors.fname !== null || formErrors.lname !== null || formErrors.username !== null}
                    className="mt-4 w-full py-2 px-4 bg-emerald-500 text-white rounded-md disabled:opacity-50">
                    {isLoading ? "Checking..." : "Next"}
                  </button>
    </>
     
  );
};

export default Step2;

